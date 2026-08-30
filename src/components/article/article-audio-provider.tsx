"use client";

import * as React from "react";

import {
  extractArticleAudio,
  getBestEnglishVoice,
  type ArticleAudioData,
  type AudioSegment,
} from "@/lib/audio/article-narrator";
import type { Post } from "@/lib/content";

export interface CharRange {
  start: number;
  length: number;
}

export interface ArticleAudioContextValue {
  isSupported: boolean;
  isAudioActive: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  currentSegmentIndex: number;
  currentSegment: AudioSegment | null;
  currentCharRange: CharRange | null;
  isWordHighlightEnabled: boolean;
  rate: number;
  progress: number;
  elapsedSec: number;
  totalSec: number;
  audioData: ArticleAudioData;
  startPlayback: (fromIndex?: number) => void;
  togglePlayPause: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  seekToSegment: (index: number) => void;
  seekToProgress: (progressFraction: number) => void;
  setRate: (rate: number) => void;
  toggleWordHighlight: () => void;
  scrollToCurrentSegment: () => void;
  closePlayer: () => void;
}

const ArticleAudioContext = React.createContext<ArticleAudioContextValue | null>(null);

export function ArticleAudioProvider({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) {
  const [isSupported, setIsSupported] = React.useState(true);
  const [isAudioActive, setIsAudioActive] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = React.useState(0);
  const [currentCharRange, setCurrentCharRange] = React.useState<CharRange | null>(null);
  const [isWordHighlightEnabled, setIsWordHighlightEnabled] = React.useState(true);
  const [rate, setRateState] = React.useState(1.0);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  // Pre-extract audio segments from post
  const audioData = React.useMemo(() => extractArticleAudio(post), [post]);

  // Audio refs to coordinate asynchronous speech callbacks without stale closures
  const activeUtteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = React.useRef(false);
  const currentSegmentIndexRef = React.useRef(0);
  const rateRef = React.useRef(1.0);
  const voicesRef = React.useRef<SpeechSynthesisVoice[]>([]);
  /**
   * Lets `speakSegment` queue the next segment from an utterance's `onend`.
   * The callback genuinely has to reach itself across an async boundary, and
   * naming it directly inside its own definition would capture the first
   * version of it forever.
   */
  const speakSegmentRef = React.useRef<(index: number) => void>(() => {});

  // Mirrored after render, not during it. Speech callbacks fire long after the
  // render that scheduled them, so they only need the values to be current by
  // the time they run — and writing refs while rendering is what makes a
  // component read differently on two passes of the same render.
  React.useEffect(() => {
    isPlayingRef.current = isPlaying;
    currentSegmentIndexRef.current = currentSegmentIndex;
    rateRef.current = rate;
    voicesRef.current = voices;
  });

  // Load word highlight preference from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("space_audio_highlight_word");
      if (saved !== null) {
        // Queued so the state change is not synchronous inside the effect.
        queueMicrotask(() => setIsWordHighlightEnabled(saved === "true"));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleWordHighlight = React.useCallback(() => {
    setIsWordHighlightEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("space_audio_highlight_word", String(next));
      } catch {}
      return next;
    });
  }, []);

  // Initialize SpeechSynthesis and load voices
  React.useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      queueMicrotask(() => setIsSupported(false));
      return;
    }

    queueMicrotask(() => setIsSupported(true));

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
      }
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Compute total duration and elapsed time
  const totalSec = React.useMemo(() => {
    return Math.round(audioData.totalEstimatedSec / rate);
  }, [audioData.totalEstimatedSec, rate]);

  const elapsedSec = React.useMemo(() => {
    let sum = 0;
    for (let i = 0; i < currentSegmentIndex && i < audioData.segments.length; i++) {
      const seg = audioData.segments[i];
      if (seg) sum += seg.estimatedSec;
    }
    return Math.round(sum / rate);
  }, [currentSegmentIndex, audioData.segments, rate]);

  const progress = React.useMemo(() => {
    if (audioData.segments.length === 0) return 0;
    return Math.min(1, Math.max(0, currentSegmentIndex / audioData.segments.length));
  }, [currentSegmentIndex, audioData.segments.length]);

  const currentSegment = audioData.segments[currentSegmentIndex] ?? null;

  // Function to speak a specific segment
  const speakSegment = React.useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const synth = window.speechSynthesis;
      synth.cancel();

      // Skip past any empty segments. This was recursion into `speakSegment`,
      // which referenced the callback inside its own definition.
      let next = index;
      while (next < audioData.segments.length && !audioData.segments[next]?.text) {
        next += 1;
      }

      if (next >= audioData.segments.length) {
        // Finished entire article
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentSegmentIndex(0);
        setCurrentCharRange(null);
        return;
      }

      const segment = audioData.segments[next];

      setCurrentSegmentIndex(next);
      currentSegmentIndexRef.current = next;
      setCurrentCharRange(null);

      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.rate = rateRef.current;
      utterance.pitch = 1.0;

      const bestVoice = getBestEnglishVoice(voicesRef.current);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      // Native word boundary tracking for live word highlighting
      utterance.onboundary = (event) => {
        if (event.charIndex !== undefined) {
          const charIndex = event.charIndex;
          let charLength = event.charLength;

          // If browser doesn't report charLength, derive next word length
          if (!charLength || charLength <= 0) {
            const rest = segment.text.slice(charIndex);
            const match = rest.match(/^\S+/);
            charLength = match ? match[0].length : 1;
          }

          setCurrentCharRange({ start: charIndex, length: charLength });
        }
      };

      utterance.onend = () => {
        // Only advance if still actively playing (not manually cancelled)
        if (isPlayingRef.current) {
          const nextIndex = currentSegmentIndexRef.current + 1;
          speakSegmentRef.current(nextIndex);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted") {
          // If a segment fails, try continuing to next segment
          if (isPlayingRef.current) {
            speakSegmentRef.current(currentSegmentIndexRef.current + 1);
          }
        }
      };

      activeUtteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [audioData.segments],
  );

  const startPlayback = React.useCallback(
    (fromIndex?: number) => {
      setIsAudioActive(true);
      setIsPlaying(true);
      setIsPaused(false);
      const targetIndex = fromIndex !== undefined ? fromIndex : currentSegmentIndexRef.current;
      speakSegment(targetIndex);
    },
    [speakSegment],
  );

  // Keep the self-reference above pointing at the current callback.
  React.useEffect(() => {
    speakSegmentRef.current = speakSegment;
  }, [speakSegment]);

  const pause = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setIsPlaying(false);
    setIsPaused(true);
    window.speechSynthesis.cancel();
  }, []);

  const resume = React.useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
    speakSegment(currentSegmentIndexRef.current);
  }, [speakSegment]);

  const togglePlayPause = React.useCallback(() => {
    if (!isAudioActive) {
      startPlayback(0);
    } else if (isPlaying) {
      pause();
    } else {
      resume();
    }
  }, [isAudioActive, isPlaying, startPlayback, pause, resume]);

  const stop = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setIsPlaying(false);
    setIsPaused(false);
    window.speechSynthesis.cancel();
    setCurrentSegmentIndex(0);
    currentSegmentIndexRef.current = 0;
    setCurrentCharRange(null);
  }, []);

  const closePlayer = React.useCallback(() => {
    stop();
    setIsAudioActive(false);
  }, [stop]);

  const seekToSegment = React.useCallback(
    (index: number) => {
      const bounded = Math.max(0, Math.min(index, audioData.segments.length - 1));
      setCurrentSegmentIndex(bounded);
      currentSegmentIndexRef.current = bounded;
      if (isPlaying) {
        speakSegment(bounded);
      }
    },
    [audioData.segments.length, isPlaying, speakSegment],
  );

  const seekToProgress = React.useCallback(
    (fraction: number) => {
      const targetIndex = Math.round(fraction * (audioData.segments.length - 1));
      seekToSegment(targetIndex);
    },
    [audioData.segments.length, seekToSegment],
  );

  const skipForward = React.useCallback(() => {
    seekToSegment(currentSegmentIndexRef.current + 1);
  }, [seekToSegment]);

  const skipBackward = React.useCallback(() => {
    seekToSegment(Math.max(0, currentSegmentIndexRef.current - 1));
  }, [seekToSegment]);

  const setRate = React.useCallback(
    (newRate: number) => {
      setRateState(newRate);
      rateRef.current = newRate;
      if (isPlaying) {
        speakSegment(currentSegmentIndexRef.current);
      }
    },
    [isPlaying, speakSegment],
  );

  /**
   * Smoothly scrolls the viewport to the active article paragraph/heading being spoken.
   */
  const scrollToCurrentSegment = React.useCallback(() => {
    if (typeof document === "undefined") return;

    const segment = audioData.segments[currentSegmentIndexRef.current];
    if (!segment) return;

    let targetEl: HTMLElement | null = null;

    if (segment.domId) {
      targetEl = document.getElementById(segment.domId);
    }

    if (!targetEl && segment.blockIndex !== undefined) {
      targetEl = document.querySelector(`[data-audio-block-index="${segment.blockIndex}"]`);
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

      // Trigger a brief luminous pulse highlight animation on the target element
      targetEl.classList.add("ring-2", "ring-brand", "bg-brand/10", "dark:bg-brand/20");
      setTimeout(() => {
        targetEl?.classList.remove("ring-2", "ring-brand", "bg-brand/10", "dark:bg-brand/20");
      }, 1800);
    }
  }, [audioData.segments]);

  // Setup MediaSession integration for system & lockscreen controls
  React.useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    if (isAudioActive) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: post.title,
        artist: "Kushan Manahara",
        album: "Space Blog",
        artwork: post.coverImage
          ? [{ src: post.coverImage, sizes: "512x512", type: "image/png" }]
          : [],
      });

      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

      navigator.mediaSession.setActionHandler("play", () => resume());
      navigator.mediaSession.setActionHandler("pause", () => pause());
      navigator.mediaSession.setActionHandler("stop", () => stop());
      navigator.mediaSession.setActionHandler("nexttrack", () => skipForward());
      navigator.mediaSession.setActionHandler("previoustrack", () => skipBackward());
    }
  }, [
    isAudioActive,
    isPlaying,
    post.title,
    post.coverImage,
    resume,
    pause,
    stop,
    skipForward,
    skipBackward,
  ]);

  const contextValue: ArticleAudioContextValue = {
    isSupported,
    isAudioActive,
    isPlaying,
    isPaused,
    currentSegmentIndex,
    currentSegment,
    currentCharRange,
    isWordHighlightEnabled,
    rate,
    progress,
    elapsedSec,
    totalSec,
    audioData,
    startPlayback,
    togglePlayPause,
    pause,
    resume,
    stop,
    skipForward,
    skipBackward,
    seekToSegment,
    seekToProgress,
    setRate,
    toggleWordHighlight,
    scrollToCurrentSegment,
    closePlayer,
  };

  return (
    <ArticleAudioContext.Provider value={contextValue}>{children}</ArticleAudioContext.Provider>
  );
}

export function useArticleAudio(): ArticleAudioContextValue | null {
  return React.useContext(ArticleAudioContext);
}
