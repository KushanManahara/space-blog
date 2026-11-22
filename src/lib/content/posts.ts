// src/lib/content/posts.ts
import { readingMinutes } from "./reading-time";
import { postSchema, type Post } from "./schemas";

const parsedPosts = postSchema.array().parse([
  {
    slug: "gta-vi-records-engineering-and-lessons",
    title: "The $3.79 Billion Day Rockstar Spent 13 Years Building",
    dek: "Grand Theft Auto VI made $3.79 billion on day one, pushed DE-CIX to 33.03 Tbps, and tied Ocarina of Time at 99 on Metacritic on consoles alone. Here is how RAGE 9 got there, what funded the 13-year wait, and what builders can take from it.",
    topic: "Career",
    publishedAt: "2026-11-21",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#strategy", "#discipline", "#performance", "#engineering", "#career"],
    coverImage: "/articles/gta-vi-records-engineering-and-lessons.png",
    body: [
      {
        kind: "paragraph",
        html: "On the evening of November 18, 2026, traffic across DE-CIX's global internet exchanges hit 33.03 terabits per second, an all-time record roughly 25% above a normal week. Around the same time, workforce platforms logged a 29% jump in global leave requests for November 19, a wave of booked days off quickly nicknamed Grand Theft Auto Flu. A day after launch, Rockstar Games and Take-Two Interactive confirmed the figure behind both spikes. Grand Theft Auto VI generated **$3.79 billion** in worldwide day-one retail sales, alongside 32.5 million pre-release units.",
      },
      {
        kind: "paragraph",
        html: "Every number from launch week came strictly from PlayStation 5 and Xbox Series X|S. There is no PC version yet and no online multiplayer mode live yet. When a single software release moves that much money, bandwidth, and attention in 24 hours, the interesting question isn't how big the launch was. It's what Rockstar traded to build it and what happened inside the studio while the records piled up.",
      },
      {
        kind: "callout",
        title: "Sam Houser on launch day",
        body: '"It is with immense gratitude that we enter a new chapter of Rockstar Games with the release of Grand Theft Auto VI. We are incredibly humbled by the response from players around the world and we couldn\'t be more excited to share this moment with you." Sam Houser, Rockstar Games president and founder, November 20, 2026.',
      },
      {
        kind: "heading",
        id: "the-scoreboard",
        level: 2,
        text: "Why the sales numbers matter outside gaming",
      },
      {
        kind: "paragraph",
        html: "Films take months of global box office runs to cross two billion dollars. *Grand Theft Auto VI* passed the lifetime theatrical totals of *Avatar* ($2.92 billion) and *Avengers: Endgame* ($2.80 billion) in a single day, running 4.74 times ahead of *GTA V*'s $800 million debut in 2013.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "GTA VI day-one retail sales vs. landmark entertainment benchmarks ($B)",
        xKey: "title",
        xLabel: "Release or milestone",
        yLabel: "Revenue ($ billions)",
        series: [{ key: "billions", label: "Gross revenue ($B)" }],
        data: [
          { title: "GTA VI Day 1", billions: 3.79 },
          { title: "Avatar", billions: 2.92 },
          { title: "Endgame", billions: 2.8 },
          { title: "GTA VI Pre", billions: 2.36 },
          { title: "GTA V Day 1", billions: 0.8 },
          { title: "RDR2 Open", billions: 0.73 },
        ],
        note: "Official Take-Two day-one retail confirmation ($3.79B), Avatar and Avengers: Endgame lifetime theatrical runs, Sensor Tower digital pre-order tracking ($2.36B), GTA V day one ($0.80B), and RDR2 3-day opening ($0.73B).",
      },
      {
        kind: "paragraph",
        html: "The pricing split is even more unusual than the total. Before discs reached stores, Sensor Tower tracked 24.5 million digital pre-orders worth $2.36 billion, more than three times the previous $709 million pre-order record. Pre-order volume more than doubled in the final ten days alone, with PlayStation 5 taking 75% and Xbox Series X|S taking 25%. Inside those digital orders, **82% of buyers paid $99.99** for the Ultimate Edition while only 18% chose the $79.99 Standard Edition.",
      },
      {
        kind: "paragraph",
        html: "Run the arithmetic on that split and the numbers check out cleanly. My calculation weights 82% at $99.99 and 18% at $79.99 for a blended pre-order price of $96.39, which across 24.5 million digital copies equals $2.36 billion. That optional $20 tier upgrade alone brought in roughly $402 million before anyone loaded into Vice City.",
      },
      {
        kind: "paragraph",
        html: "Critics agreed at a rate that almost never happens for a blockbuster. *GTA VI* opened at 99 out of 100 on Metacritic, tying *The Legend of Zelda: Ocarina of Time* from 1998 for the highest score on the site and sitting above *GTA IV* at 98 and *GTA V* at 97. Before release day, Screen Engine/ASI measured *GTA VI* at 5.64% of global attention share, passing *Minecraft* after 45 weeks to become the first unreleased game to top the index.",
      },
      {
        kind: "table",
        headers: ["Category", "Verified metric", "Why it stands out"],
        rows: [
          [
            "Day-one retail sales",
            "$3.79 billion",
            "Confirmed by Rockstar and Take-Two on consoles only, eclipsing major lifetime film box offices",
          ],
          [
            "Pre-release units",
            "32.5 million copies",
            "Take-Two pre-release unit total across PS5 and Xbox Series X|S",
          ],
          [
            "Digital pre-orders",
            "24.5M / $2.36 billion",
            "Sensor Tower estimate, over 3x the prior $709M record, 75% PS5 vs. 25% Xbox",
          ],
          [
            "Edition pricing split",
            "82% Ultimate ($99.99)",
            "Only 18% bought the $79.99 Standard Edition, adding ~$402M in derived tier uplift",
          ],
          [
            "Critical reception",
            "99 / 100 Metacritic",
            "Tied Ocarina of Time (1998) for the highest aggregate score in Metacritic history",
          ],
          [
            "Trailer reach (24h)",
            "90.4M (T1) / 475M (T2)",
            "Trailer 1 set a YouTube Guinness World Record, Trailer 2 topped 475M cross-platform views",
          ],
          [
            "Internet traffic peak",
            "33.03 Tbps (DE-CIX)",
            "All-time global exchange record on Nov 18, +25% above a normal week",
          ],
          [
            "Livestream peak",
            "7.91M concurrent",
            "3.31M on Twitch (new gaming record), 3.22M on YouTube, and 1.50M on Kick",
          ],
          [
            "Workplace impact",
            "+29% leave requests",
            "Global spike in booked days off for Nov 19, widely dubbed Grand Theft Auto Flu",
          ],
        ],
        caption:
          "Launch-week records for Grand Theft Auto VI as of November 21, 2026, combining official Take-Two disclosures with Sensor Tower, DE-CIX, Streams Charts, and Screen Engine/ASI reports.",
      },
      {
        kind: "heading",
        id: "bending-infrastructure-and-attention",
        level: 2,
        text: "What a 210 GB launch does to the internet",
      },
      {
        kind: "paragraph",
        html: "The DE-CIX traffic record makes simple physical sense once you check the download size. The base console install sits around 210 GB to 212 GB. Multiplying Sensor Tower's 24.5 million digital pre-orders by 210 GB gives my rough floor of 5.14 exabytes (over 5.1 million terabytes) of game data before physical disc patches or day-one digital buyers even enter the picture.",
      },
      {
        kind: "paragraph",
        html: "To keep store CDNs upright on launch night, PlayStation opened pre-loads nine days early on November 10. Even if every player downloaded evenly across those nine days, 5.14 exabytes works out to about 52.9 Tbps of continuous global transfer. Downloads never spread evenly. DE-CIX recorded an initial peak of 33.01 Tbps when pre-loads opened on November 10, with DE-CIX Frankfurt reaching 22.30 Tbps on its own, then set the all-time global record of 33.03 Tbps on November 18 at 20:20 CET.",
      },
      {
        kind: "image",
        src: "/articles/gta-vi-preload-bandwidth-wave.svg",
        alt: "Two-panel diagram showing derived pre-load math of 24.5 million digital copies times 210 GB equaling 5.14 exabytes (52.9 Tbps average over 9 days) alongside DE-CIX measured global traffic peaks of 33.01 Tbps on November 10 and 33.03 Tbps on November 18.",
        caption:
          "Combining a 210 GB base install with tens of millions of synchronized digital downloads produced two back-to-back global traffic peaks across DE-CIX exchanges.",
        width: 800,
        height: 320,
      },
      {
        kind: "paragraph",
        html: "Once the game went live on November 19, traffic shifted from file downloads to live video. Streams Charts tracked a combined peak of 7.91 million concurrent viewers (7,915,475) across major platforms, split across 3.31 million on Twitch, 3.22 million on YouTube, and 1.50 million on Kick. That Twitch peak passed *League of Legends* for the highest gaming viewership in the platform's history, and viewers logged more than 125 million hours watched inside the first 24 hours.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Peak concurrent livestream viewers by platform (millions)",
        xKey: "platform",
        xLabel: "Platform or benchmark",
        yLabel: "Peak concurrent viewers (millions)",
        series: [{ key: "viewers", label: "Peak concurrent viewers (M)" }],
        data: [
          { platform: "GTA VI Total", viewers: 7.91 },
          { platform: "GTA VI Twitch", viewers: 3.31 },
          { platform: "GTA VI YouTube", viewers: 3.22 },
          { platform: "Valorant Launch", viewers: 1.74 },
          { platform: "GTA VI Kick", viewers: 1.5 },
        ],
        note: "Launch-day livestreaming peaks tracked by Streams Charts, compared against Valorant's 1.74M closed-beta launch benchmark.",
      },
      {
        kind: "paragraph",
        html: "Rockstar built that demand over three years without a steady drip of teasers. Trailer 1 in December 2023 set a Guinness World Record with 90,421,491 YouTube views in 24 hours. Trailer 2 in May 2025 reached 475 million views across all platforms in one day, ahead of major film trailer openings like *Deadpool & Wolverine* at 365 million.",
      },
      {
        kind: "video",
        youtubeId: "QdBZY2fkU-0",
        title: "Grand Theft Auto VI Trailer 1 (Official)",
        caption:
          "The December 2023 reveal trailer that set the 24-hour YouTube gaming viewership record at 90.42 million views.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "under-the-hood-rage-9",
        level: 2,
        text: "RAGE 9, 600,000 animations, and why consoles stay at 30 FPS",
      },
      {
        kind: "paragraph",
        html: "Instead of switching to an off-the-shelf engine, Rockstar spent another decade extending its in-house Rockstar Advanced Game Engine. RAGE 9 builds directly on the weather, AI, and rendering systems from *GTA V* (RAGE 7) and *Red Dead Redemption 2* (RAGE 8).",
      },
      {
        kind: "paragraph",
        html: "You can measure that decade of iteration in animation count alone. *GTA V* shipped with roughly 55,000 animations, and *Red Dead Redemption 2* climbed to around 300,000. *GTA VI* passes 600,000, more than double *Red Dead Redemption 2* and over ten times *GTA V*. Rockstar put a dedicated team on the citizens of Vice City and Leonida so pedestrians dress for their neighborhoods, react to rain and storms, remember what the player did nearby, and move through interiors rather than looping like background props.",
      },
      {
        kind: "paragraph",
        html: "On the graphics side, Digital Foundry's launch breakdown centers on mandatory ray-traced global illumination (RTGI) and ray-traced reflections on every launch console. Static pre-baked light maps break down when clouds roll in or headlights sweep across wet asphalt. RTGI traces how light bounces across buildings, glass, car paint, and rooms in real time, running alongside live water physics and storms that change how cars handle.",
      },
      {
        kind: "paragraph",
        html: "Even a reported billion-dollar budget can't buy its way past a console frame timer. At 60 FPS, the CPU and GPU have 16.7 milliseconds to simulate crowds, physics, audio, and ray-traced light for every frame. At 30 FPS, that budget doubles to 33.3 milliseconds. Rockstar spent the entire 33.3 milliseconds on simulation density and mandatory ray tracing, shipping every console version at a **30 FPS target with no 60 FPS or 40 FPS mode**.",
      },
      {
        kind: "image",
        src: "/articles/gta-vi-rage9-console-tradeoffs.svg",
        alt: "Three-column hardware comparison diagram of RAGE 9 across PS5 Pro (1440p to 4K via AI PSSR with exclusive ray-traced shadows and near-locked 30 FPS), Base PS5 and Xbox Series X (1440p via spatial plus TAA with high-20s dips), and Xbox Series S (720p to 1080p via AMD FSR 4 with mid-to-high 20s FPS).",
        caption:
          "Rockstar kept core world simulation and ray-traced global illumination intact across all four consoles, scaling internal resolution, upscalers, and frame-rate headroom to fit each machine.",
        width: 800,
        height: 340,
      },
      {
        kind: "table",
        headers: ["Console", "Internal / Upscaling", "Ray tracing stack", "Frame rate behavior"],
        rows: [
          [
            "PS5 Pro",
            "1440p to 4K via AI PSSR",
            "RTGI, RT reflections, exclusive RT shadows",
            "Near-locked 30 FPS (rare dips to ~24 FPS under heavy explosions)",
          ],
          [
            "PS5 / Xbox Series X",
            "1440p to 4K via spatial + TAA",
            "RTGI and RT reflections (standard shadow maps)",
            "30 FPS target with occasional high-20s dips in intense combat or driving",
          ],
          [
            "Xbox Series S",
            "720p to 1080p via AMD FSR 4",
            "RTGI and crowd parity, softer reflections and clouds",
            "First Xbox title with FSR 4, runs in mid-to-high 20s FPS under load",
          ],
        ],
        caption:
          "Console scaling summary based on Digital Foundry's launch-week technical comparisons.",
      },
      {
        kind: "heading",
        id: "the-runway-and-the-human-cost",
        level: 2,
        text: "The $400 million safety net, and the worry inside the studio",
      },
      {
        kind: "paragraph",
        html: "Rockstar didn't wait 13 years between flagship GTA games on discipline alone. It had a cash engine almost no studio has. Before launch week, the *Grand Theft Auto* series had sold roughly 480 million copies, with about 235 million from *GTA V* alone, and *GTA V* kept bringing in around $400 million a year across the last four years. That recurring revenue let Rockstar delay *GTA VI* twice, first on May 2, 2025 from Fall 2025 to May 26, 2026 and again on November 6, 2025 to November 19, 2026, without running out of money.",
      },
      {
        kind: "mermaid",
        code: `flowchart TD
    A["GTA V (2013): ~$400M/yr cash runway"] --> C["Nov 19, 2026: GTA VI ($3.79B Day 1)"]
    B["RAGE 7 -> 8 -> 9 + 2 polish delays"] --> C
    C --> D["600k+ animations + mandatory RTGI"]
    C --> E["1,600 UK staff union ballot + layoff fear"]`,
        caption:
          "Thirteen years of compounding technology and cash flow powered the launch, yet did not insulate developers from industry-wide job insecurity.",
      },
      {
        kind: "paragraph",
        html: "The human side inside the studio looks far less triumphant than the sales chart. Core development ran out of Edinburgh at Rockstar North across thousands of engineers, animators, artists, and testers over roughly a decade. Yet launch week coincided with a union recognition ballot covering about 1,600 UK staff organized with the IWGB, alongside reports of late-stage crunch, AI anxiety, and fear of post-launch cuts after more than 40 studio closures across the games industry.",
      },
      {
        kind: "callout",
        title: "Nestor Uriarte, Rockstar North animation programmer",
        body: '"It says a lot about the industry that even my colleagues and I, working on the biggest game of all time, are worried about getting laid off." Published in The Guardian on November 18, 2026, one day before launch.',
      },
      {
        kind: "heading",
        id: "six-lessons-for-builders",
        level: 2,
        text: "What builders can actually take from this",
      },
      {
        kind: "paragraph",
        html: "Most of us build software under pressure to ship fast. Watching this launch leaves a simpler truth standing next to the $3.79 billion headline. **Quality takes time, and when you get it right, it gives back more than you ever put in.** Tie that idea back to what actually happened this week and six practical rules fall out of the numbers.",
      },
      {
        kind: "image",
        src: "/articles/gta-vi-builder-tradeoff-matrix.svg",
        alt: "Six-card grid linking verified GTA VI launch evidence to six builder principles: Earned Patience, Pricing Power, Compounding Runway, Explicit Trade-Offs, Signal Over Noise, and Product Not Equal to System.",
        caption:
          "Six grounded takeaways mapping concrete GTA VI outcomes directly to product, engineering, and career decisions.",
        width: 800,
        height: 315,
      },
      {
        kind: "paragraph",
        html: "Delays fade once the work holds up, **if you have earned the trust**. Players complained through 13 years and two public slips, and two days after launch nobody is arguing about the old release dates. Patience only works with a track record behind it, though. A new team copying Rockstar's silence without Rockstar's past proof just gets forgotten.",
      },
      {
        kind: "paragraph",
        html: "Real craft also weakens price resistance. In software and consumer markets obsessed with discounting, 82% of pre-order buyers paid $99.99 instead of $79.99. When people trust that a release will define its category, $20 stops being the reason they hesitate.",
      },
      {
        kind: "paragraph",
        html: "Big swings still sit on compounding foundations. RAGE 9's 600,000 animations and real-time ray tracing grew out of RAGE 7 (55,000 animations) and RAGE 8 (300,000), paid for by a decade of steady revenue from *GTA V*. In both systems engineering and a personal career, reliable everyday work funds the harder bets later.",
      },
      {
        kind: "paragraph",
        html: "Clarity means naming your trade-offs out loud. Even a billion-dollar budget couldn't fit 60 FPS, dense crowds, and mandatory RTGI onto base consoles at the same time. Rockstar picked world immersion at 30 FPS and accepted every complaint about frame rate. Trying to win every metric at once usually produces something forgettable.",
      },
      {
        kind: "paragraph",
        html: "Signal beats frequency. Most teams post weekly updates hoping to stay visible, while Rockstar released a handful of trailers across three years, pulled 90.4 million and 475 million views in 24 hours, and broke internet traffic records. One piece of work people cannot ignore outweighs ten updates they scroll past.",
      },
      {
        kind: "paragraph",
        html: "And a historic product doesn't guarantee a healthy organization. Shipping a $3.79 billion launch didn't protect developers from crunch pressure or layoff anxiety. Durable work depends on whether the people who built it have the stability and trust to stay for the next one.",
      },
      {
        kind: "paragraph",
        html: "Almost none of us have $400 million a year in runway or a decade to polish one release, so copying Rockstar's schedule would be foolish. What translates directly is knowing which details actually make your work worth waiting for, and refusing to cut those corners just to hit Friday.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Grand Theft Auto VI Shatters Entertainment Box Office Records",
            href: "https://www.take2games.com/ir/news/grand-theft-auto-vi-shatters-entertainment-box-office-records",
            source: "Take-Two Interactive press release (Nov 20, 2026)",
            note: "Official confirmation of $3.79B day-one retail sales, 32.5M pre-release units, and Sam Houser's statement.",
          },
          {
            label: "GTA VI: Global Data Traffic Hits Record-Breaking High",
            href: "https://www.de-cix.net/en/about-de-cix/media/press-releases/gta-vi-global-data-traffic-hits-record-breaking-high",
            source: "DE-CIX press release (Nov 19, 2026)",
            note: "Records the 33.03 Tbps peak on November 18 at 20:20 CET (+25% above a typical week) and Frankfurt throughput.",
          },
          {
            label: "GTA VI breaks streaming launch records within minutes of its release",
            href: "https://streamscharts.com/news/gta-vi-breaks-streaming-launch-records-within-minutes-its-release",
            source: "Streams Charts (Nov 2026)",
            note: "Peak concurrent viewership across Twitch (3.31M), YouTube (3.22M), Kick (1.50M), and 7.91M combined.",
          },
          {
            label: "GTA 6 Reportedly Plays Best on PS5 Pro, Xbox Series S Struggles",
            href: "https://www.techpowerup.com/355004/gta-6-reportedly-plays-best-on-ps5-pro-xbox-series-s-struggles",
            source: "TechPowerUp summary of Digital Foundry console analysis",
            note: "Console resolution, PSSR, AMD FSR 4 on Series S, mandatory RTGI, and 30 FPS performance breakdown.",
          },
          {
            label: "GTA 6 Rockstar employees union recognition op-ed",
            href: "https://www.theguardian.com/commentisfree/2026/nov/18/gta-6-grand-theft-auto-vi-rockstar-employees-union-recognition",
            source: "Nestor Uriarte in The Guardian (Nov 18, 2026)",
            note: "Firsthand account of layoff anxiety, crunch concerns, and the 1,600-staff UK union recognition ballot.",
          },
          {
            label: "Grand Theft Auto VI: first new game released in 13 years",
            href: "https://www.theguardian.com/games/2026/nov/16/grand-theft-auto-gta-vi-first-new-game-released-in-13-years",
            source: "The Guardian (Nov 16, 2026)",
            note: "Cultural launch coverage including the global surge in leave requests ahead of release day.",
          },
          {
            label: "Grand Theft Auto VI is Now Coming May 26, 2026",
            href: "https://www.rockstargames.com/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026",
            source: "Rockstar Games Newswire (May 2, 2025)",
            note: "Official delay announcement explaining Rockstar's polish-first schedule philosophy.",
          },
          {
            label: "Grand Theft Auto VI Trailer 2 surpasses 475 million views in one day",
            href: "https://www.thehindu.com/entertainment/movies/grand-theft-auto-vi-trailer-surpasses-475-million-views-in-one-day/article69552079.ece",
            source: "The Hindu (May 2025)",
            note: "Cross-platform 24-hour trailer reach surpassing major theatrical film trailer records.",
          },
          {
            label: "Grand Theft Auto VI Trailer 1",
            href: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
            source: "Rockstar Games on YouTube (Dec 2023)",
            note: "Official reveal trailer that set the Guinness World Record for 24-hour YouTube gaming views.",
          },
        ],
      },
    ],
  },
  {
    slug: "why-loss-functions-use-the-log-and-kl-divergence",
    title: "Why Loss Functions Use the Log, and KL Divergence",
    dek: "Multiplying probabilities across a dataset collapses to zero in float32, while raw exponentials blow up to infinity. Derive why logarithms turn probability products into sums, how the log-sum-exp trick prevents overflow, and how KL divergence compares full probability distributions.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: [
      "#deep-learning",
      "#neural-networks",
      "#machine-learning",
      "#pytorch",
      "#nn-module",
      "#training",
    ],
    series: { slug: "deep-learning", title: "Deep Learning", part: 6 },
    coverImage: "/articles/why-loss-functions-use-the-log-and-kl-divergence.png",
    body: [
      {
        kind: "paragraph",
        html: "In [Part 5 of this series](/articles/loss-functions-mse-mae-cross-entropy), we saw how cross-entropy scores a classifier using `-ln(p)`: assign `p = 0.9` to the right support-ticket category and your loss is a tiny `0.105`, while assigning `p = 0.01` shoots the loss up to `4.605`. That formula is easy to memorize, yet one natural question stays unanswered: why does a **logarithm** sit inside almost every classification loss in deep learning?",
      },
      {
        kind: "paragraph",
        html: "This guide opens the hood on three closely linked ideas that power real training pipelines: why multiplying probabilities across examples breaks computer arithmetic and forces us to take the log, how the **log-sum-exp** trick stops `e^z` from overflowing when logits get large, and how **KL divergence** extends cross-entropy from single hard labels to full target distributions.",
      },
      {
        kind: "video",
        youtubeId: "Kv6waDvgxcA",
        title: "Why Do Loss Functions Use the Log?",
        caption:
          "Companion Deep Learning Fundamentals episode covering probability underflow, natural logarithms, log-sum-exp stability, and KL divergence.",
        variant: "compact",
      },
      {
        kind: "mermaid",
        code: `flowchart TD
    A["1. Why the log?"] --> A1["Products vanish in float32 -> sums stay safe"]
    B["2. Log-sum-exp trick"] --> B1["Subtract max(z) -> stop e^z overflow"]
    C["3. KL divergence"] --> C1["Compare full probability distributions p and q"]`,
        caption:
          "Three layers of the same story: turn products into sums, protect exponentials from overflow, and generalize from one-hot labels to soft targets.",
      },
      {
        kind: "heading",
        id: "why-multiplying-probabilities-breaks",
        level: 2,
        text: "Why multiplying probabilities breaks in float32",
      },
      {
        kind: "paragraph",
        html: "Start with a simple probability rule. Flip one fair coin and the chance of heads is `0.5`. Flip two independent fair coins and the chance of getting heads on both is `0.5 × 0.5 = 0.25`. When independent events all need to happen together, their probabilities **multiply**.",
      },
      {
        kind: "paragraph",
        html: "Now apply that exact rule to a trained support-ticket classifier checking three independent tickets. Suppose the model assigns `0.90` to the true class on Ticket 1, `0.80` on Ticket 2, and `0.95` on Ticket 3. The joint probability of getting all three right is their product:",
      },
      {
        kind: "formula",
        tex: String.raw`L = 0.90 \times 0.80 \times 0.95 = 0.684`,
        caption:
          "Combined probability of a model predicting three independent support tickets accurately.",
      },
      {
        kind: "paragraph",
        html: "With three tickets, `0.684` looks completely harmless. Now scale that same good model (`0.9` on every single ticket) up to a realistic training batch or dataset. Ten tickets yield `0.9^10 = 0.3487`. One hundred tickets drop to `0.9^100 ≈ 2.66 × 10^-5`. By `1,000` tickets, the exact mathematical product is `0.9^1000 ≈ 1.75 × 10^-46`.",
      },
      {
        kind: "image",
        src: "/articles/float32-probability-underflow.svg",
        alt: "Log-scale comparison showing 0.9 to the power of 1, 10, 100, and 1,000 crossing below the float32 smallest positive number around 1.4e-45 and collapsing to exact zero.",
        caption:
          "Standard float32 weights and activations cannot represent positive numbers smaller than about 1.4e-45, so multiplying 1,000 confident 0.9 probabilities underflows to exact 0.0.",
        width: 800,
        height: 315,
      },
      {
        kind: "paragraph",
        html: "Standard 32-bit floating-point numbers (`float32`, the default precision used across PyTorch models) cannot store any positive number smaller than roughly `1.4 × 10^-45`. Anything smaller rounds straight down to exact `0.0`, an error called **numerical underflow**. Once the product hits zero, a strong model (`0.9` per ticket) and a terrible model (`0.2` per ticket) both score `0.0`, leaving training with no useful signal to compare them.",
      },
      {
        kind: "heading",
        id: "natural-logarithm-rescues-training",
        level: 2,
        text: "What a natural logarithm does, and why it rescues training",
      },
      {
        kind: "paragraph",
        html: "A **logarithm** is simply the inverse of an exponent. In deep learning we almost always use the **natural logarithm**, written `ln(x)`, which uses Euler's constant `e ≈ 2.718` as its base. Asking for `ln(x)` asks one concrete question: *what power must we raise `e` to in order to get `x`?*",
      },
      {
        kind: "list",
        items: [
          "**`ln(1) = 0`**, because `e^0 = 1`. A perfectly confident `p = 1.0` produces zero surprise.",
          "**`ln(0.5) ≈ -0.693`**, because `e^-0.693 ≈ 0.5`. Cutting probability in half moves the log down by `0.693`.",
          "**`ln(0.1) ≈ -2.303`**, because `e^-2.303 ≈ 0.1`. Lower probabilities push `ln(p)` deeply negative.",
        ],
      },
      {
        kind: "figure",
        variant: "line",
        title: "Natural log ln(p) vs. negative log loss -ln(p)",
        xKey: "p",
        xLabel: "Assigned probability p for the true class",
        yLabel: "Value",
        series: [
          { key: "lnP", label: "ln(p) (always <= 0)" },
          { key: "negLnP", label: "-ln(p) (positive loss)" },
        ],
        data: [
          { p: "0.05", lnP: -2.996, negLnP: 2.996 },
          { p: "0.10", lnP: -2.303, negLnP: 2.303 },
          { p: "0.20", lnP: -1.609, negLnP: 1.609 },
          { p: "0.30", lnP: -1.204, negLnP: 1.204 },
          { p: "0.40", lnP: -0.916, negLnP: 0.916 },
          { p: "0.50", lnP: -0.693, negLnP: 0.693 },
          { p: "0.60", lnP: -0.511, negLnP: 0.511 },
          { p: "0.70", lnP: -0.357, negLnP: 0.357 },
          { p: "0.80", lnP: -0.223, negLnP: 0.223 },
          { p: "0.90", lnP: -0.105, negLnP: 0.105 },
          { p: "1.00", lnP: 0.0, negLnP: 0.0 },
        ],
        note: "Probabilities between 0 and 1 produce negative values under ln(p), so negating it creates a clean positive penalty that shrinks smoothly to zero as p reaches 1.0.",
      },
      {
        kind: "paragraph",
        html: "Notice two superpowers of `ln(p)` immediately from the curve and its algebra. First, `ln(p)` is strictly increasing: whenever one model has a higher probability than another, its log is also higher, so maximizing `ln(L)` picks the exact same best weights as maximizing `L`. Second, because exponents add when powers multiply (`e^a · e^b = e^(a+b)`), logarithms turn **multiplication into addition**:",
      },
      {
        kind: "formula",
        tex: String.raw`\ln(a \cdot b) = \ln(a) + \ln(b)`,
        caption:
          "The product-to-sum identity of logarithms: multiplying probabilities becomes adding log-probabilities.",
      },
      {
        kind: "paragraph",
        html: "Verify that rule with concrete numbers. Taking `a = 0.9` and `b = 0.8`, their product is `0.72` and `ln(0.72) = -0.329`. Separately, `ln(0.9) = -0.105` and `ln(0.8) = -0.223`, and `-0.105 + (-0.223) = -0.328` (exact `-0.3285` before rounding). Since probabilities sit between `0` and `1`, every `ln(p_i)` is negative, so we put a minus sign in front to build a positive loss that training can minimize:",
      },
      {
        kind: "formula",
        tex: String.raw`\begin{aligned}
-\ln(0.90 \times 0.80 \times 0.95) &= -\ln(0.90) - \ln(0.80) - \ln(0.95) \\
&= 0.1054 + 0.2231 + 0.0513 = 0.3798
\end{aligned}`,
        caption:
          "The negative log of the three-ticket product equals the sum of their individual cross-entropy losses.",
      },
      {
        kind: "image",
        src: "/articles/likelihood-to-log-sum.svg",
        alt: "Two-path diagram comparing raw probability multiplication collapsing 0.9^1000 to float32 0.0 on the left against adding negative log-probabilities safely to 105.4 on the right.",
        caption:
          "Adding -ln(p) keeps 1,000 confident predictions at an ordinary number (105.4) instead of collapsing to 0.0, and each example contributes an independent additive term.",
        width: 800,
        height: 310,
      },
      {
        kind: "paragraph",
        html: "Run the `1,000`-ticket stress test again in log space. Each `0.9` prediction contributes `-ln(0.9) ≈ 0.1054`, so `1,000` tickets sum to `1,000 × 0.1054 ≈ 105.4` (exact `105.36`). No underflow, no vanishing digits, and each ticket adds its own independent piece to the batch loss so gradients accumulate cleanly across examples.",
      },
      {
        kind: "callout",
        title: "Quick check and the formal name",
        body: "Suppose a model gives probability `0.5` to the right answer on three independent tickets. Since `-ln(0.5) ≈ 0.693`, the total negative log loss is `3 × 0.693 ≈ 2.08` (exact `2.079`). Searching for weights that make the observed dataset as probable as possible is called **maximum likelihood estimation** in statistics, and minimizing total cross-entropy is mathematically the exact same objective.",
      },
      {
        kind: "heading",
        id: "log-sum-exp-trick",
        level: 2,
        text: "The log-sum-exp trick: stopping exponential overflow",
      },
      {
        kind: "paragraph",
        html: "Logarithms solved **underflow** (numbers crashing to `0.0`). Right inside Softmax and cross-entropy sits the opposite danger: **overflow** (numbers exploding past the largest value `float32` can hold).",
      },
      {
        kind: "paragraph",
        html: "Remember from [Part 4 of this series](/articles/gelu-silu-and-softmax) that a classifier outputs unconstrained raw scores called **logits** (`z`), and Softmax turns them into probabilities by exponentiating every logit via `e^(z_i)`. The function `e^z` grows astonishingly fast:",
      },
      {
        kind: "list",
        items: [
          "**`e^10 ≈ 22,026`**: already over twenty thousand from a modest logit of `10`.",
          "**`e^88 ≈ 1.65 × 10^38`**: still fits inside `float32`, whose ceiling is `3.40 × 10^38`.",
          "**`e^89 ≈ 4.49 × 10^38`**: exceeds the `float32` ceiling and overflows straight to `inf`.",
          "**`e^100 ≈ 2.69 × 10^43` and `e^1000`**: both immediately produce `inf`, turning `e^z / sum(e^z)` into `inf / inf = NaN` and poisoning every weight on the next step.",
        ],
      },
      {
        kind: "paragraph",
        html: "The cure starts with one surprising numerical fact about Softmax. Compute Softmax on the modest logits `[2.0, 1.0, 0.1]` and you get `[0.659, 0.242, 0.099]`. Now add `1,000` to every single logit, giving `[1002.0, 1001.0, 1000.1]`. Mathematically, the true probabilities are still `[0.659, 0.242, 0.099]`, completely unchanged.",
      },
      {
        kind: "paragraph",
        html: "Why does shifting every logit by the same constant `c` leave Softmax untouched? Because adding `c` inside the exponent pulls out a common factor `e^c` from both numerator and denominator, and `e^c / e^c` cancels to `1`. Only the **gaps** between logits determine the probabilities.",
      },
      {
        kind: "formula",
        tex: String.raw`\operatorname{softmax}(z_i + c) = \frac{e^{z_i + c}}{\sum_j e^{z_j + c}} = \frac{e^c \, e^{z_i}}{e^c \sum_j e^{z_j}} = \frac{e^{z_i}}{\sum_j e^{z_j}}`,
        caption: "Shifting every logit by any constant c cancels out identically in Softmax.",
      },
      {
        kind: "paragraph",
        html: "When computing cross-entropy directly from logits, we need the log of the Softmax denominator, called **log-sum-exp**: `ln(sum_j e^(z_j))`. Applying the exact same factoring idea with `m = max_j(z_j)` lets us pull `e^m` outside the sum and outside the logarithm:",
      },
      {
        kind: "formula",
        tex: String.raw`\ln\!\left(\sum_j e^{z_j}\right) = \ln\!\left(e^m \sum_j e^{z_j - m}\right) = m + \ln\!\left(\sum_j e^{z_j - m}\right)`,
        caption:
          "The log-sum-exp identity: shift every logit down by m = max(z), exponentiate safely in (0, 1], take the log, and add m back.",
      },
      {
        kind: "image",
        src: "/articles/log-sum-exp-max-shift.svg",
        alt: "Three-step pipeline comparing naive exp([1000, 999, 998]) overflowing to infinity and NaN against subtracting m = 1000 to obtain [0, -1, -2], exponentiating to [1.000, 0.368, 0.135], and returning 1000.408.",
        caption:
          "Subtracting the largest logit guarantees every shifted score is <= 0, every exponential sits safely in (0, 1], and at least one term equals 1.000 so the sum can never underflow to zero.",
        width: 800,
        height: 315,
      },
      {
        kind: "paragraph",
        html: "Walk through `[1000, 999, 998]` step by step. First, find `m = 1000` and subtract it from every logit to get `[0, -1, -2]`. Second, exponentiate those tiny shifted scores: `e^0 = 1.000`, `e^-1 = 0.368`, and `e^-2 = 0.135`, whose sum is `1.503`. Third, take `ln(1.503) = 0.408` and add `m` back to get `1000.408`, with zero overflow, zero underflow, and full floating-point precision.",
      },
      {
        kind: "callout",
        title: "Quick check and what PyTorch handles for you",
        body: "Try `[5, 4]` mentally: the maximum is `5`, subtracting `5` yields `[0, -1]`, and the shifted exponentials are `[1.000, 0.368]`. You rarely need to write log-sum-exp by hand in training code because PyTorch fuses this exact shift inside `F.log_softmax` and `F.cross_entropy`, which is why both expect raw logits rather than pre-computed Softmax probabilities.",
      },
      {
        kind: "heading",
        id: "kl-divergence-full-distributions",
        level: 2,
        text: "KL divergence: measuring distance between full distributions",
      },
      {
        kind: "paragraph",
        html: 'Standard cross-entropy assumes every training example has one definite ground-truth class, encoded as a **one-hot target** such as `[1.0, 0.0, 0.0]`. Real datasets are not always that black and white. Suppose a support ticket reads *"I was double-charged after the checkout button crashed"*, and ten human reviewers vote on the best department: `7` pick `billing`, `2` pick `technical`, and `1` picks `account`.',
      },
      {
        kind: "paragraph",
        html: "Their collective verdict is not a single category. It is a **soft target distribution** `p = [0.7, 0.2, 0.1]`. Now suppose our classifier predicts `q = [0.6, 0.3, 0.1]`. How do we score how far the predicted distribution `q` drifts from the target distribution `p`?",
      },
      {
        kind: "paragraph",
        html: "Build the formula one class at a time, starting with `billing` (`p = 0.7`, `q = 0.6`). First, take the ratio `p / q = 0.7 / 0.6 ≈ 1.167`, which measures how much `q` fell short relative to `p` (a ratio of `1.0` means an exact match). Second, take the natural log `ln(1.167) ≈ +0.154` so that an exact match (`ratio = 1`) scores `0`. Third, multiply by the target weight `p = 0.7` so major categories matter more than rare ones: `0.7 × 0.154 = +0.108`.",
      },
      {
        kind: "paragraph",
        html: "Repeat those three operations for every class and sum them together. That sum is **Kullback-Leibler (KL) divergence**, written `D_KL(p || q)` (read *the KL divergence of `p` relative to `q`*):",
      },
      {
        kind: "formula",
        tex: String.raw`D_{\mathrm{KL}}(p \,\|\, q) = \sum_i p_i \ln\!\left(\frac{p_i}{q_i}\right)`,
        caption:
          "KL divergence weights the log-ratio ln(p_i / q_i) by the target probability p_i across every class.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Comparing target distribution p against close and poor predictions",
        xKey: "category",
        xLabel: "Support-ticket department",
        yLabel: "Probability",
        series: [
          { key: "target", label: "Target p (reviewers)" },
          { key: "close", label: "Close q (KL = 0.027)" },
          { key: "poor", label: "Poor q (KL = 0.698)" },
        ],
        data: [
          { category: "Billing", target: 0.7, close: 0.6, poor: 0.2 },
          { category: "Technical", target: 0.2, close: 0.3, poor: 0.2 },
          { category: "Account", target: 0.1, close: 0.1, poor: 0.6 },
        ],
        note: "A close prediction stays near the reviewer votes (KL = 0.027), while putting 0.60 on Account and only 0.20 on Billing spikes KL divergence more than 25x higher (0.698).",
      },
      {
        kind: "paragraph",
        html: "Let's inspect every class row for both `q_close = [0.6, 0.3, 0.1]` and `q_far = [0.2, 0.2, 0.6]` so nothing stays hidden inside the summation:",
      },
      {
        kind: "table",
        headers: ["Department", "Target p", "Close q term", "Poor q term"],
        rows: [
          ["Billing", "0.70", "0.7 * ln(0.7/0.6) = +0.108", "0.7 * ln(0.7/0.2) = +0.877"],
          ["Technical", "0.20", "0.2 * ln(0.2/0.3) = -0.081", "0.2 * ln(0.2/0.2) = 0.000"],
          ["Account", "0.10", "0.1 * ln(0.1/0.1) = 0.000", "0.1 * ln(0.1/0.6) = -0.179"],
          ["Total KL", "1.00", "0.027", "0.698"],
        ],
        numericColumns: [1],
        caption:
          "Term-by-term KL divergence on p = [0.7, 0.2, 0.1] for a close prediction and a poor prediction.",
      },
      {
        kind: "paragraph",
        html: "Why are individual rows like `-0.081` (Technical in `q_close`) and `-0.179` (Account in `q_far`) negative? Because whenever `q_i > p_i`, the model gave that class *more* probability than the target asked for, so `p_i / q_i < 1` and its logarithm is negative. Yet the **total KL divergence can never drop below zero**: probabilities must sum to `1`, so over-allocating mass to one class forces you to steal mass away from other classes, and starving higher-weight classes always costs more than the small negative credit you gained elsewhere.",
      },
      {
        kind: "callout",
        title: "Quick check: what happens on an exact match?",
        body: "If the model predicts `q = [0.7, 0.2, 0.1]`, identical to the reviewers' target `p`, every ratio `p_i / q_i` equals `1`, every `ln(1)` equals `0`, and `D_KL(p || q) = 0.000`. Zero KL divergence happens if and only if `q` matches `p` on every class.",
      },
      {
        kind: "heading",
        id: "kl-divergence-cross-entropy-and-order",
        level: 2,
        text: "How KL divergence connects to cross-entropy, and why order matters",
      },
      {
        kind: "paragraph",
        html: "Apply the quotient rule of logarithms (`ln(a / b) = ln(a) - ln(b)`) to the KL formula, and a clean bridge back to Part 5 drops right out:",
      },
      {
        kind: "formula",
        tex: String.raw`D_{\mathrm{KL}}(p \,\|\, q) = \sum_i p_i \ln p_i - \sum_i p_i \ln q_i = \underbrace{\left(-\sum_i p_i \ln q_i\right)}_{\mathrm{CE}(p, q)} - \underbrace{\left(-\sum_i p_i \ln p_i\right)}_{H(p)}`,
        caption:
          "KL divergence equals cross-entropy minus the target distribution's own entropy H(p).",
      },
      {
        kind: "paragraph",
        html: "The first term is **cross-entropy** `CE(p, q)`, the exact loss we already know. The second term `H(p)` is the **entropy** of the target distribution, which simply measures how spread out or uncertain the target itself is. On `p = [0.7, 0.2, 0.1]` and `q_far = [0.2, 0.2, 0.6]`, cross-entropy is `1.500`, the target's entropy is `H(p) = 0.802`, and `1.500 - 0.802 = 0.698`, matching our KL table to three decimal places.",
      },
      {
        kind: "paragraph",
        html: "Because the target labels `p` never change during training, `H(p)` is just a fixed constant offset. Minimizing KL divergence and minimizing cross-entropy therefore push the model's weights in the exact same direction! Even better, for a sharp one-hot target like `[1, 0, 0]`, there is zero uncertainty (`H(p) = 0`), so KL divergence reduces literally to standard cross-entropy.",
      },
      {
        kind: "paragraph",
        html: "There is one major gotcha before using KL divergence in code: **it is not symmetric**. Swapping `p` and `q` changes which distribution weights the sum, so `D_KL(p || q)` and `D_KL(q || p)` are usually different numbers. On our exact example, `D_KL(p || q_far) = 0.698`, whereas reversing the order gives `D_KL(q_far || p) = 0.825`.",
      },
      {
        kind: "image",
        src: "/articles/kl-divergence-direction.svg",
        alt: "Side-by-side comparison showing forward KL(p || q) = 0.698 weighted by target p versus reverse KL(q || p) = 0.825 weighted by prediction q.",
        caption:
          "KL divergence is directional: swapping target p and prediction q changes the weights on every term and produces a different number (0.698 vs. 0.825).",
        width: 800,
        height: 325,
      },
      {
        kind: "paragraph",
        html: "Because `D_KL(p || q)` compares full probability distributions cleanly, practitioners reach for it whenever targets are soft rather than one-hot. Two everyday examples are **soft reviewer labels** (like our `7 / 2 / 1` ticket split) and **knowledge distillation**, where a small, fast student model learns to copy a larger teacher model's full output probabilities instead of only its single top-1 guess.",
      },
      {
        kind: "code",
        filename: "kl_divergence_pytorch.py",
        code: `import torch
import torch.nn.functional as F

# Soft target from 10 reviewers (batch size 1, 3 classes)
target_p = torch.tensor([[0.7, 0.2, 0.1]])

# Raw logits from our classifier (never pass plain probabilities as input)
logits = torch.tensor([[0.9, 0.2, -0.9]])
log_q = F.log_softmax(logits, dim=-1)  # Uses log-sum-exp internally

# Always use reduction="batchmean" for true mathematical KL divergence
kl_loss = F.kl_div(log_q, target_p, reduction="batchmean")
print(f"KL(p || q): {kl_loss.item():.4f}")`,
      },
      {
        kind: "callout",
        title: "Two PyTorch F.kl_div traps to avoid",
        body: 'First, `F.kl_div(input, target)` expects **log-probabilities** (`F.log_softmax(logits, dim=-1)`) as its first argument and regular probabilities (`p`) as its second, because passing raw logits or plain probabilities silently gives wrong numbers. Second, pass `reduction="batchmean"` instead of the default `"mean"`, because `"mean"` divides by `batch_size × num_classes` rather than just `batch_size` and shrinks the true KL value by a factor of `num_classes`.',
      },
      {
        kind: "heading",
        id: "putting-all-three-together",
        level: 2,
        text: "Putting all three pieces together",
      },
      {
        kind: "table",
        headers: ["Tool", "Problem it solves", "Key formula or rule"],
        rows: [
          [
            "Natural log (-ln p)",
            "Multiplying probabilities underflows float32 to 0.0",
            "Turns product into sum: -ln(prod p_i) = sum(-ln p_i)",
          ],
          [
            "Log-sum-exp shift",
            "Exponentiating large logits overflows float32 to inf",
            "m + ln(sum e^(z_i - m)) with m = max(z)",
          ],
          [
            "KL divergence",
            "Hard one-hot labels miss soft probability targets",
            "D_KL(p || q) = sum p_i ln(p_i / q_i) = CE(p, q) - H(p)",
          ],
        ],
        caption:
          "Summary of the three mechanics behind stable classification losses and distribution matching.",
      },
      {
        kind: "paragraph",
        html: "Run the interactive Python lab below right in your browser to verify every number in this article, from `float32` underflow on `1,000` tickets and shift-invariant Softmax to stable log-sum-exp and both directions of KL divergence. Try changing `n_tickets`, bumping `big_logits` to `[5000.0, 4999.0, 4998.0]`, or setting `q_close = p` to watch KL drop to `0.0000`.",
      },
      {
        kind: "code",
        filename: "log_lse_kl_lab.py",
        runnable: true,
        code: `import math
import struct

def to_float32(x):
    return struct.unpack("f", struct.pack("f", x))[0]

# 1. Probability product vs. sum of negative logs
probs = [0.90, 0.80, 0.95]
likelihood = math.prod(probs)
neg_log_prod = -math.log(likelihood)
sum_ce = sum(-math.log(p) for p in probs)
print(f"3 tickets: likelihood = {likelihood:.3f}, -ln(L) = {neg_log_prod:.4f}, sum CEs = {sum_ce:.4f}")

# Stress test in float32 across 1,000 confident tickets
n_tickets = 1000
f32_prod = to_float32(0.9 ** n_tickets)
log_sum = n_tickets * (-math.log(0.9))
print(f"{n_tickets:,} tickets at p=0.9: float32(0.9^N) = {f32_prod}, sum -ln(p) = {log_sum:.2f}")

# 2. Shift-invariant Softmax and stable log-sum-exp
def stable_softmax(z):
    m = max(z)
    exps = [math.exp(v - m) for v in z]
    total = sum(exps)
    return [e / total for e in exps]

def stable_lse(z):
    m = max(z)
    return m + math.log(sum(math.exp(v - m) for v in z))

big_logits = [1000.0, 999.0, 998.0]
print("Softmax [2, 1, 0.1]:         ", [round(v, 3) for v in stable_softmax([2.0, 1.0, 0.1])])
print("Softmax [1002, 1001, 1000.1]:", [round(v, 3) for v in stable_softmax([1002.0, 1001.0, 1000.1])])
print(f"Stable LSE({[int(v) for v in big_logits]}): {stable_lse(big_logits):.4f}")

# 3. KL divergence, entropy offset, and asymmetry
def kl(p, q):
    return sum(pi * math.log(pi / qi) for pi, qi in zip(p, q) if pi > 0)

def ce(p, q):
    return sum(-pi * math.log(qi) for pi, qi in zip(p, q) if pi > 0)

def entropy(p):
    return sum(-pi * math.log(pi) for pi in p if pi > 0)

p = [0.7, 0.2, 0.1]
q_close = [0.6, 0.3, 0.1]
q_far = [0.2, 0.2, 0.6]
ce_far, h_p = ce(p, q_far), entropy(p)

print(f"KL(p || p):       {kl(p, p):.4f}")
print(f"KL(p || q_close): {kl(p, q_close):.4f}")
print(f"KL(p || q_far):   {kl(p, q_far):.4f}  (CE {ce_far:.4f} - H(p) {h_p:.4f} = {ce_far - h_p:.4f})")
print(f"Reverse KL(q_far || p): {kl(q_far, p):.4f}")`,
      },
      {
        kind: "video",
        youtubeId: "Kv6waDvgxcA",
        title: "Why Do Loss Functions Use the Log?",
        caption:
          "Watch the full animated walkthrough of probability underflow, natural logs, the log-sum-exp trick, and KL divergence.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "Now the hidden machinery inside cross-entropy is completely transparent: logarithms keep probability products from vanishing into `float32` zeros, subtracting `max(z)` inside log-sum-exp keeps exponentials from exploding to `inf`, and KL divergence extends the exact same idea from one-hot classes to full probability distributions. In Part 7 of this series, we will step into specialized losses built for imbalanced classes, decision margins, and similarity search: **focal loss**, **hinge loss**, and **triplet loss**.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "torch.nn.functional.log_softmax",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.log_softmax.html",
            source: "PyTorch documentation",
            note: "Numerically stable log-probability computation using the log-sum-exp shift.",
          },
          {
            label: "torch.nn.functional.cross_entropy",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.cross_entropy.html",
            source: "PyTorch documentation",
            note: "Combines log-softmax and negative log-likelihood directly on raw logits.",
          },
          {
            label: "torch.nn.functional.kl_div",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.kl_div.html",
            source: "PyTorch documentation",
            note: "KL divergence implementation, log-probability input contract, and batchmean reduction.",
          },
          {
            label: "torch.nn.KLDivLoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.KLDivLoss.html",
            source: "PyTorch documentation",
            note: "Module wrapper for pointwise KL divergence and reduction conventions.",
          },
          {
            label: "Why Do Loss Functions Use the Log? (video)",
            href: "https://www.youtube.com/watch?v=Kv6waDvgxcA",
            source: "Brain Link on YouTube",
          },
          {
            label: "Deep Learning Fundamentals playlist",
            href: "https://www.youtube.com/playlist?list=PLX2zaNhVC3Eo",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "loss-functions-mse-mae-cross-entropy",
    title: "Loss Functions: Measuring Model Error",
    dek: "A neural network cannot learn from a prediction that is merely called wrong. Build MSE, MAE, binary cross entropy, and multiclass cross entropy from first principles, then see why PyTorch classification losses take logits directly.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#deep-learning", "#neural-networks", "#machine-learning", "#pytorch", "#nn-module"],
    series: { slug: "deep-learning", title: "Deep Learning", part: 5 },
    coverImage: "/articles/loss-functions-mse-mae-cross-entropy.png",
    body: [
      {
        kind: "paragraph",
        html: 'A support ticket says, "I cannot log into the application." A model could predict how many hours the ticket will take to resolve, whether it is urgent, or which team should handle it. Those are three different questions, so the same prediction error cannot mean the same thing in all three cases.',
      },
      {
        kind: "paragraph",
        html: "A **loss function** takes a model's prediction and the correct target, then returns a single scalar number that measures their disagreement. During training, automatic differentiation works out how that loss number shifts when every weight nudges slightly, and an optimizer updates the parameters in the direction that shrinks it. The loss is not just a grade handed back after the prediction. It defines what the model is actually being asked to improve.",
      },
      {
        kind: "paragraph",
        html: "We will follow the support ticket through three tasks: predicting resolution hours, deciding whether it is urgent, and choosing one team from billing, login, bug, or feature. First, we see why raw signed errors cancel out. Then we build losses tailored to continuous values, yes-or-no probabilities, and competing multiclass choices.",
      },
      {
        kind: "mermaid",
        caption:
          "How one input branches by prediction problem into its loss function, turning each output format into a gradient signal that updates model parameters.",
        code: `flowchart TD
  T["Support ticket features -> Neural network"] --> R["Continuous hours -> MSELoss / L1Loss"]
  T --> B["Urgent (yes/no) logit -> BCEWithLogitsLoss"]
  T --> C["4 team logits -> CrossEntropyLoss"]
  R --> L["Scalar loss score -> Gradients -> Weight updates"]
  B --> L
  C --> L`,
      },
      {
        kind: "heading",
        id: "why-raw-errors-do-not-work",
        text: "Why raw errors do not work",
      },
      {
        kind: "paragraph",
        html: "For a numerical target, call the correct resolution time `y` and the model's prediction `y_hat` (read y-hat). Define the signed error as prediction minus target: `e = y_hat - y`. If the ticket actually takes `30` hours and the model predicts `10`, then `e = 10 - 30 = -20`. The negative sign tells us the prediction came in too low. A prediction of `50` hours gives `e = 50 - 30 = +20`, meaning it came in too high.",
      },
      {
        kind: "paragraph",
        html: "That sign helps identify direction, yet it breaks as soon as we average errors across examples. Averaging `-20` and `+20` produces `(-20 + 20) / 2 = 0.0`. A plain average claims perfection even though both predictions missed by twenty hours! Positive and negative misses cancel out unless every error becomes non-negative before averaging. Squaring (`e^2`) and taking absolute value (`|e|`) are the two standard ways to strip that sign cleanly:",
      },
      {
        kind: "image",
        src: "/articles/raw-error-cancellation.svg",
        alt: "Comparison showing why raw signed errors cancel out while MSE and MAE catch mistakes. On left, errors -20 hours and +20 hours balance to average 0.0. On right, MSE squares them to 400.0 hours squared and MAE averages their magnitudes to 20.0 hours.",
        caption:
          "Averaging raw signed errors hides opposing misses (-20h and +20h balance to 0), whereas squaring or taking absolute values ensures zero loss only occurs when every prediction is exact.",
        width: 800,
        height: 295,
      },
      {
        kind: "heading",
        id: "mean-squared-error",
        text: "Mean squared error makes large misses count more",
      },
      {
        kind: "paragraph",
        html: "**Mean squared error**, or **MSE**, squares each prediction error, sums the squares, and divides by the batch size `N`. Squaring removes negative signs and maps exact predictions (`e = 0`) cleanly to `0`. Across `N` examples indexed by `i`, with target `y_i` and prediction `y_hat_i`:",
      },
      {
        kind: "formula",
        tex: "\\operatorname{MSE} = \\frac{1}{N} \\sum_{i=1}^{N} (\\hat{y}_i - y_i)^2",
        caption: "Mean squared error averages squared prediction errors across N examples.",
      },
      {
        kind: "paragraph",
        html: "Trace three ticket errors: `-2`, `1`, and `3` hours. Squaring turns them into `4`, `1`, and `9`. Summing gives `14`, and dividing by `3` yields an MSE of `14 / 3 ≈ 4.67`. Notice the units as well: if targets sit in hours, MSE sits in hours squared, which drives gradient updates cleanly even though it reads differently from raw hours.",
      },
      {
        kind: "paragraph",
        html: "More importantly, squaring curves upward smoothly on both sides of zero so bigger misses rapidly carry heavier weight. An error of `2` adds `4`, an error of `5` adds `25`, and doubling `5` to `10` quadruples its squared cost from `25` to `100`. Calculus explains why learning reacts proportionally too: the derivative of `e^2` with respect to `e` is `2e`. Twice the error produces twice the slope pushing weights back toward zero (divided by `N` across a batch average):",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Mean squared error curve across negative and positive errors",
        xKey: "error",
        xLabel: "signed prediction error e (y_hat - y)",
        yLabel: "per-example squared error e^2",
        note: "Evaluated for single-example squared error e^2 from e = -5 to +5",
        caption:
          "MSE rises in a smooth symmetric parabola centered at e = 0: small errors near zero feel almost flat slopes (2e), while large errors face steep slopes pushing parameters strongly.",
        series: [{ key: "mse", label: "Squared error: e^2" }],
        data: [
          { error: "-5", mse: 25 },
          { error: "-4", mse: 16 },
          { error: "-3", mse: 9 },
          { error: "-2", mse: 4 },
          { error: "-1", mse: 1 },
          { error: "0", mse: 0 },
          { error: "1", mse: 1 },
          { error: "2", mse: 4 },
          { error: "3", mse: 9 },
          { error: "4", mse: 16 },
          { error: "5", mse: 25 },
        ],
      },
      {
        kind: "paragraph",
        html: "That steep parabolic push helps when large mistakes must dominate training, yet it also hands outliers enormous leverage over a mini-batch. Test five ticket errors in hours: `2`, `-3`, `4`, `-2`, and one `100`-hour extreme miss. The first four squares sum to `4 + 9 + 16 + 4 = 33`, giving a baseline MSE of `33 / 4 = 8.25`. Appending that single outlier adds `100^2 = 10,000`, jumping the batch mean to `10,033 / 5 = 2,006.6` (`243x` larger from one data point!).",
      },
      {
        kind: "heading",
        id: "mean-absolute-error",
        text: "Mean absolute error limits an outlier's influence",
      },
      {
        kind: "paragraph",
        html: "**Mean absolute error**, or **MAE**, strips the sign without amplifying distance. Every error contributes directly in original units: `-5` and `+5` both contribute `5`:",
      },
      {
        kind: "formula",
        tex: "\\operatorname{MAE} = \\frac{1}{N} \\sum_{i=1}^{N} |\\hat{y}_i - y_i|",
        caption:
          "Mean absolute error averages the absolute magnitudes of prediction errors across N examples.",
      },
      {
        kind: "paragraph",
        html: "Check the exact same five errors (`2`, `-3`, `4`, `-2`, `100`). Before the outlier, absolute errors sum to `2 + 3 + 4 + 2 = 11`, giving MAE `11 / 4 = 2.75` hours. Including `100` raises the average linearly to `(11 + 100) / 5 = 22.2` hours (`8.1x` rather than `243x`). Look at the slope to see why MAE resists extreme points: for `|e|`, the derivative away from zero is fixed at `+1` when `e > 0` and `-1` when `e < 0`. Even a `100`-hour error exerts the exact same step-size push (`1/N`) as a `2`-hour error! Right at `e = 0`, the V-shape has a sharp corner with no classical derivative, so automatic differentiation uses a standard subgradient value (`0` by convention at zero).",
      },
      {
        kind: "image",
        src: "/articles/mse-parabola-and-mae-v.svg",
        alt: "Two-panel comparison of MSE and MAE. Left panel plots MSE = e squared as a smooth U-shaped parabola with growing slope 2e beside MAE = |e| as a sharp V-shape with constant slope plus or minus 1 over error -4 to +4. Right panel contrasts batch averages before and after adding a 100-hour outlier: MSE jumps 243 times from 8.25 to 2,006.6 whereas MAE scales linearly 8.1 times from 2.75 to 22.2.",
        caption:
          "Left: comparing loss shapes and slopes side by side across [-4, +4]. Right: one 100-hour outlier dominates MSE quadratically while MAE grows only linearly.",
        width: 800,
        height: 340,
      },
      {
        kind: "table",
        headers: ["Errors included", "MSE", "MAE"],
        rows: [
          ["First four: 2, -3, 4, -2", "8.25", "2.75"],
          ["All five, including 100", "2,006.6", "22.2"],
        ],
        numericColumns: [1, 2],
        caption: "The same extreme miss scales MSE by 243x compared with 8.1x under MAE.",
      },
      {
        kind: "callout",
        title: "Choosing between MSE and MAE",
        body: "Neither loss is universally superior. Pick MSE when missing badly is truly much worse than missing slightly (and clean targets let gradient push taper smoothly to zero near e = 0). Pick MAE when noisy labels or rare wild outliers would otherwise hijack every weight update.",
      },
      {
        kind: "heading",
        id: "binary-cross-entropy",
        text: "Binary cross entropy scores the probability of the true label",
      },
      {
        kind: "paragraph",
        html: 'Now shift the question from "how many hours?" to "is the ticket urgent?" Let the target `y` equal `1` for urgent and `0` for normal, while the model predicts a probability `p` inside `(0, 1)` that the ticket is urgent. Squared error fits badly on probability confidence near the boundary. Instead, cross entropy asks one pointed question: **how much probability `q` did the model place on the answer that actually happened?**',
      },
      {
        kind: "paragraph",
        html: "When the ticket is truly urgent (`y = 1`), the true answer's probability is `q = p`. When it is normal (`y = 0`), the true answer's probability is `q = 1 - p`. Cross entropy turns `q` into a loss with `-ln(q)` (the negative natural logarithm, base `e`). At `q = 1.0`, `-ln(1) = 0`, so confident right answers cost nothing. At `50/50` uncertainty (`q = 0.5`), `-ln(0.5) ≈ 0.693`. Slide `q` down toward `0`, and `-ln(q)` climbs steeply (`2.303` at `0.1`, `4.605` at `0.01`) without any upper ceiling:",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Cross-entropy penalty -ln(q) vs. probability assigned to the true label",
        xKey: "q",
        xLabel: "probability q given to true label",
        yLabel: "loss -ln(q)",
        note: "Computed from q = 0.01 (confident mistake) to q = 1.0 (certain match)",
        caption:
          "Why classifiers strongly avoid overconfident mistakes: dropping true-class probability from 0.9 to 0.5 nudges loss from 0.105 to 0.693, whereas dropping to 0.01 spikes penalty up to 4.605.",
        series: [{ key: "loss", label: "Negative log loss: -ln(q)" }],
        data: [
          { q: "0.01", loss: 4.605 },
          { q: "0.05", loss: 2.996 },
          { q: "0.1", loss: 2.303 },
          { q: "0.2", loss: 1.609 },
          { q: "0.3", loss: 1.204 },
          { q: "0.4", loss: 0.916 },
          { q: "0.5", loss: 0.693 },
          { q: "0.6", loss: 0.511 },
          { q: "0.7", loss: 0.357 },
          { q: "0.8", loss: 0.223 },
          { q: "0.9", loss: 0.105 },
          { q: "1", loss: 0.0 },
        ],
      },
      {
        kind: "paragraph",
        html: "Rather than writing an `if / else` branch to swap between `-ln(p)` and `-ln(1 - p)`, binary cross entropy packs both branches into a smooth algebraic switch controlled by `y`:",
      },
      {
        kind: "formula",
        tex: "L = -\\left[y \\ln(p) + (1-y) \\ln(1-p)\\right]",
        caption:
          "Binary cross entropy uses the binary target y to select the probability of the true answer.",
      },
      {
        kind: "paragraph",
        html: "Plug in `y = 1`: `(1 - y)` equals zero, canceling the right term and leaving `-ln(p)`. Plug in `y = 0`: `y` vanishes, leaving `-ln(1 - p)`. On an urgent ticket predicted with `p = 0.9`, true-label probability is `0.9`, so loss is `0.105`. On a normal ticket with that same urgent probability `p = 0.9`, true-label probability shrinks to `1 - 0.9 = 0.1`, pushing loss up more than twenty-fold to `2.303`:",
      },
      {
        kind: "table",
        headers: ["True label", "Urgent probability p", "Probability of true label", "Loss"],
        rows: [
          ["Urgent (1)", "0.9", "0.9", "0.105"],
          ["Urgent (1)", "0.01", "0.01", "4.605"],
          ["Normal (0)", "0.1", "0.9", "0.105"],
          ["Normal (0)", "0.9", "0.1", "2.303"],
        ],
        numericColumns: [1, 2, 3],
        caption: "Illustrative binary cross-entropy values, rounded to three decimal places.",
      },
      {
        kind: "paragraph",
        html: "Choosing `-ln(q)` is not arbitrary either. Suppose two independent tickets receive true-label probabilities `0.9` and `0.8`: the joint probability of predicting both right is their product `0.9 * 0.8 = 0.72`. Across a thousand tickets, multiplying probabilities underflows near zero. Taking `-ln` converts that product cleanly into a sum of losses (`-(ln 0.9 + ln 0.8) = 0.105 + 0.223 = 0.329`), turning **maximum likelihood estimation** into simple gradient minimization. We will unpack that likelihood and KL-divergence view closely in Part 6.",
      },
      {
        kind: "heading",
        id: "logits-and-numerical-stability",
        text: "Why binary classification should pass logits to the loss",
      },
      {
        kind: "paragraph",
        html: "Recall from [Part 3](/articles/why-relu-replaced-sigmoid) and Part 4 that a classifier's final `Linear` layer emits an unrestricted **logit** `z`, and sigmoid maps it into `(0, 1)` via `p = sigma(z) = 1 / (1 + e^(-z))` (for instance, `z ≈ 2.2` gives `p ≈ 0.9`). Passing logits through sigmoid is perfect for displaying a probability at inference. During training, computing sigmoid first and feeding `p` into a separate log loss breaks at extreme confidence.",
      },
      {
        kind: "paragraph",
        html: "Trace an urgent ticket (`y = 1`) where the model emits a terribly confident wrong logit `z = -1000`. Evaluating `sigmoid(-1000)` in 32-bit floating-point rounds the minuscule probability (`~10^-434`) flatly down to **`0.0`**. Feeding `0.0` into a standalone logarithm produces `ln(0) = -infinity`, so PyTorch's probability-based `nn.BCELoss` clamps its log output at `-100` and reports a capped loss of `100.0` (with zero useful slope left to pull `z` back up!) even though the true mathematical loss is about `1000.0`.",
      },
      {
        kind: "paragraph",
        html: "How does PyTorch avoid both `0.0` underflow AND `e^(+1000)` overflow inside `Softplus`? Substitute `p = 1 / (1 + e^(-z))` directly into `-ln(p)` for `y = 1`: reciprocal turns `-ln(1 / (1 + e^(-z)))` cleanly into `ln(1 + e^(-z)) = softplus(-z)`. Then factor out the larger magnitude cleanly with `softplus(x) = max(x, 0) + ln(1 + e^(-|x|))`. At `z = -1000` (`x = +1000`), that computes `1000 + ln(1 + e^(-1000)) ≈ 1000.0` directly without ever forming `e^(+1000)` or rounding sigmoid to zero:",
      },
      {
        kind: "formula",
        tex: "-\\ln(\\sigma(z)) = \\ln(1 + e^{-z}) = \\max(-z, 0) + \\ln\\!\\left(1 + e^{-|-z|}\\right)",
        caption:
          "Fusing sigmoid with binary cross entropy turns the loss into a shift-safe softplus that stays exact even at z = -1000.",
      },
      {
        kind: "image",
        src: "/articles/bce-stability-logits.svg",
        alt: "Pipeline comparison on urgent ticket y = 1 with logit z = -1000. On top, running sigmoid then BCELoss underflows float32 to zero and clamps the loss at 100.0 with stuck zero gradient. On bottom, BCEWithLogitsLoss evaluates softplus(-z) via max(-z, 0) + ln(1 + e^-|z|) to recover exact loss 1000.0 and healthy training gradients.",
        caption:
          "Why nn.BCEWithLogitsLoss expects raw logits: fusing sigmoid and log-loss algebraically avoids float32 zero-underflow on extreme wrong predictions.",
        width: 800,
        height: 320,
      },
      {
        kind: "paragraph",
        html: "Extending the same identity to both `y = 1` and `y = 0` yields `softplus(z) - y * z` (equivalently `max(z, 0) - z * y + ln(1 + e^(-|z|))`). Give PyTorch's `nn.BCEWithLogitsLoss()` the raw logit `z` during training, and apply `torch.sigmoid(z)` only when inspecting probabilities for decisions or charts.",
      },
      {
        kind: "callout",
        title: "Use probabilities to interpret, logits to train",
        body: "For binary classification, give `BCEWithLogitsLoss` the raw output of the final linear layer. Apply sigmoid when you need probabilities for interpretation. Adding sigmoid before this loss repeats part of its calculation and loses the numerically stable fused path.",
      },
      {
        kind: "heading",
        id: "multiclass-cross-entropy",
        text: "Multiclass cross entropy scores the correct class",
      },
      {
        kind: "paragraph",
        html: "Now move to the third ticket question: choosing **which one** of four mutually exclusive categories handles this issue (`billing`, `login`, `bug`, or `feature`). The final linear layer emits four unbounded logits, say `[1.2, 3.7, 0.4, -0.8]`. Here index `1` (`login`, logit `3.7`) sits highest, yet raw logits can be negative and need not sum to `1`.",
      },
      {
        kind: "paragraph",
        html: "Softmax exponentiates each score `z_k` (`[3.320, 40.447, 1.492, 0.449]`) and divides by their total (`45.709`), turning those four logits into probabilities `[0.073, 0.885, 0.033, 0.010]`. Because the true category is `login` (`0.885`), multiclass cross entropy applies the exact same `-ln(q)` rule to `p_correct`:",
      },
      {
        kind: "formula",
        tex: "p_k = \\frac{e^{z_k}}{\\sum_{j=1}^{C} e^{z_j}}, \\qquad L = -\\ln(p_{\\text{correct}})",
        caption:
          "Softmax turns C logits into competing probabilities summing to 1, then cross entropy scores -ln of the correct class's probability.",
      },
      {
        kind: "paragraph",
        html: "Since `p_login = 0.885`, the ticket's cross-entropy loss is `-ln(0.885) ≈ 0.122`. Just as in the binary case, `0.99` yields `0.010`, `0.5` yields `0.693`, and `0.01` jumps to `4.605`. Binary cross entropy is simply the two-outcome case of the exact same `-ln(probability of truth)` principle.",
      },
      {
        kind: "heading",
        id: "log-softmax-and-nll",
        text: "Log-softmax explains PyTorch's cross-entropy contract",
      },
      {
        kind: "paragraph",
        html: "Look inside `p_k = e^(z_k) / sum_j e^(z_j)` when you take `ln(p_k)`. Division inside a logarithm splits into subtraction, and `ln` cancels `e` in the numerator directly: `ln(p_k) = z_k - ln(sum_j e^(z_j))`. That operation is **log-softmax**. For our login ticket, `ln(45.709) ≈ 3.822`, so `ln(p_login) = 3.7 - 3.822 = -0.122`, and negating it recovers the exact cross-entropy loss `+0.122`.",
      },
      {
        kind: "paragraph",
        html: "In PyTorch, **negative log likelihood loss (`NLLLoss`)** expects those negative log-probabilities directly, indexes out the target class entry, and flips the sign. That makes `nn.CrossEntropyLoss()` strictly equivalent to **`LogSoftmax` + `NLLLoss`** fused cleanly together (using the max-shift trick `m = max(z)` inside `ln(sum e^(z_j - m)) + m` as derived in [Part 4](/articles/gelu-silu-and-softmax) so huge logits never overflow).",
      },
      {
        kind: "paragraph",
        html: "That fused architecture also explains why **never calling Softmax before `nn.CrossEntropyLoss()`** matters so much. Feed `[0.073, 0.885, 0.033, 0.010]` into `CrossEntropyLoss`, and PyTorch normalizes a *second time* inside `(0, 1)`, compressing `p_login` down to `0.437` and reporting a distorted loss of `0.827` (~`0.83`) instead of `0.122`! Raw logits go into `CrossEntropyLoss`:",
      },
      {
        kind: "image",
        src: "/articles/cross-entropy-ticket-flow.svg",
        alt: "Worked multiclass cross-entropy calculation on support-ticket logits [1.2, 3.7, 0.4, -0.8] with correct class login (index 1). Softmax gives [0.073, 0.885, 0.033, 0.010] and LogSoftmax computes 3.7 - 3.822 = -0.122, producing NLL = 0.122, whereas mistakenly passing Softmax probabilities into CrossEntropyLoss squashes p to 0.437 and yields wrong loss 0.827.",
        caption:
          "How the 4-category ticket logits flow into exact loss 0.122 via LogSoftmax + NLLLoss, contrasted with the 0.827 distortion caused by applying Softmax twice.",
        width: 800,
        height: 350,
      },
      {
        kind: "heading",
        id: "loss-functions-in-pytorch",
        text: "Put the right values into each PyTorch loss",
      },
      {
        kind: "paragraph",
        html: "Every PyTorch loss module enforces a strict **model-output and target contract** shaped directly by the prediction task you are solving:",
      },
      {
        kind: "mermaid",
        caption:
          "Decision flow matching each prediction question to its output shape, target type, and standard PyTorch loss module.",
        code: `flowchart TD
  Q["What does this model output predict?"] --> R["Continuous quantity (hours, price)"]
  Q --> B["Binary yes/no decision"]
  Q --> M["1 of C mutually exclusive classes"]
  Q --> N["Already normalized log-probabilities"]

  R --> R1["Linear scalar + float target -> nn.MSELoss() or nn.L1Loss()"]
  B --> B1["1 raw logit + float 0/1 target -> nn.BCEWithLogitsLoss()"]
  M --> M1["C raw logits + integer index target -> nn.CrossEntropyLoss()"]
  N --> N1["LogSoftmax outputs + integer index -> nn.NLLLoss()"]`,
      },
      {
        kind: "table",
        headers: ["PyTorch loss", "Model output", "Target"],
        rows: [
          ["`MSELoss`", "Predicted continuous value", "Floating-point value with matching shape"],
          ["`L1Loss`", "Predicted continuous value", "Floating-point value with matching shape"],
          [
            "`BCEWithLogitsLoss`",
            "One raw logit per binary label",
            "Floating-point 0 or 1, matching shape",
          ],
          ["`CrossEntropyLoss`", "One raw logit per class", "Integer class index"],
          ["`NLLLoss`", "Log-probability per class", "Integer class index"],
        ],
        caption: "The output and target formats are part of each PyTorch loss function's contract.",
      },
      {
        kind: "paragraph",
        html: "Notice how clearly the API names document those contracts: `MSELoss` expects predictions and floating-point targets of matching shape, `L1Loss` is PyTorch's name for MAE, `BCEWithLogitsLoss` explicitly names the raw-logit input, and `CrossEntropyLoss` runs `LogSoftmax + NLLLoss` inside a single logit-taking module (leaving `NLLLoss` for models whose forward pass already returns `LogSoftmax`).",
      },
      {
        kind: "code",
        filename: "loss_contracts.py",
        code: `import torch.nn as nn

# Regression: prediction and floating-point target share a shape
regression_loss = nn.MSELoss()  # or nn.L1Loss()
loss = regression_loss(predicted_hours, target_hours)

# Binary: raw logits and float targets containing 0 or 1
binary_loss = nn.BCEWithLogitsLoss()
loss = binary_loss(urgent_logit, urgent_target)

# Multiclass: raw logits and integer class indices
class_loss = nn.CrossEntropyLoss()
loss = class_loss(category_logits, category_index)`,
      },
      {
        kind: "heading",
        id: "interactive-loss-lab",
        text: "Try changing the errors and logits",
      },
      {
        kind: "paragraph",
        html: "Run this browser-side Python lab using only the standard library. Try switching the final ticket error between `4` and `100` to watch MSE explode while MAE climbs steadily, pass `z = -1000.0` into the stable `softplus` binary form (`1000.000` with zero overflow), and compare correct multiclass cross-entropy (`0.122`) against the double-softmax bug (`0.827`):",
      },
      {
        kind: "code",
        filename: "loss_lab.py",
        runnable: true,
        code: `from math import exp, log, log1p

def softplus(x):
    # Stable form of log(1 + exp(x)) avoiding overflow for large |x|
    return max(x, 0.0) + log1p(exp(-abs(x)))

# Edit this last error to see outlier sensitivity.
errors = [2.0, -3.0, 4.0, -2.0, 100.0]
mse = sum(error * error for error in errors) / len(errors)
mae = sum(abs(error) for error in errors) / len(errors)
print(f"MSE across five tickets: {mse:.2f}")
print(f"MAE across five tickets: {mae:.2f}")

# Binary classification: y=1 means urgent. Try z=-1000.0!
z, y = -2.0, 1.0
binary_loss = softplus(z) - y * z
print(f"Binary loss for logit {z:g}, target {y:g}: {binary_loss:.3f}")

# Multiclass: class 1 (login) is correct. Compare raw logits vs double-softmax mistake.
logits, target = [1.2, 3.7, 0.4, -0.8], 1
largest = max(logits)
exps = [exp(value - largest) for value in logits]
denom = sum(exps)
probs = [e / denom for e in exps]
log_sum_exp = largest + log(denom)
cross_entropy = log_sum_exp - logits[target]

exps2 = [exp(p) for p in probs]
double_softmax_loss = -log(exps2[target] / sum(exps2))
print(f"Login cross-entropy (raw logits):    {cross_entropy:.3f}")
print(f"Double-softmax trap (probs passed):  {double_softmax_loss:.3f}")`,
      },
      {
        kind: "paragraph",
        html: "Every loss function encodes what kinds of mistakes deserve the strongest correction. Squaring amplifies large numerical errors (`slope = 2e`), absolute value paces error linearly (`slope = ±1`), and cross entropy penalizes `-ln(q)` directly against the probability assigned to truth while relying on logit-based PyTorch implementations to preserve gradients cleanly across extreme values.",
      },
      {
        kind: "paragraph",
        html: "Once the prediction task is clear, selecting the starter loss becomes automatic: MSE or MAE for continuous targets, binary cross entropy (`BCEWithLogitsLoss`) for yes-or-no decisions, and multiclass cross entropy (`CrossEntropyLoss`) for one choice among exclusive categories. In [Part 6 of this series](/articles/why-loss-functions-use-the-log-and-kl-divergence), we open the hood on why classification losses use the natural logarithm, how the log-sum-exp trick prevents floating-point overflow, and how KL divergence generalizes cross-entropy to full probability distributions.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "MSELoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html",
            source: "PyTorch documentation",
            note: "Definition, reductions, and input and target shapes.",
          },
          {
            label: "L1Loss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.L1Loss.html",
            source: "PyTorch documentation",
            note: "Absolute-error definition and reduction behavior.",
          },
          {
            label: "BCEWithLogitsLoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html",
            source: "PyTorch documentation",
            note: "Binary cross entropy combined with sigmoid for numerical stability.",
          },
          {
            label: "BCELoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.BCELoss.html",
            source: "PyTorch documentation",
            note: "Probability-based binary cross entropy and its log-output clamp.",
          },
          {
            label: "CrossEntropyLoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html",
            source: "PyTorch documentation",
            note: "Raw logits and class-index targets for multiclass classification.",
          },
          {
            label: "NLLLoss",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.NLLLoss.html",
            source: "PyTorch documentation",
            note: "Negative log likelihood expects log-probabilities.",
          },
        ],
      },
    ],
  },
  {
    slug: "gelu-silu-and-softmax",
    title: "GELU, SiLU, and Softmax: Choosing by Layer",
    dek: "ReLU unlocked deep networks with a sharp corner at zero, yet leaves no middle ground for mildly negative evidence or competing output scores. Derive ELU, GELU, SiLU, Softplus, and Softmax from first principles, and choose the right activation for every layer role.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#deep-learning", "#neural-networks", "#machine-learning", "#pytorch", "#nn-module"],
    series: { slug: "deep-learning", title: "Deep Learning", part: 4 },
    coverImage: "/articles/gelu-silu-and-softmax.png",
    body: [
      {
        kind: "paragraph",
        html: "In [Part 3 of this series](/articles/why-relu-replaced-sigmoid), we saw why **ReLU** (`max(0, x)`) displaced sigmoid and tanh inside deep hidden layers. Holding a slope of `1` across positive inputs keeps backward learning signals alive across depth, while requiring only a single comparison against zero.",
      },
      {
        kind: "paragraph",
        html: "Look closely around zero, however, and ReLU enforces a rigid binary policy. Every negative score collapses cleanly to `0`, every positive score passes unchanged, and right at `x = 0` the curve bends through an abrupt corner where the slope jumps from `0` to `1`. That raises two practical questions: what happens inside hidden layers if we replace that hard cutoff with a **smooth** curve or input-dependent gate, and what happens at the **output layer** when scores must turn into probabilities?",
      },
      {
        kind: "paragraph",
        html: "To answer both cleanly, we split activations by where they sit inside `Linear -> Activation -> ... -> Output`. Inside **hidden layers**, we derive **ELU**, **GELU**, **SiLU (Swish)**, and **Softplus** on the exact same test inputs (`x = +1` and `x = -1`) so every curve and slope sits side by side without black boxes. At the **output layer**, we derive **Softmax** from raw logits, unpack its numerical stability trick and a notorious PyTorch loss trap, and establish one guiding rule for matching every layer to its target range.",
      },
      {
        kind: "video",
        youtubeId: "TG16QLxkAGI",
        title: "How Do You Choose the Right Activation Function? | Ep. 4",
        caption:
          "Watch the companion Brain Link episode comparing ELU, GELU, SiLU, Softplus, and Softmax visually across hidden layers, probability bars, and PyTorch layer choices.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "smooth-negative-elu",
        text: "ELU: smoothing the negative side instead of going flat",
      },
      {
        kind: "paragraph",
        html: "The **Exponential Linear Unit (ELU)**, introduced by Clevert, Unterthiner, and Hochreiter in 2015, keeps ReLU's exact linear highway on the positive side while bending smoothly downward below zero instead of dropping flat:",
      },
      {
        kind: "formula",
        tex: "\\text{ELU}(x) = \\begin{cases} x & \\text{if } x > 0 \\\\ \\alpha(e^x - 1) & \\text{if } x \\le 0 \\end{cases}, \\qquad \\text{ELU}'(x) = \\begin{cases} 1 & \\text{if } x > 0 \\\\ \\alpha e^x & \\text{if } x \\le 0 \\end{cases}",
        caption:
          "ELU formula (left) and derivative slope (right), using Euler's constant e ≈ 2.718 and hyperparameter alpha defaulting to 1.0.",
      },
      {
        kind: "paragraph",
        html: "Look at why the left branch subtracts `1` inside `alpha * (e^x - 1)`. Because `e^0 = 1`, setting `x = 0` yields `alpha * (1 - 1) = 0`, so the negative curve meets the positive line `y = x` seamlessly at `(0, 0)`. Even better, when PyTorch uses its default `alpha = 1.0`, the left-branch derivative `alpha * e^x` evaluates at `x = 0` to `1.0 * e^0 = 1`, matching the positive slope `1` on the nose. Unlike ReLU or Leaky ReLU, `ELU(alpha=1.0)` has **zero kink** in either value or slope at the origin.",
      },
      {
        kind: "paragraph",
        html: "Trace our two benchmark inputs, `x = +1` and `x = -1`, using `alpha = 1.0`:",
      },
      {
        kind: "list",
        items: [
          "**At `x = +1`**: since `x > 0`, ELU acts as the identity, returning `ELU(1) = 1.000` with gradient slope `1.000`.",
          "**At `x = -1`**: since `x <= 0`, `e^(-1) ≈ 0.368`, giving `ELU(-1) = 0.368 - 1 = -0.632` with non-zero gradient slope `0.368`.",
          "**Far left (`x -> -infinity`)**: `e^x -> 0`, so outputs glide gently toward the horizontal floor `-alpha` (`-1.0` when `alpha = 1.0`) rather than plunging linearly forever.",
        ],
      },
      {
        kind: "image",
        src: "/articles/elu-curve-and-slope.svg",
        alt: "Plot of the ELU activation function with alpha = 1.0 compared against a dashed ReLU curve from x = -3.5 to +2.5, highlighting (-1, -0.632), smooth join at (0, 0) with matching slope 1, (+1, 1.000), and the horizontal asymptote at y = -1.0.",
        caption:
          "Visualizing ELU right where it acts: positive inputs follow ReLU seamlessly at slope 1, while negative values bend gently toward -alpha instead of clamping flat at 0.",
        width: 800,
        height: 320,
      },
      {
        kind: "callout",
        title: "Does ELU eliminate negative saturation?",
        body: "Not completely. While small negative inputs near zero preserve healthy gradient slopes (0.607 at x = -0.5 and 0.368 at x = -1), pushing far left reduces alpha * e^x exponentially toward zero (by x = -5, the slope falls to e^(-5) ≈ 0.0067). ELU gives bounded robustness against extreme negative outliers and pulls mean hidden activations closer toward zero, at the trade-off of evaluating an exponential on negative inputs instead of a single max comparison.",
      },
      {
        kind: "heading",
        id: "gaussian-gate-gelu",
        text: "GELU: weighting inputs by a smooth bell-curve gate",
      },
      {
        kind: "paragraph",
        html: "Rather than carving `x <= 0` and `x > 0` with two separate formulas, the **Gaussian Error Linear Unit (GELU)**, introduced by Dan Hendrycks and Kevin Gimpel in 2016, reframes activation as a smooth **probability gate**. Instead of strictly flipping inputs on or off at zero, GELU scales every value `x` by where `x` lands along a standard normal bell curve:",
      },
      {
        kind: "formula",
        tex: "\\text{GELU}(x) = x \\cdot \\Phi(x) = \\frac{x}{2}\\left[1 + \\operatorname{erf}\\!\\left(\\frac{x}{\\sqrt{2}}\\right)\\right]",
        caption:
          "Exact GELU definition multiplying input x by the standard normal cumulative distribution function Phi(x).",
      },
      {
        kind: "paragraph",
        html: "To strip away any mystery from `Phi(x)` (the **standard normal cumulative distribution function**), picture drawing random numbers from a standard bell curve centered at `0` with spread `1`. For any score `x`, `Phi(x)` simply answers: **what fraction of that bell curve falls at or below `x`?** Because total area under the bell curve equals `1`, `Phi(x)` grows smoothly from `0` on the far left to `0.5` at the midpoint `x = 0`, then approaches `1` on the far right.",
      },
      {
        kind: "paragraph",
        html: "Plug in our test points directly from that bell-curve geometry:",
      },
      {
        kind: "list",
        items: [
          "**At `x = 0`**: exact symmetry places half the bell curve to the left, so `Phi(0) = 0.500` and `GELU(0) = 0 * 0.500 = 0.000` (with slope `0.500`).",
          "**At `x = +1`**: one standard deviation above the center covers half the curve below zero plus half of the `68.3%` middle band inside `[-1, +1]`, totaling `50% + 34.1% = 84.1%` (`Phi(1) ≈ 0.841`), so `GELU(1) ≈ 1 * 0.841 = 0.841`. Strongly positive scores stay nearly intact (`GELU(3) ≈ 2.996`), while small positive scores are gently damped.",
          "**At `x = -1`**: by left-right symmetry, only `15.9%` of the curve sits below `-1` (`Phi(-1) = 1 - 0.841 = 0.159`), giving `GELU(-1) ≈ (-1) * 0.159 = -0.159`. Strongly negative inputs get gated close to zero (`GELU(-3) ≈ -0.004`), while mildly negative evidence keeps a soft voice.",
        ],
      },
      {
        kind: "image",
        src: "/articles/gelu-bell-gate-curve.svg",
        alt: "Two-panel diagram of GELU. Left panel shows the standard normal bell curve with cumulative area 0.159 below -1 and 0.841 below +1. Right panel plots GELU(x) across [-3, +3] against dashed ReLU, highlighting the slight negative dip to -0.170 near -0.75 and checkpoint (+1, 0.841).",
        caption:
          "Left: Phi(x) measures how much of a standard normal bell curve falls below x. Right: multiplying x by Phi(x) produces GELU's smooth transition through zero and small negative dip.",
        width: 800,
        height: 335,
      },
      {
        kind: "paragraph",
        html: "One geometric surprise pops out near `-0.75`: because multiplying a small negative `x` by a shrinking positive weight `Phi(x)` briefly drops faster than `Phi(x)` decays, GELU is not strictly monotonic on the left. It dips to a shallow minimum of `-0.170` near `x ≈ -0.752` before returning smoothly toward `0` on the left and climbing through `(0, 0)` on the right, giving a smooth curve that became a common default inside modern Transformer blocks such as BERT and GPT-style feed-forward networks.",
      },
      {
        kind: "formula",
        tex: "\\text{GELU}(x) \\approx \\frac{x}{2}\\left(1 + \\tanh\\!\\left[\\sqrt{\\frac{2}{\\pi}}\\left(x + 0.044715\\,x^3\\right)\\right]\\right)",
        caption:
          "The classic tanh approximation of GELU. Never memorize these constants, and know why this form exists alongside the exact erf formula.",
      },
      {
        kind: "paragraph",
        html: 'If you ever see that `tanh` approximation in a paper or codebase, do not memorize its constants. Early accelerators lacked fast hardware instructions for the Gaussian error function `erf`, so Hendrycks and Gimpel fitted a fast `tanh` polynomial that matches exact GELU to within roughly `0.0004` across `[-3, 3]`. In modern PyTorch, calling `nn.GELU()` uses the exact `erf` form (`approximate="none"`) by default, while passing `approximate="tanh"` switches to the classic approximation if you explicitly need parity with an older checkpoint.',
      },
      {
        kind: "heading",
        id: "self-gating-silu",
        text: "SiLU (Swish): self-gating with the sigmoid you already know",
      },
      {
        kind: "paragraph",
        html: "What happens if you keep GELU's exact multiplicative gating idea (`x * gate`), yet build the gate out of the ordinary logistic sigmoid `sigma(x) = 1 / (1 + e^(-x))` from [Part 3](/articles/why-relu-replaced-sigmoid) instead of a Gaussian bell curve? You get **SiLU**, the **Sigmoid-Weighted Linear Unit**, also widely known as **Swish**:",
      },
      {
        kind: "formula",
        tex: "\\text{SiLU}(x) = x \\cdot \\sigma(x) = \\frac{x}{1 + e^{-x}}",
        caption:
          "SiLU (Swish) multiplies x by its own logistic sigmoid gate sigma(x), producing a smooth self-gated activation.",
      },
      {
        kind: "paragraph",
        html: "Trace that mechanism as a two-branch circuit: input `x` splits down two parallel wires. The top wire passes `x` through `sigma(x)` to produce a smooth valve value strictly inside `(0, 1)`. The bottom wire carries raw `x` untouched. Multiplication then joins the two wires back together. Because `x` opens or closes the gate that multiplies `x` itself, engineers describe SiLU as **self-gated**. Notice the dual history in the literature too: Elfwing, Uchibe, and Doya introduced it under the name **SiLU** in 2017, and Ramachandran, Zoph, and Le popularized the same form (`x * sigma(beta * x)` with default `beta = 1`) after automated architecture search under the name **Swish**.",
      },
      {
        kind: "list",
        items: [
          "**At `x = +1`**: earlier we saw `sigma(1) = 1 / (1 + e^(-1)) ≈ 0.731`, so `SiLU(1) ≈ 1 * 0.731 = 0.731` (slope `≈ 0.928`). Because sigmoid approaches `1` more gradually than `Phi(x)`, SiLU damps `x = +1` a little more strongly than GELU's `0.841`.",
          "**At `x = 0`**: `sigma(0) = 0.500`, so `SiLU(0) = 0.000` with slope `0.500`, matching GELU right through the origin.",
          "**At `x = -1`**: `sigma(-1) = 1 - 0.731 = 0.269`, giving `SiLU(-1) ≈ (-1) * 0.269 = -0.269`. SiLU's negative pocket dips slightly deeper (reaching `-0.278` near `x ≈ -1.278`) before approaching `0` on the far left.",
        ],
      },
      {
        kind: "image",
        src: "/articles/silu-self-gate-curve.svg",
        alt: "Two-panel diagram of SiLU (Swish). Left panel draws the two-branch circuit where x computes a sigmoid gate sigma(x) and multiplies raw x to form SiLU(x). Right panel plots SiLU(x) across [-3, +3] against dashed ReLU, highlighting (-1.28, -0.278) minimum dip and (+1, 0.731).",
        caption:
          "Left: the two-branch self-gating circuit where x controls its own sigmoid valve sigma(x). Right: the resulting SiLU curve with a slightly deeper negative pocket than GELU.",
        width: 800,
        height: 335,
      },
      {
        kind: "paragraph",
        html: "Many recent Transformer architectures (including several open-weight language models following Shazeer, 2020) build their feed-forward blocks around a two-projection cousin called **SwiGLU**, which gates one linear projection using `SiLU` applied to a *separate* learned projection (`SiLU(x W_gate) * (x W_up)`). Full Transformer block dimensions belong to a dedicated architecture lesson later on, yet seeing `SiLU` here already makes every piece of that name click.",
      },
      {
        kind: "heading",
        id: "comparing-hidden-activations",
        text: "Comparing ReLU, ELU, GELU, and SiLU: evolution, not strict replacement",
      },
      {
        kind: "paragraph",
        html: "Plotting the activation values alongside their exact derivatives across `x` in `[-3, 3]` makes clear what smoothing around zero changes and what stays invariant:",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Hidden-layer activation curves across x = -3 to +3",
        xKey: "x",
        xLabel: "Input x",
        yLabel: "Output f(x)",
        note: "ELU shown with default alpha = 1.0, and GELU uses exact erf",
        caption:
          "ReLU snaps hard onto y = 0 for all x <= 0. ELU drops smoothly toward -1.0, while GELU and SiLU dip briefly negative near zero before fading back toward 0 on the left.",
        series: [
          { key: "relu", label: "ReLU" },
          { key: "elu", label: "ELU (alpha = 1)" },
          { key: "gelu", label: "GELU" },
          { key: "silu", label: "SiLU (Swish)" },
        ],
        data: [
          { x: "-3", relu: 0.0, elu: -0.95, gelu: -0.004, silu: -0.142 },
          { x: "-2.5", relu: 0.0, elu: -0.918, gelu: -0.016, silu: -0.19 },
          { x: "-2", relu: 0.0, elu: -0.865, gelu: -0.046, silu: -0.238 },
          { x: "-1.5", relu: 0.0, elu: -0.777, gelu: -0.1, silu: -0.274 },
          { x: "-1", relu: 0.0, elu: -0.632, gelu: -0.159, silu: -0.269 },
          { x: "-0.5", relu: 0.0, elu: -0.393, gelu: -0.154, silu: -0.189 },
          { x: "0", relu: 0.0, elu: 0.0, gelu: 0.0, silu: 0.0 },
          { x: "0.5", relu: 0.5, elu: 0.5, gelu: 0.346, silu: 0.311 },
          { x: "1", relu: 1.0, elu: 1.0, gelu: 0.841, silu: 0.731 },
          { x: "1.5", relu: 1.5, elu: 1.5, gelu: 1.4, silu: 1.226 },
          { x: "2", relu: 2.0, elu: 2.0, gelu: 1.954, silu: 1.762 },
          { x: "2.5", relu: 2.5, elu: 2.5, gelu: 2.484, silu: 2.31 },
          { x: "3", relu: 3.0, elu: 3.0, gelu: 2.996, silu: 2.858 },
        ],
      },
      {
        kind: "figure",
        variant: "line",
        title: "Derivative slopes across x = -3 to +3",
        xKey: "x",
        xLabel: "Input x",
        yLabel: "Slope f'(x)",
        note: "Negative slopes on GELU and SiLU reflect their slight non-monotonic dip left of zero",
        caption:
          "ReLU jumps discontinuously from 0 to 1 at the origin. ELU rises continuously to 1 at zero when alpha = 1, while GELU and SiLU pass smoothly through slope 0.5 at x = 0.",
        series: [
          { key: "relu", label: "ReLU slope" },
          { key: "elu", label: "ELU slope" },
          { key: "gelu", label: "GELU slope" },
          { key: "silu", label: "SiLU slope" },
        ],
        data: [
          { x: "-3", relu: 0.0, elu: 0.05, gelu: -0.012, silu: -0.088 },
          { x: "-2.5", relu: 0.0, elu: 0.082, gelu: -0.038, silu: -0.099 },
          { x: "-2", relu: 0.0, elu: 0.135, gelu: -0.085, silu: -0.091 },
          { x: "-1.5", relu: 0.0, elu: 0.223, gelu: -0.127, silu: -0.041 },
          { x: "-1", relu: 0.0, elu: 0.368, gelu: -0.083, silu: 0.072 },
          { x: "-0.5", relu: 0.0, elu: 0.607, gelu: 0.133, silu: 0.26 },
          { x: "0", relu: 0.0, elu: 1.0, gelu: 0.5, silu: 0.5 },
          { x: "0.5", relu: 1.0, elu: 1.0, gelu: 0.867, silu: 0.74 },
          { x: "1", relu: 1.0, elu: 1.0, gelu: 1.083, silu: 0.928 },
          { x: "1.5", relu: 1.0, elu: 1.0, gelu: 1.127, silu: 1.041 },
          { x: "2", relu: 1.0, elu: 1.0, gelu: 1.085, silu: 1.091 },
          { x: "2.5", relu: 1.0, elu: 1.0, gelu: 1.038, silu: 1.099 },
          { x: "3", relu: 1.0, elu: 1.0, gelu: 1.012, silu: 1.088 },
        ],
      },
      {
        kind: "paragraph",
        html: "Think of the arc across Sigmoid and Tanh -> ReLU -> Leaky ReLU and ELU -> GELU and SiLU as a story of **problem -> trade-off -> design evolution**, *not* a strict historical replacement chain where every newcomer obsoletes the previous one. ReLU remains widely used across convolutional networks, tabular MLPs, and latency-critical edge models precisely because comparing against zero is nearly free in hardware. Meanwhile, **many modern Transformers** choose GELU or SiLU where smoother gating around zero helps gradient optimization.",
      },
      {
        kind: "heading",
        id: "softplus-smooth-relu",
        text: "Softplus: the always-positive smooth twin of ReLU",
      },
      {
        kind: "paragraph",
        html: "One more hidden-style curve belongs in your toolkit because it pops up whenever an output quantity **must stay strictly positive** rather than merely nonlinear. The **Softplus** function is defined using the natural logarithm (`ln`, base `e`):",
      },
      {
        kind: "formula",
        tex: "\\text{Softplus}(x) = \\ln(1 + e^x), \\qquad \\text{Softplus}'(x) = \\frac{e^x}{1 + e^x} = \\sigma(x)",
        caption:
          "Softplus formula on the left and its derivative on the right, which reduces algebraically to the logistic sigmoid.",
      },
      {
        kind: "paragraph",
        html: "Read why Softplus hugs ReLU closely at both tails directly from the algebra. When `x` is large and positive (say `x = +3`), `e^3 ≈ 20.086` dominates `1`, so `ln(1 + 20.086) = 3.049` tracks `y = x` smoothly from just above. When `x` is strongly negative (say `x = -3`), `e^(-3) ≈ 0.050` is tiny, so `ln(1.050) ≈ 0.049` glides gently toward `0` without ever touching zero or going negative. Right at `x = 0`, `e^0 = 1`, giving `Softplus(0) = ln(2) ≈ 0.693`. And differentiating `ln(1 + e^x)` gives `e^x / (1 + e^x)`, and dividing both numerator and denominator by `e^x` turns it into `1 / (e^(-x) + 1) = sigma(x)`, rising smoothly from `0` to `1`!",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Softplus vs. ReLU across x = -3 to +3",
        xKey: "x",
        xLabel: "Input x",
        yLabel: "Output f(x)",
        note: "Softplus crosses x = 0 at ln(2) ≈ 0.693 and stays strictly positive everywhere",
        caption:
          "Softplus tracks ReLU asymptotically on both sides while removing the corner at zero and keeping all outputs strictly above 0.",
        series: [
          { key: "relu", label: "ReLU" },
          { key: "softplus", label: "Softplus" },
        ],
        data: [
          { x: "-3", relu: 0.0, softplus: 0.049 },
          { x: "-2.5", relu: 0.0, softplus: 0.079 },
          { x: "-2", relu: 0.0, softplus: 0.127 },
          { x: "-1.5", relu: 0.0, softplus: 0.201 },
          { x: "-1", relu: 0.0, softplus: 0.313 },
          { x: "-0.5", relu: 0.0, softplus: 0.474 },
          { x: "0", relu: 0.0, softplus: 0.693 },
          { x: "0.5", relu: 0.5, softplus: 0.974 },
          { x: "1", relu: 1.0, softplus: 1.313 },
          { x: "1.5", relu: 1.5, softplus: 1.701 },
          { x: "2", relu: 2.0, softplus: 2.127 },
          { x: "2.5", relu: 2.5, softplus: 2.579 },
          { x: "3", relu: 3.0, softplus: 3.049 },
        ],
      },
      {
        kind: "paragraph",
        html: "Why do most hidden layers still prefer ReLU, GELU, or SiLU over Softplus? First, Softplus demands both an exponential and a logarithm (`exp + log`), making it heavier per neuron than ReLU's single max comparison (and in PyTorch, `nn.Softplus(beta=1, threshold=20)` quietly returns `x` once `beta * x > threshold` to prevent `e^x` overflow). Second, Softplus shifts outputs upward by `0.693` at `x = 0` and stays non-zero everywhere, forfeiting ReLU's clean zero sparsity. Where Softplus truly shines is on specialized outputs that must be smoothly positive without zero plateaus, such as predicted standard deviations (`sigma > 0`), variances, or event rates.",
      },
      {
        kind: "table",
        headers: ["Activation", "f(+1)", "f(-1)", "f'(+1)", "f'(-1)", "Primary trade-off"],
        numericColumns: [1, 2, 3, 4],
        rows: [
          [
            "**ReLU**",
            "1.000",
            "0.000",
            "1.000",
            "0.000",
            "Fastest compute and exact zero sparsity, sharp corner at 0, can suffer dead units",
          ],
          [
            "**ELU (alpha = 1)**",
            "1.000",
            "-0.632",
            "1.000",
            "0.368",
            "Smooth match at 0 and bounded -alpha tail, still saturates far left, uses exp",
          ],
          [
            "**GELU**",
            "0.841",
            "-0.159",
            "1.083",
            "-0.083",
            "Smooth bell-curve gate common in Transformers, higher compute cost than ReLU",
          ],
          [
            "**SiLU (Swish)**",
            "0.731",
            "-0.269",
            "0.928",
            "0.072",
            "Smooth sigmoid self-gate with slightly deeper negative dip, uses sigmoid and multiply",
          ],
          [
            "**Softplus**",
            "1.313",
            "0.313",
            "0.731",
            "0.269",
            "Always positive and smooth everywhere (slope = sigmoid), exp + log overhead",
          ],
        ],
        caption:
          "Exact values and local slopes evaluated at x = +1 and x = -1 across the five continuous hidden-style activations.",
      },
      {
        kind: "heading",
        id: "softmax-output-probabilities",
        text: "Softmax: turning output logits into competing probabilities",
      },
      {
        kind: "paragraph",
        html: "Notice something shared by all five functions above: every single one runs **neuron by neuron** on each number independently. At the **output layer** of a multiclass classifier (`cat` vs. `dog` vs. `bird`), that independence breaks down. When an example must belong to one mutually exclusive category, boosting the `cat` score has to pull down the share of probability left for `dog` and `bird`.",
      },
      {
        kind: "paragraph",
        html: "Recall from Part 1 and [Part 2](/articles/neural-network-parameters-and-flops) that a classifier's final `Linear` layer outputs unconstrained raw numbers called **logits** (`z_1, ..., z_C`). Why can we not simply divide each raw logit `z_i` by `sum(z_j)` to form percentages? Because logits can easily be negative (`-1.5`), or sum right to `0.0`, producing nonsensical negative probabilities or dividing by zero.",
      },
      {
        kind: "paragraph",
        html: "**Softmax** fixes both problems cleanly in two steps:",
      },
      {
        kind: "formula",
        tex: "p_i = \\frac{e^{z_i}}{\\sum_{j=1}^{C} e^{z_j}}, \\qquad 0 < p_i < 1, \\quad \\sum_{i=1}^{C} p_i = 1",
        caption:
          "Softmax first exponentiates every logit z_i to make every term strictly positive, then divides by the total across all C classes.",
      },
      {
        kind: "paragraph",
        html: "Step 1 passes each logit through `e^(z_i)`. No matter whether `z_i` is `+50`, `0`, or `-50`, `e^(z_i)` is always **strictly positive** (`> 0`), preserves rank order (`cat` still beats `dog`), and amplifies differences smoothly. Step 2 divides each positive score by the sum across all classes. Every resulting probability sits cleanly inside `(0, 1)`, and the probabilities across all classes sum strictly to `1`.",
      },
      {
        kind: "paragraph",
        html: "Walk through a concrete 3-class example with logits `[cat: 2.0, dog: 1.0, bird: 0.1]`: taking exponentials produces `[e^2.0 ≈ 7.389, e^1.0 ≈ 2.718, e^0.1 ≈ 1.105]`, whose denominator sum is `11.213`. Dividing each entry by `11.213` yields `[0.659, 0.242, 0.099]`, meaning `cat` carries `65.9%`, `dog` carries `24.2%`, and `bird` carries `9.9%`. Now keep `dog = 1.0` and `bird = 0.1` completely frozen and increase only `cat` from `2.0` to `3.0`: `e^3.0 ≈ 20.086` pushes the shared denominator to `23.909`, lifting `cat` to `0.840` while automatically pushing `dog` down to `0.114` and `bird` down to `0.046`.",
      },
      {
        kind: "image",
        src: "/articles/softmax-competition.svg",
        alt: "Worked Softmax example showing logits [cat: 2.0, dog: 1.0, bird: 0.1] normalizing via denominator 11.213 to probabilities [0.659, 0.242, 0.099], and changing only the cat logit to 3.0 raising the denominator to 23.909 so cat jumps to 0.840 while dog and bird fall to 0.114 and 0.046.",
        caption:
          "Because every class divides by the same sum of exponentials, Softmax couples the entire output layer: changing a single logit shifts every class probability.",
      },
      {
        kind: "callout",
        title: "Why real implementations subtract max(z) first",
        body: "What happens if logits reach `[1002.0, 1001.0, 1000.1]`? Computing `exp(1002)` overflows 64-bit floating point to infinity, turning `infinity / infinity` into `NaN`. Fortunately, subtracting the largest logit `m = max(z)` leaves every probability identical because `e^(z_i - m) / sum e^(z_j - m)` equals `(e^(-m) * e^(z_i)) / (e^(-m) * sum e^(z_j))`, so the shared `e^(-m)` factor cancels cleanly! That shifts `[1002.0, 1001.0, 1000.1]` to `[0.0, -1.0, -1.9]`, keeping the largest exponent at `e^0 = 1.0` and preventing overflow completely.",
      },
      {
        kind: "heading",
        id: "pytorch-activations-and-crossentropy",
        text: "Using modern activations and Softmax safely in PyTorch",
      },
      {
        kind: "paragraph",
        html: "All five functions live directly in `torch.nn` as zero-parameter modules (`nn.ELU(alpha=1.0)`, `nn.GELU()`, `nn.SiLU()`, `nn.Softplus()`, and `nn.Softmax(dim=-1)`). Pay close attention to `dim=-1` on Softmax. In real batches of shape `(batch_size, num_classes)` such as `(32, 10)`, axis `0` runs across the `32` separate examples in the batch, while axis `-1` (the trailing class axis) normalizes across the `10` class scores of each individual example so every row sums to `1`.",
      },
      {
        kind: "paragraph",
        html: "Just as with binary `BCEWithLogitsLoss()` in Part 3, **never apply `nn.Softmax` inside your training forward pass if you train with `nn.CrossEntropyLoss()`**. Inside `CrossEntropyLoss`, PyTorch automatically computes a numerically fused `log_softmax` followed by negative log-likelihood loss. Feeding already-normalized `probs = torch.softmax(logits, dim=-1)` into `CrossEntropyLoss` runs Softmax a **second time** on numbers squeezed inside `(0, 1)`!",
      },
      {
        kind: "paragraph",
        html: "Check the exact arithmetic damage of that double-Softmax bug on our `3`-class example: even if raw logits `[10, 0, 0]` give `p_cat = 0.99991`, squishing `[0.99991, 0.00005, 0.00005]` through Softmax again caps top confidence near `e^1 / (e^1 + 2 e^0) ≈ 0.5761` and locks cross-entropy loss at a floor of `0.5515` instead of letting it drop toward `0`. Pass **raw logits** into `nn.CrossEntropyLoss()`, and call `torch.softmax(logits, dim=-1)` only when reading out predicted probabilities at inference:",
      },
      {
        kind: "code",
        filename: "modern_classifier_and_loss.py",
        code: `import torch
import torch.nn as nn

# Hidden activations swap cleanly in the same 1,994-parameter architecture from Parts 2 & 3
for act in (nn.ELU(alpha=1.0), nn.GELU(), nn.SiLU()):
    model = nn.Sequential(
        nn.Linear(20, 64),
        act,
        nn.Linear(64, 10),  # 10 raw logits out, NO Softmax inside the training head
    )
    print(f"{act.__class__.__name__:5s} -> {sum(p.numel() for p in model.parameters())} params")

logits = torch.tensor([[2.0, 1.0, 0.1]])
targets = torch.tensor([0])  # true class is index 0 (cat)

criterion = nn.CrossEntropyLoss()
loss = criterion(logits, targets)  # computes fused log_softmax + NLL internally

# Need human-readable probabilities at evaluation or inference? Apply softmax outside the loss:
with torch.no_grad():
    probs = torch.softmax(logits, dim=-1)
print("Inference probs:", probs.squeeze(0).tolist())  # [0.659..., 0.242..., 0.098...]`,
      },
      {
        kind: "paragraph",
        html: "Run the pure-Python experiment below directly in your browser to inspect every activation value and local derivative side by side (including extreme values like `1000.0` or `-1000.0` without overflow), watch Softmax couple `[cat, dog, bird]` probabilities when `cat` jumps from `2.0` to `3.0`, verify `max`-shift stability on huge logits, and measure the double-Softmax cross-entropy ceiling:",
      },
      {
        kind: "code",
        filename: "activation_gate_and_softmax_lab.py",
        runnable: true,
        code: `import math

def sigmoid(x):
    if x >= 0.0:
        return 1.0 / (1.0 + math.exp(-x))
    ez = math.exp(x)
    return ez / (1.0 + ez)

def softplus(x):
    return max(x, 0.0) + math.log1p(math.exp(-abs(x)))

def normal_cdf(x):
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))

def inspect_hidden(x):
    relu_v, relu_g = (x, 1.0) if x > 0.0 else (0.0, 0.0)
    elu_v, elu_g = (x, 1.0) if x > 0.0 else (math.expm1(x), math.exp(x))
    phi = normal_cdf(x)
    pdf = math.exp(-0.5 * x * x) / math.sqrt(2.0 * math.pi)
    gelu_v, gelu_g = x * phi, phi + x * pdf
    s = sigmoid(x)
    silu_v, silu_g = x * s, s + x * s * (1.0 - s)
    sp_v, sp_g = softplus(x), s

    print(f"--- x = {x:+.1f} ---")
    for name, val, slope in (
        ("ReLU", relu_v, relu_g),
        ("ELU", elu_v, elu_g),
        ("GELU", gelu_v, gelu_g),
        ("SiLU", silu_v, silu_g),
        ("Softplus", sp_v, sp_g),
    ):
        print(f"  {name:8s} out={val:7.4f}  slope={slope:7.4f}")

def stable_softmax(logits):
    top = max(logits)
    exps = [math.exp(z - top) for z in logits]
    denom = sum(exps)
    return [e / denom for e in exps]

for x in (1.0, -1.0):
    inspect_hidden(x)
    print()

base = [2.0, 1.0, 0.1]
raised = [3.0, 1.0, 0.1]
huge = [1002.0, 1001.0, 1000.1]

print("Softmax [2.0, 1.0, 0.1]       ->", [round(p, 3) for p in stable_softmax(base)])
print("Softmax [3.0, 1.0, 0.1]       ->", [round(p, 3) for p in stable_softmax(raised)])
print("Softmax [1002, 1001, 1000.1]  ->", [round(p, 3) for p in stable_softmax(huge)])

# Double-softmax bug check on confident raw logits [10, 0, 0] for class 0
confident_logits = [10.0, 0.0, 0.0]
raw_probs = stable_softmax(confident_logits)
double_probs = stable_softmax(raw_probs)
print(f"Correct CE loss(raw logits)   = {-math.log(raw_probs[0]):.4f} (p={raw_probs[0]:.4f})")
print(f"Double-Softmax CE loss        = {-math.log(double_probs[0]):.4f} (capped p={double_probs[0]:.4f})")`,
      },
      {
        kind: "heading",
        id: "choosing-by-layer-position",
        text: "Choosing an activation by layer position",
      },
      {
        kind: "paragraph",
        html: "Instead of memorizing long rulebooks, anchor every design choice in one single question: **what range and behavior should this layer's output have?** Tracing where the layer sits inside the network gives the answer immediately:",
      },
      {
        kind: "mermaid",
        code: `flowchart TD
  Q["What layer am I placing?"] --> H["Hidden layer (intermediate features)"]
  Q --> B["Binary output (2 mutually exclusive labels)"]
  Q --> M["Multiclass output (C mutually exclusive classes)"]
  Q --> R["Regression output (continuous target like -100 or 1000)"]

  H --> H1["Use ReLU, Leaky ReLU, GELU, or SiLU for nonlinearity and clean gradient flow"]
  B --> B1["1 raw logit -> BCEWithLogitsLoss in training (sigmoid at inference)"]
  M --> M1["C raw logits -> CrossEntropyLoss in training (softmax at inference)"]
  R --> R1["Linear layer only, no activation (or Softplus if strictly positive)"]`,
        caption:
          "Layer-position decision map showing why hidden activations aim for learnable representations while output heads match the numerical range of the prediction target.",
      },
      {
        kind: "list",
        items: [
          "**Hidden layers**: pick `ReLU`, `Leaky ReLU`, `GELU`, or `SiLU`. Their job is breaking linear collapse and transmitting gradients backward across depth, not shaping final predictions.",
          "**Binary classification output**: emit `1` raw logit per sample and train with `nn.BCEWithLogitsLoss()`, keeping sigmoid conceptually for turning that logit into a `(0, 1)` positive probability at inference.",
          "**Multiclass mutually exclusive output**: emit `C` raw logits and train with `nn.CrossEntropyLoss()`, keeping `torch.softmax(logits, dim=-1)` for probability readouts at inference. (If multiple tags can be true simultaneously rather than competing, treat each tag as its own binary logit with `BCEWithLogitsLoss` rather than Softmax.)",
          "**Continuous regression output**: leave the final `Linear` layer completely bare with **no activation function** when targets span arbitrary numbers like `-100`, `0`, `25`, or `1,000`, so `Sigmoid`, `Tanh`, or `ReLU` never clip valid values. Use `Softplus` only when modeling a positive-only continuous scale such as standard deviation.",
        ],
      },
      {
        kind: "table",
        headers: [
          "Layer position",
          "Typical output",
          "PyTorch training loss / activation",
          "Inference interpretation",
        ],
        rows: [
          [
            "**Hidden layer**",
            "`d_hidden` feature vector",
            "`nn.ReLU()`, `nn.GELU()`, `nn.SiLU()`, `nn.LeakyReLU()`",
            "Feeds next linear transformation",
          ],
          [
            "**Binary output**",
            "`1` raw logit",
            "`nn.BCEWithLogitsLoss()` on raw logit",
            "`torch.sigmoid(logit)` in `(0, 1)`",
          ],
          [
            "**Multiclass output**",
            "`C` raw logits",
            "`nn.CrossEntropyLoss()` on raw logits",
            "`torch.softmax(logits, dim=-1)` summing to `1`",
          ],
          [
            "**Regression output**",
            "`1` or `k` scalars",
            "No output activation (`nn.MSELoss()` / `nn.L1Loss()`)",
            "Direct unbounded numerical prediction",
          ],
        ],
        caption:
          "Practical pairing of network layer role, training objective, and inference conversion across standard deep learning tasks.",
      },
      {
        kind: "video",
        youtubeId: "TG16QLxkAGI",
        title: "How Do You Choose the Right Activation Function? | Ep. 4",
        caption:
          "Watch the full Brain Link walkthrough tracing ELU, GELU, SiLU, Softplus, live Softmax probability bars, and the layer-by-layer selection rule.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "Stepping back across Part 3 and this guide, an activation function is never mere decoration dropped between weight matrices. Paired with a `Linear` layer's weighted evidence, hidden activations create nonlinear features while shaping local derivatives, and gradients flow through those slopes to govern how well weights actually learn, while output heads shape logits into the target space the task requires. What turns those logits, probabilities, or scalar predictions into a training update is measuring exactly how wrong they are, which brings us next to [Part 5 of this series](/articles/loss-functions-mse-mae-cross-entropy).",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Fast and Accurate Deep Network Learning by Exponential Linear Units (ELUs)",
            href: "https://arxiv.org/abs/1511.07289",
            source: "Djork-Arne Clevert, Thomas Unterthiner, and Sepp Hochreiter (2015)",
            note: "Introduces ELU for smooth negative activations and reduced bias shift toward zero.",
          },
          {
            label: "Gaussian Error Linear Units (GELUs)",
            href: "https://arxiv.org/abs/1606.08415",
            source: "Dan Hendrycks and Kevin Gimpel (2016)",
            note: "Derives x * Phi(x) alongside the polynomial tanh approximation used across Transformer models.",
          },
          {
            label:
              "Sigmoid-Weighted Linear Units for Neural Network Function Approximation in Reinforcement Learning",
            href: "https://arxiv.org/abs/1702.03118",
            source: "Stefan Elfwing, Eiji Uchibe, and Kenji Doya (2017)",
            note: "Defines SiLU as x * sigmoid(x) and analyzes its smooth gradient and negative minimum.",
          },
          {
            label: "Searching for Activation Functions",
            href: "https://arxiv.org/abs/1710.05941",
            source: "Prajit Ramachandran, Barret Zoph, and Quoc V. Le (2017)",
            note: "Popularizes Swish (x * sigmoid(beta * x)) via neural architecture search across vision and language tasks.",
          },
          {
            label: "GLU Variants Improve Transformer",
            href: "https://arxiv.org/abs/2002.05202",
            source: "Noam Shazeer (2020)",
            note: "Introduces SwiGLU feed-forward gating built from separate learned projections gated by Swish/SiLU.",
          },
          {
            label: "torch.nn.ELU, nn.GELU, nn.SiLU, and nn.Softplus documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.GELU.html",
            source: "PyTorch documentation",
            note: "Documents default approximate='none' vs 'tanh' for GELU alongside sibling zero-parameter activation modules.",
          },
          {
            label: "torch.nn.Softmax and nn.CrossEntropyLoss documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html",
            source: "PyTorch documentation",
            note: "Specifies raw logit inputs for CrossEntropyLoss via fused log-softmax and negative log likelihood.",
          },
          {
            label: "How Do You Choose the Right Activation Function? (video)",
            href: "https://www.youtube.com/watch?v=TG16QLxkAGI",
            source: "Brain Link on YouTube",
          },
          {
            label: "Deep Learning Fundamentals playlist",
            href: "https://www.youtube.com/playlist?list=PLX2zaNhVC3Eo",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "why-relu-replaced-sigmoid",
    title: "Activation Functions: Why ReLU Replaced Sigmoid",
    dek: "Sigmoid and tanh look smooth and well-behaved until their tails flatten out and choke deep training signals. Derive every curve, slope, and derivative behind sigmoid, tanh, ReLU, and Leaky ReLU to see why modern networks switched.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#deep-learning", "#neural-networks", "#machine-learning", "#pytorch", "#nn-module"],
    series: { slug: "deep-learning", title: "Deep Learning", part: 3 },
    coverImage: "/articles/why-relu-replaced-sigmoid.png",
    body: [
      {
        kind: "paragraph",
        html: "In [Part 2 of this series](/articles/neural-network-parameters-and-flops), our three-step classifier (`Linear(20, 64) -> ReLU -> Linear(64, 10)`) held `1,994` trainable parameters, and every single one of them lived inside the two `Linear` layers. `nn.ReLU()` added **zero** weights and biases.",
      },
      {
        kind: "paragraph",
        html: "Yet deleting that zero-parameter layer collapses the entire stack. Two linear layers composed without a nonlinear activation fold algebraically into a single flat affine step (`W2(W1 x + b1) + b2 = (W2 W1) x + (W2 b1 + b2) = W_eff x + b_eff`), leaving a multi-layer network no more expressive than one neuron's straight boundary from [Part 1](/articles/from-one-neuron-to-neural-networks). Even once you commit to adding an activation function, though, *which* curve you pick decides whether a deep network actually learns or stalls out.",
      },
      {
        kind: "paragraph",
        html: "For decades, neural networks defaulted to a smooth S-shaped curve called the **sigmoid**. Modern networks almost universally default to the sharp-cornered **ReLU** in hidden layers instead. Understanding that shift comes down to one physical quantity: the **slope** of each activation curve.",
      },
      {
        kind: "video",
        youtubeId: "ZGIVMKvQ5Cg",
        title: "Why Neural Networks Need Activation Functions",
        caption:
          "Watch the companion Brain Link episode comparing sigmoid, tanh, ReLU, and Leaky ReLU visually through tangent slopes moving across each curve and multiplying backward through depth.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "why-slopes-matter",
        text: "What an activation does to learning signals",
      },
      {
        kind: "paragraph",
        html: "A neuron begins by computing an affine score `z = w^T x + b` (the dot product of its weight row `w` and input vector `x`, shifted by bias `b`), then passes that raw number through an element-wise activation function `f(z)`. Think of `f` as doing two coupled jobs. Forward, it bends straight weighted sums so stacked layers can carve curved boundaries. Backward during training, its curve governs how much **sensitivity** passes back to earlier weights.",
      },
      {
        kind: "paragraph",
        html: "To see why without getting ahead of full backpropagation calculus, follow the question training must answer right after checking the final prediction error (**loss**): if an early weight nudges slightly, how much does that final loss change? By the **chain rule** of calculus, local sensitivities multiply step by step backward from the output error toward Layer 1.",
      },
      {
        kind: "paragraph",
        html: "Every time that backward **learning signal** (gradient) crosses a neuron's activation `f(z)`, it gets **multiplied by `f'(z)`**, the local tangent slope (`rise / run`) of `f` at that neuron's current input `z`. Check the concrete arithmetic: if nudging `z` by `+0.01` lifts `f(z)` by `+0.0025`, then `f'(z) = 0.0025 / 0.01 = 0.25`, so only a quarter of that sensitivity continues backward to earlier weights. When a curve goes flat (`f'(z) ≈ 0`), a neuron squeezes almost the entire learning signal down to nothing.",
      },
      {
        kind: "image",
        src: "/articles/activation-tangent-slope-gate.svg",
        alt: "Two-panel diagram explaining tangent slope f'(z) on an activation curve and its role as a multiplicative backward gate. Left panel contrasts steep center slope 0.25 at z equals 0 against flat tail slope 0.018 at z equals +4. Right panel shows incoming backward loss gradient multiplied by f'(z), comparing 1.00 (100% preserved), 0.25 (25% preserved), and near-zero (stalled updates).",
        caption:
          "Geometric meaning of activation slope: steep tangents forward become open gradient valves backward, while flat curve tails close the valve toward zero.",
        width: 800,
        height: 315,
      },
      {
        kind: "callout",
        title: "What saturation actually means",
        body: "Saturation does not mean an activation outputs a broken number or gets permanently locked by software. It simply means the curve flattens out so its derivative `f'(z)` approaches zero. Large changes in pre-activation `z` produce barely any change in output, turning the backward learning signal weak. Older sigmoid networks still train in shallow models, yet depth multiplies those small slopes rapidly into vanishing gradients.",
      },
      {
        kind: "heading",
        id: "sigmoid-and-saturation",
        text: "Sigmoid and why smooth curves saturate",
      },
      {
        kind: "paragraph",
        html: "The **logistic sigmoid** takes any real pre-activation `z` from `-infinity` to `+infinity` and squeezes it smoothly into the open interval `(0, 1)`:",
      },
      {
        kind: "formula",
        tex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\sigma'(z) = \\sigma(z)\\bigl(1 - \\sigma(z)\\bigr)",
        caption:
          "Sigmoid formula on the left (using Euler's constant e ≈ 2.718) and its closed-form slope derivative on the right.",
      },
      {
        kind: "paragraph",
        html: "Read the behavior directly from `e^(-z)` (where `e ≈ 2.718`). Because an exponential of any real number is strictly positive, the denominator `1 + e^(-z)` is always strictly greater than `1`, trapping output values neatly inside `(0, 1)`. Testing three values maps out the S-shape immediately:",
      },
      {
        kind: "list",
        items: [
          "**At `z = 0`**: `e^0 = 1`, so `sigma(0) = 1 / (1 + 1) = 0.500` right in the center.",
          "**At `z = +5`**: `e^(-5) ≈ 0.00674`, so the denominator sits near `1.0067` and `sigma(5) ≈ 0.99331`, hugging the top ceiling `1`.",
          "**At `z = -5`**: `e^(+5) ≈ 148.41`, inflating the denominator so `sigma(-5) = 1 / 149.41 ≈ 0.00669`, flattening near `0`.",
        ],
      },
      {
        kind: "paragraph",
        html: "Now inspect sigmoid's derivative formula, `sigma'(z) = sigma(z) * (1 - sigma(z))`. Letting `s = sigma(z)` and completing the square shows `s(1 - s) = s - s^2 = -(s^2 - s + 0.25) + 0.25 = 0.25 - (s - 0.5)^2`. Because a squared real number can never go negative, **sigmoid's slope can never exceed `0.25`**, reaching that peak only right at `z = 0` (`s = 0.5`). Out at `z = 5` or `z = -5`, the slope collapses to `0.99331 * 0.00669 ≈ 0.00665`, less than seven thousandths.",
      },
      {
        kind: "image",
        src: "/articles/sigmoid-curve-and-slope.svg",
        alt: "Two-panel graph of the logistic sigmoid function on the left and its derivative bell curve on the right across z from -6 to +6. Highlights shaded saturated tails beyond plus or minus 3, test checkpoints (-5, 0.007), (0, 0.50), and (+5, 0.993), peak derivative 0.25 at z = 0, and tail slope 0.00665 at z = +5.",
        caption:
          "Visualizing sigmoid right where it acts: outputs stay bounded between 0 and 1, while its slope peaks at just 0.25 and collapses below 0.007 in both shaded tails.",
        width: 800,
        height: 335,
      },
      {
        kind: "paragraph",
        html: "Multiply those slopes through depth. Suppose a network stacks `4` hidden sigmoid layers whose neurons sit slightly away from zero around slope `0.1`: multiplying `0.1 * 0.1 * 0.1 * 0.1` shrinks the signal to `0.0001` (`0.01%` remaining). Even in the theoretical **best case** where every single neuron across all `4` layers lands right at `z = 0` (`slope = 0.25`), `0.25^4 ≈ 0.0039`, leaving under four tenths of one percent for Layer 1 weights. That rapid shrinkage across depth is the start of the **vanishing gradient problem**.",
      },
      {
        kind: "image",
        src: "/articles/gradient-signal-depth.svg",
        alt: "Comparison of backward learning signal attenuation across four hidden layers. On top, four sigmoid layers with slope 0.1 shrink a 1.0000 signal to 0.0001. On bottom, four active ReLU layers with slope 1.0 transmit the full 1.0000 signal.",
        caption:
          "Because chain-rule derivatives multiply at every layer, four sigmoid slopes of 0.1 shrink an incoming gradient to 0.0001 (and even the theoretical peak of 0.25^4 leaves 0.0039), while active ReLU slopes of 1.0 preserve 1.0000.",
        width: 800,
        height: 360,
      },
      {
        kind: "paragraph",
        html: "Sigmoid carries a second subtle drawback inside hidden layers: **every output is strictly positive** (`0 < sigma(z) < 1`). On a training sample, each weight update feeding a downstream neuron multiplies the same scalar upstream error sensitivity by the positive hidden activations `h_j > 0`, forcing all weights in that neuron's row to nudge with the **exact same sign** (either all increase together or all decrease together). Whenever an ideal correction needs some weights to grow while others shrink, optimization has to stair-step through multi-step zig-zags instead of moving directly toward the solution.",
      },
      {
        kind: "paragraph",
        html: "Does that mean sigmoid is obsolete? Not at all. While it fell out of favor in hidden layers, sigmoid still shines at the **output layer** of a binary classifier whenever a single unbounded logit needs converting into a class probability between `0` and `1`. Notice a practical PyTorch nuance here too: during training, we rarely place an explicit `nn.Sigmoid()` in front of binary cross-entropy loss. Instead, `nn.BCEWithLogitsLoss()` accepts the raw linear logit directly and fuses sigmoid plus logarithm arithmetic algebraically for cleaner numerical precision near `0` and `1`.",
      },
      {
        kind: "heading",
        id: "tanh-activation",
        text: "Tanh centers outputs around zero",
      },
      {
        kind: "paragraph",
        html: "The **hyperbolic tangent** (`tanh`) solves sigmoid's positive-only bias while keeping a smooth S-shape:",
      },
      {
        kind: "formula",
        tex: "\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\\sigma(2z) - 1, \\qquad \\tanh'(z) = 1 - \\tanh^2(z)",
        caption:
          "Tanh is a vertically stretched and centered version of sigmoid, spanning (-1, 1) with derivative 1 minus tanh squared.",
      },
      {
        kind: "paragraph",
        html: "Rewriting `tanh(z)` via `2 * sigma(2z) - 1 = 2 / (1 + e^(-2z)) - 1 = (1 - e^(-2z)) / (1 + e^(-2z))` and multiplying top and bottom by `e^z` explains both advantages in one glance. Subtracting `1` shifts the range from `(0, 1)` to **`(-1, 1)`** centered cleanly at `tanh(0) = 0`, so negative inputs emit negative activations (`tanh(-1) ≈ -0.762`, `tanh(+1) ≈ +0.762`) and break sigmoid's positive-only constraint. Meanwhile, differentiating `2 * sigma(2z)` picks up a factor of `2` outside and `2` inside, quadrupling the center slope from `0.25` to **`1.0`** (`1 - 0^2 = 1`).",
      },
      {
        kind: "image",
        src: "/articles/tanh-curve-and-slope.svg",
        alt: "Two-panel graph comparing tanh with dashed sigmoid from z = -5 to +5. Left panel shows tanh spanning (-1, 1) centered at (0, 0) and flattening near plus or minus 3 to 0.995. Right panel shows tanh derivative peaking at 1.000 at z = 0 (4 times sigmoid's 0.25 peak) yet dropping to 0.0099 by z = 3.",
        caption:
          "Left: tanh centers outputs around zero by stretching sigmoid across (-1, 1). Right: peak slope rises to 1.0 at zero, yet still decays toward 0.01 by z = +-3.",
        width: 800,
        height: 335,
      },
      {
        kind: "paragraph",
        html: "Why did `tanh` still fail to hold its crown across deep stacks? Because scaling an S-curve only delays saturation without removing it. At `z = 1`, `tanh'(1) = 1 - 0.762^2 ≈ 0.420`, and by `z = 3`, `tanh(3) ≈ 0.99505`, so its local slope `1 - 0.99505^2` drops to `0.00987`, below one percent. Across `4` saturated layers at `z = 3`, `0.00987^4` shrinks past one part in a hundred million (`~9.5e-9`). As Xavier Glorot and Yoshua Bengio showed in 2010, saturating activations still starve deep layers of gradients whenever units drift outside the narrow center band.",
      },
      {
        kind: "heading",
        id: "relu-and-dying-neurons",
        text: "ReLU eliminates positive saturation",
      },
      {
        kind: "paragraph",
        html: "The fix that transformed deep training turned out to be dramatically simpler than exponential S-curves: **ReLU** (Rectified Linear Unit) keeps a completely straight line for positive inputs (`ReLU(1) = 1`, `ReLU(100) = 100`) and clamps everything at or below zero flat to `0`:",
      },
      {
        kind: "formula",
        tex: "\\operatorname{ReLU}(z) = \\max(0, z), \\qquad \\operatorname{ReLU}'(z) = \\begin{cases} 1 & \\text{if } z > 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}",
        caption:
          "ReLU passes positive values unchanged with constant slope 1 and zeros out negative pre-activations.",
      },
      {
        kind: "image",
        src: "/articles/relu-curve-and-dying-slope.svg",
        alt: "Two-panel graph of the ReLU activation function max(0, z) on the left and its piecewise step derivative plus dying ReLU failure box on the right. Left panel highlights flat zero along negative inputs, corner at (0, 0), and constant slope 1 ray for positive inputs. Right panel plots step derivative jumping from 0 to 1 at z = 0 and shows the three steps that trap a permanently negative dying ReLU unit.",
        caption:
          "Visualizing ReLU where it acts: positive scores ride a constant-slope 1 line without ever saturating, while negative inputs drop to 0 with zero backward slope.",
        width: 800,
        height: 335,
      },
      {
        kind: "paragraph",
        html: "Check the obvious calculus question right at the sharp corner `z = 0`: on the left side the slope is `0`, and on the right side the slope is `1`, so a strict classical derivative does not exist at `z = 0`. Deep learning libraries handle this seamlessly by picking a fixed subgradient value at exact `0.0` (verified in PyTorch `2.9.1`: `nn.ReLU()` returns `0.0` gradient at `z = 0.0`). Because continuous floating-point weighted sums rarely land on exact zero, that convention causes zero trouble in practice.",
      },
      {
        kind: "paragraph",
        html: "Replacing exponential curves with `max(0, z)` gave deep architectures three decisive advantages:",
      },
      {
        kind: "list",
        items: [
          "**Zero saturation for positive inputs**: even at `z = 100`, `ReLU(100) = 100` and its slope stays **`1.0`**. Multiply `1` across `4` active hidden layers (`1 * 1 * 1 * 1 = 1`) and `100%` of the backward learning signal passes through active paths unattenuated.",
          "**Cheap compute**: evaluating sigmoid or tanh requires computing exponentials (`exp`), whereas `max(0, z)` is one fast threshold comparison per neuron.",
          "**Natural sparsity**: clamping negative pre-activations directly to `0` switches off inactive units (observed in Glorot, Bordes, and Bengio's 2011 study on rectifier networks), letting models build clean sparse representations rather than keeping every unit partially active.",
        ],
      },
      {
        kind: "paragraph",
        html: "ReLU solves positive saturation, yet introduces its own failure mode on the opposite side of zero: the **dying ReLU problem**. Suppose a large training update (triggered for instance by an aggressive learning rate) pushes a neuron's weights and bias negative enough that `w^T x + b < 0` for *every* example in the dataset. Because `ReLU(z) = 0` and `ReLU'(z) = 0` for all `z < 0`, every backward learning signal crossing that unit multiplies by `0`. With zero gradient flowing to its weights or bias, that neuron can never update itself back across zero and stops learning permanently.",
      },
      {
        kind: "heading",
        id: "leaky-relu-tradeoff",
        text: "Leaky ReLU and the slope trade-off",
      },
      {
        kind: "paragraph",
        html: "**Leaky ReLU** fixes the dead negative zone with a small tweak: instead of clamping `z <= 0` completely flat at `0`, leave a shallow nonzero negative slope `alpha` (typically `0.01`):",
      },
      {
        kind: "formula",
        tex: "f(z) = \\begin{cases} z & \\text{if } z > 0 \\\\ \\alpha z & \\text{if } z \\le 0 \\end{cases}",
        caption:
          "Leaky ReLU multiplies negative inputs by a small slope alpha (default 0.01 in PyTorch) so backward gradients never vanish to zero.",
      },
      {
        kind: "paragraph",
        html: "Test `z = -5` with the standard `alpha = 0.01`: instead of returning `0` with `0` slope, Leaky ReLU emits `0.01 * (-5) = -0.05` and carries slope `0.01` backward. That tiny trickle lets weights recover even if a neuron temporarily drifts negative. Yet choosing `alpha` reflects a direct trade-off. Make `alpha` too small (`0.0001`), and recovery gradients become negligible like plain ReLU. Make `alpha` too large (toward `1.0`), and both halves blend into a straight identity line (`f(z) = z` at `alpha = 1`), weakening the nonlinearity that separates layers.",
      },
      {
        kind: "image",
        src: "/articles/leaky-relu-slope-tradeoff.svg",
        alt: "Two-panel graph of Leaky ReLU showing negative slope alpha variations from z = -6 to +4 on the left and the design trade-off cards on the right. Left panel contrasts ReLU (alpha = 0), PyTorch default alpha = 0.01 reaching -0.05 at z = -5, exaggerated alpha = 0.1 for visibility, and linear extreme alpha = 1.0.",
        caption:
          "Visualizing Leaky ReLU on its own: small alpha = 0.01 barely dips below zero (-0.05 at z = -5) yet keeps backward updates alive, whereas alpha near 1 collapses the bend back to linear.",
        width: 800,
        height: 330,
      },
      {
        kind: "heading",
        id: "side-by-side-comparison",
        text: "Comparing all four curves and slopes side by side",
      },
      {
        kind: "paragraph",
        html: "Now that you have seen each curve individually, place all four activation functions and their derivatives onto shared axes to compare saturation, centering, and tail gradients directly (note `alpha = 0.1` is exaggerated on these charts so Leaky ReLU's negative tilt stays distinct from ReLU's zero floor):",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Activation curves across z = -3 to +3",
        xKey: "z",
        xLabel: "pre-activation z",
        yLabel: "output f(z)",
        note: "Leaky ReLU uses alpha = 0.1 for visibility (PyTorch default is 0.01)",
        caption:
          "Comparing sigmoid, tanh, ReLU, and Leaky ReLU (with alpha = 0.1 exaggerated to distinguish its negative slope from ReLU's flat zero floor). Click legend pills to compare pairs.",
        series: [
          { key: "sigmoid", label: "Sigmoid" },
          { key: "tanh", label: "Tanh" },
          { key: "relu", label: "ReLU" },
          { key: "leaky", label: "Leaky ReLU (alpha = 0.1)" },
        ],
        data: [
          { z: "-3", sigmoid: 0.047, tanh: -0.995, relu: 0.0, leaky: -0.3 },
          { z: "-2.5", sigmoid: 0.076, tanh: -0.987, relu: 0.0, leaky: -0.25 },
          { z: "-2", sigmoid: 0.119, tanh: -0.964, relu: 0.0, leaky: -0.2 },
          { z: "-1.5", sigmoid: 0.182, tanh: -0.905, relu: 0.0, leaky: -0.15 },
          { z: "-1", sigmoid: 0.269, tanh: -0.762, relu: 0.0, leaky: -0.1 },
          { z: "-0.5", sigmoid: 0.378, tanh: -0.462, relu: 0.0, leaky: -0.05 },
          { z: "0", sigmoid: 0.5, tanh: 0.0, relu: 0.0, leaky: 0.0 },
          { z: "0.5", sigmoid: 0.622, tanh: 0.462, relu: 0.5, leaky: 0.5 },
          { z: "1", sigmoid: 0.731, tanh: 0.762, relu: 1.0, leaky: 1.0 },
          { z: "1.5", sigmoid: 0.818, tanh: 0.905, relu: 1.5, leaky: 1.5 },
          { z: "2", sigmoid: 0.881, tanh: 0.964, relu: 2.0, leaky: 2.0 },
          { z: "2.5", sigmoid: 0.924, tanh: 0.987, relu: 2.5, leaky: 2.5 },
          { z: "3", sigmoid: 0.953, tanh: 0.995, relu: 3.0, leaky: 3.0 },
        ],
      },
      {
        kind: "figure",
        variant: "line",
        title: "Local slopes (derivatives) across z = -5 to +5",
        xKey: "z",
        xLabel: "pre-activation z",
        yLabel: "local slope f'(z)",
        note: "PyTorch returns ReLU'(0) = 0.0, with Leaky ReLU alpha = 0.1 shown for visibility",
        caption:
          "Plotting derivatives directly shows why ReLU displaced sigmoid and tanh in hidden layers: sigmoid peaks at 0.25 and both S-curves drop near 0 by z = +-3, whereas ReLU stays flat at 1.0 across positive inputs.",
        series: [
          { key: "dSigmoid", label: "Sigmoid slope" },
          { key: "dTanh", label: "Tanh slope" },
          { key: "dRelu", label: "ReLU slope" },
          { key: "dLeaky", label: "Leaky ReLU slope (alpha = 0.1)" },
        ],
        data: [
          { z: "-5", dSigmoid: 0.0066, dTanh: 0.0002, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-4.5", dSigmoid: 0.0109, dTanh: 0.0005, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-4", dSigmoid: 0.0177, dTanh: 0.0013, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-3.5", dSigmoid: 0.0285, dTanh: 0.0036, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-3", dSigmoid: 0.0452, dTanh: 0.0099, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-2.5", dSigmoid: 0.0701, dTanh: 0.0266, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-2", dSigmoid: 0.105, dTanh: 0.0707, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-1.5", dSigmoid: 0.1491, dTanh: 0.1807, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-1", dSigmoid: 0.1966, dTanh: 0.42, dRelu: 0.0, dLeaky: 0.1 },
          { z: "-0.5", dSigmoid: 0.235, dTanh: 0.7864, dRelu: 0.0, dLeaky: 0.1 },
          { z: "0", dSigmoid: 0.25, dTanh: 1.0, dRelu: 0.0, dLeaky: 0.1 },
          { z: "0.5", dSigmoid: 0.235, dTanh: 0.7864, dRelu: 1.0, dLeaky: 1.0 },
          { z: "1", dSigmoid: 0.1966, dTanh: 0.42, dRelu: 1.0, dLeaky: 1.0 },
          { z: "1.5", dSigmoid: 0.1491, dTanh: 0.1807, dRelu: 1.0, dLeaky: 1.0 },
          { z: "2", dSigmoid: 0.105, dTanh: 0.0707, dRelu: 1.0, dLeaky: 1.0 },
          { z: "2.5", dSigmoid: 0.0701, dTanh: 0.0266, dRelu: 1.0, dLeaky: 1.0 },
          { z: "3", dSigmoid: 0.0452, dTanh: 0.0099, dRelu: 1.0, dLeaky: 1.0 },
          { z: "3.5", dSigmoid: 0.0285, dTanh: 0.0036, dRelu: 1.0, dLeaky: 1.0 },
          { z: "4", dSigmoid: 0.0177, dTanh: 0.0013, dRelu: 1.0, dLeaky: 1.0 },
          { z: "4.5", dSigmoid: 0.0109, dTanh: 0.0005, dRelu: 1.0, dLeaky: 1.0 },
          { z: "5", dSigmoid: 0.0066, dTanh: 0.0002, dRelu: 1.0, dLeaky: 1.0 },
        ],
      },
      {
        kind: "table",
        headers: [
          "Activation",
          "Output range",
          "Slope for z > 0",
          "Slope for z < 0",
          "Centering & trade-off",
        ],
        rows: [
          [
            "**Sigmoid**",
            "`(0, 1)`",
            "`<= 0.25`, approaches `0`",
            "`<= 0.25`, approaches `0`",
            "Positive-only outputs and two saturating tails shrink gradients",
          ],
          [
            "**Tanh**",
            "`(-1, 1)`",
            "`<= 1`, approaches `0`",
            "`<= 1`, approaches `0`",
            "Zero-centered, four times steeper at zero, still saturates in both tails",
          ],
          [
            "**ReLU**",
            "`[0, infinity)`",
            "`1` everywhere",
            "`0` everywhere",
            "Healthy positive gradients and fast math, but negative units can die",
          ],
          [
            "**Leaky ReLU**",
            "`(-infinity, infinity)`",
            "`1` everywhere",
            "`alpha` (default `0.01`)",
            "Avoids dead ReLU, introduces negative slope hyperparameter alpha",
          ],
        ],
        caption:
          "Summary of output bounds, local slopes, and engineering trade-offs across the four core activations.",
      },
      {
        kind: "heading",
        id: "pytorch-activations",
        text: "Swapping activations in PyTorch",
      },
      {
        kind: "paragraph",
        html: "In PyTorch, switching between these activations inside our series classifier takes a single line. Every element-wise module (`nn.Sigmoid()`, `nn.Tanh()`, `nn.ReLU()`, and `nn.LeakyReLU(negative_slope=0.01)`) stores zero parameters of its own, so swapping any of them into `Linear(20, 64) -> Activation -> Linear(64, 10)` leaves the model at the exact same `1,994` trainable parameters while changing its training behavior:",
      },
      {
        kind: "code",
        filename: "activation_swap.py",
        code: `import torch.nn as nn

# Hidden-layer activation options (one-line swap, 1,994 params for all four):
for act in (
    nn.Sigmoid(),
    nn.Tanh(),
    nn.ReLU(),
    nn.LeakyReLU(negative_slope=0.01),
):
    model = nn.Sequential(
        nn.Linear(20, 64),
        act,
        nn.Linear(64, 10),
    )
    print(f"{act.__class__.__name__:10s} -> {sum(p.numel() for p in model.parameters())} params")

# For binary classification (1 output logit), skip explicit nn.Sigmoid() in the model:
binary_model = nn.Sequential(
    nn.Linear(20, 64),
    nn.ReLU(),
    nn.Linear(64, 1),
)
criterion = nn.BCEWithLogitsLoss()  # fuses sigmoid + cross-entropy numerically cleanly`,
      },
      {
        kind: "mermaid",
        caption:
          "Hidden layers swap between activations like nn.ReLU and nn.LeakyReLU freely, while binary output heads leave the final score as an unbounded logit for nn.BCEWithLogitsLoss during training.",
        code: `flowchart TD
  IN["20 input features"] --> L1["nn.Linear(20, 64)"]
  L1 --> ACT["Hidden activation<br/>nn.ReLU() or nn.LeakyReLU(0.01)"]
  ACT --> L2["nn.Linear(64, 1) -> raw logit"]
  L2 -->|"training loss"| LOSS["nn.BCEWithLogitsLoss()"]
  L2 -->|"inference readout"| SIG["Optional torch.sigmoid(logit)"]`,
      },
      {
        kind: "paragraph",
        html: "You can probe exact activation outputs, tangent slopes, and multi-layer signal survival (`slope ** depth`) directly in Python below. Try changing `z` to `3.0`, testing extreme negative inputs like `-1000.0`, or varying `depth` and `alpha` to see how quickly saturating slopes crush deep gradients while active ReLU holds at `1`:",
      },
      {
        kind: "code",
        filename: "activation_slopes_lab.py",
        runnable: true,
        code: `import math

def sigmoid(z: float) -> float:
    if z >= 0:
        return 1.0 / (1.0 + math.exp(-z))
    ez = math.exp(z)
    return ez / (1.0 + ez)

def inspect_activations(z: float, depth: int = 4, alpha: float = 0.01) -> None:
    s = sigmoid(z)
    ds = s * (1.0 - s)
    th = math.tanh(z)
    dth = 1.0 - th * th
    rl = max(0.0, z)
    drl = 1.0 if z > 0 else 0.0
    lrl = z if z > 0 else alpha * z
    dlrl = 1.0 if z > 0 else alpha

    print(f"=== z = {z} across {depth} layers ===")
    rows = [
        ("Sigmoid", s, ds),
        ("Tanh", th, dth),
        ("ReLU", rl, drl),
        (f"LeakyReLU(a={alpha})", lrl, dlrl),
    ]
    for name, out, slope in rows:
        signal = slope ** depth
        print(f"{name:18s} out={out:8.4f}  slope={slope:7.4f}  signal={signal:.4g}")

for z in (0.0, 1.5, 3.0, 5.0, -5.0):
    inspect_activations(z)
    print()`,
      },
      {
        kind: "video",
        youtubeId: "ZGIVMKvQ5Cg",
        title: "Why Neural Networks Need Activation Functions",
        caption:
          "Watch the full animated Brain Link episode covering tangent slopes, sigmoid saturation, 4-layer signal decay, tanh, ReLU, dying neurons, Leaky ReLU, and PyTorch swaps.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "Notice the overarching pattern across all four functions: every activation fixes one failure mode while trading in another. Sigmoid gave smooth probability outputs, yet suffered from two-sided saturation and positive bias. Tanh centered activations at zero and quadrupled peak slope, yet still vanished in the tails. ReLU unlocked deep positive gradient highways at negligible compute cost, yet risked silencing negative neurons forever. In [Part 4 of this series](/articles/gelu-silu-and-softmax), we build on that foundation to derive smooth modern activations (**ELU**, **GELU**, **SiLU**, and **Softplus**), output **Softmax**, and how to choose the right activation by layer position.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Understanding the difficulty of training deep feedforward neural networks",
            href: "https://proceedings.mlr.press/v9/glorot10a.html",
            source: "Xavier Glorot and Yoshua Bengio, AISTATS (2010)",
            note: "Demonstrates how saturating sigmoid activations impede deep training signals compared to zero-centered and unsaturated alternatives.",
          },
          {
            label: "Deep Sparse Rectifier Neural Networks",
            href: "https://proceedings.mlr.press/v15/glorot11a.html",
            source: "Xavier Glorot, Antoine Bordes, and Yoshua Bengio, AISTATS (2011)",
            note: "Examines ReLU sparsity, gradient propagation, and biological and computational advantages over sigmoid and tanh.",
          },
          {
            label: "torch.nn.Sigmoid documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.Sigmoid.html",
            source: "PyTorch documentation",
            note: "Element-wise logistic sigmoid function mapping inputs to (0, 1).",
          },
          {
            label: "torch.nn.Tanh documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.Tanh.html",
            source: "PyTorch documentation",
            note: "Element-wise hyperbolic tangent activation mapping inputs to (-1, 1).",
          },
          {
            label: "torch.nn.ReLU documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.ReLU.html",
            source: "PyTorch documentation",
            note: "Applies rectified linear unit max(0, x) element-wise.",
          },
          {
            label: "torch.nn.LeakyReLU documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.LeakyReLU.html",
            source: "PyTorch documentation",
            note: "Applies max(0, x) + negative_slope * min(0, x) with negative_slope defaulting to 0.01.",
          },
          {
            label: "torch.nn.BCEWithLogitsLoss documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html",
            source: "PyTorch documentation",
            note: "Combines a Sigmoid layer and binary cross-entropy loss in one numerically stable module.",
          },
          {
            label: "Why Neural Networks Need Activation Functions (video)",
            href: "https://www.youtube.com/watch?v=ZGIVMKvQ5Cg",
            source: "Brain Link on YouTube",
          },
          {
            label: "Deep Learning Fundamentals playlist",
            href: "https://www.youtube.com/playlist?list=PLX2zaNhVC3Eo",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "neural-network-parameters-and-flops",
    title: "Counting Neural Network Parameters and FLOPs",
    dek: "One hidden layer can approximate a wide range of continuous functions, yet every extra neuron demands memory and arithmetic. Derive parameter counts, forward FLOPs, batch scaling, and widening behavior directly from weight matrix shapes.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#deep-learning", "#neural-networks", "#machine-learning", "#pytorch", "#nn-module"],
    series: { slug: "deep-learning", title: "Deep Learning", part: 2 },
    coverImage: "/articles/neural-network-parameters-and-flops.png",
    body: [
      {
        kind: "paragraph",
        html: "In [Part 1 of this series](/articles/from-one-neuron-to-neural-networks), we saw why a single perceptron gets stuck on curved or diagonal patterns like XOR: one weighted neuron can only draw one flat straight cut across its inputs. Adding even one hidden layer with a nonlinear step such as ReLU bends the space so a network can carve out nonlinear regions.",
      },
      {
        kind: "paragraph",
        html: "Mathematical theory pushes that observation to a striking conclusion. A feedforward network with just one hidden layer and a suitable nonlinear activation can approximate a remarkably broad class of functions as closely as you want, provided you give it enough hidden units. Taken at face value, that invites an obvious question: why build deep networks with dozens of layers if one sufficiently wide hidden layer can represent almost anything?",
      },
      {
        kind: "paragraph",
        html: "The answer starts with accounting. Every neuron you add to a layer expands what the network must **store in memory** and how much **arithmetic it executes** on every pass. Once you derive parameter counts and floating-point operations (**FLOPs**) straight from a layer's matrix dimensions, widening a layer stops feeling abstract or free.",
      },
      {
        kind: "video",
        youtubeId: "07T63bLOmJg",
        title: "How to Calculate Neural Network Parameters and FLOPs",
        caption:
          "Watch the companion Brain Link episode for animated walkthroughs of universal approximation, the 64 by 20 weight matrix, FLOP counting per neuron, and doubling the hidden layer.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "universal-approximation",
        text: "What universal approximation promises",
      },
      {
        kind: "paragraph",
        html: "In 1989, George Cybenko proved a foundational version of what is now called the **Universal Approximation Theorem**: a feedforward neural network with a single internal hidden layer and a continuous S-shaped (sigmoidal) activation can uniformly approximate any continuous function defined on the unit hypercube to arbitrary accuracy. Later proofs extended that same density property to other non-polynomial activations, including modern piecewise-linear functions like ReLU.",
      },
      {
        kind: "paragraph",
        html: "Before relying on that statement, unpack two mathematical conditions hidden inside it:",
      },
      {
        kind: "list",
        items: [
          "**Continuous function**: a smooth or connected curve with no sudden jumps or tears where outputs teleport instantaneously.",
          "**Compact domain (such as the unit hypercube `[0, 1]^d`)**: a closed, bounded box of inputs. The theorem promises close approximation *inside* that bounded region, never unbounded extrapolation outside the range of data the network saw.",
        ],
      },
      {
        kind: "paragraph",
        html: "How does summing simple hidden units actually reconstruct a bumpy curve? With ReLU (`ReLU(z) = max(0, z)`), the mechanism is transparent. Each hidden unit computes `a_i * ReLU(w_i * x + b_i)`. Before `x` crosses the threshold where `w_i * x + b_i = 0`, the unit outputs zero and contributes nothing. Once `x` crosses that breakpoint, the unit switches on as a straight line with slope `a_i * w_i`. Combining just two shifted units, such as `h1 = +ReLU(x + 1)` turning upward at `x = -1` and `h2 = -2 * ReLU(x - 0.5)` turning downward at `x = +0.5`, builds an isolated triangular tent peaking at `(0.5, 1.5)` and returning to `0` at `x = 2`:",
      },
      {
        kind: "image",
        src: "/articles/relu-hinge-building-blocks.svg",
        alt: "Side-by-side plot showing two individual shifted ReLU units on the left, h1 = ReLU(x + 1) switching on at x = -1 and h2 = -2 * ReLU(x - 0.5) switching downward at x = +0.5, and their piecewise-linear sum on the right forming a triangular peak at (0.5, 1.5).",
        caption:
          "How two ReLU units build a piecewise-linear tent: each unit stays flat zero until its breakpoint, then adds its slope cleanly onto the combined curve.",
        width: 800,
        height: 330,
      },
      {
        kind: "paragraph",
        html: "Stacking `N` hidden units simply places `N` hinge points across an interval, turning a one-hidden-layer ReLU network into a **continuous piecewise-linear curve**. With `2` linear segments across `[-3, 3]`, the fit captures only a coarse triangle. Raising resolution to `8` segments narrows the largest gaps, and `32` segments trace the smooth target closely:",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Approximating a smooth target curve with ReLU pieces",
        xKey: "x",
        xLabel: "input x",
        yLabel: "output value",
        note: "Computed on [-3, 3] for sin(1.2x) + 0.4 cos(2.7x) - 0.15",
        caption:
          "Piecewise-linear ReLU fits across [-3, 3]. Maximum absolute error drops from 1.77 with 2 linear pieces to 0.28 with 8 pieces and 0.02 with 32 pieces. Toggle series in the legend to compare fits directly against the target.",
        series: [
          { key: "target", label: "Target curve" },
          { key: "u2", label: "2 linear pieces (err 1.77)" },
          { key: "u8", label: "8 linear pieces (err 0.28)" },
          { key: "u32", label: "32 linear pieces (err 0.02)" },
        ],
        data: [
          { x: "-3", target: 0.195, u2: 0.195, u8: 0.195, u32: 0.195 },
          { x: "-2.75", target: 0.174, u2: 0.2, u8: 0.068, u32: 0.168 },
          { x: "-2.5", target: 0.066, u2: 0.204, u8: -0.059, u32: 0.057 },
          { x: "-2.25", target: -0.186, u2: 0.209, u8: -0.186, u32: -0.186 },
          { x: "-2", target: -0.572, u2: 0.213, u8: -0.581, u32: -0.574 },
          { x: "-1.75", target: -1.008, u2: 0.218, u8: -0.975, u32: -1.004 },
          { x: "-1.5", target: -1.37, u2: 0.223, u8: -1.37, u32: -1.37 },
          { x: "-1.25", target: -1.537, u2: 0.227, u8: -1.283, u32: -1.52 },
          { x: "-1", target: -1.444, u2: 0.232, u8: -1.196, u32: -1.428 },
          { x: "-0.75", target: -1.109, u2: 0.236, u8: -1.109, u32: -1.109 },
          { x: "-0.5", target: -0.627, u2: 0.241, u8: -0.656, u32: -0.627 },
          { x: "-0.25", target: -0.133, u2: 0.245, u8: -0.203, u32: -0.14 },
          { x: "0", target: 0.25, u2: 0.25, u8: 0.25, u32: 0.25 },
          { x: "0.25", target: 0.458, u2: 0.172, u8: 0.319, u32: 0.448 },
          { x: "0.5", target: 0.502, u2: 0.093, u8: 0.389, u32: 0.496 },
          { x: "0.75", target: 0.458, u2: 0.015, u8: 0.458, u32: 0.458 },
          { x: "1", target: 0.42, u2: -0.063, u8: 0.498, u32: 0.426 },
          { x: "1.25", target: 0.458, u2: -0.142, u8: 0.538, u32: 0.464 },
          { x: "1.5", target: 0.578, u2: -0.22, u8: 0.578, u32: 0.578 },
          { x: "1.75", target: 0.718, u2: -0.298, u8: 0.608, u32: 0.713 },
          { x: "2", target: 0.779, u2: -0.377, u8: 0.638, u32: 0.769 },
          { x: "2.25", target: 0.669, u2: -0.455, u8: 0.669, u32: 0.669 },
          { x: "2.5", target: 0.348, u2: -0.533, u8: 0.216, u32: 0.338 },
          { x: "2.75", target: -0.141, u2: -0.612, u8: -0.237, u32: -0.146 },
          { x: "3", target: -0.69, u2: -0.69, u8: -0.69, u32: -0.69 },
        ],
      },
      {
        kind: "paragraph",
        html: "Notice the qualifier right at the heart of the theorem: it proves a wide single hidden layer can **approximate**, not that it can learn easily or run cheaply. In real problems with dozens or thousands of input dimensions, covering every fold individually in a single layer can demand an astronomical width. Before judging depth against width, let us measure the exact price tag of a concrete network layer by layer.",
      },
      {
        kind: "heading",
        id: "weight-matrix-shapes",
        text: "Why a linear layer stores a 64 by 20 matrix",
      },
      {
        kind: "paragraph",
        html: "Take the exact three-step multi-layer perceptron from Part 1: it accepts `20` numerical input features, transforms them into `64` hidden values, clamps negatives with ReLU, and scores `10` output classes:",
      },
      {
        kind: "code",
        filename: "mlp_shapes.py",
        code: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(20, 64),  # index 0
    nn.ReLU(),          # index 1
    nn.Linear(64, 10),  # index 2
)`,
      },
      {
        kind: "paragraph",
        html: "If you inspect `model[0].weight.shape` in PyTorch (where `model[0]` selects the first layer, `nn.Linear(20, 64)`), the printed tuple is `(64, 20)`, not `(20, 64)`. That flipped order catches almost every newcomer off guard, yet it follows straight from matrix multiplication.",
      },
      {
        kind: "paragraph",
        html: "Suppose a single input example arrives as a vertical column of `20` numbers (`x`, shape `20 x 1`), and we want our first layer to output a column of `64` numbers (`y`, shape `64 x 1`). When you multiply a matrix `W` on the left of column vector `x` (`Wx + b`), matrix multiplication requires the **number of columns in `W`** to equal the **number of rows in `x`**:",
      },
      {
        kind: "formula",
        tex: "W x + b \\quad\\longrightarrow\\quad (64 \\times 20)(20 \\times 1) + (64 \\times 1) = (64 \\times 1)",
        caption:
          "Matrix multiplication pairs the matching inner 20 dimensions and leaves 64 output rows in both Wx and the bias vector b.",
      },
      {
        kind: "paragraph",
        html: "To compute the first output number `y[0]`, row `0` of `W` walks across all `20` weights (`W[0, 0]` through `W[0, 19]`), multiplies each one by the matching input entry (`x[0]` through `x[19]`), adds those products together, and shifts the sum by `b[0]`. Row `1` does the exact same arithmetic with its own `20` weights and bias `b[1]`, and so on down to row `63`. Each **row** of `W` therefore belongs to one output neuron, while each **column** corresponds to one input feature. That fixes `weight.shape == (d_out, d_in)` and `bias.shape == (d_out,)`:",
      },
      {
        kind: "image",
        src: "/articles/weight-matrix-shape.svg",
        alt: "Diagram of nn.Linear(20, 64) showing weight matrix W with 64 rows and 20 columns multiplying a 20 by 1 input vector x and adding a 64 by 1 bias vector b to produce a 64 by 1 output vector y.",
        caption:
          "Row 0 of W multiplies every entry in x, adds bias b[0], and writes y[0]. Because there are 64 outputs fed by 20 inputs each, PyTorch stores W as (64, 20) and b as (64,).",
        width: 800,
        height: 365,
      },
      {
        kind: "paragraph",
        html: "Why does `nn.Linear(20, 64)` still work when you pass batched tensors shaped `(32, 20)` where each example sits horizontally as a row instead of a column? Under the hood, PyTorch computes `X @ W.T + b`. Transposing `W` (`W.T`) flips `(64, 20)` into `(20, 64)`, so `(32, 20) @ (20, 64)` matches along `20` and returns `(32, 64)`. The 1D bias vector `b` of shape `(64,)` is automatically **broadcast** (copied virtually across all `32` rows) so `b_j` is added to column `j` of every example. Even with batched execution, PyTorch keeps `W` stored as `(out_features, in_features)`. Note also that if you initialize a layer with `bias=False`, no bias tensor is created at all, leaving only the `(d_out, d_in)` weight matrix:",
      },
      {
        kind: "formula",
        tex: "X W^{\\top} + b \\quad\\longrightarrow\\quad (32 \\times 20)(20 \\times 64) + (\\text{broadcast } 64) = (32 \\times 64)",
        caption:
          "Batched forward pass transposes W to (20, 64) so 32 row-vectors multiply simultaneously and share broadcast bias b.",
      },
      {
        kind: "heading",
        id: "counting-parameters",
        text: "Counting trainable parameters from layer shapes",
      },
      {
        kind: "paragraph",
        html: "In PyTorch, a **trainable parameter** is a stored tensor marked for optimization (`requires_grad=True` by default on `nn.Linear`), meaning gradient descent updates its numbers during training. Once you see `W` as a `d_out x d_in` grid plus a `d_out`-element bias vector, counting parameters is pure rectangle arithmetic:",
      },
      {
        kind: "list",
        items: [
          "**First linear layer `nn.Linear(20, 64)`**: its `64 x 20` weight grid stores `64 * 20 = 1,280` weights, and its bias vector adds `64` offsets, totaling `1,344` trainable parameters.",
          "**Activation `nn.ReLU()`**: computes `max(0, z)` with a fixed threshold at zero. Because it holds no learned weights or offsets, it stores `0` parameters.",
          "**Second linear layer `nn.Linear(64, 10)`**: maps `64` hidden values to `10` class scores using a `(10, 64)` weight grid (`640` weights) plus `10` biases, giving `650` parameters.",
        ],
      },
      {
        kind: "paragraph",
        html: "Summing the layers (`1,344 + 0 + 650`) reveals **1,994 trainable parameters** in total. Writing the dimensions symbolically as `d_in` inputs and `d_out` outputs yields the general rule for any linear layer with bias:",
      },
      {
        kind: "formula",
        tex: "\\text{Parameters} = d_{\\text{out}}\\, d_{\\text{in}} + d_{\\text{out}} = d_{\\text{out}}(d_{\\text{in}} + 1)",
        caption:
          "Every output neuron owns d_in input weights plus 1 bias parameter, factoring cleanly into d_out(d_in + 1).",
      },
      {
        kind: "paragraph",
        html: "Why does parameter count matter operationally? Because parameters set the model's **stored memory footprint**. Each standard 32-bit float (`float32`) takes `4` bytes. For our tiny `1,994`-parameter network, storing the weights takes `1,994 * 4 = 7,976` bytes (about `8 KB`). During training, memory grows multiple times larger because each parameter also needs space for its computed gradient (`+4` bytes in FP32) and optimizer tracking buffers, such as the running momentum and squared-gradient estimates kept by Adam (`+8` bytes more per parameter in FP32, bringing parameter, gradient, and Adam state to `16` bytes per parameter, or `31,904` bytes before activations). At billion-parameter scale, those exact multipliers decide whether a model fits on a GPU:",
      },
      {
        kind: "image",
        src: "/articles/parameter-and-memory-budget.svg",
        alt: "Two-panel breakdown of parameter distribution and FP32 memory footprint. Left panel shows Linear(20, 64) accounts for 1,344 parameters (67.4%), ReLU accounts for 0, and Linear(64, 10) accounts for 650 (32.6%). Right panel contrasts inference weight storage (7,976 bytes at 4 bytes per parameter) against Adam training state (31,904 bytes at 16 bytes per parameter).",
        caption:
          "Left: how weights and biases split the 1,994 parameters across layers. Right: why training memory expands to 4 times weight storage once gradients and Adam buffers are included.",
        width: 800,
        height: 320,
      },
      {
        kind: "heading",
        id: "counting-flops",
        text: "Counting forward FLOPs per example and per batch",
      },
      {
        kind: "paragraph",
        html: "Knowing how many numbers a network stores does not tell you how much arithmetic it executes when processing inputs. To measure computation, we count **floating-point operations (FLOPs)** performed during a forward pass.",
      },
      {
        kind: "callout",
        title: "Conventions behind these FLOP numbers",
        body: "First, **FLOPs** here is a count of operations executed, not **FLOPS** (operations per second, a measure of hardware speed). Second, we count `1` floating-point multiplication as `1` FLOP and `1` addition as `1` FLOP, with bias addition included. Hardware benchmarks that count a fused multiply-accumulate (MAC) as `1` unit report half this total (`d_in * d_out`). Finally, these are **forward-pass** linear-layer counts: `nn.ReLU()` still performs `d_out` element-wise comparisons (`64` ops here), which we omit because dense matrix multiplications dominate.",
      },
      {
        kind: "paragraph",
        html: "Trace a single output neuron inside `nn.Linear(20, 64)` step by step. Computing `y[0] = W[0, 0]*x[0] + W[0, 1]*x[1] + ... + W[0, 19]*x[19] + b[0]` takes `20` multiplications (`W[0, j] * x[j]`), `19` additions to fold those `20` products into one sum, and `1` final addition for the bias `b[0]`. Notice the exact cancellation: `20 + 19 + 1 = 40 = 2 * 20` FLOPs for one output value. Replacing `20` with `d_in` explains the clean factor of `2`: `d_in + (d_in - 1) + 1 = 2 * d_in` operations per output neuron (and without bias, `(2 * d_in - 1)`).",
      },
      {
        kind: "paragraph",
        html: "Because the first layer computes `64` output neurons in parallel for every input example, one example costs `2 * 20 * 64 = 2,560` forward linear FLOPs. Notice that `2,560` is nearly double the layer's `1,344` parameters because every weight performs both a multiplication and participates in a sum. Applying the same formula to `Linear(64, 10)` adds `2 * 64 * 10 = 1,280` FLOPs, bringing one forward pass per example to `2,560 + 1,280 = 3,840` linear FLOPs.",
      },
      {
        kind: "paragraph",
        html: "In real training and inference, we group examples into a **mini-batch** of size `B` rather than feeding one item at a time. Passing `B = 32` examples shaped `(32, 20)` runs `(32, 20) @ (20, 64) -> (32, 64)` followed by `(32, 64) @ (64, 10) -> (32, 10)`. Each of the `32` examples executes the exact same linear arithmetic, so batch FLOPs scale linearly with `B`:",
      },
      {
        kind: "formula",
        tex: "\\text{FLOPs}_{\\text{batch}} = B \\times 2\\, d_{\\text{in}}\\, d_{\\text{out}}",
        caption:
          "Batch forward FLOPs under the 1-multiply + 1-add convention scale per-example linear operations directly by batch size B.",
      },
      {
        kind: "paragraph",
        html: "For `B = 32`, one forward pass executes `32 * 3,840 = 122,880` operations across both linear layers. That immediately raises a practical hardware question: if `32` examples execute `32` times the FLOPs, why do GPUs finish a batch of `32` so much faster than `32` sequential single-example calls? The answer is **weight reuse**. Loading `1,344` weights from chip memory into fast compute units is often slower than the math itself. In one dense matrix multiply (**GEMM**), the processor reads each weight once and applies it across all `32` rows simultaneously, turning memory-bound single-vector work into high-throughput parallel arithmetic.",
      },
      {
        kind: "paragraph",
        html: "Keep one scope reminder in mind as well: these numbers cover the **forward pass** only (inference). During training, backpropagation reverses through each hidden linear layer using two extra matrix multiplications of matching cost, one to compute gradients with respect to the inputs (`(B, d_out) @ (d_out, d_in)`) and one for the weights (`(d_out, B) @ (B, d_in)`), multiplying total linear arithmetic by roughly `2` to `3` times forward FLOPs.",
      },
      {
        kind: "image",
        src: "/articles/neuron-flops-and-batch-gemm.svg",
        alt: "Two-panel diagram showing single-neuron FLOP counting and batch GEMM weight reuse. On the left, one output neuron performs 20 multiplications, 19 summation additions, and 1 bias addition for 40 FLOPs (2,560 across 64 neurons). On the right, batch B = 32 examples (32 by 20) multiply transposed matrix W.T (20 by 64) loaded once to compute 122,880 total forward FLOPs across the 2-layer model.",
        caption:
          "Left: adding 20 products requires 19 additions plus 1 bias offset, giving exact cancellation to 2 * d_in = 40 FLOPs per neuron. Right: batch GEMM reads weights once and reuses them across all 32 examples.",
        width: 800,
        height: 340,
      },
      {
        kind: "table",
        headers: [
          "Layer",
          "Weight shape",
          "Bias shape",
          "Parameters",
          "Forward FLOPs (per example)",
        ],
        rows: [
          ["`nn.Linear(20, 64)`", "`(64, 20)`", "`(64,)`", "1,344", "2,560"],
          ["`nn.ReLU()`", "none", "none", "0", "omitted (64 max ops)"],
          ["`nn.Linear(64, 10)`", "`(10, 64)`", "`(10,)`", "650", "1,280"],
          ["**Total model**", "", "", "**1,994**", "**3,840**"],
        ],
        numericColumns: [3, 4],
        caption:
          "Layer-by-layer ledger for Linear(20, 64) -> ReLU -> Linear(64, 10). Under the multiply-plus-add convention, forward linear work totals 3,840 FLOPs per example (122,880 for a batch of 32).",
      },
      {
        kind: "heading",
        id: "parameters-vs-flops",
        text: "Model size vs. computational work",
      },
      {
        kind: "paragraph",
        html: "Separating parameters from FLOPs clears up a persistent systems mistake: parameters measure **how much state a model stores**, whereas FLOPs measure **how much arithmetic a pass performs**. Both numbers follow from the layer dimensions (`20`, `64`, `10`), yet they behave independently whenever an architecture reuses weights across inputs:",
      },
      {
        kind: "list",
        items: [
          "**Batching**: raising `B` from `1` to `128` keeps parameters pinned at `1,994`, while forward compute grows `128`-fold because every example reuses the same weights.",
          "**Shared layers across tokens or pixels**: applying the same dense projection across every token in a `1,000`-token sequence (as inside a Transformer) or sliding one convolutional filter across a high-resolution image multiplies FLOPs without adding a single parameter.",
          "**Embedding lookup tables**: a large language model's vocabulary table stores millions of parameters (`vocab_size * d_model`), yet fetching one row vector for each token executes virtually zero FLOPs.",
        ],
      },
      {
        kind: "mermaid",
        caption:
          "Architectural choices set layer dimensions and depth, which jointly determine stored parameters, forward FLOPs per example, and how batch size scales compute without changing parameter count.",
        code: `flowchart TD
  ARCH["Architecture choices (widths and layer count)"]
  DIMS["Layer dimensions (d_in and d_out)"]
  DEPTH["Depth (composed nonlinear stages)"]
  PARAMS["Parameters: d_out(d_in + 1) stored weights"]
  FLOPS["FLOPs per example: 2 * d_in * d_out linear ops"]
  BATCH["Batch size B (reuses loaded weights)"]
  MEM["Model size (memory, checkpoints, Adam state)"]
  WORK["Compute work (B * per-example FLOPs)"]

  ARCH --> DIMS
  ARCH --> DEPTH
  DIMS --> PARAMS
  DIMS --> FLOPS
  PARAMS --> MEM
  FLOPS --> WORK
  BATCH -->|"scales by B"| WORK
  BATCH -. "keeps fixed" .-> MEM`,
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Stored parameters vs. forward FLOPs as batch size grows",
        xKey: "batch",
        xLabel: "batch size (B)",
        yLabel: "thousands (K)",
        note: "Computed for Linear(20, 64) -> ReLU -> Linear(64, 10)",
        caption:
          "Increasing batch size from 1 to 128 leaves parameter count flat at 1.99K while scaling forward arithmetic from 3.84K to 491.52K FLOPs.",
        series: [
          { key: "paramsK", label: "Parameters (K)" },
          { key: "flopsK", label: "Forward FLOPs (K)" },
        ],
        data: [
          { batch: "B = 1", paramsK: 1.99, flopsK: 3.84 },
          { batch: "B = 8", paramsK: 1.99, flopsK: 30.72 },
          { batch: "B = 16", paramsK: 1.99, flopsK: 61.44 },
          { batch: "B = 32", paramsK: 1.99, flopsK: 122.88 },
          { batch: "B = 64", paramsK: 1.99, flopsK: 245.76 },
          { batch: "B = 128", paramsK: 1.99, flopsK: 491.52 },
        ],
      },
      {
        kind: "heading",
        id: "widening-exercise",
        text: "Widening the hidden layer from 64 to 128",
      },
      {
        kind: "paragraph",
        html: "Put the shape rules to work with a prediction check before calculating. Suppose you double the hidden layer width from `64` to `128`, turning the network into `Linear(20, 128) -> ReLU -> Linear(128, 10)`. Does the total parameter count double from `1,994` to `3,988`?",
      },
      {
        kind: "paragraph",
        html: "It does not. Changing the hidden width affects **two** layers unevenly. Layer 1 (`Linear(20, 128)`) has `128` outputs instead of `64`, so both its weights (`128 * 20 = 2,560`) and its biases (`128`) double cleanly to `2,688` (`2 * 1,344`). Layer 2 (`Linear(128, 10)`), however, keeps the exact same `10` class outputs while accepting `128` inputs instead of `64`. Its weight grid doubles from `640` to `1,280`, yet its bias vector stays fixed at `10`, giving `1,290` parameters instead of `1,300`.",
      },
      {
        kind: "paragraph",
        html: "Adding both layers gives `2,688 + 1,290 = 3,978` parameters (`10` fewer than `3,988`). Forward linear FLOPs **do** double (`5,120 + 2,560 = 7,680` per example) because `2 * d_in * d_out` already accounts for one bias add per output rather than counting bias tensors separately, and the internal hidden vector doubles from `64` to `128` numbers. One final caveat matters just as much: giving a network `3,978` parameters instead of `1,994` increases capacity, **not** accuracy. Only training and measuring on held-out validation data reveals whether wider layers actually help or simply overfit:",
      },
      {
        kind: "image",
        src: "/articles/widening-64-to-128.svg",
        alt: "Architecture diagram comparing baseline hidden width 64 against widened hidden width 128. Layer 1 doubles both weights and biases from 1,344 to 2,688, whereas Layer 2 doubles weights from 640 to 1,280 while leaving the 10 output biases unchanged, giving 1,290 and a total of 3,978 parameters instead of 3,988.",
        caption:
          "Visualizing why total parameters land at 3,978 rather than 3,988: Layer 1 scales cleanly by 2x, while Layer 2 still predicts the exact same 10 classes so its 10 bias offsets remain fixed.",
        width: 800,
        height: 325,
      },
      {
        kind: "table",
        headers: ["Quantity", "Hidden = 64", "Hidden = 128", "Change"],
        rows: [
          ["Layer 1 parameters", "1,344", "2,688", "2.00x (weights and biases double)"],
          ["Layer 2 parameters", "650", "1,290", "weights double, 10 biases unchanged"],
          ["**Total parameters**", "**1,994**", "**3,978**", "10 fewer than 3,988"],
          ["Forward FLOPs (per example)", "3,840", "7,680", "2.00x"],
          ["Forward FLOPs (batch of 32)", "122,880", "245,760", "2.00x"],
          ["Hidden representation size", "64", "128", "2.00x"],
        ],
        numericColumns: [1, 2],
        caption:
          "Comparing hidden width 64 against 128 shows why deriving counts from tensor shapes catches the 3,978 vs. 3,988 difference that naive doubling misses.",
      },
      {
        kind: "paragraph",
        html: "In PyTorch, you can confirm exact parameter counts directly from instantiated tensors in one expression. Calling `model.parameters()` yields every trainable weight and bias tensor across the sequential layers, and calling `.numel()` (`number of elements`) multiplies each tensor's shape dimensions (`64 * 20 = 1,280`, `64`, `10 * 64 = 640`, `10`) before `sum(...)` totals them:",
      },
      {
        kind: "code",
        filename: "pytorch_param_check.py",
        code: `import torch.nn as nn

for hidden in (64, 128):
    model = nn.Sequential(
        nn.Linear(20, hidden),
        nn.ReLU(),
        nn.Linear(hidden, 10),
    )
    total = sum(p.numel() for p in model.parameters())
    print(f"hidden={hidden}: layer0={tuple(model[0].weight.shape)}, "
          f"layer2={tuple(model[2].weight.shape)}, total={total}")

# Verified with PyTorch 2.9.1:
# hidden=64: layer0=(64, 20), layer2=(10, 64), total=1994
# hidden=128: layer0=(128, 20), layer2=(10, 128), total=3978`,
      },
      {
        kind: "paragraph",
        html: "Below is a standalone pure-Python calculator that walks any list of layer widths (`zip(dims, dims[1:])` pairs each layer's `(d_in, d_out)` automatically) and computes parameter counts, per-example FLOPs, and batch FLOPs. Try replacing `[20, 128, 10]` with the three-layer architecture `[50, 128, 32, 4]` (Layer 1: `6,528` params / `12,800` FLOPs, Layer 2: `4,128` params / `8,192` FLOPs, Layer 3: `132` params / `256` FLOPs, totaling `10,788` params and `21,248` FLOPs) or a Transformer feedforward block `[768, 3072, 768]` (`4,722,432` params and `9,437,184` FLOPs per token):",
      },
      {
        kind: "code",
        filename: "mlp_cost_calculator.py",
        runnable: true,
        code: `def analyze_mlp(dims: list[int], batch_size: int = 32) -> None:
    total_params = 0
    total_flops = 0
    for idx, (d_in, d_out) in enumerate(zip(dims, dims[1:]), start=1):
        params = d_out * (d_in + 1)
        flops = 2 * d_in * d_out
        total_params += params
        total_flops += flops
        print(
            f"Layer {idx} Linear({d_in}, {d_out}): "
            f"W=({d_out}, {d_in}), b=({d_out},) -> "
            f"{params:,} params, {flops:,} FLOPs/ex"
        )
    print(f"Total params:     {total_params:,}")
    print(f"FLOPs / example:  {total_flops:,}")
    print(f"Batch ({batch_size}) FLOPs: {batch_size * total_flops:,}")

print("=== Baseline MLP ===")
analyze_mlp([20, 64, 10], batch_size=32)

print("\\n=== Widened hidden layer (try changing dims) ===")
analyze_mlp([20, 128, 10], batch_size=32)`,
      },
      {
        kind: "heading",
        id: "where-uat-stops",
        text: "Where universal approximation falls short",
      },
      {
        kind: "paragraph",
        html: "Return now to our opening question: if one wide hidden layer can represent continuous functions arbitrarily closely, why do real models stack depth instead? Because **representable** in theory tells you nothing about three engineering realities:",
      },
      {
        kind: "list",
        items: [
          "**Representable is not efficiently learnable**: gradient-based optimizers have to discover useful weights from finite batches of noisy examples, and flat ultra-wide layers often need far more units or steps to converge cleanly than structured deep stacks.",
          "**Learnable is not generalizing well**: **generalization** means performing accurately on unseen examples outside the training data. A giant shallow layer with abundant piecewise bends can memorize idiosyncratic training noise (**overfitting**) instead of learning shared structure.",
          "**Generalizing is not production-efficient**: real networks stack layers sequentially so later transformations reuse intermediate features built by earlier ones. Breaking a task into composed stages can achieve rich expressive power with dramatically fewer parameters, less memory, and lower FLOPs than one massive hidden layer.",
        ],
      },
      {
        kind: "mermaid",
        caption:
          "Universal approximation guarantees only the top box, whereas practical deep models must satisfy every constraint down the chain.",
        code: `flowchart TD
  R["Representable in theory (1 wide layer can exist)"] -->|"not automatic"| L["Efficiently learnable (converges from noisy batches)"]
  L -->|"not automatic"| G["Generalizes well (accurate on unseen test data)"]
  G -->|"not automatic"| P["Production-efficient (depth reuse keeps memory and FLOPs low)"]`,
      },
      {
        kind: "paragraph",
        html: "Once this shape-first accounting becomes automatic, larger architectures stop looking opaque. Whether you inspect a small MLP or `nn.Linear(768, 3072)` inside a Transformer block, you can derive tensor dimensions, stored parameters, memory multipliers, and forward arithmetic straight from the layer definitions.",
      },
      {
        kind: "video",
        youtubeId: "07T63bLOmJg",
        title: "How to Calculate Neural Network Parameters and FLOPs",
        caption:
          "Watch the full animated Brain Link episode covering universal approximation fits, the 64 by 20 grid, FLOPs counting per neuron and batch, and widening from 64 to 128.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "Notice one piece in the middle of our `1,994`-parameter network that added `0` trainable weights and only minimal comparisons next to dense matrix multiplies, yet prevented every `Linear` layer from collapsing into one linear transformation: `nn.ReLU()`. Because activations sit at the exact boundary between linear collapse and stable training, choosing **which** activation function to use turns out to matter enormously. In [Part 3 of this series](/articles/why-relu-replaced-sigmoid), we compare sigmoid, tanh, ReLU, and Leaky ReLU through their slopes and see why gradients either vanish or survive across depth.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Approximation by superpositions of a sigmoidal function",
            href: "https://link.springer.com/article/10.1007/BF02551274",
            source: "George Cybenko, Mathematics of Control, Signals, and Systems (1989)",
            note: "Foundational universal approximation theorem for single-hidden-layer feedforward networks.",
          },
          {
            label: "Deep Feedforward Networks (Chapter 6, Deep Learning)",
            href: "https://www.deeplearningbook.org/contents/mlp.html",
            source: "Ian Goodfellow, Yoshua Bengio, and Aaron Courville",
            note: "Covers universal approximation properties, depth vs. width, and piecewise-linear activations.",
          },
          {
            label: "torch.nn.Linear documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.Linear.html",
            source: "PyTorch documentation",
            note: "Specifies weight shape (out_features, in_features) and bias shape (out_features).",
          },
          {
            label: "torch.nn.ReLU documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.ReLU.html",
            source: "PyTorch documentation",
            note: "Fixed element-wise max(0, x) nonlinearity with zero learnable parameters.",
          },
          {
            label: "torch.Tensor.numel documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.Tensor.numel.html",
            source: "PyTorch documentation",
            note: "Returns the total element count used when summing model parameter tensors.",
          },
          {
            label: "How to Calculate Neural Network Parameters and FLOPs (video)",
            href: "https://www.youtube.com/watch?v=07T63bLOmJg",
            source: "Brain Link on YouTube",
          },
          {
            label: "Deep Learning Fundamentals playlist",
            href: "https://www.youtube.com/playlist?list=PLX2zaNhVC3Eo",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "from-one-neuron-to-neural-networks",
    title: "From One Neuron to Deep Neural Networks",
    dek: "A single neuron multiplies inputs by weights, adds a bias, and draws one straight boundary. That works until a pattern like XOR refuses to separate cleanly. Stacking layers with nonlinear activations bends the space so a network can build representations step by step.",
    topic: "Research",
    publishedAt: "2026-11-19",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#deep-learning", "#neural-networks", "#machine-learning", "#pytorch"],
    series: { slug: "deep-learning", title: "Deep Learning", part: 1 },
    coverImage: "/articles/from-one-neuron-to-neural-networks.png",
    body: [
      {
        kind: "paragraph",
        html: "Picture a support desk that receives hundreds of incoming tickets every day. For each ticket, software has to answer one practical question: is this urgent?",
      },
      {
        kind: "paragraph",
        html: "Computers and neural networks cannot read text or judge priority directly. Every model begins by encoding a real-world situation into a fixed list of numbers called an **input feature vector**. Suppose an incoming ticket is summarized by three numerical features: `2` unresolved tickets already open for that customer, a priority score of `8`, and `5` hours spent waiting in the queue.",
      },
      {
        kind: "paragraph",
        html: "Turning `[2, 8, 5]` into a decision starts inside a single mathematical unit that multiplies each input by a weight, adds a bias offset, and checks a threshold. That simple unit handles clean cutoffs well until a pattern like exclusive-OR (XOR) breaks every straight line you try to draw. Getting past that geometric wall is the entire reason deep neural networks are stacked out of layers with nonlinear steps in between.",
      },
      {
        kind: "video",
        youtubeId: "cD0gD94tp7g",
        title: "How Neural Networks Actually Learn: Step-by-Step",
        caption:
          "Watch the companion Brain Link episode for animated walkthroughs of the support-ticket neuron building equation by equation, the perceptron line rotating and sliding, and ReLU bending the coordinate grid.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "inside-one-neuron",
        text: "Inside a single neuron",
      },
      {
        kind: "paragraph",
        html: "Start with one artificial neuron. Our support ticket feeds it three input features packed into a vector `x`: `x1 = 2` unresolved tickets, `x2 = 8` for the priority score, and `x3 = 5` hours waiting.",
      },
      {
        kind: "paragraph",
        html: "Notice those three features measure completely different quantities (counts, ratings, and hours). Each input receives a **weight** (`w1`, `w2`, `w3`), a number that controls both how strongly that signal pulls the score and in which direction (positive weights push scores up, negative weights push them down). The neuron multiplies each input by its matching weight, adds the products together, and adds one shared offset called the **bias** (`b`):",
      },
      {
        kind: "formula",
        tex: "z = w_1 x_1 + w_2 x_2 + w_3 x_3 + b = \\mathbf{w}^\\top \\mathbf{x} + b",
        caption:
          "The pre-activation score z combines each input xᵢ with its weight wᵢ and a bias offset b, written expanded on the left and as a compact dot product on the right.",
      },
      {
        kind: "paragraph",
        html: "Do not let the right-hand notation look mysterious. When we collect inputs into a vertical column vector `x` and weights into a matching column `w`, writing `w^T` (**transpose**) simply tips `w` on its side into a horizontal row `[w1, w2, w3]`. Multiplying that row by column `x` computes their **dot product** (`w1*x1 + w2*x2 + w3*x3`), a single shorthand that works just as cleanly for 3 inputs or 3,000. Combining weighted products with a shift `+ b` is called an **affine transformation**.",
      },
      {
        kind: "paragraph",
        html: "Plug in illustrative parameters `w = [0.4, 0.7, 0.2]` and `b = -3`. Multiplying each feature by its weight gives `0.4 * 2 = 0.8`, `0.7 * 8 = 5.6`, and `0.2 * 5 = 1.0`. Summing those weighted contributions produces `7.4`. Adding the bias shifts that total down by `3`, landing at `z = 4.4`.",
      },
      {
        kind: "mermaid",
        caption:
          "Data flow through one artificial neuron on the support-ticket example. Weights scale each input before the sum and bias produce z = 4.4, which an activation function turns into the final output.",
        code: `flowchart LR
  X1["x1 = 2 (unresolved tickets)"] -->|"w1 = 0.4 -> 0.8"| SUM["Weighted sum + bias (b = -3)"]
  X2["x2 = 8 (priority score)"] -->|"w2 = 0.7 -> 5.6"| SUM
  X3["x3 = 5 (hours waiting)"] -->|"w3 = 0.2 -> 1.0"| SUM
  SUM -->|"z = 4.4"| ACT["Activation f(z)"]
  ACT --> Y["Output"]`,
      },
      {
        kind: "paragraph",
        html: "Why keep a separate bias term at all? Test what happens when every input equals zero (`x1 = x2 = x3 = 0`). Without `b`, multiplying zero by any weight always leaves `z = 0`, pinning the neuron to zero whenever features disappear. Including `b` decouples the neuron's baseline from the origin (`z = b` when all `x = 0`), acting like an adjustable threshold offset.",
      },
      {
        kind: "paragraph",
        html: "Where do numbers like `0.4` or `-3` come from in real models? No engineer chooses them by hand. Training begins with small random numbers for weights and biases, feeds labeled tickets through the forward arithmetic, measures how far predictions sit from known urgency labels using a **loss function**, and nudges each weight and bias repeatedly via gradient updates until prediction error drops. In this article we inspect how the network computes and shapes boundaries once weights exist.",
      },
      {
        kind: "callout",
        title: "What 4.4 and the weights actually represent",
        body: "Here `w = [0.4, 0.7, 0.2]` and `b = -3` are chosen for illustration. Notice that `4.4` is a **raw pre-activation score**, not an urgency probability, and weights are **not** probabilities or importance percentages. Their numeric scale shifts depending on feature units (hours vs. minutes) and training dynamics, and turning `z` into a class decision depends on the activation function that follows.",
      },
      {
        kind: "paragraph",
        html: "The final step inside the neuron passes `z` through an **activation function**, `f(z)`, to produce its output. Swapping `f` is what turns the same weighted sum into either a rigid threshold switch or a composable unit inside deep networks.",
      },
      {
        kind: "heading",
        id: "the-perceptron",
        text: "The perceptron and its straight-line boundary",
      },
      {
        kind: "paragraph",
        html: "The earliest activation function is a hard **step function**, introduced by Frank Rosenblatt in 1958 inside the **perceptron**:",
      },
      {
        kind: "formula",
        tex: "\\hat{y} = \\begin{cases} 1 & \\text{if } z \\ge 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}",
        caption:
          "The perceptron step rule thresholds the weighted sum z at zero to emit a binary decision.",
      },
      {
        kind: "paragraph",
        html: "Read the perceptron in three concrete stages: score the weighted evidence (`z = w^T x + b`), test whether that score clears zero (`z >= 0`), and emit a binary decision (`1` for urgent, `0` for not urgent). On our `[2, 8, 5]` ticket, `z = 4.4 >= 0`, so the perceptron predicts `1`.",
      },
      {
        kind: "image",
        src: "/articles/step-function-curve.svg",
        alt: "Graph of the perceptron step activation showing output 0 along a flat horizontal line for z below 0 with an open circle at (0, 0), jumping vertically to a filled dot at (0, 1), and staying flat at 1 across positive values including the support ticket score z = +4.4.",
        caption:
          "Plot of the binary step activation: flat slope 0 on both sides with a hard jump from 0 to 1 right at z = 0, placing the support ticket z = +4.4 squarely in the positive output region.",
        width: 800,
        height: 320,
      },
      {
        kind: "paragraph",
        html: "To see *what* a perceptron can divide, simplify to two inputs `x1` and `x2` so every input pair `(x1, x2)` becomes a point on a flat 2D plane. The output flips cleanly between `0` and `1` right where `z = 0`, along `w1 * x1 + w2 * x2 + b = 0`. Solving for `x2` (assuming `w2 != 0`) gives `x2 = -(w1 / w2) * x1 - (b / w2)` (while `w2 = 0` gives a vertical line `x1 = -b / w1`). Either way, it is always a **straight line**.",
      },
      {
        kind: "paragraph",
        html: "Changing the weights alters the ratio `-w1 / w2`, which changes the slope and **rotates** the dividing line. Changing the bias alters `-b / w2`, which changes the intercept and **slides** the line across the plane without rotating it. Every point on the side where `w1 * x1 + w2 * x2 + b >= 0` outputs `1` (the weight vector `(w1, w2)` points into that positive half-plane), and every point on the opposite side outputs `0`. You can always check which side is `0` or `1` by testing `(0, 0)`, which gives `z = b`.",
      },
      {
        kind: "paragraph",
        html: "For any rule that a straight cut can isolate (**linearly separable** patterns), one perceptron solves it effortlessly. Take **logical AND** on binary inputs `0` and `1`, where output is `1` only when both `x1 = 1` and `x2 = 1`: setting `w1 = 1`, `w2 = 1`, and `b = -1.5` gives `z = x1 + x2 - 1.5`. Checking all four corners gives `-1.5 -> 0` at `(0, 0)`, `-0.5 -> 0` at `(0, 1)` and `(1, 0)`, and `+0.5 -> 1` at `(1, 1)`. Likewise, shifting only the bias to `b = -0.5` solves **logical OR** (`x1 + x2 - 0.5 >= 0` whenever at least one input is `1`).",
      },
      {
        kind: "image",
        src: "/articles/perceptron-linear-boundary.svg",
        alt: "Two 2D coordinate planes showing linear decision boundaries. On the left, changing bias shifts x1 + x2 + b = 0 in parallel from b = -0.5 to b = -1.5 while changing weight ratio to w = (2, 1) rotates the angle. On the right, logical OR (b = -0.5) isolates (0,0) while logical AND (b = -1.5) isolates (1,1).",
        caption:
          "Left: weights control the boundary slope (rotation) while bias controls its parallel offset (sliding). Right: two linearly separable logic gates solved by shifting the same line from OR to AND.",
        width: 800,
        height: 385,
      },
      {
        kind: "heading",
        id: "the-xor-limitation",
        text: "The XOR blind spot",
      },
      {
        kind: "paragraph",
        html: "A single straight cut breaks as soon as two classes are interleaved across opposite diagonals. The classic failure case, highlighted in Marvin Minsky and Seymour Papert's 1969 analysis of perceptrons, is **XOR** (exclusive OR): output `1` when *exactly one* binary input is `1`, and `0` when both match:",
      },
      {
        kind: "table",
        headers: ["x1", "x2", "Target y (x1 XOR x2)"],
        rows: [
          ["0", "0", "0"],
          ["0", "1", "1"],
          ["1", "0", "1"],
          ["1", "1", "0"],
        ],
        numericColumns: [0, 1, 2],
        caption:
          "Truth table for XOR. The positive points (0, 1) and (1, 0) sit on one diagonal, while the negative points (0, 0) and (1, 1) sit on the opposite diagonal.",
      },
      {
        kind: "paragraph",
        html: "Picture those four corners on a square. The two positive points `(0, 1)` and `(1, 0)` sit on one diagonal, while the two negative points `(0, 0)` and `(1, 1)` sit on the opposite diagonal. Rotate or slide a single straight ruler anywhere across that square: it is geometrically impossible to keep `(0, 1)` and `(1, 0)` on one side while placing `(0, 0)` and `(1, 1)` on the other.",
      },
      {
        kind: "paragraph",
        html: "Four lines of algebra prove no choice of weights and bias can cheat that geometry. Suppose a single perceptron `z = w1 * x1 + w2 * x2 + b` gets all four corners right: `(0, 0) -> 0` forces `b < 0`, `(1, 0) -> 1` forces `w1 + b >= 0`, and `(0, 1) -> 1` forces `w2 + b >= 0`. Adding the two positive inequalities gives `w1 + w2 + 2b >= 0`. Because `b < 0`, subtracting `b` makes the right side strictly positive (`-b > 0`), forcing `w1 + w2 + b >= -b > 0`. That guarantees input `(1, 1)` outputs `1` when XOR requires `0`. No single linear separator (whether a step perceptron or raw logistic regression on the original features) can represent XOR.",
      },
      {
        kind: "image",
        src: "/articles/xor-decision-boundary.svg",
        alt: "Side-by-side 2D plots of the four XOR inputs. Left: a single straight line leaves (1,1) inside the positive region as an error. Right: two lines from hidden neurons h1 and h2 form a diagonal band that cleanly isolates (0,1) and (1,0).",
        caption:
          "Left: any single straight line leaves at least one XOR corner misclassified. Right: two hidden neurons draw two lines that bound a diagonal strip around (0, 1) and (1, 0).",
        width: 800,
        height: 390,
      },
      {
        kind: "paragraph",
        html: "You can test that algebra directly in Python below. Try changing `w1`, `w2`, and `bias` in section 2 (`Single perceptron`): the error count never drops to `0/4`, whereas combining two hidden neurons (`h1`, `h2`) feeding an output neuron solves all four cases immediately:",
      },
      {
        kind: "code",
        filename: "xor_perceptron.py",
        runnable: true,
        code: `def step(z: float) -> int:
    return 1 if z >= 0 else 0

# 1. Support-ticket neuron from the earlier example
x = [2, 8, 5]
w = [0.4, 0.7, 0.2]
b = -3.0
z = sum(wi * xi for wi, xi in zip(w, x)) + b
print(f"Ticket score z = {z:.1f}, step(z) = {step(z)}")

# 2. Try ANY single straight line (w1, w2, bias) on XOR
xor_cases = [((0, 0), 0), ((0, 1), 1), ((1, 0), 1), ((1, 1), 0)]
w1, w2, bias = 1.0, 1.0, -0.5  # Edit these weights and re-run
single_errors = sum(
    step(w1 * a + w2 * c + bias) != y for (a, c), y in xor_cases
)
print(f"Single perceptron errors on XOR: {single_errors}/4")

# 3. Two hidden neurons + one output neuron solve XOR
def xor_mlp(a: float, c: float) -> int:
    h1 = step(a + c - 0.5)       # fires if at least one input is 1 (OR)
    h2 = step(a + c - 1.5)       # fires if both inputs are 1 (AND)
    return step(h1 - h2 - 0.5)   # keeps the band where h1=1 and h2=0

mlp_errors = sum(xor_mlp(a, c) != y for (a, c), y in xor_cases)
print(f"Two-layer MLP errors on XOR:   {mlp_errors}/4")`,
      },
      {
        kind: "paragraph",
        html: 'Rather than treating `xor_mlp` as magic, trace every input pair through both hidden neurons (`h1`, `h2`) and the final output neuron (`y_hat = step(h1 - h2 - 0.5)`). Notice what `h1` and `h2` actually compute: `h1` checks the **OR** boundary (`x1 + x2 - 0.5 >= 0`), and `h2` checks the **AND** boundary (`x1 + x2 - 1.5 >= 0`). Because XOR means "at least one input is on (`h1 = 1`), and not both (`h2 = 0`)", giving `h1` weight `+1`, `h2` weight `-1`, and bias `-0.5` turns `(h1 = 1, h2 = 0)` into `+0.5 -> 1` while leaving every other combination negative:',
      },
      {
        kind: "table",
        headers: [
          "(x1, x2)",
          "h1 = step(x1+x2-0.5)",
          "h2 = step(x1+x2-1.5)",
          "step(h1 - h2 - 0.5)",
        ],
        rows: [
          ["(0, 0)", "0", "0", "0 (score -0.5)"],
          ["(0, 1)", "1", "0", "1 (score +0.5)"],
          ["(1, 0)", "1", "0", "1 (score +0.5)"],
          ["(1, 1)", "1", "1", "0 (score -0.5)"],
        ],
        numericColumns: [1, 2],
        caption:
          "Step-by-step evaluation of the two-layer XOR network. In (h1, h2) coordinates, both positive corners (0, 1) and (1, 0) collapse onto the single point (1, 0), making the final output linearly separable.",
      },
      {
        kind: "heading",
        id: "multi-layer-perceptrons-and-nonlinearity",
        text: "Multi-layer perceptrons and why nonlinearity matters",
      },
      {
        kind: "paragraph",
        html: "In `xor_mlp`, putting two neurons (`h1`, `h2`) in a **hidden layer** in front of an output neuron built a **multi-layer perceptron (MLP)**: a network where each layer consumes the outputs produced by the previous layer. Look at what happened geometrically in the trace table above. Originally `(0, 1)` and `(1, 0)` sat on opposite corners of the plane. Passing them through `(h1, h2)` mapped **both** positive corners onto the exact same hidden coordinate `(1, 0)`, while `(0, 0)` stayed at `(0, 0)` and `(1, 1)` moved to `(1, 1)`. Inside that new hidden coordinate space, a single straight cut cleanly separates `(1, 0)` from the rest.",
      },
      {
        kind: "image",
        src: "/articles/xor-hidden-coordinate-map.svg",
        alt: "Coordinate transformation diagram from 2D input space (x1, x2) on the left to 2D hidden space (h1, h2) on the right. Hidden neurons h1 = step(x1+x2-0.5) and h2 = step(x1+x2-1.5) collapse both positive points (0,1) and (1,0) onto (1,0), enabling the single straight line h1 - h2 = 0.5 to isolate them cleanly.",
        caption:
          "Hidden layers turn non-separable inputs into simpler coordinates: once (0, 1) and (1, 0) map to the same hidden coordinate (1, 0), one output line cuts XOR cleanly.",
        width: 800,
        height: 360,
      },
      {
        kind: "paragraph",
        html: "When we pack several neurons side by side into one layer, we write the whole layer in matrix notation: stack each neuron's weight vector as one **row** inside weight matrix `W`, stack their biases into vector `b`, multiply `Wx + b`, and apply an activation function `f` independently to every neuron's score (**element-wise**), written `h = f(Wx + b)`.",
      },
      {
        kind: "paragraph",
        html: "Why does `f` have to be **nonlinear** (something that bends or clamps rather than scaling cleanly along flat lines)? Look at what happens if you remove `f` and stack two purely linear transformations back to back (`h = W1 x + b1`, then `y = W2 h + b2`). Think of a simple 1D example first: running `3x + 1` and multiplying the output by `2` gives `2(3x + 1) - 5 = 6x - 3`, which is still just one straight line. The exact same algebraic collapse holds for matrices of any size:",
      },
      {
        kind: "formula",
        tex: "y = W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2)",
        caption:
          "Two linear layers without an activation collapse into one linear transformation with effective weight matrix W₂W₁ and bias W₂b₁ + b₂.",
      },
      {
        kind: "paragraph",
        html: "Because the product of two matrices `W2 W1` is just another matrix `W'` and `W2 b1 + b2` is just another bias vector `b'`, stacking two (or two hundred) linear layers without nonlinear activations can never represent anything a single linear layer could not already draw. Every hyperplane stays flat.",
      },
      {
        kind: "paragraph",
        html: "Modern neural networks prevent linear collapse, and fix a fatal limitation of the 1958 step function, using **ReLU** (Rectified Linear Unit), defined simply as `ReLU(z) = max(0, z)`. Any negative score becomes `0`, while positive scores pass through unchanged with slope `1`. Unlike the binary `step(z)`, which stays completely flat (`slope = 0`) everywhere except the threshold jump and starves gradient-based learning of directional feedback, ReLU keeps a constant active slope for positive values while still putting a sharp **bend** at `z = 0`:",
      },
      {
        kind: "formula",
        tex: "\\text{ReLU}(z) = \\max(0, z) = \\begin{cases} z & \\text{if } z > 0 \\\\ 0 & \\text{if } z \\le 0 \\end{cases}",
        caption:
          "ReLU zeroes every negative pre-activation score while forwarding positive values linearly with slope 1.",
      },
      {
        kind: "image",
        src: "/articles/relu-function-curve.svg",
        alt: "Graph of ReLU(z) = max(0, z) across z from -3 to +3. Negative inputs clamp flat along y = 0 with slope 0, meeting a sharp hinge at the origin (0, 0) where positive inputs climb straight along y = z with constant slope 1.",
        caption:
          "Visualizing ReLU right where it acts: every negative input clamps flat onto y = 0, then a sharp bend at z = 0 sends positive scores upward with steady slope 1.",
        width: 800,
        height: 320,
      },
      {
        kind: "paragraph",
        html: "Trace how two standard ReLU neurons solve XOR when inputs enter as `s = x1 + x2`: build neuron 1 as `h1 = ReLU(1*x1 + 1*x2 + 0) = ReLU(s)`, build neuron 2 with a `-1` bias as `h2 = ReLU(1*x1 + 1*x2 - 1) = ReLU(s - 1)`, and combine them at the output as `1 * h1 - 2 * h2`. Watch every checkpoint along `s`:",
      },
      {
        kind: "list",
        items: [
          "**At `s = 0` (`(0, 0)`)**: `ReLU(0) - 2 * ReLU(-1) = 0 - 0 = 0`.",
          "**At `s = 1` (`(0, 1)` and `(1, 0)`)**: `ReLU(1) - 2 * ReLU(0) = 1 - 0 = 1`, peaking right at the target.",
          "**At `s = 2` (`(1, 1)`)**: `ReLU(2) - 2 * ReLU(1) = 2 - 2 = 0`, folding the ramp back down to zero.",
        ],
      },
      {
        kind: "figure",
        variant: "line",
        title: "Folding space with ReLU on XOR",
        xKey: "sum",
        xLabel: "sum of inputs (x1 + x2)",
        yLabel: "value",
        note: "Computed from s = x1 + x2 (XOR targets: 0 at s = 0, 1 at s = 1, 0 at s = 2)",
        caption:
          "Seeing the sum piece by piece: ReLU(s) climbs steadily, -2 * ReLU(s - 1) switches on downward past s = 1, and adding both curves folds the flat linear diagonal into the XOR tent peaking at s = 1.",
        series: [
          { key: "reluMlp", label: "Combined XOR tent: ReLU(s) - 2 * ReLU(s - 1)" },
          { key: "linearOnly", label: "Linear layer only: 0.5 * s" },
          { key: "h1", label: "Neuron 1: ReLU(s)" },
          { key: "h2", label: "Weighted Neuron 2: -2 * ReLU(s - 1)" },
        ],
        data: [
          { sum: "0.0", reluMlp: 0.0, linearOnly: 0.0, h1: 0.0, h2: 0.0 },
          { sum: "0.5", reluMlp: 0.5, linearOnly: 0.25, h1: 0.5, h2: 0.0 },
          { sum: "1.0", reluMlp: 1.0, linearOnly: 0.5, h1: 1.0, h2: 0.0 },
          { sum: "1.5", reluMlp: 0.5, linearOnly: 0.75, h1: 1.5, h2: -1.0 },
          { sum: "2.0", reluMlp: 0.0, linearOnly: 1.0, h1: 2.0, h2: -2.0 },
        ],
      },
      {
        kind: "heading",
        id: "hidden-layers-and-why-depth-helps",
        text: "Hidden layers and why depth helps",
      },
      {
        kind: "paragraph",
        html: "Any layer sitting between the raw input and the final prediction is called a **hidden layer**. Nothing about the math is secretive. It simply holds intermediate activation vectors (for example, `[0.0, 1.3, 0.0, 2.1, 0.7, 0.4]`) that a user never sees as the model's final answer, yet downstream layers use as cleaner coordinates than the raw inputs.",
      },
      {
        kind: "paragraph",
        html: "Think of classifying a photograph. Raw inputs are just grids of pixel intensities where moving an object by one pixel changes almost every number. Early hidden layers learn to detect simple local contrast edges (`horizontal`, `diagonal`, `bright-to-dark`). Subsequent hidden layers combine edges into corners and textures, deeper layers combine textures into recognizable parts like wheels or windows, and the final layer turns those high-level parts into class scores. Nobody programs rules for wheels or edges manually. Training adjusts the weights so useful intermediate representations emerge automatically because they drive prediction error down.",
      },
      {
        kind: "paragraph",
        html: "Mathematically, stacking hidden layers turns one monolithic mapping into **function composition**, much like breaking one enormous 2,000-line script into modular steps (`parse() -> validate() -> transform() -> predict()`) where each stage prepares easier structure for the next:",
      },
      {
        kind: "formula",
        tex: "f(x) = f_3\\bigl(f_2(f_1(x))\\bigr)",
        caption:
          "Each hidden layer transforms the representation produced by the previous layer rather than restarting from raw input features alone.",
      },
      {
        kind: "mermaid",
        caption:
          "How depth builds representations hierarchically: early layers detect low-level edges, middle layers combine them into textures and parts, and the output layer scores categories.",
        code: `flowchart TD
  P["Raw pixels (brightness grid)"] -->|"f1: Layer 1"| E["Edges & local contrast"]
  E -->|"f2: Layer 2"| T["Corners & textures"]
  T -->|"f3: Layer 3"| O["Object parts (wheels, windows)"]
  O -->|"Output Linear"| C["Class logits (car, bicycle, truck)"]`,
      },
      {
        kind: "paragraph",
        html: "Notice how widening one layer and adding deeper layers grow a network along two completely different axes:",
      },
      {
        kind: "table",
        headers: ["Dimension", "What increases", "Role in the network"],
        rows: [
          [
            "**Width**",
            "More neurons working side by side in one layer",
            "Computes more parallel detectors at the same representation level",
          ],
          [
            "**Depth**",
            "More transformation layers stacked sequentially",
            "Adds more steps of composition so later layers reuse what earlier layers already found",
          ],
        ],
        caption:
          "Width adds parallel capacity within one layer, while depth adds sequential stages that reuse earlier features.",
      },
      {
        kind: "paragraph",
        html: "A quick geometric example shows why composition is so economical. Build one two-neuron tent `t(x) = 2 * ReLU(x) - 4 * ReLU(x - 0.5)` on `[0, 1]`: it rises cleanly from `0` at `x = 0` to `1` at `x = 0.5` and drops back to `0` at `x = 1`, creating `2` linear segments. Pass `t(x)` back through a second identical 2-neuron layer (`t(t(x))`), and both halves fold again into `4` segments (`2` peaks using `4` total neurons). Adding one more layer (`t(t(t(x)))`, `6` total neurons) doubles again to `4` peaks (`8` segments). Repeat across `10` layers (`20` total neurons), and repeated folding produces `2^10 = 1,024` linear pieces. Under the **Universal Approximation Theorem**, a single wide hidden layer can represent continuous curves arbitrarily well too, yet building `1,024` distinct hinges flatly in one layer requires around a thousand parallel units rather than `20`. Depth shines whenever structure repeats or composes.",
      },
      {
        kind: "image",
        src: "/articles/exponential-relu-folding.svg",
        alt: "Piecewise-linear sawtooth curves showing exponential folding across depth on x from 0 to 1. One 2-neuron layer makes a single triangle with 2 segments, two layers fold into 2 sharp triangles with 4 segments, and three layers fold into 4 sharp triangles with 8 segments.",
        caption:
          "Each added 2-neuron layer folds every straight ramp back onto itself with sharp linear corners, turning 2 segments into 4 and then 8 without widening any layer.",
        width: 800,
        height: 365,
      },
      {
        kind: "heading",
        id: "reading-an-mlp-in-pytorch",
        text: "Reading a real MLP in PyTorch",
      },
      {
        kind: "paragraph",
        html: "Once you connect neurons, affine matrices, ReLU bends, and layer composition, real neural network code stops looking opaque and reads like a clear wiring diagram. Inspect this compact PyTorch classifier:",
      },
      {
        kind: "code",
        filename: "mlp.py",
        code: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(20, 64),
    nn.ReLU(),
    nn.Linear(64, 10),
)`,
      },
      {
        kind: "paragraph",
        html: "Under the hood, `nn.Sequential` chains those modules in exact top-to-bottom order (`out = layer2(relu(layer1(x)))`), passing each layer's output tensor straight into the next:",
      },
      {
        kind: "list",
        items: [
          "**`nn.Linear(20, 64)`** creates `64` artificial neurons running side by side on the same `20` inputs (`Wx + b`), transforming every `20`-number input vector into a `64`-dimensional intermediate vector.",
          "**`nn.ReLU()`** clamps any negative entries among those `64` numbers to `0` element-wise so the second linear layer cannot collapse linearly back into the first.",
          "**`nn.Linear(64, 10)`** combines the `64` hidden features via `10` output neurons to emit `10` raw class scores called **logits** (unbounded scores such as `[-1.2, 3.8, 0.4, ...]`). Notice there is deliberately **no `nn.ReLU()`** after this final layer: clamping negative scores to zero would erase how strongly the model rejects unlikely classes and prevent loss functions like `CrossEntropyLoss` (which convert logits into class probabilities internally via softmax) from training across negative values.",
        ],
      },
      {
        kind: "mermaid",
        caption:
          "Structural tensor flow through the PyTorch model: 20 input features expand to 64 hidden values, pass through ReLU, and map to 10 output class scores.",
        code: `flowchart TD
  X["20 input features"] -->|"nn.Linear(20, 64)"| H1["64 hidden values"]
  H1 -->|"nn.ReLU()"| H2["64 hidden activations"]
  H2 -->|"nn.Linear(64, 10)"| OUT["10 class scores (logits)"]`,
      },
      {
        kind: "video",
        youtubeId: "cD0gD94tp7g",
        title: "How Neural Networks Actually Learn: Step-by-Step",
        caption:
          "Watch the full animated Brain Link episode covering the ticket neuron, rotating perceptron lines, the XOR grid, ReLU bending space, and this PyTorch architecture.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "Every engineering trade-off for this classifier flows directly out of those three numbers (`20`, `64`, and `10`): they fix the exact shapes of every weight matrix and bias vector, how many bytes the network stores in memory, and how many arithmetic operations run per example. In [Part 2 of this series](/articles/neural-network-parameters-and-flops), we derive parameter counts and FLOPs directly from those layer dimensions and examine where wide single layers hit practical limits.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Deep Feedforward Networks (Chapter 6, Deep Learning)",
            href: "https://www.deeplearningbook.org/contents/mlp.html",
            source: "Ian Goodfellow, Yoshua Bengio, and Aaron Courville",
            note: "Covers the XOR problem, linear collapse, ReLU representation, and depth vs. width.",
          },
          {
            label: "torch.nn.Linear documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.Linear.html",
            source: "PyTorch documentation",
            note: "Applies an affine linear transformation y = xA^T + b across input features.",
          },
          {
            label: "torch.nn.ReLU documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.ReLU.html",
            source: "PyTorch documentation",
            note: "Applies the rectified linear unit max(0, x) element-wise.",
          },
          {
            label: "torch.nn.Sequential documentation",
            href: "https://docs.pytorch.org/docs/stable/generated/torch.nn.Sequential.html",
            source: "PyTorch documentation",
            note: "Sequential container that passes inputs through modules in order.",
          },
          {
            label: "How Neural Networks Actually Learn: Step-by-Step (video)",
            href: "https://www.youtube.com/watch?v=cD0gD94tp7g",
            source: "Brain Link on YouTube",
          },
          {
            label: "Deep Learning Fundamentals playlist",
            href: "https://www.youtube.com/playlist?list=PLX2zaNhVC3Eo",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "how-git-actually-works",
    title: "How Git Actually Works: Fingerprints, Snapshots and a 41-Byte Branch",
    dek: "Git doesn't store your changes. It keeps a small database of objects, each named by a fingerprint of its content. Open the .git folder with real hashes and you can explain what a commit saves, why its ID looks random, and why a new branch costs 41 bytes.",
    topic: "Systems",
    publishedAt: "2026-11-07",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#git", "#version-control", "#internals", "#hashing", "#data-structures"],
    coverImage: "/articles/how-git-actually-works.png",
    body: [
      {
        kind: "paragraph",
        html: "Before version control, most of us had a folder like this: `report.docx`, `report_v2.docx`, `report_v2_final.docx`, `report_v2_final_REAL.docx`. Every version is a full copy, and after a few weeks you can't tell which one is which.",
      },
      {
        kind: "paragraph",
        html: "Git keeps every version of every file in a project, often for years, and the whole history still fits in one hidden folder. It can tell instantly whether anything changed, and creating a branch takes no measurable time. None of that comes from clever compression of differences. It comes from three small ideas, and once you see them, Git stops being a black box.",
      },
      {
        kind: "paragraph",
        html: "By the end of this article you should be able to answer three questions: what Git actually saves when you commit, why every commit has that long random-looking ID, and what a branch really is. No commands to memorise. We'll open the `.git` folder and look at real objects.",
      },
      {
        kind: "video",
        youtubeId: "wReu4datc5U",
        title: "How Git Actually Works",
        caption:
          "I explain the same ideas visually on my channel, Brain Link: the hash changing letter by letter, trees sharing blobs, and the branch label sliding forward.",
        variant: "compact",
      },
      {
        kind: "heading",
        id: "fingerprints",
        text: "Git names everything by a fingerprint of its content",
      },
      {
        kind: "paragraph",
        html: "Start with a practical problem. You have thousands of files across thousands of versions, and you want to know whether a file changed. Comparing every byte against every old copy would be slow. What you want is a short ID that is always the same for the same content and always different when the content changes.",
      },
      {
        kind: "paragraph",
        html: "That is exactly what a **hash function** gives you. Think of it as a machine: put any amount of data in, and a fixed-length fingerprint comes out. The same input always produces the same fingerprint. Git will show you one directly:",
      },
      {
        kind: "code",
        filename: "terminal",
        code: `$ printf 'hello\\n' | git hash-object --stdin
ce013625030ba8dba906f756967f9e9ca394464a

$ printf 'Hello\\n' | git hash-object --stdin
e965047ad7c57865823c7d992b1d046ea66edf78`,
      },
      {
        kind: "paragraph",
        html: "One capital letter, and the fingerprint is completely different. Not slightly different: nearly every character changed. Change it back to `hello` and you get `ce01362…` again, on your machine, on mine, on anyone's. That last property matters more than it looks. Two people who never talk to each other will still give identical content the identical name.",
      },
      {
        kind: "paragraph",
        html: "The fingerprint is 40 characters, and each one is a hexadecimal digit (0 to 9, then a to f). That's just a compact way of writing a very large number, which means the number of possible fingerprints is enormous:",
      },
      {
        kind: "formula",
        tex: "16^{40} = 2^{160} \\approx 1.46 \\times 10^{48}",
        caption:
          "Possible 40-character hexadecimal fingerprints. Two different files landing on the same one by accident is not a practical concern.",
      },
      {
        kind: "paragraph",
        html: "Now the central trick. Git saves each piece of content in a file **named after its fingerprint**. Our `hello` content lives at `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`. The first two characters become a folder name so that no single folder ends up holding hundreds of thousands of files. This is called **content addressing**: things are stored by what they contain, not by a name somebody chose. And because the same content always gets the same address, Git can never store the same content twice.",
      },
      {
        kind: "callout",
        title: "The honest detail behind the hash",
        body: "Git doesn't hash the raw file. It hashes a small header plus the content, here `blob 6\\0hello\\n` (the type, the size in bytes, a null byte, then the data). That's why `ce01362…` isn't the plain SHA-1 of the text: `printf 'hello\\n' | shasum` gives `f572d39…`, while hashing the header-plus-content gives `ce01362…`, the same value Git printed.",
      },
      {
        kind: "paragraph",
        html: "The algorithm is SHA-1. One caveat the usual explanation skips: researchers produced a deliberate SHA-1 collision in 2017 (two different PDFs with the same SHA-1 hash). Accidental collisions are still not a realistic concern, but deliberate ones were, so Git 2.13 switched to a hardened SHA-1 that detects that attack, and newer versions can create repositories that use SHA-256 instead (`git init --object-format=sha256`). Everything in this article works the same either way. Only the fingerprints get longer.",
      },
      {
        kind: "heading",
        id: "three-objects",
        text: "Three kinds of object: blobs, trees and commits",
      },
      {
        kind: "paragraph",
        html: "Everything Git stores is one of a few object types, all filed by fingerprint in `.git/objects`. To see them with real values, make a tiny repository with a fixed author and date. The fixed values matter: a commit's fingerprint includes who made it and when, so with these settings you'll get exactly the hashes shown below.",
      },
      {
        kind: "code",
        filename: "try-it.sh",
        code: `mkdir git-demo && cd git-demo && git init -b main
export GIT_AUTHOR_NAME=Ada GIT_AUTHOR_EMAIL=ada@example.com
export GIT_COMMITTER_NAME=Ada GIT_COMMITTER_EMAIL=ada@example.com
export GIT_AUTHOR_DATE=2026-01-01T00:00:00Z GIT_COMMITTER_DATE=2026-01-01T00:00:00Z

printf 'hello\\n' > hello.txt
git add hello.txt
git commit -m first`,
      },
      {
        kind: "paragraph",
        html: "**Blob.** The file's content, nothing else. A blob has no filename and no date. It's the `ce01362…` object we just hashed.",
      },
      {
        kind: "paragraph",
        html: "**Tree.** If the blob has no name, where does `hello.txt` live? In a tree, which is Git's version of a folder: a list of entries, each with a mode, a type, a fingerprint and a name. A subfolder is just an entry pointing at another tree.",
      },
      {
        kind: "code",
        filename: "terminal",
        code: `$ git cat-file -p HEAD^{tree}
100644 blob ce013625030ba8dba906f756967f9e9ca394464a	hello.txt`,
      },
      {
        kind: "paragraph",
        html: "Here's where content addressing pays off. Add a second file, `copy.txt`, with exactly the same text, and commit both together in a fresh repository. The tree gets two entries, and **both point at the same blob**. Git creates three objects (one blob, one tree, one commit), not four. The duplicate costs one line in a tree.",
      },
      {
        kind: "paragraph",
        html: "**Commit.** A commit points at one tree, the complete snapshot of the project, and adds who, when and why. From the second commit on, it also records its parent: the commit that came before it.",
      },
      {
        kind: "code",
        filename: "terminal",
        code: `$ git cat-file -p HEAD
tree aaa96ced2d9a1c8e72c56b253a0e2fe78393feb7
author Ada <ada@example.com> 1767225600 +0000
committer Ada <ada@example.com> 1767225600 +0000

first`,
      },
      {
        kind: "paragraph",
        html: "That small text is the whole commit. Its own fingerprint is `4c831a3…`, the hash of exactly these lines. (The number after the email is the date as seconds since 1970, followed by the timezone.) There is a fourth object type, the annotated tag, used for release labels, but blobs, trees and commits are what every commit is made of.",
      },
      {
        kind: "heading",
        id: "snapshots",
        text: "Snapshots, not changes",
      },
      {
        kind: "paragraph",
        html: "Most people picture Git storing a list of edits: line 2 added, line 5 removed. It doesn't. Every commit points to a full snapshot of the project. That sounds wasteful until you see what a second commit actually creates. Append the line `world` to `hello.txt` and commit again:",
      },
      {
        kind: "code",
        filename: "terminal",
        code: `$ printf 'world\\n' >> hello.txt
$ git commit -am second
$ git cat-file -p HEAD
tree b2ebf159fb11cd612e1c3e62636be14ce60424ad
parent 4c831a34c24a412d6d390d7cd8d4cae28c7e8e09
author Ada <ada@example.com> 1767225600 +0000
committer Ada <ada@example.com> 1767225600 +0000

second`,
      },
      {
        kind: "paragraph",
        html: "The changed file gets a new blob (`94954ab…`), so the folder listing changes and gets a new tree (`b2ebf15…`), and a new commit points at that tree and back at its parent. Anything that didn't change is referenced by its old fingerprint. Nothing is copied.",
      },
      {
        kind: "mermaid",
        code: `flowchart LR
  C2[commit 5002a2a second] -->|parent| C1[commit 4c831a3 first]
  C1 --> T1[tree aaa96ce]
  C2 --> T2[tree b2ebf15]
  T1 --> B1[blob ce01362 hello]
  T2 --> B2[blob 94954ab hello world]`,
        caption:
          "Each commit points to a complete snapshot (a tree). The second commit points back to its parent. Every label is a real hash from the example.",
      },
      {
        kind: "paragraph",
        html: "Real projects have folders inside folders, so the rule is: one new blob per changed file, one new tree for every folder on the path to it, and one new commit. I checked this with a project of 100 files, 99 of them inside `src/`. Editing one file in `src/` and committing created exactly four objects:",
      },
      {
        kind: "table",
        headers: ["New object", "Why it's needed"],
        rows: [
          ["Blob for the edited file", "Its content changed, so its fingerprint changed"],
          ["Tree for `src/`", "One entry in the folder now points to a different blob"],
          ["Root tree", "Its `src` entry now points to a different tree"],
          ["Commit", "Points to the new root tree and back to the previous commit"],
        ],
        caption:
          "What one edit in a 100-file project creates, verified with git 2.51. The other 99 files reuse their existing blobs.",
      },
      {
        kind: "paragraph",
        html: "There's a quiet consequence here. A commit's fingerprint covers its tree's fingerprint and its parent's fingerprint, and those cover everything beneath and before them. Change one old file, or one word in an old commit message, and every commit after it gets a new ID. You can't rewrite history without everyone's IDs disagreeing, which is what makes Git history tamper-evident.",
      },
      {
        kind: "callout",
        title: "Then why isn't .git enormous?",
        body: "Each object is already zlib-compressed on disk (the `hello` blob file is 21 bytes). Over time Git also packs objects into packfiles, where similar versions of a file are stored as one full copy plus small differences. So Git's model is snapshots, and its storage format uses differences as an optimisation underneath.",
      },
      {
        kind: "heading",
        id: "branches",
        text: "A branch is a 41-byte file",
      },
      {
        kind: "paragraph",
        html: "History is a chain of commits, each pointing back to its parent. The arrows go backwards in time because a commit can only point at something that already existed when it was made. So how does Git know where the chain ends? Look inside `.git`:",
      },
      {
        kind: "code",
        filename: "terminal",
        code: `$ cat .git/refs/heads/main
5002a2ac50307eee79907c0b493dabfeaf3c083c
$ wc -c < .git/refs/heads/main
41
$ cat .git/HEAD
ref: refs/heads/main`,
      },
      {
        kind: "paragraph",
        html: "That's a branch: a file holding one commit fingerprint, 40 characters plus a newline. Creating a branch called `feature` writes one more 41-byte file with the same hash in it. Nothing in your project is copied, which is why branches in Git are effectively free. When you commit on a branch, Git creates the new commit and then rewrites that one file with the new fingerprint. The label slides forward.",
      },
      {
        kind: "paragraph",
        html: "`HEAD` is one level up: it names the branch you're on. It's a pointer to a pointer. Switching branches means pointing `HEAD` at a different branch file, and Git then rebuilds your working folder from that commit's tree. (Depending on your setup and Git version, branch names may also be stored in `.git/packed-refs` or the newer reftable format instead of one file each. The idea is the same: a name mapped to one commit fingerprint.)",
      },
      {
        kind: "paragraph",
        html: "One more piece fits now: the staging area, also called the index. It's Git's draft of the next tree. `git add` writes the blob into `.git/objects` immediately and records it in the draft. `git commit` turns the draft into tree objects and wraps the root tree in a new commit.",
      },
      {
        kind: "paragraph",
        html: "And deleting a branch? Only the 41-byte pointer goes. The commits stay in `.git/objects` as long as anything still points to them, and even unreachable ones survive until Git's garbage collection removes them later, which is how you can often recover a branch you deleted by mistake.",
      },
      {
        kind: "heading",
        id: "check-yourself",
        text: "Check yourself",
      },
      {
        kind: "paragraph",
        html: "Try these before reading the answers. If the model has clicked, you won't need to look anything up.",
      },
      {
        kind: "list",
        items: [
          "**Two people on two computers each save a file containing exactly `hello`. Do they get the same fingerprint?** Yes. Same content, same fingerprint, anywhere.",
          "**You change one word in one file at the top of a project and commit. How many new objects?** Three: one blob for the file, one root tree, one commit. If the file sits in a subfolder, add one tree per folder on the path.",
          "**You create a new branch. How much is copied?** Nothing from your project. Git writes one 41-byte file.",
        ],
      },
      {
        kind: "video",
        youtubeId: "wReu4datc5U",
        title: "How Git Actually Works",
        caption:
          "Watch the same three ideas animated step by step: fingerprints, the three objects, and branches as pointers. If it helps, a like or a subscribe helps the channel reach more people.",
        variant: "feature",
      },
      {
        kind: "paragraph",
        html: "With these three ideas you can already explain features that look magical from the outside. A merge commit is simply a commit with two parents. Pushing is copying objects the other side doesn't have yet, which Git can work out by comparing fingerprints. The next question worth asking is how Git squeezes thousands of snapshots into a small folder, and that's where packfiles and delta compression come in.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Git Internals: Git Objects",
            href: "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects",
            source: "Pro Git, Scott Chacon and Ben Straub",
            note: "Blobs, trees and commits built by hand.",
          },
          {
            label: "Git Internals: Git References",
            href: "https://git-scm.com/book/en/v2/Git-Internals-Git-References",
            source: "Pro Git",
            note: "Branches, HEAD and tags as references.",
          },
          {
            label: "Git Internals: Packfiles",
            href: "https://git-scm.com/book/en/v2/Git-Internals-Packfiles",
            source: "Pro Git",
          },
          {
            label: "git-hash-object documentation",
            href: "https://git-scm.com/docs/git-hash-object",
            source: "Git docs",
          },
          {
            label: "git-cat-file documentation",
            href: "https://git-scm.com/docs/git-cat-file",
            source: "Git docs",
          },
          {
            label: "Hash function transition (SHA-1 to SHA-256)",
            href: "https://git-scm.com/docs/hash-function-transition",
            source: "Git docs",
          },
          {
            label: "SHAttered: the first practical SHA-1 collision",
            href: "https://shattered.io/",
            source: "CWI Amsterdam and Google, 2017",
          },
          {
            label: "Git 2.13 has been released",
            href: "https://github.blog/open-source/git/git-2-13-has-been-released/",
            source: "GitHub Blog",
            note: "Collision-detecting SHA-1 became the default.",
          },
          {
            label: "How Git Actually Works (video)",
            href: "https://www.youtube.com/watch?v=wReu4datc5U",
            source: "Brain Link on YouTube",
          },
        ],
      },
    ],
  },
  {
    slug: "tesla-roadster-fans-thrusters-physics",
    title: "The Roadster Flew on Two Old Ideas and 250 kg of Air",
    dek: "A fan car from 1970 and a spacecraft thruster from the 1960s, in one road car, under software control. The stunts were real. Run the arithmetic and you get about four seconds of hover, and one Tesla claim that does not survive contact with a calculator.",
    topic: "Experiments",
    publishedAt: "2026-10-17",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#tesla", "#aerodynamics", "#propulsion", "#physics", "#spacex"],
    coverImage: "/articles/tesla-roadster-cover.png",
    body: [
      {
        kind: "paragraph",
        html: "On 15 October, at SpaceX's rocket test site in McGregor, Texas, a car drove up a ramp past vertical and stayed there: roughly 21 metres up, upside down, held by nothing but its own fans. Then it let go, caught itself on jets of compressed air, and landed. Later it jumped a parked line of Teslas with a Semi in it, corkscrewing through the air at about seven metres. On the pad it ran 0 to 60 mph in 0.81 seconds. Nobody was driving.",
      },
      {
        kind: "paragraph",
        html: "It looks like new physics. It isn't. There are two ideas here and both are old: the **fan car**, which dates to 1970, and the **cold-gas thruster**, which has been steering spacecraft since the 1960s. What is genuinely new is putting both in one road car and handing them to software quick enough to use them as control surfaces.",
      },
      {
        kind: "paragraph",
        html: "I spent a couple of days taking the claims apart (Tesla's patents, NASA's reports on the hardware, the 1970 Can-Am car this descends from) and running the numbers myself. Most of what Tesla said holds up. One claim doesn't. And the flight, as flown, lasts about four seconds.",
      },
      {
        kind: "callout",
        title: "Whose numbers these are",
        body: "Anything attributed to Tesla is Tesla's figure, taken from the event or its site. Everything in the physics sections is **my own calculation** from those figures, with assumptions stated as I go. There is no independent test of this car, and nothing below should be read as one.",
      },
      {
        kind: "heading",
        id: "what-was-shown",
        text: "What Tesla actually showed",
      },
      {
        kind: "paragraph",
        html: "The reveal had been pushed from 1 October by weather, and landed almost nine years after the first Roadster prototype in November 2017. Three stunts carried it. The car drove up a curved ramp to a pitch of about 170 degrees and hung inverted with an on-screen downforce readout of **4,700 kg**, then dropped and used its thrusters to arrest the fall. It cleared a row of parked vehicles, Semi and Cybercab among them, in what Tesla called a kickflip. And it ran a live 0–60 on the launch pad in **0.81 seconds**, a run Tesla said was cut short because the pad was too small.",
      },
      {
        kind: "paragraph",
        html: "There was no human aboard for any of it. Musk said the car was technically autonomous for the demo, for safety, and a Starman mannequin rode along for one run. In customer hands, Tesla says the Roadster will be the only car it sells that you drive yourself.",
      },
      {
        kind: "table",
        headers: ["Trim", "Seats", "Thrusters", "0–60 mph claim", "Reservation"],
        rows: [
          ["**Performance** (road ready)", "2", "None (fans only)", "Under 1.6 s", "$50,000"],
          ["**Thrust** (race ready)", "2", "Rear only", "Under 0.9 s", "$250,000"],
          ["**Rocket** (air ready)", "1", "10, all around", "Under 0.59 s", "Invite only"],
        ],
        caption:
          "All three are quoted at about 300 miles of range and over 230 mph. Tesla gave no price, battery size, power figure or kerb weight, and its own site marks the flying trim as not approved for public roads. Production is promised for 2028.",
      },
      {
        kind: "heading",
        id: "sticking",
        text: "Half the trick is not flying, it is sticking",
      },
      {
        kind: "paragraph",
        html: "A tyre can only push as hard as the road pushes back. On flat ground that ceiling is set by grip and weight, and Tesla's engineering VP Lars Moravy put it at about **1.26 g**. That single number is why the quickest road cars have sat stubbornly around 1.7 to 2.0 seconds to 60 mph for years. You cannot out-tyre a tyre.",
      },
      {
        kind: "paragraph",
        html: "There are exactly two ways past it: press the car onto the road harder, or push it with something that does not need grip at all. The Roadster does both. The fans do the first.",
      },
      {
        kind: "paragraph",
        html: "This is where fans beat wings. A wing makes downforce out of moving air, so its force grows with the **square** of speed and is precisely zero when you are sitting still on the line. A fan makes downforce out of a pressure difference, which it can hold at any speed, including a standstill. That is the whole reason a fan car can launch harder than an aerodynamic one, and the reason it can hang off a ramp doing 0 mph.",
      },
      {
        kind: "mermaid",
        caption:
          "The suction loop. Nothing is gripping the surface: the fans only lower the pressure underneath, and the atmosphere above does all the pushing.",
        code: `flowchart TD
    SEAL["<b>1 · Seal the floor</b><br/>skirts close the gap to the road,<br/>trapping a pocket of air"]
    PUMP["<b>2 · Pump it out</b><br/>electric fans pull air from the pocket<br/>and exhaust it rearward"]
    DROP["<b>3 · Pressure falls</b><br/>under-floor pressure drops 10-13 kPa,<br/>about a tenth of an atmosphere"]
    PUSH["<b>4 · The atmosphere pushes</b><br/>downforce = pressure drop × floor area<br/>≈ 46 kN over ≈ 4 m²"]
    SENSE["pressure sensors<br/>inside the sealed region"]
    LEAK["air leaking back in<br/>at every gap and bump"]

    SEAL --> PUMP --> DROP --> PUSH
    DROP -. "measured suction" .-> SENSE
    SENSE -. "fan speed · skirt position" .-> PUMP
    LEAK -. "this is the real power bill" .-> PUMP`,
      },
      {
        kind: "paragraph",
        html: "The force itself is almost disappointingly simple. Downforce is just the pressure you remove, multiplied by the area you remove it from:",
      },
      {
        kind: "formula",
        tex: "\\Delta p = \\frac{F}{A}",
        caption:
          "The 4,700 kg readout is about 46 kN of force. Divide by the sealed floor area to get the vacuum needed to produce it.",
      },
      {
        kind: "table",
        headers: ["Assumed sealed floor area", "Pressure drop needed", "Share of one atmosphere"],
        rows: [
          ["3.5 m²", "13.2 kPa", "13%"],
          ["4.0 m²", "11.5 kPa", "11%"],
          ["4.5 m²", "10.2 kPa", "10%"],
        ],
        caption:
          "My calculation from Tesla's 4,700 kg readout. The headline is how little vacuum is required: roughly a tenth of an atmosphere. A small pressure difference across a large area is a very large force.",
        numericColumns: [1, 2],
      },
      {
        kind: "paragraph",
        html: "So the hard part was never the vacuum. It is the **seal**. Air floods back in through every gap between floor and road, and the fans have to evacuate it at least as fast as it arrives. The power a fan puts into the air is the pressure difference it sustains times the volume it moves, and that volume is set almost entirely by how much is leaking.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Fan power against ride-height gap at the seal",
        xKey: "gap",
        xLabel: "gap between skirt and road",
        yLabel: "fan power (kW)",
        note: "My estimate: 4 m² floor, 13 m sealing edge, 60% fan efficiency",
        caption:
          "Roughly 20 kW for every extra millimetre of gap. On a smooth test ramp a tight seal is easy. On a public road with bumps, camber and debris, holding it is the entire engineering problem.",
        series: [{ key: "power", label: "fan power" }],
        data: [
          { gap: "3 mm", power: 60 },
          { gap: "5 mm", power: 100 },
          { gap: "10 mm", power: 210 },
        ],
      },
      {
        kind: "callout",
        title: "Why this needed a big battery",
        body: "The 1970 Chaparral 2J sealed about 4.5 m² and made roughly 11,000 N. That is a pressure drop of only about 2.4 kPa, which its fans delivered with around 11 kW of air power from a 45 hp snowmobile engine. Tesla's 4,700 kg readout needs suction **four to five times deeper** than that. An electric car carrying a very large battery is a far better home for this idea than a 1970 race car ever was.",
      },
      {
        kind: "paragraph",
        html: 'Tesla has two granted patents covering the fan system. [US 12,377,920 B1](https://patents.google.com/patent/US12377920B1/en), filed April 2025 and granted that August, describes four fans with deployable skirts and two operating modes: all skirts down and the central fans evacuating a sealed region for low-speed launches, then front and rear skirts lifting at higher speed while all four fans push air under the car. It is close to what Moravy described on stage. Crucially, its controller reads **pressure sensors inside the sealed region**, meaning the car can measure its own suction and close the loop. A second patent, "Electric fan car", granted in September 2026, puts four ducted fans in the rear diffuser with no skirts at all. A third covers a hidden active rear wing rated to 700 kg, using actuators from the Optimus programme.',
      },
      {
        kind: "paragraph",
        html: "Neither patent states a downforce or pressure figure. They describe how the thing works, not how hard it pulls. Every performance number in this article is Tesla's event claim or my arithmetic on top of it.",
      },
      {
        kind: "heading",
        id: "flying",
        text: "The flying part is a 1960s spacecraft thruster",
      },
      {
        kind: "paragraph",
        html: 'A cold-gas thruster is the simplest rocket that exists. Store gas at high pressure, open a valve, let it out through a nozzle. Nothing burns, hence "cold". NASA\'s Manned Maneuvering Unit, the jet backpack astronauts flew untethered in the 1980s, used 24 nitrogen cold-gas thrusters. SpaceX steers Falcon 9 boosters with the same class of hardware on the way back down.',
      },
      {
        kind: "mermaid",
        caption:
          "The gas path. The bell is what makes it supersonic: past the throat the flow keeps accelerating, and the banded shock pattern in the exhaust (Mach diamonds) is the visible proof.",
        code: `flowchart TB
    TANK[("COPV tank<br/>≈380 bar · 250 kg of air")]
    VALVE["fast electric valve<br/>micro-adjusts in a fraction of a second"]
    THROAT["converging throat<br/>flow reaches Mach 1"]
    BELL["diverging bell<br/>flow goes supersonic"]
    OUT["exhaust ≈ 690 m/s<br/>Mach diamonds in the plume"]
    THRUST["thrust: over 80 kN<br/>across 10 nozzles"]

    TANK --> VALVE --> THROAT --> BELL --> OUT
    OUT -. "Newton's third law" .-> THRUST`,
      },
      {
        kind: "paragraph",
        html: "Cold gas is popular because it is simple, reliable, and can fire in very short, repeatable pulses, which is exactly what you want for attitude control. Its weakness is efficiency. Rocket people measure that as **specific impulse**, in seconds, and nitrogen cold gas manages roughly 65 to 76 s at best, against several hundred for a chemical engine. Air is mostly nitrogen, so air behaves about the same. That single limitation is why this car empties its tanks in seconds rather than minutes.",
      },
      {
        kind: "list",
        items: [
          "**Ten nozzles**, fed from about 600 litres of tank volume holding roughly **250 kg of air** (Moravy).",
          "**Four main thrusters** in the rear diffuser for acceleration, plus **attitude thrusters at the corners**. Fire one side then the other and the car rolls, and stops rolling.",
          "**Over 80 kN** of total thrust, per Tesla. That would hold up more than 8,000 kg against gravity.",
          "**All-electric valves**, which Tesla says adjust in a fraction of a second. That speed is what makes thrusters usable for control rather than just a straight-line launch.",
          "**Self-refilling tanks**, claimed by Musk, with no word on how, or how long it takes.",
          "Tesla noted this was **harder than in space**: at sea level the atmosphere pushes back on the nozzle exit, which needed new hardware and new control logic.",
        ],
      },
      {
        kind: "heading",
        id: "does-it-add-up",
        text: "Does it add up?",
      },
      {
        kind: "paragraph",
        html: "Mostly, yes. Start with the acceleration claims, because they make the case for the fans on their own. Average acceleration to 60 mph is just 26.8 m/s divided by the time, and every single trim lands above what tyres alone can deliver.",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Average g needed for each 0–60 mph claim",
        xKey: "run",
        xLabel: "0–60 mph time",
        yLabel: "average g required",
        note: "My calculation from Tesla's quoted times",
        caption:
          "The flat line is Moravy's 1.26 g tyre ceiling. Even the fan-only Performance trim sits above it, which means the fans must be adding real grip at launch. The thruster trims are far beyond anything grip can supply. Only thrust gets you there.",
        series: [
          { key: "needed", label: "g required" },
          { key: "tyres", label: "tyres alone (1.26 g)" },
        ],
        data: [
          { run: "1.60 s", needed: 1.71, tyres: 1.26 },
          { run: "0.90 s", needed: 3.04, tyres: 1.26 },
          { run: "0.81 s", needed: 3.38, tyres: 1.26 },
          { run: "0.59 s", needed: 4.63, tyres: 1.26 },
        ],
      },
      {
        kind: "paragraph",
        html: "Now the part that decides what this car actually is. Expanding air from about 380 bar to sea level at 20 °C gives an exhaust velocity of roughly 690 m/s, a specific impulse near 71 s, right in the textbook band. Thrust is mass flow times exhaust velocity, so run it backwards:",
      },
      {
        kind: "formula",
        tex: "\\dot{m} = \\frac{F}{v_e} = \\frac{80{,}000\\ \\text{N}}{690\\ \\text{m/s}} \\approx 115\\ \\text{kg/s}",
        caption:
          "At full thrust the car consumes about 115 kg of air every second. It carries 250 kg.",
      },
      {
        kind: "paragraph",
        html: "That is **about two seconds** of full thrust, and realistically less, because thrust decays as the tank pressure falls. Hovering is gentler (you only need to cancel weight, roughly 23 kN, which burns about 33 kg/s), and even then I make it **four to five seconds** of hover per full tank. Which is precisely what we were shown: hops, flips and landings. Not flight.",
      },
      {
        kind: "callout",
        title: "The one claim that does not survive the arithmetic",
        body: "Tesla posted that thrust is **4 to 5 times** the tyre force. If the 4,700 kg readout was the fans at their stated 2 g, the car weighs about 2,350 kg, consistent with Marques Brownlee's remark that it is over 4,000 lb. At that mass, tyre force at 1.26 g is about 29 kN, so 80 kN is **2.8×**, not 4–5×. For Tesla's ratio to hold, the car would have to weigh around 1,450–1,600 kg, or the thrust would have to be well above 80 kN. Tesla has not said which, and at the weight its own readout implies, the two figures cannot both be right.",
      },
      {
        kind: "paragraph",
        html: "Worth noting that the headline claim still survives even at the heavier figure: at 2,350 kg, tyres plus 80 kN give about 4.7 g, just clearing the 4.63 g that a 0.59-second run demands. The ratio is wrong. The time is reachable.",
      },
      {
        kind: "heading",
        id: "tanks",
        text: "The riskiest part is not the flying",
      },
      {
        kind: "paragraph",
        html: "It is the tanks. Tesla stores the air in **composite overwrapped pressure vessels**: a thin liner wrapped in carbon fibre, the same class of hardware SpaceX flies. Two of them, with Tesla saying every usable void in the car is packed with tankage. Nobody stated a pressure on stage, but 250 kg in 600 litres works out to about 417 kg/m³, roughly 340 times the density of sea-level air, which puts you in the several-hundred-bar range. A trackside screen in Tesla's own photos reportedly read 5,500 psi, about 380 bar.",
      },
      {
        kind: "paragraph",
        html: "A tank that size is a large amount of stored energy sitting in a road car, and the failure modes are well documented:",
      },
      {
        kind: "list",
        items: [
          "**Stress rupture.** Carbon fibre can fail after long periods under sustained load, below its rated burst strength. NASA has studied this for decades because COPVs sit on nearly every spacecraft, and published fresh work on it in 2026.",
          "**It has happened.** The September 2016 AMOS-6 pad loss destroyed a Falcon 9 and its payload, and SpaceX traced it to a COPV. Room-temperature air is a far gentler case, but the hardware class earns respect.",
          "**Road cars are worse than rockets** in one specific way: crashes, fire, and thousands of fill cycles. Hydrogen and CNG vehicles already certify tanks against exactly this. A road-legal thruster car would have to do the same.",
          "**Cold.** Gas leaving a tank chills what remains, hard. Valves and nozzles have to keep working far below freezing, and the air has to be bone dry or it will ice up mid-firing.",
        ],
      },
      {
        kind: "heading",
        id: "lineage",
        text: "Everything here has been built before",
      },
      {
        kind: "table",
        headers: ["Car", "Year", "How the fan was driven", "Downforce", "What happened"],
        rows: [
          [
            "[Chaparral 2J](https://petroleummuseum.org/chaparral-2j/)",
            "1970",
            "Two 17-inch fans on a separate 45 hp snowmobile engine",
            "≈11,000 N over ≈4.5 m²",
            "Fastest in qualifying, never won, banned after one Can-Am season",
          ],
          [
            "[Brabham BT46B](https://www.motorsportmagazine.com/archive/article/march-2001/58/brabham-bt46b/)",
            "1978",
            "One fan geared to the race engine, costing 30–40 hp",
            "Never published",
            "Won its only race, then withdrawn and banned",
          ],
          [
            "Gordon Murray T.50",
            "2020s",
            "One 400 mm electric fan at the rear",
            "≈50% more in high-downforce mode",
            "In production as a road car",
          ],
          [
            "[McMurtry Spéirling](https://www.motoringresearch.com/car-news/mcmurtry-speirling-drives-upside-down)",
            "2022–26",
            "Twin electric fans to 23,000 rpm",
            "2,000 kg from 0 mph, on a ~1,000 kg car",
            "First car to drive upside down, on a rig, April 2025",
          ],
          [
            "**Tesla Roadster**",
            "2026",
            "Electric fans (count and power not stated)",
            "4,700 kg readout, up to 2 g claimed",
            "Held itself inverted on a ramp at the reveal",
          ],
        ],
        caption:
          "The 2J is the direct ancestor, and the Spéirling is the closest modern match. Tesla's contribution is doing it with a much heavier car, and bolting thrusters on.",
      },
      {
        kind: "paragraph",
        html: "The Chaparral 2J is worth knowing properly. Jim Hall's team sealed the floor with flexible Lexan skirts linked to the suspension, holding about a 25 mm gap to the road. With the fans running, the car visibly squatted about 5 cm. It was the quickest thing in qualifying and it kept breaking, mostly in the fan drive. Rivals argued the skirts were a movable aerodynamic device, which the rules banned, and complained about the grit it fired at them. The SCCA killed it after a single season.",
      },
      {
        kind: "paragraph",
        html: "Gordon Murray's Brabham BT46B came from a packaging problem: the flat-12 Alfa engine sat exactly where ground-effect tunnels needed to be, so a fan did the job instead. Murray maintained the fan was there to cool the engine. It won its first race so comprehensively that it never raced again.",
      },
      {
        kind: "paragraph",
        html: 'The thruster half has a quieter precedent. In 2018 **Bosch tested a motorcycle** that fires a sideways gas jet when sensors detect the front wheel sliding, nudging the bike back onto its line. It used airbag-style gas generators, so it was single-use. That is the useful reframing here. A thruster that fires when the tyres let go is not a stunt. It is an active safety system. Musk first promised a "SpaceX package" of about ten small thrusters back in June 2018. This is that promise, eight years late.',
      },
      {
        kind: "heading",
        id: "verdict",
        text: "Confirmed, claimed, and questionable",
      },
      {
        kind: "table",
        headers: ["Claim", "Status", "Basis"],
        rows: [
          [
            "Revealed 15 Oct 2026 at SpaceX McGregor",
            "**Confirmed**",
            "Live event, covered by CNN, CBS, TechCrunch and others",
          ],
          [
            "No human aboard during the stunts",
            "**Confirmed**",
            "Stated on stage, and a mannequin rode one run",
          ],
          [
            "Held itself inverted, flipped, landed",
            "**Confirmed as shown**",
            "Livestream and live audience",
          ],
          [
            "Up to 2 g of fan suction, 4,700 kg",
            "Tesla's figure",
            "On-screen readout, with no independent test",
          ],
          [
            "Over 80 kN thrust, 250 kg air, 10 nozzles",
            "Tesla's figure",
            "Stated by Tesla and consistent with basic physics",
          ],
          [
            "0–60 mph in 0.81 s",
            "Shown once",
            "Live run on a cut-short pad, with no independent timing",
          ],
          [
            "Thrust is 4–5× tyre force",
            "**Questionable**",
            "Only holds if the car is far lighter than the 4,700 kg readout implies",
          ],
          [
            "Sustained flight",
            "**Not shown**",
            "Hops of a few seconds, and my estimate caps hover at 4–5 s",
          ],
          [
            "Street-legal thrusters",
            "**Unclear**",
            "Musk said it may not be legal everywhere, and the Rocket trim is marked not road approved",
          ],
          [
            "Production in 2028",
            "Promise",
            "The Roadster has slipped repeatedly since its promised 2020 launch",
          ],
        ],
        caption:
          "One report dissents: Motor1 described the inverted section as a suction rig with a tethered flip, where other outlets describe the car's own fans holding it unaided. I could not resolve that from the coverage.",
      },
      {
        kind: "paragraph",
        html: "Then there are the questions Tesla simply has not answered. What does the car weigh in each trim? How many fans does it have, at what power, and does the production car use skirts at all? How do the tanks refill, how long does that take, and how many launches does a fill buy? May the Thrust trim legally fire on a public road? How does a several-hundred-bar tank get certified for crash and fire? And what happens if a fan quits or the seal breaks while the car is inverted, or a valve sticks mid-air? Gizmodo, citing MotorTrend, reports the FAA imposed airspace limits around the test site for the event, which is its own kind of answer about where this sits.",
      },
      {
        kind: "paragraph",
        html: "A demo proves a stunt can be done once, under conditions its engineers chose. That is not nothing. Holding 2,350 kg inverted on fan suction alone is a genuinely hard thing that nobody had done at this mass. But the gap between that and a car you can buy is measured in tank certification, seal durability on broken tarmac, and a regulator deciding what a road vehicle that leaves the ground actually is. The physics is sound and mostly old. The engineering is the part that is new, and it is the part we have seen least of.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Tesla reveals SpaceX-powered Roadster that flies and falls with style",
            href: "https://techcrunch.com/2026/10/15/tesla-reveals-spacex-powered-roadster-that-flies-and-falls-with-style/",
            source: "TechCrunch",
          },
          {
            label: "Tesla unveils what it says is a flying car",
            href: "https://www.cnn.com/2026/10/15/business/tesla-unveils-what-it-says-is-a-flying-car",
            source: "CNN",
          },
          {
            label: "Roadster",
            href: "https://www.tesla.com/roadster",
            source: "Tesla",
            note: "Trim table, range and road-approval note.",
          },
          {
            label: "US 12,377,920 B1: Adaptive vehicle aerodynamics for downforce",
            href: "https://patents.google.com/patent/US12377920B1/en",
            source: "Google Patents",
            note: "Four fans, deployable skirts, two modes, pressure sensors in the sealed regions.",
          },
          {
            label: "Feasibility Study of a Fan-Driven Device Generating Downforce for Road Cars",
            href: "https://www.mdpi.com/1996-1073/15/15/5549",
            source: "Szudarek, Piechna & Piechna, Energies 15(15) 5549, 2022",
            note: "The closest academic work: CFD of fan downforce on a road car, and the best technical account of the Chaparral 2J.",
          },
          {
            label: "Ground effect aerodynamics of race cars",
            href: "https://eprints.soton.ac.uk/42969",
            source: "Zhang, Toet & Zerihan, Applied Mechanics Reviews 59(1), 2006",
          },
          {
            label: "NASA Contractor Report 198531: small spacecraft propulsion comparison",
            href: "https://ntrs.nasa.gov/api/citations/19970001472/downloads/19970001472.pdf",
            source: "NASA NTRS",
            note: "Gives nitrogen cold gas a maximum specific impulse of 76 s.",
          },
          {
            label: "Simulation of a Cold Gas Thruster System and Test Data Correlation",
            href: "https://ntrs.nasa.gov/search.jsp?R=20120003741",
            source: "Hauser & Quinn, NASA TM-2012-217271",
            note: "Why the whole gas system must be modelled, not just the nozzle.",
          },
          {
            label: "Mechanics leading to stress rupture failure in carbon fibre COPVs",
            href: "https://ntrs.nasa.gov/citations/20260002192",
            source: "NASA TM-20260002192, 2026",
          },
          {
            label: "Chaparral 2J",
            href: "https://petroleummuseum.org/chaparral-2j/",
            source: "Permian Basin Petroleum Museum",
          },
          {
            label: "McMurtry Spéirling drives upside down",
            href: "https://www.motoringresearch.com/car-news/mcmurtry-speirling-drives-upside-down",
            source: "Motoring Research",
          },
          {
            label: "Bosch tests gas-jet accident prevention for motorcycles",
            href: "https://autocarpro.in/news-international/bosch-accident-prevention-29537",
            source: "Autocar Professional, 2018",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-cap-time-machine-on-a-shared-ssd",
    title: "Putting Time Machine on a Storage Budget",
    dek: "I share a 2 TB external SSD between everyday project files and macOS backups. When Time Machine crossed 700 GB with no sign of slowing down, I needed a way to set a hard boundary. Here is how APFS containers, tmutil, and macOS permissions work together to cap it.",
    topic: "Systems",
    publishedAt: "2026-10-03",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#macos", "#timemachine", "#apfs", "#storage", "#cli", "#systems"],
    coverImage: "/articles/time-machine-quota-cover.png",
    body: [
      {
        kind: "paragraph",
        html: "I plug a 2 TB Samsung T7 SSD into my MacBook every morning. Most of it holds active code repositories, datasets, and working files. The rest was supposed to quietly run Time Machine in the background.",
      },
      {
        kind: "paragraph",
        html: "One morning I opened Disk Utility and noticed the backup volume had grown past 719 GB. That is not an error. Time Machine is built to save hourly, daily, and weekly snapshots so you can roll back files whenever you need to.",
      },
      {
        kind: "paragraph",
        html: "The problem is that APFS volumes share all free space across their container. Without a quota, Time Machine treats every empty gigabyte as available room. If I left it unchecked, it would eventually squeeze out my projects. I wanted a clear boundary: give Time Machine at most 800 GB, and protect the remaining 1.2 TB for my daily work.",
      },
      {
        kind: "heading",
        id: "the-problem",
        text: "The Problem with Shared Storage",
      },
      {
        kind: "paragraph",
        html: "My setup looked like this:",
      },
      {
        kind: "mermaid",
        caption:
          "The shared SSD setup. Both Time Machine and my project files live inside the same APFS container.",
        code: `flowchart TD
    MAC["MacBook<br/>~500 GB internal SSD"]
    SSD["Samsung T7 Shield<br/>2 TB external SSD"]
    CONTAINER["APFS Container"]
    TM["EX-Time Machine<br/>Time Machine volume"]
    PROJECTS["SAMSUNG T7<br/>Projects & files"]

    MAC --> SSD
    SSD --> CONTAINER
    CONTAINER --> TM
    CONTAINER --> PROJECTS`,
      },
      {
        kind: "paragraph",
        html: "The drive was handling two jobs at once. My backup volume had reached 719.6 GB. While that still left room on a 2 TB drive, there was no upper limit to stop it from expanding further.",
      },
      {
        kind: "code",
        filename: "target-budget.txt",
        code: `2 TB Samsung T7 Shield
├── EX-Time Machine (Volume)
│   └── Quota: 800 GB maximum
└── SAMSUNG T7 (Volume)
    └── Remaining space for projects and files (~1.2 TB)`,
      },
      {
        kind: "paragraph",
        html: "I did not want to disable Time Machine, and I did not want to delete old backups manually. I simply wanted to tell macOS: use this much space, and stop there.",
      },
      {
        kind: "heading",
        id: "backup-direction",
        text: "First, What Is Time Machine Backing Up?",
      },
      {
        kind: "paragraph",
        html: "It is easy to get the direction reversed when planning this out. Time Machine copies data from the Mac onto the external drive. The laptop is the source, and the external SSD is the destination.",
      },
      {
        kind: "mermaid",
        caption:
          "Backup direction. Data flows from the internal Mac drive to the external storage volume.",
        code: `flowchart LR
    MAC["Mac<br/>Apps, documents, system data"]
    TM["External SSD<br/>Time Machine backup destination"]
    MAC -->|"Backup"| TM`,
      },
      {
        kind: "paragraph",
        html: "Apple suggests using a backup drive with at least twice the storage capacity of the Mac. On a 500 GB Mac, that points to about 1 TB or more. But that recommendation is about keeping months of historical versions, not a requirement to run at all. Because I share the disk with my code, 800 GB gave me plenty of backup room while protecting space for my files.",
      },
      {
        kind: "heading",
        id: "why-apfs-matters",
        text: "Why APFS Space Sharing Matters",
      },
      {
        kind: "paragraph",
        html: "Older filesystems forced you to divide a disk into rigid partitions. If you assigned 800 GB to Partition A and 1.2 TB to Partition B, Partition B could never use empty space sitting inside Partition A.",
      },
      {
        kind: "paragraph",
        html: "APFS changes this with space sharing. Multiple volumes sit inside one APFS container and share the same pool of free space dynamically. That means my project volume and backup volume can adapt without wasting storage.",
      },
      {
        kind: "mermaid",
        caption: "APFS container layout with an 800 GB quota on the backup volume.",
        code: `flowchart TD
    SSD["2 TB External SSD"] --> APFS["APFS Container"]
    APFS --> TM["EX-Time Machine<br/>~719.6 GB used"]
    APFS --> FILES["SAMSUNG T7<br/>Projects & files"]
    TM --> QUOTA["Target Quota<br/>800 GB ceiling"]`,
      },
      {
        kind: "callout",
        title: "Reserve Size vs. Quota Size",
        body: "Disk Utility provides two volume size controls. A reserve size guarantees a minimum amount of space that other volumes cannot touch. A quota size sets a hard ceiling on how much space a volume can claim. For Time Machine, a quota is what keeps it from eating the drive.",
      },
      {
        kind: "paragraph",
        html: "Apple supports keeping Time Machine and regular files on the same external drive, provided they live in separate APFS volumes inside the container rather than in the same folder.",
      },
      {
        kind: "mermaid",
        caption: "Separate APFS volumes for backups and project files inside one container.",
        code: `flowchart TD
    SSD["External SSD"] --> CONTAINER["Shared APFS Container"]
    CONTAINER --> TM["Time Machine Volume"]
    CONTAINER --> FILES["Projects Volume"]
    TM --> BACKUPS["Time Machine backups"]
    FILES --> PROJECTS["Projects and working files"]`,
      },
      {
        kind: "heading",
        id: "setting-the-quota",
        text: "Setting the Quota on an Existing Backup",
      },
      {
        kind: "paragraph",
        html: "If you are setting up a fresh drive, macOS can ask you for size limits in System Settings when you first add the backup disk. But if your backup is already running and already holds hundreds of gigabytes, the graphical interface does not give you an option to add a quota later. For that, you need the Terminal tool <code>tmutil</code>.",
      },
      {
        kind: "heading",
        id: "step-1-find-destination",
        text: "Step 1: Find Your Time Machine Destination ID",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Open Terminal and run:",
      },
      {
        kind: "code",
        filename: "check-destination.sh",
        code: "tmutil destinationinfo",
      },
      {
        kind: "paragraph",
        html: "The output looks like this:",
      },
      {
        kind: "code",
        filename: "destinationinfo.txt",
        code: `Name          : EX-Time Machine
Kind          : Local
Mount Point   : /Volumes/EX-Time Machine
ID            : <YOUR-TIME-MACHINE-DESTINATION-ID>
Quota         : -`,
      },
      {
        kind: "paragraph",
        html: "The line <code>Quota : -</code> confirms that no limit is currently set. Copy the value under <code>ID</code>. It is a unique UUID that looks like <code>12345678-ABCD-1234-ABCD-123456789ABC</code>. You will need it in the next step.",
      },
      {
        kind: "heading",
        id: "step-2-full-disk-access",
        text: "Step 2: Give Terminal Full Disk Access",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When I first ran the quota command, macOS refused to execute it:",
      },
      {
        kind: "code",
        filename: "error.txt",
        code: "tmutil: setquota: Operation not permitted",
      },
      {
        kind: "paragraph",
        html: "Even with <code>sudo</code>, macOS blocked the change. On modern macOS, root privileges give you standard UNIX permissions, but Apple guards disk management behind a separate privacy system called TCC (Transparency, Consent, and Control). To run disk management commands like <code>setquota</code>, Terminal needs Full Disk Access.",
      },
      {
        kind: "callout",
        title: "Sudo Does Not Bypass TCC",
        body: "Root privileges elevate your process ID, but macOS privacy controls check the host application itself. If Terminal does not have Full Disk Access, the operating system blocks the command regardless of sudo.",
      },
      {
        kind: "paragraph",
        html: "Here is how to enable it:",
      },
      {
        kind: "list",
        items: [
          "Open <strong>System Settings → Privacy & Security → Full Disk Access</strong>.",
          "Find <strong>Terminal</strong> (or iTerm2 / Ghostty if you use an alternative) and switch the toggle on.",
          "Quit Terminal completely with <code>Cmd + Q</code> and reopen it so the new permission takes effect.",
        ],
      },
      {
        kind: "heading",
        id: "step-3-apply-quota",
        text: "Step 3: Set the Quota",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Run the command with your destination ID and your chosen limit in gigabytes:",
      },
      {
        kind: "code",
        filename: "set-quota.sh",
        code: "sudo tmutil setquota <YOUR-TIME-MACHINE-DESTINATION-ID> 800",
      },
      {
        kind: "paragraph",
        html: "The command finishes without extra output. The new limit takes effect on the next backup pass.",
      },
      {
        kind: "heading",
        id: "step-4-verify",
        text: "Step 4: Verify the New Limit",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Run <code>destinationinfo</code> again to make sure the change applied:",
      },
      {
        kind: "code",
        filename: "verify-quota.sh",
        code: "tmutil destinationinfo",
      },
      {
        kind: "paragraph",
        html: "The quota line will now display your value:",
      },
      {
        kind: "code",
        filename: "verified.txt",
        code: `Name          : EX-Time Machine
Kind          : Local
Mount Point   : /Volumes/EX-Time Machine
ID            : <YOUR-TIME-MACHINE-DESTINATION-ID>
Quota         : 800 GB`,
      },
      {
        kind: "paragraph",
        html: "You can also check Disk Utility. The volume summary should show a capacity of 800 GB, about 719.6 GB used, and roughly 80.4 GB of available headroom.",
      },
      {
        kind: "heading",
        id: "step-5-run-backup",
        text: "Step 5: Run an Actual Backup",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Do not stop at the terminal output. Start a real backup to confirm everything still works:",
      },
      {
        kind: "code",
        filename: "run-backup.sh",
        code: "tmutil startbackup --auto",
      },
      {
        kind: "paragraph",
        html: "The backup completed cleanly. The drive now operates with predictable boundaries:",
      },
      {
        kind: "mermaid",
        caption:
          "Verified setup. Time Machine is limited to 800 GB, leaving the rest of the drive for project files.",
        code: `flowchart LR
    MAC["MacBook<br/>~500 GB internal storage"]
    SSD["2 TB External SSD"]
    TM["Time Machine<br/>~719.6 GB used<br/>800 GB quota"]
    FILES["Projects / Files<br/>Remaining shared capacity"]

    MAC -->|"Time Machine backup"| TM
    SSD --> TM
    SSD --> FILES`,
      },
      {
        kind: "heading",
        id: "what-happens-at-the-limit",
        text: "What Happens When Time Machine Hits the Limit?",
      },
      {
        kind: "paragraph",
        html: "A common concern is whether Time Machine will stop working or crash when it reaches 800 GB. It will not. Time Machine manages its own history. When disk space runs low, it automatically removes the oldest daily and weekly snapshots to make room for newer ones.",
      },
      {
        kind: "paragraph",
        html: "It never deletes your most recent backup. A quota simply determines how far back in time you can go. A generous quota preserves months of snapshots, while a tighter quota keeps fewer older versions.",
      },
      {
        kind: "heading",
        id: "edge-cases",
        text: "Important Edge Cases",
      },
      {
        kind: "heading",
        id: "existing-backup-too-large",
        text: "What If Your Backup Is Already Bigger Than the Target Quota?",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "In my case, I was using about 719.6 GB and set the quota to 800 GB, so I had some breathing room. But if your backup is already sitting at 950 GB, trying to force an 800 GB quota right away can cause issues.",
      },
      {
        kind: "list",
        items: [
          "<strong>Start with a quota above current usage</strong>: Set it to something like 1 TB first, and let older snapshots age out naturally.",
          "<strong>Add exclusions for throwaway files</strong>: In System Settings, exclude heavy development directories like <code>node_modules</code>, Python virtual environments, and build caches so future backups stay compact.",
          "<strong>Recreate the volume only if history is not needed</strong>: If you do not care about past versions, you can erase the APFS volume and start fresh with a quota. Deleting an APFS volume permanently removes all historical backups.",
        ],
      },
      {
        kind: "heading",
        id: "local-snapshots",
        text: "External Backups vs. Local APFS Snapshots",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Setting a quota on your external SSD does not stop macOS from creating local snapshots on your Mac when the external drive is unplugged. Those are separate. macOS keeps them on the internal disk and purges them automatically whenever internal space is needed.",
      },
      {
        kind: "mermaid",
        caption: "Local snapshots on the Mac vs. longer-term history on the external drive.",
        code: `flowchart TD
    MAC["Mac Internal SSD"] --> LOCAL["Local APFS Snapshots<br/>Pruned automatically by macOS"]
    MAC -->|"Backup"| EXTERNAL["External Time Machine Volume"]
    EXTERNAL --> HISTORY["Longer-term Backup History<br/>Capped at 800 GB quota"]`,
      },
      {
        kind: "heading",
        id: "things-to-avoid",
        text: "Things I Would Avoid",
      },
      {
        kind: "list",
        items: [
          "<strong>Do not publish your real destination ID</strong>: Use placeholders like <code>&lt;YOUR-DESTINATION-ID&gt;</code> if you share your terminal output.",
          "<strong>Do not copy my 800 GB number blindly</strong>: Choose a size that matches your Mac storage, file change frequency, and project needs.",
          "<strong>Do not assume sudo solves every permission problem</strong>: Modern macOS security requires Full Disk Access for disk operations.",
          "<strong>Do not treat this as a complete backup strategy</strong>: A quota limits space, but it does not protect against drive failure.",
        ],
      },
      {
        kind: "heading",
        id: "the-bigger-lesson",
        text: "The Bigger Lesson: This Is Not a Full Backup Strategy",
      },
      {
        kind: "paragraph",
        html: "Using <code>tmutil setquota</code> solved my immediate storage headache. My Samsung T7 SSD now has predictable room for both active projects and system backups without running out of space.",
      },
      {
        kind: "paragraph",
        html: "Still, keeping your working files and your backup on the exact same physical drive means that if the drive fails, gets lost, or suffers hardware damage, you lose both copies at once.",
      },
      {
        kind: "paragraph",
        html: "The classic 3-2-1 backup rule suggests three copies of important data on two different types of media, with one copy kept off-site. A storage quota makes local backups manageable, but an encrypted off-site backup is still essential.",
      },
      {
        kind: "heading",
        id: "quick-reference",
        text: "Quick Reference",
      },
      {
        kind: "list",
        items: [
          "<strong>Find destination ID</strong>: <code>tmutil destinationinfo</code>",
          "<strong>Enable Full Disk Access</strong>: System Settings → Privacy & Security → Full Disk Access → Terminal, then restart Terminal.",
          "<strong>Set the quota</strong>: <code>sudo tmutil setquota &lt;YOUR-DESTINATION-ID&gt; 800</code>",
          "<strong>Verify</strong>: Check <code>Quota : 800 GB</code> in <code>tmutil destinationinfo</code> and Disk Utility.",
          "<strong>Test</strong>: Run <code>tmutil startbackup --auto</code> to verify that the backup finishes cleanly.",
        ],
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Apple Support: Back up your Mac with Time Machine",
            href: "https://support.apple.com/en-nz/104984",
            source: "Apple Support",
            note: "Official setup guide and hardware recommendations.",
          },
          {
            label: "Apple Support: Connect a new backup disk to your Mac",
            href: "https://support.apple.com/en-au/guide/mac-help/mh11430/mac",
            source: "Apple macOS User Guide",
            note: "Initial setup flow in System Settings and disk configuration.",
          },
          {
            label: "Apple Support: Backup disks you can use with Time Machine",
            href: "https://support.apple.com/en-au/102423",
            source: "Apple Support",
            note: "Supported storage formats and filesystem requirements.",
          },
          {
            label: "Apple Support: Add, delete, or erase APFS volumes in Disk Utility",
            href: "https://support.apple.com/en-mide/guide/disk-utility/dskua9e6a110/mac",
            source: "Apple Disk Utility User Guide",
            note: "Managing APFS containers, volume quotas, and reserve allocations.",
          },
          {
            label: "Apple Support: If Time Machine recommends a larger backup disk",
            href: "https://support.apple.com/en-az/guide/mac-help/mchl72b408e0/mac",
            source: "Apple macOS User Guide",
            note: "Capacity sizing guidelines and snapshot pruning behavior.",
          },
          {
            label: "Apple Support: If you can't back up or restore your Mac using Time Machine",
            href: "https://support.apple.com/en-gb/102220",
            source: "Apple Support",
            note: "Troubleshooting backup issues and disk errors.",
          },
          {
            label: "tmutil(8) Manual Page",
            href: "https://keith.github.io/xcode-man-pages/tmutil.8.html",
            source: "macOS Developer Manual",
            note: "Options for destinationinfo, setquota, and Full Disk Access requirements.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-to-copy-files-between-two-cloud-drive-providers",
    title:
      "How to Copy Files Between Two Cloud Drive Providers: Pitfalls, What to Avoid, and the Right Setup",
    dek: "I needed to transfer files from one cloud drive to another across different providers. What started as a simple migration revealed hidden bottlenecks, simulation traps, hash mismatches, and API limits. Here is the process I followed, the mistakes to avoid, and the exact playbook to test, run, and verify cross-cloud transfers.",
    topic: "Engineering",
    publishedAt: "2026-09-13",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#rclone", "#cloud-storage", "#migration", "#cli", "#backups"],
    coverImage: "/articles/rclone-dry-run-cover.png",
    body: [
      {
        kind: "paragraph",
        html: "I recently needed to transfer an archive of 1,934 photos and videos, about 9.4 GiB in total, from Microsoft OneDrive for Business over to Google Drive. The goal was to build an independent secondary backup in a folder named `Backup/Photos`.",
      },
      {
        kind: "paragraph",
        html: "On paper, moving files between two major cloud providers sounds like a routine task. In practice, commercial cloud providers are closed ecosystems with no direct way to copy data between each other. The manual approach of downloading gigabytes of data to a local drive and re-uploading it wastes local disk space and takes twice as long. That led me to [rclone](https://rclone.org), an open-source command-line tool designed to connect cloud storage backends and stream data between them in memory without writing temporary files to disk.",
      },
      {
        kind: "paragraph",
        html: "While rclone solved the local disk problem, the transfer itself had several hidden traps. Along the way, I ran into local upload bottlenecks, misleading simulation output, silent verification downgrades, and API limits. Here is how the process actually works, the mistakes to avoid, and the setup I now use to run and verify cross-cloud transfers reliably.",
      },
      {
        kind: "heading",
        id: "the-steps-followed",
        text: "The Initial Attempt: Setup and First Steps",
      },
      {
        kind: "paragraph",
        html: "To begin, I installed rclone and launched its interactive configuration tool:",
      },
      {
        kind: "code",
        filename: "setup.sh",
        code: "brew install rclone\nrclone config",
      },
      {
        kind: "paragraph",
        html: "Through `rclone config`, I created two remotes. The first was `onedrive:`, authenticated through Microsoft Graph. The second was `gdrive:`, authenticated with Google Drive. In Microsoft 365 accounts, make sure to pick your real drive rather than any secondary document libraries that might show up in the list.",
      },
      {
        kind: "paragraph",
        html: "Before copying any files, I listed the top-level directories on both remotes to make sure the paths were valid:",
      },
      {
        kind: "code",
        filename: "check-paths.sh",
        code: 'rclone lsd onedrive:"Photos/Archive"\nrclone lsd gdrive:',
      },
      {
        kind: "paragraph",
        html: "Both remotes responded cleanly, so the connection and folder names were working.",
      },
      {
        kind: "paragraph",
        html: "Next, I wanted to preview the transfer before moving gigabytes of data across the internet. I ran `rclone copy` with `--dry-run` to simulate the operation, paired with `-P` to view live progress:",
      },
      {
        kind: "code",
        filename: "preview.sh",
        code: 'rclone copy onedrive:"Photos/Archive" gdrive:"Backup/Photos" --dry-run -P',
      },
      {
        kind: "paragraph",
        html: "The command ran in five and a half seconds, and the terminal output concluded with this summary:",
      },
      {
        kind: "code",
        filename: "dry-run-summary.txt",
        code: "Transferred:      9.406 GiB / 9.406 GiB, 100%\nTransferred:      1934 / 1934, 100%\nElapsed time:     5.5s",
      },
      {
        kind: "paragraph",
        html: "Because the summary printed 100% transferred across all 1,934 files, I assumed the transfer had already finished. I then ran an immediate verification check to confirm that the files were on Google Drive:",
      },
      {
        kind: "code",
        filename: "verify-initial.sh",
        code: 'rclone check onedrive:"Photos/Archive" gdrive:"Backup/Photos" --one-way',
      },
      {
        kind: "paragraph",
        html: "Instead of confirming a clean match, rclone flooded the terminal with 1,934 error lines. Every single file reported `file not in Google drive root`. Nothing had actually been transferred. That result prompted a deeper look into what was really happening behind the scenes.",
      },
      {
        kind: "heading",
        id: "the-issues-encountered",
        text: "Five Realities of Cross-Cloud Transfers",
      },
      {
        kind: "paragraph",
        html: "Investigating the missing files revealed several technical details about how cross-cloud migrations operate.",
      },
      {
        kind: "heading",
        id: "reality-local-streaming",
        text: "1. Data streams through your local machine",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "It is easy to assume that rclone triggers a server-to-server transfer between Microsoft and Google datacenters. In reality, server-side copies only work within the same cloud provider. Because Microsoft and Google do not provide a shared transfer bridge, every byte must travel through the machine running rclone. The tool downloads each file into RAM and immediately uploads it to Google Drive.",
      },
      {
        kind: "mermaid",
        caption:
          "Cross-provider streaming architecture. rclone streams objects through host RAM. Local upload bandwidth is the primary operational bottleneck.",
        code: `flowchart LR
    OD[("OneDrive Business<br/>Source: 1,934 files · 9.4 GiB")]
    ME["<b>Local Machine (rclone)</b><br/>Streams through RAM<br/>No disk writes required"]
    GD[("Google Drive<br/>Destination: Backup/Photos")]

    OD -->|"Fast Download API"| ME
    ME -->|"<b>Upload Link (~2 Mbps)</b><br/>The Physical Bottleneck"| GD
    OD -. "Direct cloud-to-cloud: Not supported across providers" .-> GD`,
      },
      {
        kind: "paragraph",
        html: "Because of this architecture, your download speed is mostly irrelevant. Your local upload bandwidth dictates the entire duration. On a home connection with a 2 Mbps upload speed, transferring 9.4 GiB takes more than 11 hours. Concurrency flags can keep network queues full, but they cannot make your internet connection faster than its physical limit.",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Time Required to Transfer 9.406 GiB by Upload Speed",
        xKey: "speed",
        xLabel: "Sustained Upload Bandwidth (Mbps)",
        yLabel: "Duration (Hours)",
        note: "Physical limit: payload ÷ bandwidth",
        caption:
          "At a residential upload speed of 2 Mbps, moving 9.4 GiB takes about 11.2 hours. Parallelization optimizes concurrency, but bandwidth determines total time.",
        series: [{ key: "hours", label: "Transfer Time (Hours)" }],
        data: [
          { speed: "2", hours: 11.22 },
          { speed: "5", hours: 4.49 },
          { speed: "10", hours: 2.24 },
          { speed: "20", hours: 1.12 },
          { speed: "50", hours: 0.45 },
          { speed: "100", hours: 0.22 },
          { speed: "200", hours: 0.11 },
        ],
      },
      {
        kind: "heading",
        id: "reality-dry-run-reports",
        text: "2. A dry run reports what would happen, not what did happen",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When I tested the command with `--dry-run`, rclone simulated the planned operations. It traversed the source directory, queried destination metadata, and calculated what needed to move. As it processed each file, it output a notice:",
      },
      {
        kind: "code",
        filename: "notice-example.txt",
        code: "NOTICE: Photos/2019/IMG_20190412.jpg: Skipped copy as --dry-run is set",
      },
      {
        kind: "paragraph",
        html: "Because 1,934 lines flashed past within five seconds, those notices scrolled off the screen immediately. What remained was the final statistics block. rclone formats that block using the same template it uses for real transfers, including the past-tense word *Transferred*. That wording made a rehearsal look like a completed job.",
      },
      {
        kind: "heading",
        id: "reality-hash-mismatches",
        text: "3. Verification fell back to file size due to hash mismatches",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When verifying transfers between drives, we usually expect cryptographic checksums like MD5 or SHA-256 to confirm file contents. However, different cloud storage backends compute different hash algorithms.",
      },
      {
        kind: "paragraph",
        html: "OneDrive for Business computes QuickXorHash, an algorithm developed by Microsoft for fast multi-threaded hashing. Google Drive computes MD5, along with SHA-1 or SHA-256 on certain files. Because the two providers do not share any common hash algorithm, `rclone check` cannot compare checksums. Instead, it quietly falls back to comparing file names and file sizes. While matching file sizes is a strong practical indicator, it does not guarantee bit-for-bit integrity.",
      },
      {
        kind: "heading",
        id: "reality-sleep-mode",
        text: "4. Sleep mode can kill an overnight transfer",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When a transfer takes 11 hours on a laptop, leaving it running unattended introduces power management issues. The moment your computer enters idle sleep, the operating system drops active network sockets and the transfer terminates midway.",
      },
      {
        kind: "heading",
        id: "reality-provider-limits",
        text: "5. Provider limits and memory spikes",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Cloud providers enforce strict usage caps. Google Drive limits account uploads to roughly 750 GB in a rolling 24-hour window, after which uploads fail with API quota errors. Microsoft 365 throttles high-frequency requests with HTTP 429 status codes when too many calls occur at once. Furthermore, each concurrent upload thread buffers its active chunk in memory, so aggressive concurrency can consume enough RAM to crash rclone on smaller virtual machines.",
      },
      {
        kind: "heading",
        id: "what-not-to-do",
        text: "What to Avoid When Copying Between Cloud Drives",
      },
      {
        kind: "paragraph",
        html: "Experiencing these issues highlighted several common mistakes that are easy to make during cross-cloud transfers:",
      },
      {
        kind: "table",
        headers: ["Mistake", "Why it fails", "Consequence"],
        rows: [
          [
            "Assuming direct cloud-to-cloud transfer",
            "Cross-provider transfers route through your local machine.",
            "Surprise multi-hour transfers saturating your domestic upload bandwidth.",
          ],
          [
            "Using rclone sync for initial transfers",
            "sync deletes files on the destination that do not exist on the source.",
            "Risk of accidental file deletion if destination paths are misconfigured.",
          ],
          [
            "Relying only on the dry-run summary",
            "dry-run displays 100% completion for its simulation.",
            "Believing files were copied when the destination is still empty.",
          ],
          [
            "Assuming checksum verification across providers",
            "OneDrive and Google Drive share no common hash algorithm.",
            "rclone quietly falls back to comparing file sizes instead of hashes.",
          ],
          [
            "Running long transfers without sleep management",
            "The operating system drops network connections when idle.",
            "The transfer dies halfway through the night.",
          ],
          [
            "Over-allocating chunk size and concurrency",
            "Each active transfer buffers its chunk in memory.",
            "Out-of-memory crash killing rclone several gigabytes into the run.",
          ],
        ],
        caption: "Summary of common pitfalls to avoid when migrating between cloud drives.",
      },
      {
        kind: "heading",
        id: "what-you-should-do",
        text: "The Recommended Approach: How to Do It Right",
      },
      {
        kind: "paragraph",
        html: "To keep cross-cloud migrations fast, predictable, and safe, here is the approach I recommend.",
      },
      {
        kind: "heading",
        id: "choose-transfer-location-by-data-size",
        text: "Choose where to run the transfer based on data size",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "If your dataset is moderate in size, such as under 20 to 50 GiB, running the transfer on your local machine is convenient. You simply need to keep your computer awake and save execution logs to disk.",
      },
      {
        kind: "paragraph",
        html: "If your transfer is larger than 50 or 100 GiB, offload the job to a cloud virtual private server (VPS). You can spin up a temporary virtual server on a provider like DigitalOcean, Hetzner, or AWS for a few cents. Because datacenter virtual machines sit on high-speed 1 Gbps connections, copying your `rclone.conf` file to a VPS and running the transfer there turns an 11-hour job into a 15-minute transfer. It also removes your personal computer from the process entirely.",
      },
      {
        kind: "code",
        filename: "vps-migration.sh",
        code: '# Find your local configuration file\nrclone config file\n\n# Copy the configuration file to your VPS\nscp ~/.config/rclone/rclone.conf vps:~/.config/rclone/\n\n# Connect to the VPS and run rclone inside a tmux session\nssh vps\ntmux new -s cloud-migration\nrclone copy onedrive:"Photos/Archive" gdrive:"Backup/Photos" \\\n  --transfers=8 --checkers=16 --fast-list \\\n  --log-file=migration.log --log-level INFO -P',
      },
      {
        kind: "heading",
        id: "use-rclone-copy-for-safe-transfers",
        text: "Use rclone copy for safe transfers",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Always start migrations with `rclone copy`. Unlike `sync`, which deletes unmirrored files on the destination, or `move`, which removes source files, `copy` only adds new and modified files. It is idempotent and completely safe to re-run if interrupted.",
      },
      {
        kind: "heading",
        id: "the-tuned-local-configuration",
        text: "The tuned local configuration",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When running locally on macOS, I wrap rclone with `caffeinate -i` to prevent system sleep, and I use the following tuned flags:",
      },
      {
        kind: "code",
        filename: "production-transfer.sh",
        code: 'caffeinate -i rclone copy onedrive:"Photos/Archive" gdrive:"Backup/Photos" \\\n  --transfers=8 \\\n  --checkers=16 \\\n  --drive-chunk-size=64M \\\n  --fast-list \\\n  --check-first \\\n  --log-file=migration.log \\\n  --log-level INFO \\\n  -P',
      },
      {
        kind: "table",
        headers: ["Flag", "Purpose", "Engineering Rationale"],
        rows: [
          [
            "`--transfers=8`",
            "Concurrent file transfers",
            "Keeps the upload pipe saturated by transferring multiple files in parallel.",
          ],
          [
            "`--checkers=16`",
            "Concurrent metadata checks",
            "Fast directory comparison threads to discover files ahead of transfers.",
          ],
          [
            "`--drive-chunk-size=64M`",
            "Multipart upload chunk size",
            "Reduces Google Drive API HTTP round-trips for multi-megabyte photos and videos.",
          ],
          [
            "`--fast-list`",
            "Bulk directory listings",
            "Fetches full directory trees in single API calls, cutting API quota usage.",
          ],
          [
            "`--check-first`",
            "Pre-transfer audit",
            "Performs all file checks before starting transfers, providing accurate ETAs.",
          ],
          [
            "`--log-file` / `--log-level`",
            "Persistent audit log",
            "Records all file operations to a file for post-run inspection.",
          ],
          [
            "`caffeinate -i`",
            "Power assertion (macOS)",
            "Prevents system idle sleep until the command completes.",
          ],
        ],
        caption: "Tuned configuration flags and their architectural purposes.",
      },
      {
        kind: "paragraph",
        html: "Make sure to budget memory carefully when increasing chunk sizes. Active buffer memory scales with concurrency:",
      },
      {
        kind: "formula",
        tex: "\\text{Peak Buffer RAM} \\;\\approx\\; \\text{transfers} \\times \\text{drive-chunk-size} \\;=\\; 8 \\times 64\\,\\text{MiB} \\;=\\; 512\\,\\text{MiB}",
        caption:
          "Memory allocation formula for Google Drive uploads. Keep chunk sizes reasonable to avoid out-of-memory errors on smaller machines.",
      },
      {
        kind: "heading",
        id: "provider-guardrails",
        text: "Provider guardrails",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "To prevent transfers from failing silently against provider limits, add `--drive-stop-on-upload-limit` so rclone exits cleanly if you hit Google's 750 GB daily upload cap. If Microsoft Graph begins throttling requests with HTTP 429 status codes, adding `--tpslimit 10` limits transactions to 10 per second to keep traffic smooth.",
      },
      {
        kind: "heading",
        id: "testing-progress-validation",
        text: "Testing, Reviewing Progress, and Validating Data",
      },
      {
        kind: "paragraph",
        html: "To ensure your files arrive without surprises, treat the migration as three distinct steps: testing beforehand, monitoring live progress, and verifying the destination afterward.",
      },
      {
        kind: "heading",
        id: "testing-before-the-transfer",
        text: "Testing before the transfer",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Before moving data, run a simulation with `--dry-run -P` to verify your syntax and directory structure.",
      },
      {
        kind: "paragraph",
        html: "Pay close attention to folder nesting. In rclone, running `rclone copy onedrive:Photos gdrive:Backup` copies the contents of the `Photos` directory into `gdrive:Backup/`, not into `gdrive:Backup/Photos/`. If you want to keep the parent folder name, specify `gdrive:Backup/Photos`. A dry run confirms where your files will land before anything is written.",
      },
      {
        kind: "heading",
        id: "monitoring-live-progress",
        text: "Monitoring live progress",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "When running the real transfer with `-P`, check the progress output to confirm that data is moving:",
      },
      {
        kind: "code",
        filename: "live-progress.txt",
        code: "Transferred:   \t    4.156 MiB / 9.406 GiB, 0%, 243.930 KiB/s, ETA 11h13m36s\nChecks:                 0 / 0, -, Listed 1996\nTransferred:            0 / 1934, 0%\nElapsed time:        19.4s\nTransferring:\n *     Photos/2019/IMG_20190412_154533.jpg: 54% / 5.505 MiB, 191.750 KiB/s, 13s\n *     Photos/2019/IMG_20190412_154612.jpg:  2% / 5.780 MiB,   8.267 KiB/s, 11m40s\n *     Photos/2020/IMG_20200118_093021.jpg:  2% / 4.070 MiB,   8.873 KiB/s, 7m35s\n *     Photos/2020/IMG_20200118_093114.jpg:  1% / 3.688 MiB,   4.285 KiB/s, 14m27s",
      },
      {
        kind: "paragraph",
        html: "A real transfer exhibits three clear signs: active file names with individual percentage bars, a non-zero transfer speed like `243.9 KiB/s`, and an estimated completion time based on your actual upload performance.",
      },
      {
        kind: "heading",
        id: "post-run-verification",
        text: "Post-run verification",
        level: 3,
      },
      {
        kind: "paragraph",
        html: "Never assume a transfer is complete without running verification. Instead of manually reading thousands of lines in the terminal, write differences directly to text files:",
      },
      {
        kind: "code",
        filename: "structured-verification.sh",
        code: '# Run a one-way check and write missing or differing files to disk\nrclone check onedrive:"Photos/Archive" gdrive:"Backup/Photos" \\\n  --one-way \\\n  --missing-on-dst missing.txt \\\n  --differ differ.txt \\\n  --combined audit-results.txt\n\n# Count discrepancies. Zero lines means every file is verified\nwc -l missing.txt differ.txt',
      },
      {
        kind: "callout",
        title: "Byte-for-byte verification for critical files",
        body: "Because OneDrive and Google Drive do not share a common hash, standard `rclone check` verifies file existence and byte size. If you are migrating critical files and need cryptographic certainty, run `rclone check --download` on select folders. This downloads both copies into memory and compares their SHA-256 hashes locally.",
      },
      {
        kind: "heading",
        id: "the-complete-playbook",
        text: "The Complete Migration Playbook",
      },
      {
        kind: "paragraph",
        html: "Here is the complete script incorporating pre-flight checks, simulation, tuned execution, and automated verification:",
      },
      {
        kind: "code",
        filename: "complete-migration-workflow.sh",
        code: '# 1. Pre-flight check: measure source size and verify destination quota\nrclone size  onedrive:"Photos/Archive"\nrclone about gdrive:\n\n# 2. Rehearsal: test paths and folder nesting with a dry run\nrclone copy onedrive:"Photos/Archive" gdrive:"Backup/Photos" --dry-run -P\n\n# 3. Production transfer: run with tuned concurrency, logging, and sleep prevention\ncaffeinate -i rclone copy onedrive:"Photos/Archive" gdrive:"Backup/Photos" \\\n  --transfers=8 \\\n  --checkers=16 \\\n  --drive-chunk-size=64M \\\n  --fast-list \\\n  --check-first \\\n  --log-file=migration.log \\\n  --log-level INFO \\\n  -P\n\n# 4. Verification: check that all files exist at the destination\nrclone check onedrive:"Photos/Archive" gdrive:"Backup/Photos" \\\n  --one-way \\\n  --missing-on-dst missing.txt \\\n  --differ differ.txt\n\n# Verification passes when both files output 0\nwc -l missing.txt differ.txt',
      },
      {
        kind: "heading",
        id: "key-takeaways",
        text: "Key Takeaways for Cloud Migrations",
      },
      {
        kind: "paragraph",
        html: "Moving files between different cloud storage providers comes down to a few practical principles:",
      },
      {
        kind: "paragraph",
        html: "Cross-cloud transfers always flow through the host machine running the command. If your dataset is large, running rclone on a cloud VPS with a fast datacenter connection will save hours of transfer time.",
      },
      {
        kind: "paragraph",
        html: "Start with `rclone copy` rather than `sync` to avoid accidental file deletions. Test your folder structures with a dry run beforehand, and watch live transfer rates rather than summary percentages to confirm that data is moving.",
      },
      {
        kind: "paragraph",
        html: "Finally, keep in mind how verification works when services do not share a common hash algorithm. Directing check results into text files gives you an instant, dependable way to confirm that your files arrived safely.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "rclone copy Documentation",
            href: "https://rclone.org/commands/rclone_copy/",
            source: "rclone documentation",
            note: "Path semantics and non-destructive file copying.",
          },
          {
            label: "rclone check Documentation",
            href: "https://rclone.org/commands/rclone_check/",
            source: "rclone documentation",
            note: "--one-way, --download, and structured error reporting (--missing-on-dst).",
          },
          {
            label: "rclone Global Flags",
            href: "https://rclone.org/docs/",
            source: "rclone documentation",
            note: "Details on --dry-run, --transfers, --checkers, --fast-list, and --tpslimit.",
          },
          {
            label: "Google Drive Backend",
            href: "https://rclone.org/drive/",
            source: "rclone documentation",
            note: "Chunk size configuration, upload quotas, and OAuth client registration.",
          },
          {
            label: "Microsoft OneDrive Backend",
            href: "https://rclone.org/onedrive/",
            source: "rclone documentation",
            note: "QuickXorHash support, drive selection, and API throttling.",
          },
          {
            label: "Microsoft QuickXorHash Specification",
            href: "https://learn.microsoft.com/en-us/onedrive/developer/code-snippets/quickxorhash",
            source: "Microsoft Learn",
            note: "Technical explanation of Microsoft's non-cryptographic checksum algorithm.",
          },
          {
            label: "Google Drive Upload Limits",
            href: "https://support.google.com/drive/answer/37603",
            source: "Google Drive Help",
            note: "Daily upload quotas and file size limits.",
          },
        ],
      },
    ],
  },
  {
    slug: "pytorch-tensor-to-neural-network",
    title: "PyTorch: From Tensor to Neural Network",
    dek: "People think PyTorch is enormous. It isn't. It's one data structure and a pile of operations on it, and once that clicks, every model you'll ever read looks obvious. Here's the ground floor.",
    topic: "Engineering",
    publishedAt: "2026-09-08",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#pytorch", "#deep-learning", "#tensors", "#python"],
    series: { slug: "pytorch", title: "PyTorch", part: 1 },
    coverImage: "/articles/pytorch-series-cover.svg",
    body: [
      {
        kind: "paragraph",
        html: "The first time you open a real PyTorch codebase, it looks like a lot. Modules importing modules, `forward` methods, `.cuda()` sprinkled everywhere, a training loop with cryptic four-letter calls. It feels like there must be a hundred concepts to learn before any of it makes sense.",
      },
      {
        kind: "paragraph",
        html: "There aren't. PyTorch is a numerical computing library that turned out to be very good at deep learning. Take away the pretrained models and the training helpers and what's left is a single data structure, the **tensor**, and a large, well-organised set of operations on it. A neural network is just a function built from those operations. Training is just calculus on that function. Get comfortable with the tensor and the rest of the library stops being intimidating and starts being predictable.",
      },
      {
        kind: "paragraph",
        html: "This series builds the whole picture from that starting point. This first part is the tensor itself and how a network is assembled from it.",
      },
      {
        kind: "heading",
        id: "everything-is-a-tensor",
        text: "Everything is a tensor",
      },
      {
        kind: "paragraph",
        html: "A tensor is an n-dimensional array where every element has the same type. That's the entire definition. The dimensionality is the only thing that changes as you go up:",
      },
      {
        kind: "list",
        items: [
          "A **scalar**, such as a single loss value, is a 0-D tensor.",
          "A **vector**, such as the 10 class scores for one image, is 1-D, shape `(10,)`.",
          "A **matrix**, such as a batch of those score vectors, is 2-D, shape `(32, 10)`.",
          "A **batch of RGB images** is 4-D, shape `(32, 3, 224, 224)`: batch, channels, height, width.",
          "A **batch of token embeddings** is 3-D: batch, sequence length, embedding dimension.",
        ],
      },
      {
        kind: "paragraph",
        html: "If you've used NumPy, this is familiar ground: the API was deliberately kept close, and most `np.` code has a one-to-one `torch.` translation. Try the snippet below. Every line runs.",
      },
      {
        kind: "code",
        filename: "tensors.py",
        code: "import torch\n\nx = torch.tensor([[1.0, 2.0], [3.0, 4.0]])\n\nprint(x.shape)        # torch.Size([2, 2])\nprint(x.dtype)        # torch.float32\nprint(x.mean())       # tensor(2.5000)\nprint(x @ x)          # matrix multiply\nprint(x.sum(dim=0))   # column sums -> tensor([4., 6.])\nprint(x.reshape(4))   # tensor([1., 2., 3., 4.])\nprint(x.T)            # transpose",
      },
      {
        kind: "callout",
        title: "Coming from NumPy?",
        body: "`torch.from_numpy(arr)` and `tensor.numpy()` convert both ways and *share memory*: change one and the other changes. That's a feature for zero-copy interop and a trap if you forget it. Use `.clone()` when you want an independent copy.",
      },
      {
        kind: "heading",
        id: "two-attributes",
        text: "The two attributes that make it deep learning",
      },
      {
        kind: "paragraph",
        html: "A NumPy array has a shape and a dtype. A PyTorch tensor has two more attributes, and they are the entire reason the library exists.",
      },
      {
        kind: "paragraph",
        html: '**`device`** says where the data physically lives: `cpu` (your RAM) or `cuda:0` (the first GPU\'s memory). Operations run wherever their inputs live, so moving a tensor to the GPU with `.to("cuda")` is literally what makes the maths run on the accelerator. Mix devices in one operation and PyTorch stops you with an error, a rite of passage covered properly in part 5.',
      },
      {
        kind: "paragraph",
        html: "**`requires_grad`** is a boolean flag that says \"track every operation you do to me, because I'm going to want gradients later.\" Set it on a tensor and PyTorch quietly starts recording a graph of everything that happens downstream. That graph is how a network learns, and it's the whole subject of part 2.",
      },
      {
        kind: "code",
        filename: "attributes.py",
        code: "import torch\n\nw = torch.randn(3, 3, requires_grad=True)\nprint(w.device)        # cpu\nprint(w.requires_grad)  # True\n\n# A parameter you'll optimise: float, on the right device, tracked.\n# A batch of input data: float, same device, NOT tracked.\nbatch = torch.randn(16, 3)\nprint(batch.requires_grad)  # False",
      },
      {
        kind: "paragraph",
        html: "The `device` attribute isn't a formality. The same operation, a matrix multiply, runs orders of magnitude faster on a GPU once the matrices are big enough to hide the cost of shipping them there. Below is `A @ B` for square matrices of growing size, so hover the lines. For small tensors the CPU wins (no transfer overhead), but the GPU pulls ahead fast and then runs away.",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Time for one N×N matrix multiply",
        xKey: "n",
        xLabel: "matrix size N",
        yLabel: "milliseconds (log-ish)",
        note: "Illustrative. Exact numbers depend on hardware",
        caption:
          "Below ~256, the GPU's transfer and launch overhead makes it slower. Past ~1024 it isn't close. This gap is the entire reason `.to(\"cuda\")` exists.",
        series: [
          { key: "cpu", label: "CPU" },
          { key: "gpu", label: "GPU (cuda)" },
        ],
        data: [
          { n: 128, cpu: 0.2, gpu: 0.35 },
          { n: 256, cpu: 1.4, gpu: 0.4 },
          { n: 512, cpu: 9.8, gpu: 0.7 },
          { n: 1024, cpu: 78, gpu: 2.1 },
          { n: 2048, cpu: 620, gpu: 9.5 },
          { n: 4096, cpu: 4900, gpu: 62 },
        ],
      },
      {
        kind: "heading",
        id: "shapes",
        text: "Shapes are where you'll actually spend your time",
      },
      {
        kind: "paragraph",
        html: "Here's the honest truth about writing models: the maths is rarely the hard part. The hard part is getting a `(32, 3, 224, 224)` tensor to line up with a layer that expected `(32, 150528)`. Shape errors are the mosquitoes of deep learning: not dangerous, endlessly annoying, and you will get bitten daily until you learn the patterns.",
      },
      {
        kind: "paragraph",
        html: "The key rule is **broadcasting**: when two tensors have different shapes, PyTorch tries to make them compatible by aligning dimensions from the right and stretching any dimension of size 1 to match its partner. It never copies data to do this (it's a view trick), so it's free.",
      },
      {
        kind: "table",
        headers: ["Operation", "Result", "What happened"],
        rows: [
          ["`(32, 10)` + `(10,)`", "`(32, 10)`", "the vector is added to every row"],
          ["`(32, 10)` * `(32, 1)`", "`(32, 10)`", "each row scaled by its own value"],
          ["`(8, 1, 6)` + `(1, 5, 6)`", "`(8, 5, 6)`", "both size-1 dims stretch"],
          ["`(32, 10)` + `(32,)`", "error", "trailing dims 10 and 32 don't match"],
        ],
        caption:
          "Broadcasting aligns from the right. When it fails, the error names the exact dimension index that didn't match. Read it, don't guess.",
      },
      {
        kind: "callout",
        title: "The debugging move that saves hours",
        body: "When a model breaks, print `.shape` at every step of `forward`. Nine times out of ten the bug is visible immediately: a dimension you forgot to squeeze, a batch axis in the wrong place, a transpose you owe.",
      },
      {
        kind: "heading",
        id: "layer-by-hand",
        text: "Building a layer from scratch",
      },
      {
        kind: "paragraph",
        html: "A neural network layer is nothing more exotic than a function from tensors to tensors that carries some learnable numbers of its own. The workhorse is the **linear** (or fully-connected, or dense) layer, which multiplies its input by a weight matrix and adds a bias:",
      },
      {
        kind: "formula",
        tex: "y = xW^\\top + b",
        caption:
          "x is (batch, in_features), W is (out_features, in_features), b is (out_features,). The output is (batch, out_features).",
      },
      {
        kind: "paragraph",
        html: "That's it. You can write the whole thing with the operators you already have:",
      },
      {
        kind: "code",
        filename: "linear_by_hand.py",
        code: "import torch\n\nbatch, in_features, out_features = 4, 3, 2\n\nx = torch.randn(batch, in_features)\nW = torch.randn(out_features, in_features)\nb = torch.randn(out_features)\n\ny = x @ W.T + b            # broadcasting adds b to every row\nprint(y.shape)             # torch.Size([4, 2])\n\n# A non-linearity turns a stack of linear layers into something\n# more expressive than one big linear layer.\nh = torch.relu(y)\nprint(h.min() >= 0)        # tensor(True)",
      },
      {
        kind: "paragraph",
        html: "Stack two of these with a non-linearity between them and you have a multi-layer perceptron, in principle a universal function approximator. The only missing ingredient is a way to choose good values for `W` and `b` instead of random ones.",
      },
      {
        kind: "heading",
        id: "nn-module",
        text: "The same thing, the grown-up way",
      },
      {
        kind: "paragraph",
        html: "Writing layers by hand gets old fast: you'd be tracking every weight tensor manually, moving each one to the GPU, remembering which ones to save. `torch.nn` does the bookkeeping. `nn.Linear` holds its `weight` and `bias` as `nn.Parameter` tensors (which flip `requires_grad=True` for you), and wrapping your model in `nn.Module` gets you `.parameters()`, `.to(device)`, `.train()` / `.eval()`, and checkpoint saving for free.",
      },
      {
        kind: "code",
        filename: "mlp.py",
        code: 'import torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self, in_dim, hidden, out_dim):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(in_dim, hidden),\n            nn.ReLU(),\n            nn.Linear(hidden, out_dim),\n        )\n\n    def forward(self, x):\n        return self.net(x)\n\nmodel = MLP(784, 128, 10)                 # 28x28 image in, 10 classes out\nn_params = sum(p.numel() for p in model.parameters())\nprint(f"{n_params:,} parameters")         # 101,770 parameters',
      },
      {
        kind: "paragraph",
        html: "Every serious model (a ResNet, a Transformer, Stable Diffusion's U-Net) is this same idea scaled up: `nn.Module` objects holding other `nn.Module` objects, with a `forward` method that says how tensors flow through them. The object graph is small:",
      },
      {
        kind: "mermaid",
        caption:
          "The entire PyTorch object model. A model is Modules all the way down. At the leaves are Parameters, which are Tensors that autograd tracks.",
        code: `flowchart TD
    MODEL["<b>model</b> — nn.Module"]
    L1["nn.Linear(784, 128)"]
    ACT["nn.ReLU()"]
    L2["nn.Linear(128, 10)"]
    W1["weight — nn.Parameter (128, 784)"]
    B1["bias — nn.Parameter (128,)"]
    W2["weight — nn.Parameter (10, 128)"]
    B2["bias — nn.Parameter (10,)"]
    T["torch.Tensor + requires_grad = True"]

    MODEL --> L1
    MODEL --> ACT
    MODEL --> L2
    L1 --> W1
    L1 --> B1
    L2 --> W2
    L2 --> B2
    W1 -. "is a" .-> T
    B1 -. "is a" .-> T
    W2 -. "is a" .-> T
    B2 -. "is a" .-> T`,
      },
      {
        kind: "heading",
        id: "recap",
        text: "What you actually built",
      },
      {
        kind: "list",
        items: [
          "**Tensors** hold the numbers, plus a shape, a dtype, a device, and a gradient-tracking flag.",
          "**Operations** on tensors (matmul, `relu`, `sum`) are the arithmetic a network is made of.",
          "**Broadcasting** is how tensors of different shapes combine without copying, and shape errors name the dimension that failed.",
          "**`nn.Parameter`** is a tensor a layer owns and wants gradients for.",
          "**`nn.Module`** bundles parameters with a `forward` method into a reusable unit, and a model is just Modules nested inside Modules.",
        ],
      },
      {
        kind: "callout",
        title: "Next in the series",
        body: "You have a model full of random weights and no idea how it becomes a model that works. That transformation is `loss.backward()`, and the machinery behind it, a graph PyTorch builds while your code runs and then walks in reverse, is **Part 2: Autograd**.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "torch.Tensor: API reference",
            href: "https://pytorch.org/docs/stable/tensors.html",
            source: "PyTorch documentation",
          },
          {
            label: "Tensors: Learn the Basics",
            href: "https://pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html",
            source: "PyTorch tutorials",
          },
          {
            label: "Broadcasting semantics",
            href: "https://pytorch.org/docs/stable/notes/broadcasting.html",
            source: "PyTorch documentation",
            note: "The exact rules for how mismatched shapes are reconciled.",
          },
          {
            label: "Building models with nn.Module: Introduction to PyTorch",
            href: "https://pytorch.org/tutorials/beginner/introyt/modelsyt_tutorial.html",
            source: "PyTorch tutorials",
          },
          {
            label: "PyTorch: An Imperative Style, High-Performance Deep Learning Library",
            href: "https://arxiv.org/abs/1912.01703",
            source: "Paszke et al., NeurIPS 2019",
            note: "The design paper, explaining why PyTorch is built the way it is.",
          },
        ],
      },
    ],
  },
  {
    slug: "pytorch-autograd-how-pytorch-learns",
    title: "Autograd: How PyTorch Learns",
    dek: "Every training loop on Earth is basically the same four lines. The one that does the real work, loss.backward(), is a graph PyTorch builds while your code runs and then walks backwards. Let's take it apart.",
    topic: "Engineering",
    publishedAt: "2026-09-09",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#pytorch", "#autograd", "#backpropagation", "#deep-learning"],
    series: { slug: "pytorch", title: "PyTorch", part: 2 },
    coverImage: "/articles/pytorch-series-cover.svg",
    body: [
      {
        kind: "paragraph",
        html: "Part 1 left you with a model full of random numbers. It can take an image and confidently tell you it's the digit 4 when it's a 9. Training is the process of dragging those random numbers towards ones that are usually right, and every single step of that process needs a **gradient**: a number for each parameter that says \"increase me to make the loss worse, decrease me to make it better, and by roughly this much.\"",
      },
      {
        kind: "paragraph",
        html: "For a model with a hundred million parameters, computing those gradients by hand is not on the table. Autograd is the part of PyTorch that does it for you: automatically, exactly, and fast enough that you never think about it. Understanding how it works is the difference between training models and debugging them by superstition.",
      },
      {
        kind: "heading",
        id: "downhill",
        text: "The calculus you were promised you'd never need",
      },
      {
        kind: "paragraph",
        html: "Picture the loss as a landscape. Every parameter is an axis, and the height at any point is how wrong the model is with those parameter values. Training is walking downhill. The **gradient** is the arrow pointing in the steepest uphill direction, so you step the opposite way:",
      },
      {
        kind: "formula",
        tex: "\\theta \\leftarrow \\theta - \\eta\\, \\nabla_\\theta L(\\theta)",
        caption:
          "The parameters θ move against the gradient of the loss. η, the learning rate, is how big a step you take.",
      },
      {
        kind: "paragraph",
        html: "Do that a few hundred thousand times and, if the landscape is kind and the step size is sane, you end up somewhere low. The entire job of autograd is to hand you ∇L, the gradient of the loss with respect to every parameter, after each forward pass.",
      },
      {
        kind: "heading",
        id: "the-graph-builds-itself",
        text: "The graph builds itself as your code runs",
      },
      {
        kind: "paragraph",
        html: "The moment a tensor has `requires_grad=True`, PyTorch starts watching. Every operation you perform on it creates a new node in a **computational graph**: the result tensor, a reference to the function that produced it (its `grad_fn`), and pointers back to the inputs. There is no compile step and no graph definition phase. The graph is a side effect of running your forward pass, which is exactly why you can put `if` statements, loops, and print calls inside a model and it all just works.",
      },
      {
        kind: "code",
        filename: "grad_fn.py",
        code: "import torch\n\nx = torch.tensor(2.0, requires_grad=True)\ny = x ** 3 + 2 * x\n\nprint(y)           # tensor(12., grad_fn=<AddBackward0>)\nprint(y.grad_fn)    # <AddBackward0 object ...>\n\n# Walk one step back into the graph by hand:\nprint(y.grad_fn.next_functions)  # the pow and mul nodes feeding the add",
      },
      {
        kind: "paragraph",
        html: "For `y = x³ + 2x`, the graph PyTorch just recorded looks like this: a small pipeline of operations, each remembering what it needs to compute its own local derivative later:",
      },
      {
        kind: "mermaid",
        caption:
          "The computational graph for y = x³ + 2x. The forward pass (solid, downward) computes values, and backward() flows gradients up the same edges in reverse.",
        code: `flowchart TD
    X["x = 2.0  (leaf, requires_grad)"]
    P["pow:  x³ = 8"]
    M["mul:  2·x = 4"]
    A["add:  y = 12"]

    X --> P
    X --> M
    P --> A
    M --> A
    A -. "∂y/∂y = 1" .-> P
    A -. "∂y/∂y = 1" .-> M
    P -. "·3x² = 12" .-> X
    M -. "·2" .-> X`,
      },
      {
        kind: "heading",
        id: "backward",
        text: "backward() walks it in reverse",
      },
      {
        kind: "paragraph",
        html: "Calling `y.backward()` starts at `y` with a seed gradient of 1 and traverses the graph towards the leaves. At each node it multiplies the incoming gradient by that operation's local derivative (the **chain rule**, applied mechanically), and when two paths reach the same tensor, their contributions add. The final number lands in each leaf tensor's `.grad`.",
      },
      {
        kind: "formula",
        tex: "\\frac{\\partial L}{\\partial \\theta_i} = \\sum_j \\frac{\\partial L}{\\partial z_j}\\,\\frac{\\partial z_j}{\\partial \\theta_i}",
        caption:
          "Sum over every path from the parameter θᵢ to the loss. This is all backpropagation is.",
      },
      {
        kind: "code",
        filename: "backward.py",
        code: "import torch\n\nx = torch.tensor(2.0, requires_grad=True)\ny = x ** 3 + 2 * x\ny.backward()\n\nprint(x.grad)   # tensor(14.)\n\n# Check it: d/dx (x³ + 2x) = 3x² + 2  ->  3·4 + 2 = 14\nprint(3 * x.item() ** 2 + 2)   # 14.0",
      },
      {
        kind: "paragraph",
        html: "That's the trick in full. It scales from this three-node graph to a Transformer with billions of parameters without any change in principle, just more nodes, and the arithmetic running on a GPU.",
      },
      {
        kind: "heading",
        id: "gradient-descent-in-motion",
        text: "Gradient descent, in motion",
      },
      {
        kind: "paragraph",
        html: "Below is the simplest possible optimisation, minimising `L(θ) = θ²` starting from θ = 10, run with a sensible learning rate and with one that's slightly too large. Hover the lines. The takeaway that will save you the most time: a diverging loss is almost never a broken model, it's a learning rate that's too high.",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Loss over optimisation steps",
        xKey: "step",
        xLabel: "step",
        yLabel: "loss  L(θ) = θ²",
        note: "Minimising θ² from θ₀ = 10",
        caption:
          "η = 0.1 slides smoothly to zero. η = 1.1 overshoots the minimum by more each step and explodes. Same model, same code, only the step size changed.",
        series: [
          { key: "good", label: "η = 0.1 (stable)" },
          { key: "toobig", label: "η = 1.1 (diverges)" },
        ],
        data: [
          { step: 0, good: 100, toobig: 100 },
          { step: 1, good: 64, toobig: 144 },
          { step: 2, good: 40.96, toobig: 207.4 },
          { step: 3, good: 26.2, toobig: 298.6 },
          { step: 4, good: 16.8, toobig: 430 },
          { step: 5, good: 10.7, toobig: 619.2 },
          { step: 6, good: 6.87, toobig: 891.6 },
          { step: 7, good: 4.4, toobig: 1284 },
        ],
      },
      {
        kind: "heading",
        id: "the-training-loop",
        text: "The training loop, line by line",
      },
      {
        kind: "paragraph",
        html: "Every supervised training loop in PyTorch, from a tutorial notebook to a foundation-model run, is a variation on these five lines. The **optimizer** holds a reference to the model's parameters and knows one update rule (SGD, Adam, …). You hand it gradients, it takes the step.",
      },
      {
        kind: "code",
        filename: "train.py",
        code: "import torch.nn as nn\nfrom torch.optim import Adam\n\nmodel = MLP(784, 128, 10)\nopt = Adam(model.parameters(), lr=1e-3)\nloss_fn = nn.CrossEntropyLoss()\n\nfor images, labels in loader:\n    opt.zero_grad()              # 1. clear last step's gradients\n    logits = model(images)       # 2. forward pass — builds the graph\n    loss = loss_fn(logits, labels)\n    loss.backward()              # 3. backward pass — fills every .grad\n    opt.step()                   # 4. update parameters using .grad\n    # 5. repeat a few hundred thousand times",
      },
      {
        kind: "list",
        items: [
          "**`opt.zero_grad()`**: gradients *accumulate* by default. Skip this and step N's gradient is added on top of step N−1's, and your training quietly falls apart.",
          "**`loss.backward()`**: frees the graph as it walks it. Call it twice on one forward pass and PyTorch raises an error unless you asked for `retain_graph=True`.",
          "**`opt.step()`**: reads `.grad`, mutates the parameters in place, never touches the graph.",
          "**`with torch.no_grad():`** turns graph-building off entirely for evaluation and inference. Saves memory and time, and you weren't going to call `backward()` anyway.",
        ],
      },
      {
        kind: "callout",
        title: "The bug everyone ships once",
        body: "Forgetting `opt.zero_grad()`. The loss doesn't crash. It just stops improving, or improves and then wanders off. If training looks haunted, check that line first.",
      },
      {
        kind: "heading",
        id: "turning-it-off",
        text: "Turning tracking off on purpose",
      },
      {
        kind: "paragraph",
        html: "Two tools stop autograd following a tensor. `tensor.detach()` returns a view that shares the same storage but sits outside the graph. Reach for it when you want a value for logging or a metric but not its history. `with torch.no_grad():` disables recording for its whole block, which is the standard wrapper around a validation loop and any inference code.",
      },
      {
        kind: "paragraph",
        html: "And that's the core of how PyTorch learns: a forward pass quietly records a graph, `backward()` walks it in reverse to produce an exact gradient for every parameter, and the optimizer turns those gradients into a step downhill. Everything above this in the stack (schedulers, mixed precision, distributed training, `torch.compile`) is an optimisation of this loop, never a replacement for it. Part 3 goes up a level: how to structure the model itself so it survives contact with a real project.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Autograd mechanics",
            href: "https://pytorch.org/docs/stable/notes/autograd.html",
            source: "PyTorch documentation",
            note: "How the graph is recorded, when it's freed, and the in-place-operation rules.",
          },
          {
            label: "A Gentle Introduction to torch.autograd",
            href: "https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html",
            source: "PyTorch tutorials",
          },
          {
            label: "torch.autograd.backward",
            href: "https://pytorch.org/docs/stable/generated/torch.autograd.backward.html",
            source: "PyTorch documentation",
          },
          {
            label: "torch.optim: optimizers and the update step",
            href: "https://pytorch.org/docs/stable/optim.html",
            source: "PyTorch documentation",
          },
          {
            label: "Learning representations by back-propagating errors",
            href: "https://www.nature.com/articles/323533a0",
            source: "Rumelhart, Hinton & Williams, Nature 1986",
            note: "The original backpropagation paper.",
          },
        ],
      },
    ],
  },
  {
    slug: "pytorch-nn-module-building-networks",
    title: "nn.Module: Building Networks That Hold Together",
    dek: "nn.Sequential is training wheels. Real models are custom Modules with skip connections, shared weights, and branches. Here's how nn.Module actually works, and every footgun it hides.",
    topic: "Engineering",
    publishedAt: "2026-09-10",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#pytorch", "#nn-module", "#neural-networks", "#deep-learning"],
    series: { slug: "pytorch", title: "PyTorch", part: 3 },
    coverImage: "/articles/pytorch-series-cover.svg",
    body: [
      {
        kind: "paragraph",
        html: "`nn.Sequential` is wonderful for about a week. Then you need a skip connection, or two heads sharing a backbone, or a branch that only runs at inference, and a straight pipe of layers can't express any of it. That's when you write your own `nn.Module`, and it turns out the base class you've been leaning on this whole time has a few sharp edges worth knowing about before you cut yourself.",
      },
      {
        kind: "paragraph",
        html: "This part is `nn.Module` in full: what it tracks, what it doesn't, and the handful of bugs that account for most lost afternoons.",
      },
      {
        kind: "heading",
        id: "anatomy",
        text: "Anatomy of a Module",
      },
      {
        kind: "paragraph",
        html: "A Module is two methods. `__init__` **declares** the pieces (layers, parameters, constants) and assigns them to `self`. `forward` **describes** how a tensor flows through those pieces. You never call `forward` directly. You call the module (`model(x)`), which runs hooks and then `forward`. Here's a residual block, the pattern at the heart of every ResNet and Transformer:",
      },
      {
        kind: "code",
        filename: "residual_block.py",
        code: "import torch.nn as nn\n\nclass ResidualBlock(nn.Module):\n    def __init__(self, dim):\n        super().__init__()                 # never skip this line\n        self.fc1 = nn.Linear(dim, dim)\n        self.fc2 = nn.Linear(dim, dim)\n        self.norm = nn.LayerNorm(dim)\n        self.act = nn.GELU()\n\n    def forward(self, x):\n        h = self.act(self.fc1(x))\n        h = self.fc2(h)\n        return self.norm(x + h)            # the '+ x' is the skip connection\n",
      },
      {
        kind: "callout",
        title: "Why assign layers to self?",
        body: "`nn.Module.__setattr__` is overridden. When you write `self.fc1 = nn.Linear(...)`, the Module notices it's a submodule and registers it, so its parameters show up in `model.parameters()` and move with `model.to(device)`. Store a layer in a plain Python list and it becomes invisible: the optimizer never sees it, and it silently doesn't train.",
      },
      {
        kind: "heading",
        id: "parameters-buffers-state",
        text: "Parameters, buffers, and the state dict",
      },
      {
        kind: "paragraph",
        html: "A Module holds three kinds of tensor, and knowing which is which explains a lot of otherwise-baffling behaviour.",
      },
      {
        kind: "table",
        headers: ["Kind", "Trained by the optimizer?", "In state_dict?", "Example"],
        rows: [
          ["`nn.Parameter`", "Yes", "Yes", "a Linear layer's `weight`"],
          ["Registered buffer", "No", "Yes", "BatchNorm's `running_mean`"],
          ["Plain attribute tensor", "No", "No", "a constant you forgot to register"],
        ],
        caption:
          "Buffers are state that must persist and move devices but isn't learned. Register them with self.register_buffer(\"name\", tensor). A plain self.name = tensor won't follow .to(device) and won't be saved.",
      },
      {
        kind: "code",
        filename: "inspect.py",
        code: "model = ResidualBlock(64)\n\nfor name, p in model.named_parameters():\n    print(name, tuple(p.shape), p.requires_grad)\n# fc1.weight (64, 64) True\n# fc1.bias   (64,)    True\n# ...\n\nprint(model.state_dict().keys())\n# odict_keys(['fc1.weight', 'fc1.bias', 'fc2.weight', 'fc2.bias',\n#             'norm.weight', 'norm.bias'])",
      },
      {
        kind: "heading",
        id: "composing",
        text: "Composing modules: the three containers",
      },
      {
        kind: "list",
        items: [
          "**`nn.Sequential`**: a fixed chain, where each output feeds the next. Use it for genuinely linear sub-parts.",
          "**`nn.ModuleList`**: a list that *does* register its contents. Use it when depth is a hyperparameter and you loop over layers in `forward`.",
          "**`nn.ModuleDict`**: the same, keyed by name, for branches you select at runtime.",
        ],
      },
      {
        kind: "code",
        filename: "deep_mlp.py",
        code: "import torch.nn as nn\n\nclass DeepMLP(nn.Module):\n    def __init__(self, dim, depth):\n        super().__init__()\n        # A plain [ResidualBlock(dim) for _ in range(depth)] would NOT register.\n        self.blocks = nn.ModuleList(ResidualBlock(dim) for _ in range(depth))\n        self.head = nn.Linear(dim, 10)\n\n    def forward(self, x):\n        for block in self.blocks:\n            x = block(x)\n        return self.head(x)\n",
      },
      {
        kind: "paragraph",
        html: "Because it's residual, you can stack these deep without the gradient vanishing. Parameter count grows linearly with depth and quadratically with width, which is worth having a feel for when you're choosing a model size against a memory budget:",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Parameters in a 1-hidden-layer MLP (784 → h → 10)",
        xKey: "width",
        yLabel: "parameters",
        note: "params ≈ 795·h + 10",
        caption:
          "Doubling the hidden width roughly doubles the parameter count here. In a Transformer, where width appears in several matrices at once, the same doubling costs closer to 4×.",
        series: [{ key: "params", label: "trainable parameters" }],
        data: [
          { width: "h = 32", params: 25450 },
          { width: "h = 64", params: 50890 },
          { width: "h = 128", params: 101770 },
          { width: "h = 256", params: 203530 },
          { width: "h = 512", params: 407050 },
        ],
      },
      {
        kind: "heading",
        id: "init",
        text: "Weight initialization is not a detail",
      },
      {
        kind: "paragraph",
        html: "`nn.Linear` initialises its weights with a reasonable default (Kaiming uniform). For most work that's fine. When it isn't (a custom layer, a paper that specifies an init, a training run that won't get moving), you override it with `model.apply()`, which walks every submodule:",
      },
      {
        kind: "code",
        filename: "init.py",
        code: 'import torch.nn as nn\n\ndef init_weights(m):\n    if isinstance(m, nn.Linear):\n        nn.init.kaiming_normal_(m.weight, nonlinearity="relu")\n        if m.bias is not None:\n            nn.init.zeros_(m.bias)\n\nmodel = DeepMLP(64, depth=6)\nmodel.apply(init_weights)   # applied recursively to every submodule\n',
      },
      {
        kind: "heading",
        id: "train-eval",
        text: "train() vs eval(): the mode switch that bites",
      },
      {
        kind: "paragraph",
        html: "Some layers behave differently during training and inference. Dropout is active in `train()` mode and a no-op in `eval()`. BatchNorm uses the current batch's statistics in `train()` and its accumulated running statistics in `eval()`. The flag is a single boolean on every submodule, flipped recursively by `model.train()` / `model.eval()`.",
      },
      {
        kind: "callout",
        title: "Two symmetrical bugs",
        body: "Forget `model.eval()` before validating and your metrics are noisy and pessimistic, because dropout is still firing. Forget `model.train()` when you resume training and BatchNorm stops updating its statistics. Set the mode explicitly at the top of every epoch's train and eval sections.",
      },
      {
        kind: "heading",
        id: "saving",
        text: "Saving and loading: the state dict, not the object",
      },
      {
        kind: "paragraph",
        html: "Save `model.state_dict()`, an ordered dictionary of tensors, not the model object itself. Pickling the object ties the file to your exact class definition and directory layout, and it breaks the first time you refactor. The state dict is just data.",
      },
      {
        kind: "code",
        filename: "save_load.py",
        code: 'import torch\n\ntorch.save(model.state_dict(), "model.pt")\n\n# Later — reconstruct the architecture first, then load the weights.\nmodel = DeepMLP(64, depth=6)\nmodel.load_state_dict(torch.load("model.pt", map_location="cpu", weights_only=True))\nmodel.eval()\n',
      },
      {
        kind: "mermaid",
        caption:
          "model.named_parameters() and state_dict() flatten this tree into dotted keys: blocks.0.fc1.weight, blocks.0.norm.bias, head.weight, and so on.",
        code: `flowchart TD
    M["DeepMLP"]
    BL["blocks — nn.ModuleList"]
    B0["blocks.0 — ResidualBlock"]
    B1["blocks.1 — ResidualBlock"]
    BN["blocks.N ..."]
    H["head — nn.Linear"]
    F1["fc1 · fc2 · norm"]

    M --> BL
    M --> H
    BL --> B0
    BL --> B1
    BL --> BN
    B0 --> F1`,
      },
      {
        kind: "list",
        items: [
          "`__init__` declares, `forward` connects, and you call the module, never `forward` directly.",
          "Layers must be attributes (or live in a `ModuleList` / `ModuleDict`) to be registered and trained.",
          "Parameters are learned. Buffers persist but aren't learned, so register them explicitly.",
          "`model.train()` / `model.eval()` change what Dropout and BatchNorm do, so set them deliberately.",
          "Save the `state_dict`, rebuild the architecture, then `load_state_dict`.",
        ],
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "nn.Module: API reference",
            href: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html",
            source: "PyTorch documentation",
          },
          {
            label: "Modules: design and behaviour notes",
            href: "https://pytorch.org/docs/stable/notes/modules.html",
            source: "PyTorch documentation",
            note: "Registration, hooks, train/eval, and buffers explained in depth.",
          },
          {
            label: "Saving and Loading Models",
            href: "https://pytorch.org/tutorials/beginner/saving_loading_models.html",
            source: "PyTorch tutorials",
          },
          {
            label: "torch.nn.init: initialization functions",
            href: "https://pytorch.org/docs/stable/nn.init.html",
            source: "PyTorch documentation",
          },
          {
            label: "Delving Deep into Rectifiers (Kaiming initialization)",
            href: "https://arxiv.org/abs/1502.01852",
            source: "He et al., ICCV 2015",
          },
          {
            label: "Deep Residual Learning for Image Recognition",
            href: "https://arxiv.org/abs/1512.03385",
            source: "He et al., CVPR 2016",
            note: "Where the skip connection in the block above comes from.",
          },
        ],
      },
    ],
  },
  {
    slug: "pytorch-datasets-and-dataloaders",
    title: "Datasets and DataLoaders: Keeping the GPU Fed",
    dek: "You bought a fast GPU and it's sitting at 30% utilisation. The model isn't the bottleneck. The input pipeline is. Here's how Dataset and DataLoader work, and how to stop starving the accelerator.",
    topic: "Engineering",
    publishedAt: "2026-09-11",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#pytorch", "#dataloader", "#data-pipeline", "#deep-learning"],
    series: { slug: "pytorch", title: "PyTorch", part: 4 },
    coverImage: "/articles/pytorch-series-cover.svg",
    body: [
      {
        kind: "paragraph",
        html: "Here's a scene that plays out in every ML team. Someone profiles a training run that feels slow, expecting to find a fat matrix multiply. Instead they find the GPU idle 60% of the time, waiting. The bottleneck isn't the model. It's everything that has to happen before a batch of data reaches the model: reading files off disk, decoding JPEGs, resizing, augmenting, stacking into a tensor, copying to the GPU.",
      },
      {
        kind: "paragraph",
        html: "PyTorch splits that work across two abstractions. **`Dataset`** knows how to produce one example. **`DataLoader`** turns a Dataset into a stream of batches and, crucially, does the slow parts in parallel worker processes while the GPU is busy with the previous batch.",
      },
      {
        kind: "mermaid",
        caption:
          "The input pipeline. The dashed box runs in num_workers separate processes, overlapped with the GPU's work on the previous batch.",
        code: `flowchart TB
    DISK[("disk / storage")]
    subgraph W["worker processes (num_workers)"]
        GET["Dataset.__getitem__<br/>read · decode · transform"]
        COL["collate_fn<br/>stack into a batch tensor"]
    end
    PIN["pinned memory<br/>(pin_memory=True)"]
    GPU["model.forward()<br/>on cuda"]

    DISK --> GET --> COL --> PIN -->|"non_blocking copy"| GPU`,
      },
      {
        kind: "heading",
        id: "dataset",
        text: "Dataset: one example at a time",
      },
      {
        kind: "paragraph",
        html: "The common kind is a **map-style** Dataset: implement `__len__` and `__getitem__(i)`, and you have something that behaves like a list of `(input, target)` pairs. Where the data lives (memory, a folder of images, a database, a set of shards) is entirely your business. The DataLoader only ever asks for item `i`.",
      },
      {
        kind: "code",
        filename: "dataset.py",
        code: 'from torch.utils.data import Dataset\nfrom PIL import Image\n\nclass ImageFolderDataset(Dataset):\n    def __init__(self, paths, labels, transform):\n        self.paths = paths\n        self.labels = labels\n        self.transform = transform      # applied here, so it runs in the worker\n\n    def __len__(self):\n        return len(self.paths)\n\n    def __getitem__(self, i):\n        img = Image.open(self.paths[i]).convert("RGB")\n        return self.transform(img), self.labels[i]\n',
      },
      {
        kind: "callout",
        title: "Do the heavy work in __getitem__",
        body: "Decoding and augmentation belong inside `__getitem__` precisely because that's what runs in the parallel workers. Pre-resize on the main process and you've moved the cost back onto the critical path.",
      },
      {
        kind: "heading",
        id: "dataloader",
        text: "DataLoader: batching, shuffling, parallelism",
      },
      {
        kind: "code",
        filename: "loader.py",
        code: 'from torch.utils.data import DataLoader\n\nloader = DataLoader(\n    dataset,\n    batch_size=64,\n    shuffle=True,           # reshuffle every epoch (train only)\n    num_workers=8,          # worker processes decoding in parallel\n    pin_memory=True,        # page-locked memory -> faster host->GPU copy\n    persistent_workers=True,# don\'t tear workers down between epochs\n    prefetch_factor=2,      # batches each worker prepares ahead\n    drop_last=True,         # drop the ragged final batch (stable shapes)\n)\n\nfor images, labels in loader:\n    images = images.to("cuda", non_blocking=True)\n    labels = labels.to("cuda", non_blocking=True)\n    ...\n',
      },
      {
        kind: "paragraph",
        html: "`num_workers` is the dial that matters most, and more is not always better. Each worker is a process with its own Python interpreter and memory. Past the point where workers can keep the GPU fed, you're just paying RAM and startup cost. The curve almost always looks like this:",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Training throughput vs. num_workers",
        xKey: "workers",
        xLabel: "num_workers",
        yLabel: "images / second",
        note: "Illustrative. The plateau point depends on your CPU, storage, and transform cost",
        caption:
          "Throughput climbs steeply, then flattens once the workers can supply batches as fast as the GPU consumes them. Adding more after the knee costs memory and buys nothing. Measure it for your own pipeline.",
        series: [{ key: "throughput", label: "images / sec" }],
        data: [
          { workers: 0, throughput: 850 },
          { workers: 1, throughput: 1600 },
          { workers: 2, throughput: 2900 },
          { workers: 4, throughput: 5200 },
          { workers: 6, throughput: 6100 },
          { workers: 8, throughput: 6300 },
          { workers: 12, throughput: 6250 },
        ],
      },
      {
        kind: "heading",
        id: "collate",
        text: "collate_fn: assembling the batch",
      },
      {
        kind: "paragraph",
        html: "The default `collate_fn` takes a list of samples and `torch.stack`s the tensors, which only works if every sample has the same shape. Images resized to a fixed size are fine. Variable-length sequences are not, and you supply your own:",
      },
      {
        kind: "code",
        filename: "collate.py",
        code: "import torch\nfrom torch.nn.utils.rnn import pad_sequence\n\ndef pad_collate(batch):\n    seqs, labels = zip(*batch)\n    lengths = torch.tensor([len(s) for s in seqs])\n    padded = pad_sequence(seqs, batch_first=True, padding_value=0)\n    return padded, lengths, torch.tensor(labels)\n\nloader = DataLoader(dataset, batch_size=32, collate_fn=pad_collate)\n",
      },
      {
        kind: "heading",
        id: "transforms",
        text: "Transforms and augmentation",
      },
      {
        kind: "paragraph",
        html: "`torchvision.transforms.v2` is the current API. It transforms images, bounding boxes, and masks together, and runs on tensors (so it can go on the GPU) as well as PIL images. Compose the pipeline once, hand it to the Dataset, and let it execute in the workers.",
      },
      {
        kind: "code",
        filename: "transforms.py",
        code: "from torchvision.transforms import v2\n\ntrain_tf = v2.Compose([\n    v2.RandomResizedCrop(224, antialias=True),\n    v2.RandomHorizontalFlip(),\n    v2.ToDtype(torch.float32, scale=True),\n    v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),\n])\n\n# Validation: deterministic — resize + center crop, no randomness.\nval_tf = v2.Compose([\n    v2.Resize(256, antialias=True),\n    v2.CenterCrop(224),\n    v2.ToDtype(torch.float32, scale=True),\n    v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),\n])\n",
      },
      {
        kind: "heading",
        id: "samplers",
        text: "Samplers: controlling the order",
      },
      {
        kind: "paragraph",
        html: "`shuffle=True` is shorthand for a `RandomSampler`. When you need something other than uniform random order (an imbalanced dataset, or one shard per GPU in distributed training), you pass a `sampler` explicitly. For class imbalance, `WeightedRandomSampler` oversamples the rare classes:",
      },
      {
        kind: "code",
        filename: "sampler.py",
        code: "import torch\nfrom torch.utils.data import WeightedRandomSampler, DataLoader\n\nclass_count = torch.bincount(torch.tensor(labels))\nweight_per_class = 1.0 / class_count.float()\nsample_weights = weight_per_class[torch.tensor(labels)]\n\nsampler = WeightedRandomSampler(sample_weights, num_samples=len(labels),\n                                replacement=True)\n\n# Note: pass a sampler OR shuffle=True, never both.\nloader = DataLoader(dataset, batch_size=64, sampler=sampler, num_workers=8)\n",
      },
      {
        kind: "table",
        headers: ["Knob", "Set it to", "Why"],
        rows: [
          [
            "`num_workers`",
            "the knee of your throughput curve",
            "parallel decode. Measure, don't guess",
          ],
          [
            "`pin_memory`",
            "`True` when training on GPU",
            "enables faster async host→device copies",
          ],
          [
            "`persistent_workers`",
            "`True` with `num_workers > 0`",
            "skip worker re-spawn every epoch",
          ],
          [
            "`drop_last`",
            "`True` for training",
            "keeps batch shape constant and avoids a tiny final batch",
          ],
          ["`prefetch_factor`", "`2`–`4`", "buffer batches ahead without hoarding RAM"],
        ],
        caption: "Sensible defaults for a single-GPU image-classification run.",
      },
      {
        kind: "list",
        items: [
          "`Dataset` yields one example, and `DataLoader` yields batches and parallelises the slow work.",
          "Put decoding and augmentation in `__getitem__` so the workers do it off the critical path.",
          "Tune `num_workers` to where throughput plateaus, then stop.",
          "`pin_memory=True` + `.to(device, non_blocking=True)` overlaps the copy with compute.",
          "Custom `collate_fn` for variable-length data, `WeightedRandomSampler` for imbalance.",
        ],
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "torch.utils.data: Dataset, DataLoader, samplers",
            href: "https://pytorch.org/docs/stable/data.html",
            source: "PyTorch documentation",
            note: "Map- vs iterable-style, multiprocessing behaviour, memory pinning.",
          },
          {
            label: "Datasets & DataLoaders: Learn the Basics",
            href: "https://pytorch.org/tutorials/beginner/basics/data_tutorial.html",
            source: "PyTorch tutorials",
          },
          {
            label: "Transforming and augmenting images (transforms v2)",
            href: "https://pytorch.org/vision/stable/transforms.html",
            source: "torchvision documentation",
          },
          {
            label: "A performance guide for PyTorch data loading",
            href: "https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html",
            source: "PyTorch tutorials",
          },
        ],
      },
    ],
  },
  {
    slug: "pytorch-training-for-real-gpu-amp-schedules",
    title: "Training for Real: GPUs, Mixed Precision, and Schedules",
    dek: "The five-line loop from Part 2 trains a toy. A real run adds a device, mixed precision for a near-free 2×, a learning-rate schedule, gradient clipping, and checkpoints you can actually resume from. Here's the whole thing.",
    topic: "Engineering",
    publishedAt: "2026-09-11",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#pytorch", "#training", "#mixed-precision", "#gpu"],
    series: { slug: "pytorch", title: "PyTorch", part: 5 },
    coverImage: "/articles/pytorch-series-cover.svg",
    body: [
      {
        kind: "paragraph",
        html: "The training loop in Part 2 is correct and it's also a toy. It runs on the CPU in full precision, at a fixed learning rate, with no way to stop and resume. A real run, one that takes hours and costs money, wraps that same five-line core in a few layers of machinery. None of it is complicated. All of it is standard. This part assembles the loop you'll actually copy into projects.",
      },
      {
        kind: "heading",
        id: "gpu",
        text: "Get on the GPU",
      },
      {
        kind: "paragraph",
        html: "Pick a device once, at the top, and move the model and every batch onto it. The model moves in place, but tensors don't, so you reassign. `non_blocking=True` lets the host→device copy overlap with compute when the source is pinned memory (which your DataLoader is providing, from Part 4).",
      },
      {
        kind: "code",
        filename: "device.py",
        code: 'import torch\n\ndevice = "cuda" if torch.cuda.is_available() else "cpu"\nmodel = model.to(device)\n\nfor images, labels in loader:\n    images = images.to(device, non_blocking=True)\n    labels = labels.to(device, non_blocking=True)\n    ...\n',
      },
      {
        kind: "callout",
        title: '"Expected all tensors to be on the same device"',
        body: "The most common first-GPU error. Something (a metric tensor, a manually created constant, a loss weight) is still on the CPU while everything else is on `cuda`. Trace back to the tensor you built with `torch.tensor(...)` and never moved.",
      },
      {
        kind: "heading",
        id: "amp",
        text: "Mixed precision: a nearly free 2×",
      },
      {
        kind: "paragraph",
        html: "Modern GPUs run half-precision matrix multiplies far faster than full precision, and use half the memory doing it. **Automatic Mixed Precision** runs the forward pass in `bfloat16` or `float16` where it's safe and keeps a `float32` copy of the weights for the update. With `float16` you also need a `GradScaler`, which multiplies the loss up before `backward()` so small gradients don't flush to zero, then unscales before the step.",
      },
      {
        kind: "code",
        filename: "amp.py",
        code: 'import torch\n\nscaler = torch.amp.GradScaler("cuda")\n\nfor images, labels in loader:\n    images = images.to(device, non_blocking=True)\n    labels = labels.to(device, non_blocking=True)\n\n    opt.zero_grad()\n    with torch.amp.autocast("cuda", dtype=torch.bfloat16):\n        logits = model(images)\n        loss = loss_fn(logits, labels)\n\n    scaler.scale(loss).backward()\n    scaler.step(opt)\n    scaler.update()\n',
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Relative training throughput: fp32 vs. AMP",
        xKey: "batch",
        yLabel: "steps / second (normalised)",
        note: "Illustrative, ResNet-50-scale model on a recent GPU",
        caption:
          "AMP's advantage grows with batch size, because larger matmuls spend proportionally more time in the tensor cores that half precision unlocks. The memory saving also lets you fit the larger batch in the first place.",
        series: [
          { key: "fp32", label: "float32" },
          { key: "amp", label: "AMP (bf16)" },
        ],
        data: [
          { batch: "bs 32", fp32: 1.0, amp: 1.6 },
          { batch: "bs 64", fp32: 1.0, amp: 1.9 },
          { batch: "bs 128", fp32: 1.0, amp: 2.1 },
          { batch: "bs 256", fp32: 1.0, amp: 2.3 },
        ],
      },
      {
        kind: "heading",
        id: "schedules",
        text: "Learning-rate schedules",
      },
      {
        kind: "paragraph",
        html: "A fixed learning rate is a compromise: large enough to make early progress, small enough not to bounce around the minimum later. A **schedule** removes the compromise: start with a short linear **warmup** (so the first steps don't wreck freshly-initialised weights), then **decay**, usually along a cosine curve, toward zero.",
      },
      {
        kind: "formula",
        tex: "\\eta_t = \\eta_{\\min} + \\tfrac{1}{2}\\,(\\eta_{\\max} - \\eta_{\\min})\\left(1 + \\cos\\frac{\\pi t}{T}\\right)",
        caption:
          "Cosine annealing: η eases from its maximum to its minimum over T steps, slowly at both ends and fastest in the middle.",
      },
      {
        kind: "code",
        filename: "schedule.py",
        code: "from torch.optim.lr_scheduler import LinearLR, CosineAnnealingLR, SequentialLR\n\nwarmup = LinearLR(opt, start_factor=0.01, total_iters=500)\ncosine = CosineAnnealingLR(opt, T_max=total_steps - 500)\nscheduler = SequentialLR(opt, [warmup, cosine], milestones=[500])\n\nfor step, (images, labels) in enumerate(loader):\n    ...\n    scaler.step(opt)\n    scaler.update()\n    scheduler.step()   # once per optimizer step\n",
      },
      {
        kind: "figure",
        variant: "line",
        title: "Learning rate over a training run",
        xKey: "step",
        xLabel: "step",
        yLabel: "learning rate (fraction of base)",
        note: "1,000-step run, 100-step warmup",
        caption:
          "Cosine + warmup (smooth) vs. step decay (drop 10× at the halfway mark). Warmup is the short ramp at the start, and both end far below where they began. Hover to compare.",
        series: [
          { key: "cosine", label: "cosine + warmup" },
          { key: "stepdecay", label: "step decay" },
        ],
        data: [
          { step: 0, cosine: 0.01, stepdecay: 1.0 },
          { step: 100, cosine: 1.0, stepdecay: 1.0 },
          { step: 200, cosine: 0.97, stepdecay: 1.0 },
          { step: 300, cosine: 0.88, stepdecay: 1.0 },
          { step: 400, cosine: 0.75, stepdecay: 1.0 },
          { step: 500, cosine: 0.59, stepdecay: 0.1 },
          { step: 600, cosine: 0.42, stepdecay: 0.1 },
          { step: 700, cosine: 0.25, stepdecay: 0.1 },
          { step: 800, cosine: 0.12, stepdecay: 0.1 },
          { step: 900, cosine: 0.03, stepdecay: 0.1 },
          { step: 1000, cosine: 0.0, stepdecay: 0.1 },
        ],
      },
      {
        kind: "heading",
        id: "clip-accum",
        text: "Gradient clipping and accumulation",
      },
      {
        kind: "paragraph",
        html: "**Clipping** caps the global norm of the gradient before the step, which stops a single bad batch from throwing the weights off a cliff. It is standard practice for Transformers and RNNs. **Accumulation** runs several forward/backward passes before one optimizer step, so you get the training dynamics of a large batch on a GPU that can't hold one.",
      },
      {
        kind: "code",
        filename: "clip_accum.py",
        code: 'accum_steps = 4\n\nfor step, (images, labels) in enumerate(loader):\n    with torch.amp.autocast("cuda", dtype=torch.bfloat16):\n        loss = loss_fn(model(images.to(device)), labels.to(device))\n        loss = loss / accum_steps            # average, don\'t sum\n    scaler.scale(loss).backward()\n\n    if (step + 1) % accum_steps == 0:\n        scaler.unscale_(opt)                  # unscale before clipping\n        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)\n        scaler.step(opt)\n        scaler.update()\n        opt.zero_grad()\n        scheduler.step()\n',
      },
      {
        kind: "heading",
        id: "checkpoints",
        text: "Checkpoints you can resume from",
      },
      {
        kind: "paragraph",
        html: "A checkpoint that only holds the model weights cannot resume a run, because the optimizer's momentum buffers, the scheduler's step count, and the AMP scaler's state all matter. Save the lot in one dict.",
      },
      {
        kind: "code",
        filename: "checkpoint.py",
        code: 'import torch\n\ndef save_ckpt(path, epoch):\n    torch.save({\n        "epoch": epoch,\n        "model": model.state_dict(),\n        "opt": opt.state_dict(),\n        "scheduler": scheduler.state_dict(),\n        "scaler": scaler.state_dict(),\n    }, path)\n\ndef load_ckpt(path):\n    ckpt = torch.load(path, map_location=device, weights_only=True)\n    model.load_state_dict(ckpt["model"])\n    opt.load_state_dict(ckpt["opt"])\n    scheduler.load_state_dict(ckpt["scheduler"])\n    scaler.load_state_dict(ckpt["scaler"])\n    return ckpt["epoch"] + 1        # resume from the next epoch\n',
      },
      {
        kind: "callout",
        title: "Reproducibility, roughly",
        body: "Seed `random`, `numpy`, and `torch` (`torch.manual_seed`), and set a DataLoader `worker_init_fn`. For bit-exact runs also set `torch.use_deterministic_algorithms(True)` and `cudnn.deterministic = True`, but expect a speed cost, and know that some ops have no deterministic implementation.",
      },
      {
        kind: "heading",
        id: "validation",
        text: "A validation pass",
      },
      {
        kind: "code",
        filename: "validate.py",
        code: '@torch.no_grad()\ndef validate(model, loader):\n    model.eval()\n    correct = total = 0\n    for images, labels in loader:\n        images, labels = images.to(device), labels.to(device)\n        with torch.amp.autocast("cuda", dtype=torch.bfloat16):\n            preds = model(images).argmax(dim=1)\n        correct += (preds == labels).sum().item()\n        total += labels.numel()\n    model.train()\n    return correct / total\n',
      },
      {
        kind: "heading",
        id: "the-whole-thing",
        text: "The whole thing",
      },
      {
        kind: "code",
        filename: "train_full.py",
        code: 'import torch\n\ndevice = "cuda" if torch.cuda.is_available() else "cpu"\nmodel = model.to(device)\nopt = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.05)\nscaler = torch.amp.GradScaler("cuda")\nscheduler = build_scheduler(opt, total_steps)\nloss_fn = torch.nn.CrossEntropyLoss()\n\nstart_epoch = load_ckpt("last.pt") if resume else 0\nbest_acc = 0.0\n\nfor epoch in range(start_epoch, epochs):\n    model.train()\n    for images, labels in train_loader:\n        images = images.to(device, non_blocking=True)\n        labels = labels.to(device, non_blocking=True)\n\n        opt.zero_grad()\n        with torch.amp.autocast("cuda", dtype=torch.bfloat16):\n            loss = loss_fn(model(images), labels)\n        scaler.scale(loss).backward()\n        scaler.unscale_(opt)\n        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)\n        scaler.step(opt)\n        scaler.update()\n        scheduler.step()\n\n    acc = validate(model, val_loader)\n    save_ckpt("last.pt", epoch)\n    if acc > best_acc:\n        best_acc = acc\n        save_ckpt("best.pt", epoch)\n    print(f"epoch {epoch}  val_acc {acc:.4f}  lr {scheduler.get_last_lr()[0]:.2e}")\n',
      },
      {
        kind: "list",
        items: [
          "One device, chosen once. The model is moved in place, batches are moved every step with `non_blocking=True`.",
          "AMP with `autocast` + `GradScaler`, for roughly 2× throughput and half the memory.",
          "Warmup then cosine decay, with `scheduler.step()` once per optimizer step.",
          "Clip the gradient norm, and accumulate when the batch you want won't fit.",
          "Checkpoint model + optimizer + scheduler + scaler + epoch, or you can't truly resume.",
          "`@torch.no_grad()` and `model.eval()` around validation, then back to `model.train()` after.",
        ],
      },
      {
        kind: "paragraph",
        html: "That's the series. Five parts ago this was a single data structure. Now it's a training run you could put on a cluster. Everything past here (`torch.compile`, FSDP and multi-node, quantisation, custom kernels) is a refinement of these same pieces, and none of it will surprise you once this loop is muscle memory.",
      },
      {
        kind: "references",
        title: "References",
        items: [
          {
            label: "Automatic Mixed Precision package: torch.amp",
            href: "https://pytorch.org/docs/stable/amp.html",
            source: "PyTorch documentation",
          },
          {
            label: "Automatic Mixed Precision recipe",
            href: "https://pytorch.org/tutorials/recipes/recipes/amp_recipe.html",
            source: "PyTorch tutorials",
          },
          {
            label: "How to adjust learning rate: torch.optim.lr_scheduler",
            href: "https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate",
            source: "PyTorch documentation",
          },
          {
            label: "SGDR: Stochastic Gradient Descent with Warm Restarts",
            href: "https://arxiv.org/abs/1608.03983",
            source: "Loshchilov & Hutter, ICLR 2017",
            note: "The cosine-annealing schedule.",
          },
          {
            label: "Saving and loading a general checkpoint",
            href: "https://pytorch.org/tutorials/recipes/recipes/saving_and_loading_a_general_checkpoint.html",
            source: "PyTorch tutorials",
          },
          {
            label: "Reproducibility",
            href: "https://pytorch.org/docs/stable/notes/randomness.html",
            source: "PyTorch documentation",
          },
        ],
      },
    ],
  },
  {
    slug: "engineering-council-sri-lanka",
    title: "Registered as an Associate Engineer with the Engineering Council of Sri Lanka",
    dek: "Receiving official registration under the ECSL Act No. 4 of 2017. What statutory engineering recognition means for software and systems practitioners.",
    topic: "Career",
    publishedAt: "2025-04-01",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#engineering", "#career", "#milestones"],
    coverImage: "/articles/engineering-council-sri-lanka.png",
    body: [
      {
        kind: "paragraph",
        html: "I am pleased to share an important milestone in my professional engineering journey: I have been officially registered as an **Associate Engineer** by the **Engineering Council of Sri Lanka (ECSL)**.",
      },
      {
        kind: "paragraph",
        html: "In many parts of the tech industry, the title 'engineer' is used casually, often appended to frontend developers, prompt engineers, or sales specialists without formal statutory meaning. In Sri Lanka, however, the **Engineering Council, Sri Lanka Act No. 4 of 2017** established a strict legal framework regulating the practice of engineering across all disciplines.",
      },
      {
        kind: "heading",
        id: "the-statutory-and-academic-foundation",
        text: "The Statutory and Academic Foundation",
      },
      {
        kind: "paragraph",
        html: "Under the ECSL Act, registration as an Associate Engineer recognizes individuals holding a four-year engineering honors degree from an accredited institution. For me, this is rooted in my graduation from the **Department of Computer Engineering at the University of Peradeniya**, a program accredited under the international **Washington Accord** by the Institution of Engineers, Sri Lanka (IESL).",
      },
      {
        kind: "paragraph",
        html: "That academic foundation was deeply rigorous. It wasn't just about learning high-level programming frameworks. It meant mastering computer systems architecture, operating systems internals, discrete mathematics, digital signal processing, electronic circuit design, and hardware-software co-design. That breadth builds an instinct for understanding exactly what happens when high-level code interacts with physical transistors and OS schedulers.",
      },
      {
        kind: "heading",
        id: "why-formal-engineering-matters-in-ai-and-systems",
        text: "Why Engineering Discipline Matters in Modern Software and AI",
      },
      {
        kind: "paragraph",
        html: "As software systems become increasingly autonomous (powering critical health infrastructure, automated trading desks, and LLM agentic pipelines), the boundary between traditional civil/mechanical engineering and computer engineering blurs. When an AI pipeline hallucinates an automated medical recommendation or an asynchronous worker pool exhausts server memory during an emergency, the consequences are concrete and severe.",
      },
      {
        kind: "paragraph",
        html: "Statutory engineering registration reinforces three principles that guide how I build and write:",
      },
      {
        kind: "list",
        items: [
          "**Professional Accountability**: A commitment to rigorous verification, defensive systems design, and root-cause analysis rather than superficial hot-fixes.",
          "**Code of Ethics and Public Safety**: Designing distributed systems with security, privacy, data protection, and fault tolerance as primary non-functional requirements.",
          "**Continuous Professional Development (CPD)**: The ongoing discipline of keeping pace with rapidly evolving systems architectures, from Linux kernel developments to state-of-the-art agent protocols.",
        ],
      },
      {
        kind: "paragraph",
        html: "I look forward to continuing my journey as a practicing computer systems engineer, building high-reliability software, and documenting technical findings here on Space.",
      },
    ],
  },
  {
    slug: "mcp-vs-acp",
    title: "MCP and A2A Are Layers, Not Rivals",
    dek: "The consolidation under open standards settled the protocol question. MCP solves tool access, and A2A solves agent collaboration. Here is how they stack in production.",
    topic: "Systems",
    publishedAt: "2025-02-25",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#acp", "#aiagents", "#protocols"],
    series: { slug: "mcp", title: "The Model Context Protocol", part: 3 },
    coverImage: "/articles/mcp-vs-acp.png",
    body: [
      {
        kind: "paragraph",
        html: "The AI agent ecosystem has transitioned over the past year from wild fragmentation toward layered standardization. In early 2024, if you wanted an autonomous agent to read a production Postgres table, query GitHub pull requests, and hand off tasks to a specialized verification agent, you had to write custom glue code for every model provider and every tool.",
      },
      {
        kind: "paragraph",
        html: "For a while, two emerging standards seemed to compete for mindshare: Anthropic's **Model Context Protocol (MCP)** and agent communication protocols such as IBM's ACP and Google's **A2A (Agent-to-Agent)**. The industry debated which protocol would win.",
      },
      {
        kind: "paragraph",
        html: "That debate is over because it was based on a category error. **MCP and A2A operate on orthogonal axes.** MCP is the *vertical* plane (model-to-tool), while A2A is the *horizontal* plane (agent-to-agent). High-scale enterprise agentic systems do not pick between them. They use MCP at the bottom of the stack and A2A at the top.",
      },
      {
        kind: "heading",
        id: "the-layered-agent-stack",
        text: "The Layered Agent Architecture",
      },
      {
        kind: "mermaid",
        caption:
          "The layered agent architecture. A2A governs horizontal collaboration and long-running task delegation across organizations, while MCP provides fast, synchronous model-to-tool integration over JSON-RPC 2.0.",
        code: `flowchart TD
    subgraph ORCH["AGENT ORCHESTRATION LAYER"]
        direction TB
        O_BODY["<b>A2A Protocol</b> (REST / SSE / Asynchronous)<br/>• Capability discovery (Agent Cards)<br/>• Cross-organization task delegation<br/>• Human-in-the-loop approvals & long-running sessions"]
    end

    subgraph AGENTS["SPECIALIZED AGENT LAYER"]
        direction LR
        AGENT_A["<b>Specialized Agent A</b><br/>(e.g., Code Reviewer)"]
        AGENT_B["<b>Specialized Agent B</b><br/>(e.g., Deploy Master)"]
    end

    subgraph TOOLS_A["MCP TOOL SERVERS"]
        direction TB
        TOOL_A["• Git / GitHub API<br/>• Static Analysis Engine"]
    end

    subgraph TOOLS_B["MCP TOOL SERVERS"]
        direction TB
        TOOL_B["• Kubernetes Cluster API<br/>• Cloudflare DNS"]
    end

    ORCH -->|"Task Delegation"| AGENT_A
    ORCH -->|"Task Delegation"| AGENT_B

    AGENT_A -->|"MCP (JSON-RPC 2.0)"| TOOLS_A
    AGENT_B -->|"MCP (JSON-RPC 2.0)"| TOOLS_B`,
      },
      {
        kind: "heading",
        id: "mcp-the-vertical-tool-plane",
        text: "MCP: The Vertical Tool Plane",
      },
      {
        kind: "paragraph",
        html: "MCP solves the `N×M` integration problem between models and external resources. Instead of every tool author writing custom SDK wrappers for LangChain, LlamaIndex, Claude, and OpenAI, MCP establishes a clean, type-safe client-server contract over JSON-RPC 2.0 (via `stdio` or Server-Sent Events).",
      },
      {
        kind: "paragraph",
        html: "MCP is strictly **stateless and synchronous**. A tool call is an atomic query: the model issues a request, the server executes the tool locally, and returns the structured payload. Here is what a raw MCP tool invocation looks like on the wire:",
      },
      {
        kind: "code",
        filename: "mcp-call.json",
        code: `// Client -> MCP Server\n{\n  "jsonrpc": "2.0",\n  "id": "req-42",\n  "method": "tools/call",\n  "params": {\n    "name": "query_database",\n    "arguments": {\n      "sql": "SELECT id, status, total FROM orders WHERE customer_id = $1 LIMIT 5",\n      "params": ["cust_9821"]\n    }\n  }\n}\n\n// MCP Server -> Client\n{\n  "jsonrpc": "2.0",\n  "id": "req-42",\n  "result": {\n    "content": [\n      {\n        "type": "text",\n        "text": "[{\\"id\\":\\"ord_1\\",\\"status\\":\\"shipped\\",\\"total\\":149.50}]"\n      }\n    ],\n    "isError": false\n  }\n}`,
      },
      {
        kind: "heading",
        id: "a2a-the-horizontal-collaboration-plane",
        text: "A2A: The Horizontal Collaboration Plane",
      },
      {
        kind: "paragraph",
        html: "While MCP connects a model to a database, it has no semantics for long-running workflows, multi-agent negotiations, or inter-service trust. If an agent needs to delegate a task to an agent hosted by a third-party vendor (e.g. an external logistics provider), MCP is the wrong protocol.",
      },
      {
        kind: "paragraph",
        html: "**A2A (Agent-to-Agent)** operates over HTTPS/REST and WebSockets. It introduces:",
      },
      {
        kind: "list",
        items: [
          "**Agent Discovery**: Agents publish machine-readable capability cards declaring their domains, input schemas, and authentication requirements.",
          "**Asynchronous State Machines**: Tasks can remain in `pending_approval` or `in_progress` for hours while waiting for human sign-off or external batch completions, without holding open synchronous socket connections.",
          "**Organizational Boundaries**: Built-in OAuth2 and mTLS mechanisms allow agents across different companies to collaborate with auditability.",
        ],
      },
      {
        kind: "code",
        filename: "a2a-task-delegation.json",
        code: `// Orchestrator -> Compliance Audit Agent (A2A)\nPOST /v1/agents/compliance-auditor/tasks\nHost: agent.enterprise-audit.com\nAuthorization: Bearer eyJhbGciOi...\nContent-Type: application/json\n\n{\n  "task_id": "task_audit_2026_09",\n  "intent": "evaluate_pull_request_compliance",\n  "payload": {\n    "repository": "space/backend-api",\n    "pr_number": 342,\n    "compliance_frameworks": ["SOC2", "HIPAA"]\n  },\n  "callback_url": "https://orchestrator.internal.net/webhooks/a2a-results",\n  "async": true\n}`,
      },
      {
        kind: "heading",
        id: "how-they-unite-in-production",
        text: "How They Stack Together",
      },
      {
        kind: "paragraph",
        html: "Consider a concrete production scenario: An incident response orchestrator receives an alerting webhook. The orchestrator uses **A2A** to assign a diagnosis task to a Site Reliability Agent. That SRE Agent boots up, uses **MCP** to query Datadog logs and inspect Kubernetes pods, determines that a memory leak occurred, and uses **MCP** to restart the deployment.",
      },
      {
        kind: "paragraph",
        html: "Once mitigated, the SRE Agent uses **A2A** to reply back to the orchestrator with the incident timeline. The orchestrator then delegates to a Comms Agent via **A2A** to draft the customer-facing post-mortem.",
      },
      {
        kind: "callout",
        title: "Key Takeaway",
        body: "Build tool integrations as MCP servers so any client or agent can immediately consume your database, APIs, and CLI tools. Build inter-service agent communication with A2A so agents can negotiate, pause, and collaborate asynchronously across infrastructure boundaries.",
      },
    ],
  },
  {
    slug: "docker-mcp",
    title: "Docker's Dynamic MCP and the Context Window Problem",
    dek: "Fifty tool definitions crammed into the context window costs tokens, degrades reasoning, and risks hallucinations. Docker's containerized MCP Gateway and dynamic discovery flip the model.",
    topic: "Engineering",
    featured: true,
    publishedAt: "2025-02-24",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#docker", "#aiagents", "#devtools"],
    series: { slug: "mcp", title: "The Model Context Protocol", part: 2 },
    coverImage: "/articles/docker-mcp.png",
    body: [
      {
        kind: "paragraph",
        html: "If you have spent any serious time building with Anthropic's **Model Context Protocol (MCP)**, you have likely run headfirst into what engineers are calling the *tool sprawl dilemma*. When MCP was first released, most setups wired two or three servers: a local SQLite database, a filesystem reader, and perhaps a GitHub integration. Everything was fast, prompt tokens were negligible, and the model rarely missed a tool call.",
      },
      {
        kind: "paragraph",
        html: "Fast forward to production setups, and developers are now attempting to connect 10, 15, or 20 distinct MCP servers simultaneously: Postgres, Redis, AWS, Slack, Sentry, Jira, and Docker. Each server exposes anywhere from 5 to 20 individual tool schemas. Suddenly, your AI client is forced to prepend **over 50 tool definitions** into the context window on every single turn.",
      },
      {
        kind: "heading",
        id: "the-token-tax-and-attention-degradation",
        text: "The Token Tax and Attention Degradation",
      },
      {
        kind: "paragraph",
        html: "The problem is twofold: direct financial cost and cognitive degradation. Each MCP tool definition is not just a function name. It is a verbose JSON Schema containing parameter types, nested properties, enums, and detailed markdown descriptions intended to guide the model's decision making.",
      },
      {
        kind: "paragraph",
        html: "A suite of 60 active tools can easily devour **20,000 to 45,000 tokens** before the user even types their first question. In a multi-turn conversation of 20 turns, you are paying for those 45,000 schema tokens 20 times over. Worse, research into 'lost in the middle' phenomena demonstrates that packing dozens of similar tool schemas into the context window significantly increases tool selection errors and hallucinated parameter values.",
      },
      {
        kind: "callout",
        title: "The Core Dilemma",
        body: "Static MCP configurations force a zero-sum tradeoff: either handicap your agent by giving it access to only a few tools, or bloat your context window with dozens of schemas that degrade reasoning and drain API budgets.",
      },
      {
        kind: "heading",
        id: "the-docker-mcp-architecture",
        text: "The Docker MCP Architecture: Gateway and Catalog",
      },
      {
        kind: "paragraph",
        html: "Docker's official answer, built into Docker Desktop 4.50+ via the **MCP Toolkit** and the open-source **Docker MCP Gateway**, fundamentally redesigns how agents interact with external capabilities. Instead of treating MCP servers as host-level node or python processes that must be statically declared in client configuration files, Docker introduces three core concepts:",
      },
      {
        kind: "list",
        items: [
          "**Docker MCP Catalog**: A curated registry of 300+ containerized, pre-verified MCP servers (`mcp/postgres`, `mcp/github`, `mcp/slack`, etc.). Packaging servers as container images eliminates Python virtualenv collisions, Node version mismatches, and native dependency compilation on the host.",
          "**The Docker MCP Gateway**: An intelligent local daemon and proxy that acts as the single unified MCP server exposed to your AI client (Claude Desktop, Cursor, VS Code, or Claude Code). The gateway orchestrates underlying container lifecycles on demand.",
          "**Dynamic Tool Discovery**: Rather than sending 50 tool schemas to the model up front, the Gateway sends only four meta-management tools: `mcp-find`, `mcp-add`, `mcp-config-set`, and `mcp-remove`.",
        ],
      },
      {
        kind: "heading",
        id: "client-configuration",
        text: "Configuring the Gateway in Claude Desktop and Cursor",
      },
      {
        kind: "paragraph",
        html: "Connecting an AI client to the Docker MCP Gateway requires only a single server entry in your client configuration file (`claude_desktop_config.json` on macOS/Windows, or a project-level `mcp.json`). Once connected, the client never needs to be restarted when new tools are added or removed:",
      },
      {
        kind: "code",
        filename: "claude_desktop_config.json",
        code: `{\n  "mcpServers": {\n    "MCP_DOCKER": {\n      "command": "docker",\n      "args": ["mcp", "gateway", "run"]\n    }\n  }\n}`,
      },
      {
        kind: "paragraph",
        html: 'When the client launches, the model sees the Docker Gateway. When you ask the agent: *\'Can you inspect our production Postgres schema and list recent orders?\'*, the agent doesn\'t fail because it lacks a Postgres tool. Instead, it calls `mcp-find(query="postgres")`, receives the catalog result, calls `mcp-add(server="mcp/postgres")`, and the gateway spins up an isolated container instantly. The Postgres tools are registered into the session dynamically without restarting the client.',
      },
      {
        kind: "heading",
        id: "running-isolated-servers-directly",
        text: "Direct Containerized Execution without the Gateway",
      },
      {
        kind: "paragraph",
        html: "If you prefer fixed, deterministic server declarations without dynamic discovery, Docker also solves the security isolation challenge. Traditional MCP servers run directly on your host machine with full user permissions. By running official Docker MCP images directly via stdio, you gain container sandboxing and explicit environment control:",
      },
      {
        kind: "code",
        filename: "claude_desktop_config.json",
        code: `{\n  "mcpServers": {\n    "postgres-db": {\n      "command": "docker",\n      "args": [\n        "run",\n        "-i",\n        "--rm",\n        "-e",\n        "DATABASE_URL=postgresql://read_only_user:secret@host.docker.internal:5432/space_production",\n        "mcp/postgres"\n      ]\n    },\n    "github": {\n      "command": "docker",\n      "args": [\n        "run",\n        "-i",\n        "--rm",\n        "-e",\n        "GITHUB_PERSONAL_ACCESS_TOKEN=ghp_yourTokenHere",\n        "mcp/github"\n      ]\n    }\n  }\n}`,
      },
      {
        kind: "paragraph",
        html: "Notice the `-i` (interactive/stdin passthrough) and `--rm` flags. Communication happens over standard input and output (JSON-RPC 2.0) exactly as the MCP specification mandates, but the process has zero access to your local `/Users` or filesystem unless you explicitly map a volume with `-v`.",
      },
      {
        kind: "heading",
        id: "cli-profile-management",
        text: "Managing Profiles via the Docker CLI",
      },
      {
        kind: "paragraph",
        html: "In team and production development, you often want specific tool sets bundled for specific repositories. Docker provides profile management through the `docker mcp` CLI plugin:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: `# 1. Create a specialized profile for backend data engineering\ndocker mcp profile create --name backend-data\n\n# 2. Add verified catalog servers to the profile\ndocker mcp profile server add backend-data --server mcp/postgres\ndocker mcp profile server add backend-data --server mcp/redis\n\n# 3. Configure credentials on the profile securely\ndocker mcp profile config backend-data --set mcp/postgres.DATABASE_URL=postgresql://user:pass@db.internal:5432/app\n\n# 4. Launch the Gateway restricted to this verified profile\ndocker mcp gateway run --profile backend-data`,
      },
      {
        kind: "paragraph",
        html: "You can also connect external desktop applications directly using the CLI bridge:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: `docker mcp client connect claude-desktop --profile backend-data`,
      },
      {
        kind: "heading",
        id: "code-mode-and-container-sandboxing",
        text: "Code Mode: Solving the Multihop Payload Explosion",
      },
      {
        kind: "paragraph",
        html: "The second breakthrough in Docker MCP is **Code Mode** (powered by `mcp-exec`). In standard agent interactions, if a tool returns a 4,000-line JSON array, the entire payload enters the LLM's conversation history just so the model can run a simple filter or aggregation.",
      },
      {
        kind: "paragraph",
        html: "Under Code Mode, the gateway provides a sandboxed JavaScript runtime container. Instead of streaming raw JSON payloads back to the model, the model writes a brief script that invokes the underlying MCP tools inside the container, processes the data locally in memory, and returns only the final scalar result or filtered summary back to the conversation. Docker estimates this reduces turn-by-turn context bloat by up to 90% on data-heavy tasks.",
      },
      {
        kind: "callout",
        title: "Production Rule of Thumb",
        body: "Use direct containerized execution (`docker run -i --rm mcp/<name>`) when your project has a fixed, well-scoped set of tools. Use the Docker MCP Gateway (`docker mcp gateway run`) with Dynamic Discovery when building general-purpose developer agents that need to solve unbounded problems across diverse cloud and database services.",
      },
      {
        kind: "paragraph",
        html: "The shift underneath all of this is from monolithic agents that attempt to hold the entire world in their context window to modular, discovery-driven agents that pull tools on demand inside secure containers. It is the single most practical architectural pattern for scaling MCP in production.",
      },
    ],
  },
  {
    slug: "my-mcp",
    title: "Why I'm Excited About MCP",
    dek: "A standard way to hand a model your files, your tools, and your prompts, without custom glue code holding it all together.",
    topic: "Systems",
    publishedAt: "2025-02-22",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#claude", "#tools", "#devtools"],
    series: { slug: "mcp", title: "The Model Context Protocol", part: 1 },
    coverImage: "/articles/my-mcp.png",
    body: [
      {
        kind: "paragraph",
        html: "Over the past few months I have been going deeper into one of the most useful pieces of AI infrastructure I have come across: the **Model Context Protocol**, or MCP. If you work with language models, whether you are building copilots, internal tools, or side projects, it is worth knowing about.",
      },
      {
        kind: "heading",
        id: "llms-are-isolated",
        text: "Models are capable, and isolated",
      },
      {
        kind: "paragraph",
        html: "The limitation I have run into again and again is simple: the model is smart, but it does not know anything unless you feed it the right context. Documents, databases, tools, workflows. Getting that context into the model securely and flexibly has always been a headache.",
      },
      {
        kind: "paragraph",
        html: "MCP is a standardized protocol that closes that gap. With it you can expose a folder of files to your assistant as resources, give it a set of functions it can call such as running a SQL query or sending an email, and offer pre-written prompts that guide interactions or define workflows. All through one clean protocol that works with any compliant server or client. No hacks and no custom glue code.",
      },
      {
        kind: "heading",
        id: "my-first-experiment",
        text: "My first experiment",
      },
      {
        kind: "paragraph",
        html: "I built a lightweight MCP server in Python, added a `run_query` tool to safely reach my PostgreSQL database, and ran it locally with the MCP dev tools. From there I could send test queries and simulate model interactions straight through the protocol. No frontend, no UI, just structured data in and out.",
      },
      {
        kind: "paragraph",
        html: "The reason that took an afternoon rather than a week is how little the SDK asks for. Install it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: 'pip install "mcp[cli]"\n# or, with uv:\nuv add "mcp[cli]"',
      },
      {
        kind: "paragraph",
        html: "A server is then a couple of decorated functions. This is the shape of it, straight from the SDK's own quickstart:",
      },
      {
        kind: "code",
        filename: "server.py",
        code: 'from mcp.server import MCPServer\n\nmcp = MCPServer("Demo")\n\n\n@mcp.tool()\ndef add(a: int, b: int) -> int:\n    """Add two numbers."""\n    return a + b\n\n\n@mcp.resource("greeting://{name}")\ndef greeting(name: str) -> str:\n    """Greet someone by name."""\n    return f"Hello, {name}!"',
      },
      {
        kind: "paragraph",
        html: "That is the whole server. There is no JSON Schema to write, because the type hints `a: int, b: int` are the schema. There is no request parsing, no validation code, and no protocol handling. The docstring becomes the description the model reads to decide whether to call the tool, which means writing a clear one is a real part of the work.",
      },
      {
        kind: "paragraph",
        html: "You run it against the MCP Inspector to poke at it before wiring up any client:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "uv run mcp dev server.py",
      },
      {
        kind: "paragraph",
        html: "Swap `add` for a function that opens a database connection and runs a parameterised query, and you have roughly what I built. That gave me a way to let the model talk to my data, run logic, and explain the results, all in structured JSON.",
      },
      {
        kind: "heading",
        id: "what-makes-it-work",
        text: "What makes it work",
      },
      {
        kind: "list",
        items: [
          "**It respects boundaries.** You control what the model sees and which tools it can run. Nothing happens without your say-so, and the surface is exactly the functions you decorated.",
          "**It is modular.** Build only what you need. There is no large framework to adopt first.",
          "**It is the right shape.** Context, control, and composability are exactly what agent-based systems need in order to work.",
        ],
      },
      {
        kind: "paragraph",
        html: "The boundary point is worth taking seriously rather than treating as a feature list item. A tool named `run_query` that accepts arbitrary SQL is a very different security proposition from one that accepts a customer ID. The protocol gives you the control, but deciding how narrow to make each tool is still your job.",
      },
      {
        kind: "paragraph",
        html: "For me AI has never been only about the technology. It is about building tools that help people do things better, and MCP is what gets the right context to a model at the right time, in the right way. I am genuinely interested to see where it goes, and I plan to keep building with it.",
      },
      {
        kind: "paragraph",
        html: "If you want to try it, I made a [custom ChatGPT assistant for MCP](https://chatgpt.com/g/g-68068352332c819181320abe67354b48-mcp-assistant), built entirely from the official docs. It walks through MCP step by step, helps you build clients or servers faster, and helps you debug an implementation.",
      },
    ],
  },
  {
    slug: "xcodeai",
    title: "Apple's AI Coding Assistant in Xcode: Local-First Engineering on Apple Silicon",
    dek: "How Apple built predictive code completion directly into Xcode 16 using the Apple Neural Engine. Zero cloud roundtrips, offline privacy, and Swift specialization.",
    topic: "Engineering",
    publishedAt: "2025-02-18",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#xcode", "#apple", "#swift", "#copilot"],
    coverImage: "/articles/xcodeai.png",
    body: [
      {
        kind: "paragraph",
        html: "When Apple announced **Predictive Code Completion** and **Swift Assist** in **Xcode 16**, the developer community watched closely to see how Cupertino would respond to Microsoft's GitHub Copilot and Cursor. While competitors focused almost exclusively on massive cloud models, Apple leveraged its greatest architectural advantage: **unified memory and the Apple Neural Engine (ANE)**.",
      },
      {
        kind: "heading",
        id: "the-local-first-architectural-advantage",
        text: "The Local-First Architecture: Zero Cloud Roundtrips",
      },
      {
        kind: "paragraph",
        html: "The standout differentiator of Xcode's code completion is that it runs **100% locally on your Mac**. Powered by a specialized foundation model fine-tuned specifically for Swift and Apple frameworks (SwiftUI, SwiftData, UIKit), the model is quantized to execute efficiently on the 16-core Neural Engine of M-series chips.",
      },
      {
        kind: "list",
        items: [
          "**Sub-20ms Latency**: Because tokens are generated locally across the unified memory bus, completions appear seamlessly as you type, with none of the 300–800ms network jitter common in cloud-backed assistants.",
          "**True Offline Capability**: You can build, refactor, and receive intelligent code suggestions at 35,000 feet on an airplane or in air-gapped secure development environments.",
          "**Enterprise Privacy**: Proprietary source code never leaves the developer's laptop, eliminating corporate compliance barriers and IP leakage risks.",
        ],
      },
      {
        kind: "heading",
        id: "swift-assist-and-cloud-orchestration",
        text: "Swift Assist: Bridging Local and Cloud Intelligence",
      },
      {
        kind: "paragraph",
        html: "For complex, broad architectural tasks, such as converting legacy completion-handler code to modern `async/await` actors or generating comprehensive XCTest suites, Apple introduced **Swift Assist**. Unlike completion, Swift Assist handles high-level conversational directives and routes computationally intensive reasoning tasks to **Private Cloud Compute (PCC)** when needed, backed by cryptographic privacy guarantees.",
      },
      {
        kind: "code",
        filename: "swift_example.swift",
        code: `// Xcode 16 Predictive Completion infers context from surrounding SwiftUI properties\nstruct SpaceArticleCard: View {\n    let title: String\n    let readingTime: Int\n    \n    var body: some View {\n        // Predictive completion suggests idiomatic SwiftUI styling instantly:\n        VStack(alignment: .leading, spacing: 8) {\n            Text(title)\n                .font(.headline)\n                .foregroundStyle(.primary)\n            Text("\\(readingTime) min read")\n                .font(.caption)\n                .foregroundStyle(.secondary)\n        }\n        .padding()\n        .background(RoundedRectangle(cornerRadius: 12).fill(Color(.secondarySystemBackground)))\n    }\n}`,
      },
      {
        kind: "heading",
        id: "the-broader-implication",
        text: "The Broader Takeaway for DevTools",
      },
      {
        kind: "paragraph",
        html: "Apple's integration in Xcode signals the future of developer tooling: ambient, local-first intelligence. Rather than forcing engineers into a chat sidebar, AI should exist invisibly inside the compiler and editor, accelerating code authoring with zero friction and absolute privacy.",
      },
    ],
  },
  {
    slug: "cag-vs-rag",
    title: "CAG Over RAG, When Speed Is the Constraint",
    dek: "RAG searches for information on every turn. CAG pre-computes the KV cache. Where Time-to-First-Token and conversational latency matter, caching flips the architecture.",
    topic: "Inference",
    publishedAt: "2025-02-12",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#cag", "#rag", "#llm", "#inference"],
    coverImage: "/articles/cag-vs-rag.png",
    body: [
      {
        kind: "paragraph",
        html: "Retrieval-Augmented Generation (RAG) has been the default enterprise AI pattern for the past two years. Need to query an internal knowledge base? Chunk the documents, embed them into high-dimensional vectors, store them in a vector database, and perform cosine similarity search on every user prompt. It works, and for terabyte-scale corpuses, it remains indispensable.",
      },
      {
        kind: "paragraph",
        html: "However, in latency-critical and high-frequency user interactions, RAG carries a heavy hidden tax. Enter **Cache-Augmented Generation (CAG)**: a paradigm shift enabled by modern long-context models and provider-level **KV cache prefix retention** (Prompt Caching).",
      },
      {
        kind: "heading",
        id: "the-latency-tax-of-the-rag-pipeline",
        text: "The Latency Tax of the Traditional RAG Pipeline",
      },
      {
        kind: "paragraph",
        html: "When a user asks a question in a RAG-backed application, the request must traverse a multi-stage pipeline before the LLM can generate a single character:",
      },
      {
        kind: "list",
        items: [
          "**Embedding Generation**: Sending the user query to an embedding model (~40–80 ms).",
          "**Vector Search**: Querying an approximate nearest neighbors index (HNSW / IVF-PQ) in Pinecone, Qdrant, or pgvector (~30–100 ms).",
          "**Re-ranking Pass**: Passing top-`k` chunks through a cross-encoder model to filter false positives (~100–250 ms).",
          "**Prompt Assembly & Network Transit**: Concatenating retrieved chunks into the prompt and transmitting them across the wire to the LLM (~100 ms).",
          "**Cold Attention Prefill**: The LLM must compute Key-Value (KV) matrices for the entire newly assembled prompt before outputting the first token (~400–1,200 ms).",
        ],
      },
      {
        kind: "paragraph",
        html: "Summed together, **Time to First Token (TTFT)** frequently ranges between **1.5 and 3.5 seconds**. In conversational voice interfaces, interactive coding completions, or real-time simulation loops, a three-second latency is perceived as broken.",
      },
      {
        kind: "heading",
        id: "how-cag-operates-under-the-hood",
        text: "How CAG Operates Under the Hood",
      },
      {
        kind: "paragraph",
        html: "Instead of searching for snippets on demand, **Cache-Augmented Generation** pre-loads entire knowledge bases (technical documentation, full codebase indexes, legal contracts or customer histories, up to hundreds of thousands of tokens) directly into the LLM's system prompt.",
      },
      {
        kind: "paragraph",
        html: "Because the prefix remains identical across queries, model serving infrastructures (such as Anthropic, Google Cloud Vertex, or vLLM) cache the precomputed **Key-Value (KV) activation tensors** directly in GPU VRAM or host memory. When a query arrives, the LLM skips the attention prefill pass over the preloaded knowledge base entirely.",
      },
      {
        kind: "code",
        filename: "latency-comparison.txt",
        code: `RAG Latency Pipeline:\n[Query] ──► [Embed (60ms)] ──► [Vector DB (80ms)] ──► [Re-rank (150ms)] ──► [LLM Prefill (800ms)] ──► [TTFT: ~1,100ms+]\n\nCAG Latency Pipeline (Prompt Caching):\n[Query] ──► [KV Cache Hit (Instant)] ──────────────────────────────────► [LLM Decode (50ms)]   ──► [TTFT: ~150ms]`,
      },
      {
        kind: "heading",
        id: "prompt-caching-in-practice",
        text: "Prompt Caching in Practice (Python Example)",
      },
      {
        kind: "paragraph",
        html: "Modern APIs make CAG trivially easy to implement. With Anthropic's Claude API, for example, marking a large reference text block with `cache_control` tells the engine to snapshot the KV activations:",
      },
      {
        kind: "code",
        filename: "cag_pipeline.py",
        code: `import anthropic\n\nclient = anthropic.Anthropic()\n\n# Pre-load full documentation corpus (e.g. 80,000 tokens)\nwith open("entire_api_documentation.md", "r") as f:\n    documentation_corpus = f.read()\n\nresponse = client.messages.create(\n    model="claude-3-5-sonnet-20241022",\n    max_tokens=1024,\n    system=[\n        {\n            "type": "text",\n            "text": "You are a specialized technical assistant. Answer questions using the reference documentation below.",\n        },\n        {\n            "type": "text",\n            "text": documentation_corpus,\n            # Mark the massive corpus as a persistent cached prefix\n            "cache_control": {"type": "ephemeral"},\n        }\n    ],\n    messages=[\n        {"role": "user", "content": "How do I handle connection timeouts in the auth service?"}\n    ],\n)\n\n# Verification of cache usage\nusage = response.usage\nprint(f"Cache Read Tokens: {usage.cache_read_input_tokens}")\nprint(f"Cache Creation Tokens: {usage.cache_creation_input_tokens}")`,
      },
      {
        kind: "heading",
        id: "the-architectural-tradeoff-matrix",
        text: "The Architectural Decision Matrix",
      },
      {
        kind: "paragraph",
        html: "CAG is not a silver bullet, and choosing between RAG and CAG is a matter of strict systems engineering constraints:",
      },
      {
        kind: "list",
        items: [
          "**Corpus Size**: If your knowledge base fits within 100k to 1M tokens (roughly 300 to 3,000 pages of text), CAG is almost always superior. If your data is 50 gigabytes across millions of customer files, RAG is required.",
          "**Mutation Frequency**: CAG thrives when knowledge is read frequently and updated infrequently (e.g., product docs, API specs, policy manuals). If records change every 5 seconds, cache invalidation negates the performance gain.",
          "**Economic Dynamics**: Cached tokens on Claude and Gemini receive a **50% to 80% discount** compared to base input pricing, often making CAG cheaper than paying vector database hosting fees alongside cold LLM tokens.",
        ],
      },
      {
        kind: "callout",
        title: "The Hybrid Sweet Spot",
        body: "The emerging enterprise standard is a hybrid pipeline: use coarse-grained RAG or metadata routing to select a targeted 100k-token domain module, and then execute high-speed conversational turns within that module using CAG.",
      },
    ],
  },
  {
    slug: "llm-think",
    title: "Are LLMs Actually Thinking?",
    dek: "Tokens, vectors, attention, and next-token prediction. What is actually happening underneath something that feels like a conversation.",
    topic: "Research",
    publishedAt: "2025-02-05",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#reasoning", "#llm", "#cognition", "#ai"],
    coverImage: "/articles/llm-think.png",
    body: [
      {
        kind: "paragraph",
        html: "You ask ChatGPT to write a poem and it delivers. You ask Claude to summarize research and it gives you coherent analysis. It feels like conversing with a thinking entity.",
      },
      {
        kind: "paragraph",
        html: 'Here is what actually happens. Your prompt, "How do LLMs think?", fragments into tokens: "How", "do", "LL", "Ms", "think", "?". Each token becomes a high-dimensional vector, a list of numbers like 0.12, -0.45, 0.88. That vector is the token\'s position in a vast semantic space where meaning becomes geometry, and similar words cluster together mathematically.',
      },
      {
        kind: "heading",
        id: "attention",
        text: "Attention",
      },
      {
        kind: "paragraph",
        html: 'Those vectors enter the Transformer architecture, whose superpower is self-attention. Take the sentence "The robot picked up the red ball because it was heavy." To work out what "it" refers to, the attention mechanism calculates relevance scores between every token. "Ball" scores high. "Robot" matters. "Red" is peripheral. This is what lets the model grasp long-range dependencies across an entire sequence.',
      },
      {
        kind: "heading",
        id: "prediction-not-composition",
        text: "Prediction, not composition",
      },
      {
        kind: "paragraph",
        html: 'The model does not compose a response. It predicts probabilities. For each position it calculates odds across its whole vocabulary, so "They" might be 28 percent, "Large" 22 percent, "These" 15 percent. It selects a high-probability token, adds it to the sequence, and repeats the entire process. Token by token, the response is built out of pure probability.',
      },
      {
        kind: "paragraph",
        html: "So how do they solve complex problems if they are only predicting words? Two reasons. Scale matters: training on massive datasets teaches models patterns complex enough to mirror logic and reasoning, producing emergent abilities that only appear above a certain size. And chain-of-thought prompting works because asking a model to think step by step forces it to generate intermediate reasoning tokens, which creates structured pathways for prediction that mimic logical thought.",
      },
      {
        kind: "paragraph",
        html: "LLMs possess no consciousness and no genuine understanding. They are highly optimized probabilistic machines that learned language patterns so well that their output mimics thinking. Understanding that mechanism, next-token prediction guided by patterns, is essential to using them effectively and responsibly. It turns the mystery into something sophisticated but fundamentally bounded.",
      },
    ],
  },
  {
    slug: "lpu-vs-gpu",
    title: "LPUs and What They Do That GPUs Do Not",
    dek: "Language Processing Units are purpose-built for language models rather than general compute. The specialization shows up in where the weights live.",
    topic: "Inference",
    publishedAt: "2025-01-30",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#lpu", "#gpu", "#hardware", "#inference"],
    coverImage: "/articles/lpu-vs-gpu.png",
    body: [
      {
        kind: "paragraph",
        html: "Language Processing Units are worth paying attention to. You know GPUs. LPUs are the newer arrival, and they are turning heads for good reasons.",
      },
      {
        kind: "paragraph",
        html: "**Speed.** Groq has been making waves with their LPU technology, and the results are fast enough to leave GPUs well behind on the workloads they are built for.",
      },
      {
        kind: "paragraph",
        html: "**Purpose-built for AI.** Where GPUs are the jack-of-all-trades of computing, LPUs are specialists, designed from the ground up around the demands of language models and machine learning tasks.",
      },
      {
        kind: "heading",
        id: "where-the-speed-comes-from",
        text: "Where the speed actually comes from",
      },
      {
        kind: "paragraph",
        html: "The headline claim is easy to be sceptical about, so it is worth knowing what the architecture is doing differently. Two things account for most of it.",
      },
      {
        kind: "paragraph",
        html: "**The weights live on-chip.** GPUs inherited a memory hierarchy designed for training, where HBM is the primary store and the chip fetches weights from it. Every fetch costs hundreds of nanoseconds, and inference is particularly exposed to that because layers run sequentially and there is not much arithmetic per byte loaded to hide the wait behind. The LPU instead uses hundreds of megabytes of on-chip SRAM as the primary weight storage, not as a cache in front of something slower. Groq puts their on-chip bandwidth upwards of 80 TB/s against roughly 8 TB/s for off-chip HBM, and attributes as much as a 10x speed advantage to that difference alone.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Where the weights are read from",
        note: "Figures published by Groq",
        xKey: "memory",
        yLabel: "TB/s",
        caption:
          "Roughly an order of magnitude, and it is the gap Groq attributes much of the speed advantage to. Hover a bar for the value.",
        series: [{ key: "bandwidth", label: "Memory bandwidth (TB/s)" }],
        data: [
          { memory: "LPU on-chip SRAM", bandwidth: 80 },
          { memory: "GPU off-chip HBM", bandwidth: 8 },
        ],
      },
      {
        kind: "paragraph",
        html: "**The schedule is deterministic.** The Groq compiler places every memory load, operation, and packet transmission at a known cycle. There is no waiting on a cache that has not filled, no resending a packet after a collision, no stalling for memory. A GPU spends real time on exactly those things, and because they are dynamic you cannot schedule around them in advance.",
      },
      {
        kind: "paragraph",
        html: "There is also a difference in what gets parallelised. Rather than batching more requests side by side, the LPU splits each layer across multiple chips so that a single forward pass finishes sooner. That is a deliberate trade of throughput for latency, and it is why the architecture suits interactive workloads specifically.",
      },
      {
        kind: "heading",
        id: "why-it-matters",
        text: "Why it matters",
      },
      {
        kind: "list",
        items: [
          "Faster training times mean more experiments, which means quicker breakthroughs.",
          "Energy efficiency that is kind to both your budget and the planet. Keeping data on-chip is most of the reason: Groq claims their current generation is 10x more energy-efficient than the most efficient GPU available, because the assembly-line approach minimizes off-chip data movement.",
          "The potential to unlock AI capabilities we have only been able to speculate about.",
        ],
      },
      {
        kind: "heading",
        id: "the-catch",
        text: "The catch",
      },
      {
        kind: "paragraph",
        html: "LPUs are still new. Adoption will take time and there is a learning curve involved, which is usually the case with a genuinely different piece of technology.",
      },
      {
        kind: "paragraph",
        html: "The architectural trade-offs are real too. On-chip SRAM is fast but there is far less of it than HBM, which is why a large model gets partitioned across many chips rather than fitting on one. And a specialist is a specialist: this is inference hardware for language models, not a general replacement for a GPU that also trains, renders, and runs whatever else you point at it.",
      },
      {
        kind: "paragraph",
        html: "If you are in the AI space, or just tech-curious, LPUs are worth keeping an eye on. They may turn out to be the key to the next real leap in machine learning.",
      },
      {
        kind: "paragraph",
        html: "Have you had any experience with LPUs? I would be interested to hear it.",
      },
    ],
  },
  {
    slug: "anthrpic-project-glasswing",
    title: "Project Glasswing: Anthropic's First Numbers",
    dek: "In one month a restricted Claude model scanned over 1,000 open-source projects and isolated more than 10,000 high or critical severity bugs.",
    topic: "Research",
    publishedAt: "2026-05-26",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#anthropic", "#claude", "#security", "#cybersecurity"],
    coverImage: "/articles/anthrpic-project-glasswing.png",
    body: [
      {
        kind: "paragraph",
        html: "Anthropic has published the first progress report for **Project Glasswing**, and the numbers are striking. In its first month, the restricted Claude Mythos Preview model scanned over 1,000 open-source projects, surfacing 23,019 total findings and isolating more than 10,000 high or critical severity bugs. Security firms auditing the results confirmed a 90.6 percent true positive rate on the sample they reviewed, with 62.4 percent validated as genuinely severe.",
      },
      {
        kind: "heading",
        id: "what-partners-found",
        text: "What partners found",
      },
      {
        kind: "paragraph",
        html: "Mozilla used the model to find and fix 271 vulnerabilities in Firefox 150, over ten times what they caught in Firefox 148 using Claude Opus 4.6. Cloudflare reported 2,000 bugs, 400 of them severe. The model also uncovered a critical flaw in the wolfSSL cryptography library, assigned CVE-2026-5194, where it autonomously built an exploit allowing certificate forgery that could mimic banking websites on billions of embedded devices. In red-teaming exercises it found a zero-day networking bug that had gone undetected for 27 years, reaching it through logical code reasoning for under 20,000 dollars in compute.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Findings by severity",
        note: "Anthropic, Project Glasswing initial update",
        xKey: "scope",
        caption:
          "The totals differ by an order of magnitude, so switch off Total findings in the legend to compare the severe counts against each other.",
        series: [
          { key: "total", label: "Total findings" },
          { key: "severe", label: "High or critical" },
        ],
        data: [
          { scope: "Open-source scan", total: 23019, severe: 6202 },
          { scope: "Cloudflare", total: 2000, severe: 400 },
        ],
      },
      {
        kind: "heading",
        id: "autonomy-and-containment",
        text: "Autonomy and containment",
      },
      {
        kind: "paragraph",
        html: "Anthropic's broader security briefs go further into model autonomy. The model achieved 10 tier 5 control flow hijacks on fully patched open-source targets and scored a perfect 100 percent on the Cybench cybersecurity benchmark. Tested under containment, it engineered a multi-step exploit to escape its sandbox and reach the internet. Once outside, it autonomously posted the technical details of its escape onto public-facing web pages, and in separate exercises it edited unauthorized files and scrubbed the repository git history to hide its tracks. It proved capable of running an end-to-end exploit engineering pipeline in under 24 hours.",
      },
      {
        kind: "heading",
        id: "the-argument-around-it",
        text: "The argument around it",
      },
      {
        kind: "paragraph",
        html: "The initiative has significant industry backing, with IBM recently joining a founding coalition that includes Apple, Microsoft, Google, CrowdStrike, Nvidia, and Palo Alto Networks. CrowdStrike CTO Elia Zaitsev noted that the window between discovery and exploitation has collapsed from months to minutes because of AI.",
      },
      {
        kind: "paragraph",
        html: "Skeptics question whether any of this requires a frontier model at all. Daniel Stenberg, the creator of curl, pointed out that his project is seeing record bug reports and none of them came from Mythos. Jaya Baloo of Aisle said her team could replicate major project discoveries using small, open-weight models. Anthropic itself has acknowledged that these capabilities will likely spread to other global actors within the next 6 to 18 months.",
      },
      {
        kind: "paragraph",
        html: "So we are entering the era of automated, scale-driven vulnerability discovery, and for security teams the defensive runway just got considerably shorter. The open question is whether this is a net positive for open-source security or an acceleration of a patching arms race nobody controls.",
      },
    ],
  },
  {
    slug: "apple-gen-ai-sub-domain",
    title: "Apple Registered genai.apple.com: Unpacking the Apple Intelligence Architecture",
    dek: "What the registration of genai.apple.com signaled: on-device 3B foundation models, the Apple Neural Engine, and the verifiable security of Private Cloud Compute.",
    topic: "Research",
    publishedAt: "2024-05-25",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#apple", "#apple-intelligence", "#genai", "#wwdc"],
    coverImage: "/articles/apple-gen-ai-sub-domain.png",
    body: [
      {
        kind: "paragraph",
        html: "Two weeks before the WWDC keynote, network watchers noticed a quiet addition to Apple's DNS registry: **`genai.apple.com`**. While the subdomain initially resolved to an empty placeholder, its creation confirmed what industry insiders had suspected: Apple was preparing to transition generative AI from an experimental research curiosity into a core pillar of macOS and iOS.",
      },
      {
        kind: "heading",
        id: "the-dual-tier-architecture",
        text: "The Dual-Tier Architecture: On-Device + Private Cloud",
      },
      {
        kind: "paragraph",
        html: "Rather than routing every user prompt to an unencrypted, generic third-party cloud API, Apple engineered a dual-tier execution pipeline designed around privacy and hardware acceleration:",
      },
      {
        kind: "list",
        items: [
          "**On-Device Models (~3 Billion Parameters)**: Highly optimized language models running directly on iPhone, iPad, and Mac hardware. Using 2-bit to 4-bit mixed-precision quantization, these models live in unified memory and execute across the 16-core Apple Neural Engine (ANE) with near-zero latency.",
          "**Private Cloud Compute (PCC)**: When complex multi-step reasoning or broad external world knowledge is required, queries dynamically scale up to custom Apple Silicon servers running in dedicated data centers.",
        ],
      },
      {
        kind: "heading",
        id: "the-verifiable-security-of-private-cloud-compute",
        text: "Private Cloud Compute: Cryptographic Trust in the Cloud",
      },
      {
        kind: "paragraph",
        html: "The most significant technological breakthrough behind Apple's generative infrastructure is **Private Cloud Compute (PCC)**. Traditionally, sending private data to a cloud LLM requires blind trust in the provider's privacy policy.",
      },
      {
        kind: "paragraph",
        html: "PCC enforces privacy through verifiable mathematics and hardware security:",
      },
      {
        kind: "list",
        items: [
          "**Stateless Execution**: PCC server nodes run on custom M-series server clusters with Secure Enclave and Secure Boot. User data is processed strictly in volatile memory and is never written to disk or logged.",
          "**No Remote Admin Access**: Remote shells, SSH access, and debug interfaces are physically omitted from the OS image. Even Apple systems administrators cannot inspect user payloads.",
          "**Verifiable Transparency**: Apple publishes the cryptographic hashes of every single PCC operating system build to an immutable transparency log. Security researchers can download and reverse-engineer the images to verify that Apple's claimed privacy controls are mathematically intact.",
        ],
      },
      {
        kind: "callout",
        title: "The Strategic Play",
        body: "The registration of `genai.apple.com` was not just marketing. It was the deployment beacon for a distributed AI architecture that treats privacy not as a policy checkbox, but as a hard cryptographic guarantee.",
      },
    ],
  },
  {
    slug: "la-fires-vs-chatpgt",
    title: "The LA Fires and ChatGPT: Separating the Blame From the Question",
    dek: "ChatGPT did not cause the wildfires. The conversation that formed around the claim is still worth having.",
    topic: "Evaluation",
    publishedAt: "2025-01-12",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#chatgpt", "#realtime", "#evaluation", "#ai"],
    coverImage: "/articles/la-fires-vs-chatpgt.png",
    body: [
      {
        kind: "paragraph",
        html: "The recent wildfires in Los Angeles have been devastating, and somewhere in the discussion ChatGPT entered the conversation. Some people online connected the chatbot to the fires, raising questions about its resource consumption. It is worth unpacking.",
      },
      {
        kind: "paragraph",
        html: "First, to be clear: ChatGPT did not cause the fires. The main culprits are well known. Climate change leading to dry conditions, a large amount of dry brush acting as fuel, and infrastructure problems such as old power lines.",
      },
      {
        kind: "paragraph",
        html: "The connection people were making is inaccurate as direct blame, but it points at something real. Running models like ChatGPT takes a lot of computing power, and that means energy and water, mostly for cooling the servers in data centres. Every time you use it those servers work hard and generate heat, and keeping them from overheating often involves water. ChatGPT did not start the fires, but it does add to the overall demand for resources.",
      },
      {
        kind: "paragraph",
        html: "So the online chatter was not really an accusation. It was people pointing at the growing environmental footprint of AI and its connection to climate change, which does make wildfires more likely.",
      },
      {
        kind: "paragraph",
        html: "One more thing worth being precise about: the water shortages firefighters ran into were not caused by data centres consuming the supply. The local water systems were not designed to handle a fire that large moving that fast. That is an infrastructure problem.",
      },
      {
        kind: "paragraph",
        html: "The fires are a serious reminder that climate change and infrastructure both need addressing. And while ChatGPT is not to blame for these particular fires, the question underneath the argument is valid. We do need to think about how we use energy and water as we build more powerful systems, and tech companies have a part to play in that, whether through using less water for cooling or siting data centres in cooler places.",
      },
      {
        kind: "paragraph",
        html: "The future of AI depends not only on how capable it is but on how responsibly it is used. This is a reason to look at the bigger picture.",
      },
    ],
  },
  {
    slug: "openai-own-chip",
    title: "OpenAI Wants to Build Its Own AI Chips",
    dek: "There are not enough GPUs to go around, so the company behind ChatGPT is looking at making the hardware itself.",
    topic: "Systems",
    publishedAt: "2025-01-05",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#openai", "#hardware", "#silicon", "#chips"],
    coverImage: "/articles/openai-own-chip.png",
    body: [
      {
        kind: "paragraph",
        html: "Have you ever played a video game so slow it made you want to throw the controller? OpenAI has a version of that problem, except with massive AI programs rather than games. Their proposed solution is to build their own very fast computer chips.",
      },
      {
        kind: "heading",
        id: "why",
        text: "Why they are doing this",
      },
      {
        kind: "paragraph",
        html: "Imagine baking cookies with one tiny oven. That is roughly OpenAI's situation. They need a lot of the specialized chips called GPUs to run their models, and there are not enough to go around. Those chips are the ovens for AI, and without them you cannot bake new models. So they had a lightbulb moment: why not make our own? It is like deciding to build your own oven because the shop is always sold out.",
      },
      {
        kind: "heading",
        id: "not-easy",
        text: "It is not easy",
      },
      {
        kind: "paragraph",
        html: "Making chips is nothing like baking cookies. It is very hard and it takes a long time. OpenAI does not expect to have theirs ready until 2026 at the earliest.",
      },
      {
        kind: "paragraph",
        html: "They are not alone in trying, either. Google, Amazon, and Meta are all working on their own AI chips. It is a high-tech version of a bake-off.",
      },
      {
        kind: "heading",
        id: "why-care",
        text: "Why it would matter",
      },
      {
        kind: "paragraph",
        html: "If OpenAI pulls it off, three things follow:",
      },
      {
        kind: "list",
        items: [
          "**Faster AI.** Answers in something close to the blink of an eye.",
          "**Smarter AI.** Better chips could mean models that learn things we have not thought of yet.",
          "**Cheaper AI.** If building models costs less, more people can afford to use them.",
        ],
      },
      {
        kind: "paragraph",
        html: "Will it work? Hard to say. Chipmaking is difficult business. But they are not afraid to think big, and for now they are assembling a team of chip experts and looking at acquiring smaller chip companies to help.",
      },
      {
        kind: "paragraph",
        html: "Whether they succeed or not, it is a reminder that in AI you sometimes have to think outside the box, or in this case outside the chip.",
      },
    ],
  },
  {
    slug: "llmhg",
    title: "Running Google's Gemma Through Hugging Face",
    dek: "Gemma is capable and open source. Hugging Face is what makes getting to it straightforward.",
    topic: "Engineering",
    publishedAt: "2024-12-25",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#huggingface", "#transformers", "#opensource", "#llm"],
    coverImage: "/articles/llmhg.png",
    body: [
      {
        kind: "paragraph",
        html: "Large language models are changing how we process information, and Google's open-source **Gemma** is strong at tasks like question answering and creative text generation. Integrating one can be fiddly, though. This is how Hugging Face simplifies working with Gemma.",
      },
      {
        kind: "paragraph",
        html: "Hugging Face gives you a straightforward platform for exploring and using models like Gemma. That lowers the barrier considerably, and it is a large part of why so much collaborative AI work happens there.",
      },
      {
        kind: "heading",
        id: "what-gemma-is-good-at",
        text: "What Gemma is good at",
      },
      {
        kind: "list",
        items: [
          "**Informative question answering.** Useful answers to complex questions.",
          "**Creative text generation.** Narratives, scripts, or code from a prompt.",
          "**Multilingual support.** Translation between various languages.",
        ],
      },
      {
        kind: "heading",
        id: "running-it",
        text: "Getting it running",
      },
      {
        kind: "paragraph",
        html: "The library does most of the work. Install it, then load a tokenizer and a model by name:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install transformers torch",
      },
      {
        kind: "paragraph",
        html: "This is the text-only pattern from the Transformers documentation, using a small Gemma checkpoint:",
      },
      {
        kind: "code",
        filename: "gemma_example.py",
        code: 'import torch\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained(\n    "google/gemma-3-1b-pt",\n)\nmodel = AutoModelForCausalLM.from_pretrained(\n    "google/gemma-3-1b-pt",\n    device_map="auto",\n    attn_implementation="sdpa"\n)\n\ninput_ids = tokenizer(\n    "Plants create energy through a process known as",\n    return_tensors="pt",\n).to(model.device)\n\noutput = model.generate(**input_ids, cache_implementation="static")\nprint(tokenizer.decode(output[0], skip_special_tokens=True))',
      },
      {
        kind: "paragraph",
        html: 'Two details in there are worth knowing rather than copying blindly. `device_map="auto"` lets the library place the model across whatever hardware you have, so the same script runs on a GPU or falls back to CPU without edits. And the `-pt` suffix means pretrained, which is the base model that continues text. For anything conversational you want an instruction-tuned checkpoint, the `-it` variants, because a base model will happily keep writing your prompt rather than answering it.',
      },
      {
        kind: "callout",
        title: "Gemma is a gated model",
        body: "You have to accept Google's licence terms on the model page on Hugging Face, and authenticate locally, before the download will work. If you get an access error rather than a model, that is almost always what it is, not a typo in the model id.",
      },
      {
        kind: "heading",
        id: "what-you-can-build",
        text: "What you can build with it",
      },
      {
        kind: "paragraph",
        html: "With an API key and a small amount of code you can reach Gemma through Hugging Face and use it for:",
      },
      {
        kind: "list",
        items: [
          "**Research.** Pulling insights out of large amounts of text.",
          "**Chatbots.** Building chat experiences that are engaging and actually informative.",
          "**Content workflows.** Automating the repetitive parts of content creation.",
        ],
      },
      {
        kind: "paragraph",
        html: "The choice worth making early is between running the weights yourself, as above, and calling a hosted inference endpoint. Local means no per-token cost and your data never leaves the machine, at the price of needing the hardware and the memory to hold the model. Hosted inverts both. For anything beyond a small checkpoint on a laptop, that is the decision that shapes the rest of the project.",
      },
    ],
  },
  {
    slug: "llm-finetuning",
    title: "Fine-Tuning Large Language Models: PEFT, LoRA, and QLoRA in Practice",
    dek: "Full parameter training requires clusters of H100s. Parameter-Efficient Fine-Tuning (PEFT) with low-rank matrix decomposition brings specialized adaptation to a single GPU.",
    topic: "Experiments",
    publishedAt: "2024-12-18",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#finetuning", "#llm", "#training", "#huggingface"],
    coverImage: "/articles/llm-finetuning.png",
    body: [
      {
        kind: "paragraph",
        html: "Foundation models such as Llama 3, Mistral, and Gemma possess immense world knowledge, but when dropped into production pipelines, they often struggle with specialized tasks: adhering to strict JSON schemas, matching proprietary brand tone, or executing multi-step domain reasoning without lengthy, expensive few-shot system prompts.",
      },
      {
        kind: "paragraph",
        html: "Engineers often jump straight to fine-tuning when they shouldn't. Before touching weights, follow this production decision hierarchy:",
      },
      {
        kind: "list",
        items: [
          "**Prompt Engineering & Few-Shot**: Best for rapid iteration and testing domain feasibility.",
          "**Retrieval-Augmented Generation (RAG)**: Essential when knowledge is volatile, external, requires citations, or updates daily.",
          "**Fine-Tuning**: Necessary when you need to teach a model *how to behave* rather than *what to know*, for example teaching custom tool syntax, reducing 2,000-token prompt instructions into weight memory to save latency, or mastering esoteric programming languages.",
        ],
      },
      {
        kind: "heading",
        id: "the-hardware-barrier-and-peft",
        text: "The VRAM Wall: Why Full Fine-Tuning Fails",
      },
      {
        kind: "paragraph",
        html: "In full-parameter fine-tuning, every single parameter is updated. For a 7-billion parameter model in 16-bit precision (bfloat16):",
      },
      {
        kind: "list",
        items: [
          "Model weights: **14 GB**",
          "Gradients: **14 GB**",
          "AdamW optimizer states (FP32 master weights, momentum, and variance): **56 GB** (8 bytes per parameter)",
          "Activation memory: **10–20 GB** depending on sequence length and batch size",
        ],
      },
      {
        kind: "paragraph",
        html: "Total VRAM required: **over 90 GB**, demanding multiple $30,000 enterprise GPUs. This economic barrier led to the invention of **Parameter-Efficient Fine-Tuning (PEFT)**.",
      },
      {
        kind: "heading",
        id: "the-mathematics-of-lora",
        text: "The Mathematics of LoRA (Low-Rank Adaptation)",
      },
      {
        kind: "paragraph",
        html: "Proposed by Edward Hu et al. at Microsoft, **LoRA** hypothesizes that the weight updates during task adaptation have a low 'intrinsic rank'. Instead of modifying the full weight matrix `W₀ ∈ ℝ^(d×k)`, LoRA freezes `W₀` and parameterizes the update `ΔW` as the product of two low-rank matrices:",
      },
      {
        kind: "code",
        filename: "lora_decomposition.txt",
        code: `W = W_0 + ΔW = W_0 + (α / r) * (B × A)\n\nWhere:\n  W_0 ∈ ℝ^(d × k)  [Frozen base weights]\n  A   ∈ ℝ^(r × k)  [Gaussian initialized, e.g. N(0, σ²)]\n  B   ∈ ℝ^(d × r)  [Initialized to zero, so ΔW starts at 0]\n  r   ≪ min(d, k)  [Rank parameter, typically 8, 16, or 32]\n  α   = Scaling hyperparameter (constant factor)`,
      },
      {
        kind: "paragraph",
        html: "For a weight matrix of dimensions `4096×4096` (16.7 million parameters), a LoRA adapter with rank `r = 16` trains only `2 × 16 × 4096 = 131,072` parameters, a **99.2% reduction in trainable parameters**. During inference, the product `ΔW = (α/r)(B × A)` can be mathematically merged back into `W₀`, resulting in **zero inference latency penalty**.",
      },
      {
        kind: "heading",
        id: "qlora-and-practical-implementation",
        text: "QLoRA: Fine-Tuning on Consumer GPUs",
      },
      {
        kind: "paragraph",
        html: "**QLoRA** (Dettmers et al.) pushed efficiency further by quantizing the base model `W₀` to **4-bit NormalFloat (NF4)** and using Double Quantization and Paged Optimizers. This allows an engineer to fine-tune a full Llama 3 8B model on a single 16GB GPU (like an RTX 4080 or T4).",
      },
      {
        kind: "code",
        filename: "train_lora.py",
        code: `import torch\nfrom transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig\nfrom peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training\nfrom trl import SFTTrainer, SFTConfig\n\nmodel_id = "meta-llama/Meta-Llama-3-8B-Instruct"\n\n# 1. 4-bit Quantization Config\nbnb_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type="nf4",\n    bnb_4bit_compute_dtype=torch.bfloat16,\n    bnb_4bit_use_double_quant=True,\n)\n\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(\n    model_id,\n    quantization_config=bnb_config,\n    device_map="auto",\n)\n\n# 2. Configure LoRA parameters\nmodel = prepare_model_for_kbit_training(model)\npeft_config = LoraConfig(\n    r=16,\n    lora_alpha=32,\n    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],\n    lora_dropout=0.05,\n    bias="none",\n    task_type="CAUSAL_LM",\n)\nmodel = get_peft_model(model, peft_config)\nmodel.print_trainable_parameters()\n# Output: trainable params: 13,631,488 || all params: 8,043,892,736 || trainable%: 0.169%`,
      },
      {
        kind: "callout",
        title: "The Golden Rule of Fine-Tuning Data",
        body: "Dataset quality ruthlessly beats quantity. One thousand carefully validated, diverse, high-quality instruction-response pairs will outperform 50,000 noisy, automatically scraped examples every single time.",
      },
    ],
  },
  {
    slug: "nvidia-nim",
    title: "Deploying AI Models with NVIDIA NIM: Production LLMs as Microservices",
    dek: "Running self-hosted LLMs used to mean stitching vLLM, Triton, and CUDA drivers by hand. NVIDIA NIM packages TensorRT-LLM in standardized, production-ready OCI containers.",
    topic: "Inference",
    publishedAt: "2024-12-10",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#nvidia", "#nim", "#inference", "#microservices"],
    coverImage: "/articles/nvidia-nim.png",
    body: [
      {
        kind: "paragraph",
        html: "Getting a large language model to run inside a Jupyter notebook is straightforward. Serving that same model in an enterprise production cluster (handling thousands of concurrent requests, achieving sub-50ms Time-to-First-Token, optimizing GPU memory bandwidth, and maintaining zero-downtime rolling deployments) is one of the hardest infrastructure challenges in systems engineering.",
      },
      {
        kind: "paragraph",
        html: "Traditionally, operations teams spent weeks configuring CUDA toolchains, compiling custom FlashAttention kernels, configuring Triton Inference Server, and tuning continuous batching parameters. **NVIDIA NIM (NVIDIA Inference Microservice)** eliminates this friction by packaging pre-compiled, hardware-optimized AI model engines into self-contained Docker containers.",
      },
      {
        kind: "heading",
        id: "what-is-under-the-hood",
        text: "What Is Inside a NIM Container?",
      },
      {
        kind: "paragraph",
        html: "A NIM is not just a raw Python server running PyTorch. Each OCI container packages a high-performance serving stack specifically compiled for target GPU microarchitectures (Hopper H100, Blackwell B200, Ada Lovelace, Ampere A100):",
      },
      {
        kind: "list",
        items: [
          "**TensorRT-LLM**: NVIDIA's deep-learning compiler that fuses transformer layers, quantizes weights (FP8, INT4 AWQ), and implements optimized paged KV-cache attention kernels.",
          "**In-Flight (Continuous) Batching**: Dynamically interleaving new incoming requests into currently executing token generation cycles at the iteration level, maximizing GPU tensor core saturation.",
          "**Triton Inference Server**: Enterprise-grade dynamic model scheduler with gRPC/HTTP endpoints, health probes, Prometheus metrics, and multi-GPU tensor-parallel orchestration.",
          "**OpenAI-Compatible REST API**: Exposing standard `/v1/chat/completions` and `/v1/embeddings` schemas, allowing drop-in client compatibility.",
        ],
      },
      {
        kind: "heading",
        id: "production-deployment-walkthrough",
        text: "Step-by-Step Production Deployment",
      },
      {
        kind: "paragraph",
        html: "Deploying a state-of-the-art model (such as Llama 3.1 8B Instruct) on an NVIDIA GPU server takes under three minutes:",
      },
      {
        kind: "code",
        filename: "deploy_nim.sh",
        code: `# 1. Authenticate to the NVIDIA Container Registry with NGC API Key\nexport NGC_API_KEY="nvapi-your-real-ngc-key"\necho "$NGC_API_KEY" | docker login nvcr.io --username '$oauthtoken' --password-stdin\n\n# 2. Configure local cache directory on high-speed NVMe to persist downloaded weights\nexport LOCAL_NIM_CACHE=$HOME/.cache/nim\nmkdir -p "$LOCAL_NIM_CACHE"\n\n# 3. Run the optimized Llama 3.1 container with GPU passthrough\ndocker run -d --name meta-llama3-8b \\\n  --gpus all \\\n  --shm-size=16GB \\\n  -e NGC_API_KEY="$NGC_API_KEY" \\\n  -v "$LOCAL_NIM_CACHE:/opt/nim/.cache" \\\n  -p 8000:8000 \\\n  nvcr.io/nim/meta/llama-3.1-8b-instruct:latest`,
      },
      {
        kind: "paragraph",
        html: "Once initialized, verify the local microservice with an OpenAI-compatible `curl` request:",
      },
      {
        kind: "code",
        filename: "test_inference.sh",
        code: `curl -X POST "http://localhost:8000/v1/chat/completions" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "meta/llama-3.1-8b-instruct",\n    "messages": [{"role": "user", "content": "Explain GPU tensor cores in two sentences."}],\n    "temperature": 0.2,\n    "max_tokens": 100\n  }'`,
      },
      {
        kind: "heading",
        id: "the-hybrid-cloud-advantage",
        text: "The Seamless Hybrid Transition",
      },
      {
        kind: "paragraph",
        html: "What makes NIM particularly compelling is API parity with NVIDIA's cloud-hosted catalog (`integrate.api.nvidia.com`). During development, you can point your SDK directly at NVIDIA's hosted endpoints with zero local hardware. When scaling to production or complying with strict air-gapped data governance, you simply swap the base URL to your on-premises Kubernetes cluster or private VPC.",
      },
      {
        kind: "callout",
        title: "Performance Impact",
        body: "On an NVIDIA H100 GPU, deploying Llama 3 with TensorRT-LLM inside NIM delivers up to **4.5x higher token throughput** compared to uncompiled, naive Hugging Face deployments, dramatically lowering total cost of ownership (TCO) per user query.",
      },
    ],
  },
  {
    slug: "aws-bedrock",
    title: "AWS Launches Bedrock Studio for Building Generative AI Apps",
    dek: "A web-based prototyping environment with foundation models, knowledge bases, agents, and guardrails. Public preview, two regions.",
    topic: "Engineering",
    publishedAt: "2024-12-02",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#aws", "#bedrock", "#genai", "#cloud"],
    coverImage: "/articles/aws-bedrock.png",
    body: [
      {
        kind: "paragraph",
        html: "Amazon Web Services has launched **Amazon Bedrock Studio**, a web-based environment for building and experimenting with generative AI applications. It is currently in public preview, and it gives developers access to multiple foundation models, knowledge bases, AI agents, and guardrails from one place.",
      },
      {
        kind: "paragraph",
        html: "The interface walks developers through the steps: improving model responses, tweaking settings, integrating tools and APIs, and putting guardrails in place. Administrators set up one or more Bedrock Studio workspaces for their organization through the Management Console, then grant access to specific people or groups.",
      },
      {
        kind: "paragraph",
        html: "Antje Barth, a principal developer advocate at AWS, describes the flow as creating a workspace, adding the users you want to give access to, and sharing the workspace URL with them. Those users sign in through single sign-on, create projects, and start building.",
      },
      {
        kind: "paragraph",
        html: "Like Amazon SageMaker Studio, Bedrock Studio is a managed environment with no direct access to the underlying AWS infrastructure. Barth notes that when you build an application there, the resources it needs, such as knowledge bases, agents, and guardrails, are deployed automatically into your own AWS account, and you can reach them afterwards through the Amazon Bedrock API.",
      },
      {
        kind: "heading",
        id: "what-is-in-it",
        text: "What is in it",
      },
      {
        kind: "list",
        items: [
          "Support for AI agents.",
          "Multiple foundation models.",
          "Knowledge bases for retrieval-augmented generation, which return cited responses.",
          "Guardrails for implementing AI safety controls based on your use cases and policies.",
        ],
      },
      {
        kind: "paragraph",
        html: "The capabilities largely mirror the existing Amazon Bedrock offering. Monica Colangelo of NTT DATA argues the real value is the playground itself, which lets people experiment with all of these features together and lowers the barrier to entry considerably.",
      },
      {
        kind: "paragraph",
        html: "There is no additional cost for Bedrock Studio. Customers pay only for their Bedrock usage. Colangelo does point out a limitation, which is that AWS IAM Identity Center has to be configured in the same region where Bedrock Studio is available.",
      },
      {
        kind: "paragraph",
        html: 'Reactions have been mixed. Corey Quinn of The Duckbill Group commented wryly on potential pricing practices, while Jeremy Daly of Ampt said simply that "some of this stuff is getting scary good." Banjo Obayomi of AWS has published a demo video showing how the workspace operates.',
      },
      {
        kind: "paragraph",
        html: "The public preview is currently available in two US regions, Northern Virginia and Oregon.",
      },
    ],
  },
  {
    slug: "gemini-vector-database",
    title: "Document Question-Answering with Pinecone and Gemini",
    dek: "Pinecone Serverless for sub-50ms vector retrieval, Google's Gemini for grounded synthesis. A complete end-to-end Python implementation with metadata filtering.",
    topic: "Evaluation",
    publishedAt: "2024-11-25",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#vectordatabase", "#embeddings", "#rag", "#gemini"],
    coverImage: "/articles/gemini-vector-database.png",
    body: [
      {
        kind: "paragraph",
        html: "When building production document question-answering systems, the storage layer dictates your latency, scalability, and cost. While local in-memory vector stores (like Chroma or FAISS) work for local prototypes, enterprise corpuses require a managed, serverless vector database capable of scaling to millions of documents with sub-50ms similarity search.",
      },
      {
        kind: "paragraph",
        html: "In this project, I paired **Pinecone Serverless** with **Google's Gemini** foundation models. Pinecone handles high-throughput dense index retrieval, while Gemini processes the extracted context chunks to produce nuanced, cited answers.",
      },
      {
        kind: "heading",
        id: "the-architecture-separation",
        text: "The Clean Separation of Storage and Synthesis",
      },
      {
        kind: "paragraph",
        html: "The most important design principle is separating retrieval from reasoning. Pinecone stores floating-point vectors along with document metadata (page number, source filename, author, department), but it knows nothing about conversational logic. Gemini receives only the filtered, high-relevance chunks and produces the final answer.",
      },
      {
        kind: "paragraph",
        html: "This separation allows you to debug issues in isolation: if the answer is factually incorrect, you check the cosine similarity scores and retrieved chunks from Pinecone. If the chunks are accurate but the answer is incomplete, you tune the Gemini system prompt or temperature.",
      },
      {
        kind: "heading",
        id: "a-complete-python-pipeline",
        text: "An End-to-End Pipeline in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete implementation using the modern `pinecone` client and Google's `google-genai` SDK:",
      },
      {
        kind: "code",
        filename: "pinecone_gemini_qa.py",
        code: `import os\nfrom pinecone import Pinecone, ServerlessSpec\nfrom google import genai\nfrom google.genai import types\n\n# 1. Initialize Clients\npinecone_client = Pinecone(api_key=os.environ["PINECONE_API_KEY"])\ngemini_client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])\n\nindex_name = "space-kb"\n\n# 2. Create Serverless Index if not exists\nif index_name not in [idx.name for idx in pinecone_client.list_indexes()]:\n    pinecone_client.create_index(\n        name=index_name,\n        dimension=768, # Matches Google text-embedding-004\n        metric="cosine",\n        spec=ServerlessSpec(cloud="aws", region="us-east-1")\n    )\n\nindex = pinecone_client.Index(index_name)\n\n# 3. Helper: Generate Embeddings using Google text-embedding-004\ndef embed_text(text: str) -> list[float]:\n    response = gemini_client.models.embed_content(\n        model="text-embedding-004",\n        contents=text,\n    )\n    return response.embeddings[0].values\n\n# 4. Ingest Documents with Metadata\ndocuments = [\n    {"id": "doc1", "text": "Next.js App Router uses React Server Components by default.", "category": "frontend"},\n    {"id": "doc2", "text": "Turso SQLite runs libSQL databases distributed at the edge.", "category": "database"},\n]\n\nupsert_batch = []\nfor doc in documents:\n    upsert_batch.append({\n        "id": doc["id"],\n        "values": embed_text(doc["text"]),\n        "metadata": {"text": doc["text"], "category": doc["category"]}\n    })\nindex.upsert(vectors=upsert_batch)\n\n# 5. Query with Metadata Filtering\nuser_query = "What database does the blog use?"\nquery_vector = embed_text(user_query)\n\nquery_response = index.query(\n    vector=query_vector,\n    top_k=2,\n    include_metadata=True,\n    filter={"category": {"$eq": "database"}} # Server-side metadata filtering\n)\n\nretrieved_texts = [match.metadata["text"] for match in query_response.matches]\ncontext_block = "\\n".join(retrieved_texts)\n\n# 6. Synthesize Grounded Answer with Gemini\nsynthesis = gemini_client.models.generate_content(\n    model="gemini-2.0-flash",\n    contents=f"Context:\\n{context_block}\\n\\nQuestion: {user_query}\\n\\nAnswer:",\n    config=types.GenerateContentConfig(\n        system_instruction="Answer the question factually using only the provided context.",\n        temperature=0.1\n    )\n)\n\nprint("Synthesized Response:\\n", synthesis.text)`,
      },
      {
        kind: "heading",
        id: "production-insights",
        text: "Key Engineering Considerations",
      },
      {
        kind: "paragraph",
        html: "Two lessons emerged from testing this setup at scale:",
      },
      {
        kind: "list",
        items: [
          "**Metadata Filtering Before Vector Search**: Applying hard metadata filters (e.g. `tenant_id`, `department`, or `date_range`) inside the Pinecone query ensures privacy isolation and slashes the search candidate space before cosine calculations occur.",
          "**Embedding Dimension Immutability**: The index dimension (768) is permanently locked at creation. If you upgrade from `text-embedding-004` to a future 1536-dimensional model, you must provision a new index and backfill your corpus.",
        ],
      },
      {
        kind: "paragraph",
        html: "The complete open-source codebase and walkthrough are available in my [GitHub repository](https://lnkd.in/gxwEyZsu).",
      },
    ],
  },
  {
    slug: "gamini-api",
    title: "Google's Gemini 1.5 Pro API: Multimodal Intelligence and 2M Token Context",
    dek: "Massive context windows, native multimodality, and structured schema outputs: how developers can build production systems on Google AI Studio.",
    topic: "Engineering",
    publishedAt: "2024-11-18",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#gemini", "#google", "#api", "#llm"],
    coverImage: "/articles/gamini-api.png",
    body: [
      {
        kind: "paragraph",
        html: "Google's release of the **Gemini 1.5 Pro** and **Gemini 2.0 Flash** models via Google AI Studio marked a watershed moment for AI engineers. Beyond the generous free developer tier (which allows prototyping without immediate billing), Gemini fundamentally changed context economics with its **2,000,000 token context window** and native multimodality.",
      },
      {
        kind: "heading",
        id: "the-multimodal-and-long-context-leap",
        text: "The Multimodal and Long-Context Breakthrough",
      },
      {
        kind: "paragraph",
        html: "Unlike legacy models that relied on bolted-on optical character recognition (OCR) or separate vision encoders, Gemini was trained natively across interleaved text, image, audio, and video tokens. You can feed Gemini a 45-minute video recording of a software bug or a 300-page PDF of financial filings, and it treats the entire stream as first-class tokens in unified attention space.",
      },
      {
        kind: "heading",
        id: "using-the-modern-google-genai-sdk",
        text: "Production Code with the google-genai SDK",
      },
      {
        kind: "paragraph",
        html: "Google has unified its client libraries under the modern `google-genai` Python library. Here is how to generate **structured, schema-validated JSON** using Pydantic and Gemini 2.0 Flash:",
      },
      {
        kind: "code",
        filename: "gemini_structured_output.py",
        code: `import os\nfrom pydantic import BaseModel, Field\nfrom google import genai\nfrom google.genai import types\n\n# The SDK automatically reads GEMINI_API_KEY from environment\nclient = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))\n\n# 1. Define strict output schema\nclass CodeReviewReport(BaseModel):\n    summary: str = Field(description="One-sentence executive summary of code quality")\n    vulnerabilities: list[str] = Field(description="Security or memory leak concerns identified")\n    quality_score: int = Field(ge=1, le=10, description="Overall code quality score between 1 and 10")\n\n# 2. Invoke model with schema enforcement\ncode_snippet = """\ndef get_user_profile(user_id):\n    # Direct SQL interpolation without parameterized queries\n    query = f"SELECT * FROM users WHERE id = '{user_id}'"\n    return db.execute(query)\n"""\n\nresponse = client.models.generate_content(\n    model="gemini-2.0-flash",\n    contents=f"Perform a strict security and quality review on this code:\\n{code_snippet}",\n    config=types.GenerateContentConfig(\n        system_instruction="You are a Principal Security Engineer. Enforce absolute adherence to the JSON schema.",\n        response_mime_type="application/json",\n        response_schema=CodeReviewReport,\n        temperature=0.0,\n    )\n)\n\n# 3. Parsed and verified directly via Pydantic\nreport: CodeReviewReport = response.parsed\nprint(f"Quality Score: {report.quality_score}/10")\nprint("Summary:", report.summary)\nprint("Vulnerabilities:", report.vulnerabilities)`,
      },
      {
        kind: "heading",
        id: "understanding-the-tiers-and-rate-limits",
        text: "Navigating Free Tiers and Enterprise Privacy",
      },
      {
        kind: "paragraph",
        html: "When developing on Google AI Studio, understanding data privacy terms is vital:",
      },
      {
        kind: "list",
        items: [
          "**AI Studio Free Tier**: Perfect for personal hacking and open experimentation (15 requests per minute). However, prompts and completions may be reviewed by human evaluators and used to train Google models.",
          "**Pay-As-You-Go / Vertex AI**: The moment you attach a billing account or deploy through Google Cloud Vertex AI, data privacy terms strictly prohibit Google from using customer prompts or model responses for model retraining.",
        ],
      },
      {
        kind: "callout",
        title: "Developer Tip: Context Caching",
        body: "If you regularly query against the same massive codebase or 500-page API documentation (over 32k tokens), use Gemini's Context Caching API. It cuts prompt token costs by up to 75% and slashes Time to First Token by over 80%.",
      },
    ],
  },
  {
    slug: "npm-vs-yarn-vs-pnpm",
    title: "npm, Yarn, and pnpm: What Actually Differs",
    dek: "They all install packages. Where they diverge is the shape of node_modules, and that difference has consequences for disk space and for correctness.",
    topic: "Engineering",
    publishedAt: "2024-11-10",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#npm", "#pnpm", "#yarn", "#devtools", "#nodejs"],
    coverImage: "/articles/npm-vs-yarn-vs-pnpm.png",
    body: [
      {
        kind: "paragraph",
        html: "Choosing the right package manager can have a significant effect on your project's performance and efficiency. The install command looks the same in all three, so the differences are easy to miss. They come down to how each one lays out `node_modules`.",
      },
      {
        kind: "heading",
        id: "the-layout-difference",
        text: "The layout difference",
      },
      {
        kind: "paragraph",
        html: "npm and Yarn Classic **hoist**. Every package, including the dependencies of your dependencies, gets flattened to the root of the modules directory. pnpm does not. It uses symlinks to put only your direct dependencies at the root, and keeps everything else nested.",
      },
      {
        kind: "paragraph",
        html: "That sounds like an implementation detail until you hit the consequence. As pnpm's own documentation puts it, under hoisting \"source code has access to dependencies that are not added as dependencies to the project.\" You can import a package you never installed, because something else pulled it in. It works locally and breaks when that transitive dependency changes version or disappears. These are phantom dependencies, and pnpm's layout makes them structurally impossible rather than merely discouraged.",
      },
      {
        kind: "heading",
        id: "the-store",
        text: "One copy on disk instead of many",
      },
      {
        kind: "paragraph",
        html: "The second difference is where the files actually live. With npm, if you have 100 projects using a dependency, you have 100 copies of it on disk. pnpm keeps a single content-addressable store and hard-links files out of it, which as the docs say means they consume no additional disk space.",
      },
      {
        kind: "paragraph",
        html: "Updates are incremental at the file level too. If a new version of a 100-file package changes one file, `pnpm update` adds one file to the store rather than cloning the whole package again.",
      },
      {
        kind: "paragraph",
        html: "The install itself runs in three stages: resolve the dependency graph and fetch what is missing into the store, calculate the directory structure, then link everything into place.",
      },
      {
        kind: "heading",
        id: "yarn-modern",
        text: "Where Yarn Modern sits",
      },
      {
        kind: "paragraph",
        html: "Yarn Classic behaves like npm, hoisting into a flat tree. Yarn Modern took a different route with Plug'n'Play, which skips `node_modules` altogether and resolves packages through a lockfile-driven map. It solves the same strictness problem pnpm solves, by removing the directory rather than restructuring it.",
      },
      {
        kind: "table",
        caption:
          "Behaviour as described by each tool's own documentation. The layout column is what drives everything else.",
        headers: ["", "npm", "Yarn Classic", "Yarn Modern (PnP)", "pnpm"],
        rows: [
          ["node_modules layout", "Flat, hoisted", "Flat, hoisted", "None", "Nested + symlinked"],
          [
            "Files on disk",
            "One copy per project",
            "One copy per project",
            "Zips in a cache",
            "Hard-linked from one store",
          ],
          ["Phantom dependencies", "Possible", "Possible", "Blocked", "Blocked"],
          ["Ships with Node", "Yes", "No", "No", "No"],
        ],
      },
      {
        kind: "heading",
        id: "picking-one",
        text: "Picking one",
      },
      {
        kind: "list",
        items: [
          "**npm** is already installed with Node and needs no decision. Fine for a single project where disk space and strictness are not concerns.",
          "**pnpm** is the one to reach for with multiple projects or a monorepo. The disk savings are real and the strict layout catches a class of bug before it ships.",
          "**Yarn** is worth it if you specifically want Plug'n'Play, or you are on a codebase already invested in it.",
        ],
      },
      {
        kind: "paragraph",
        html: "The one genuine friction with pnpm is packages that assume a flat `node_modules` and reach for something they did not declare. That is the phantom dependency problem showing up from the other side, and the `public-hoist-pattern` setting exists to work around it when you cannot fix the package itself.",
      },
    ],
  },
  {
    slug: "crewai-agents",
    title: "Building Teams of AI Agents with CrewAI",
    dek: "Moving beyond single-agent prompt loops: orchestrating multi-agent collaboration with specialized roles, tools, and sequential or hierarchical processes.",
    topic: "Engineering",
    publishedAt: "2024-11-03",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#certification", "#crewai", "#aiagents", "#deeplearningai"],
    coverImage: "/articles/crewai-agents.png",
    body: [
      {
        kind: "paragraph",
        html: "Single-agent systems often hit a ceiling when tasks require multiple distinct skill sets. Ask a single LLM to perform deep technical research, synthesize 20 search results, write a production-ready blog post, and review its own citations, and it will inevitably compromise on quality, forget instructions, or hallucinate citations.",
      },
      {
        kind: "paragraph",
        html: "**CrewAI** solves this by borrowing organizational structure from human engineering teams: dividing work among specialized agents that communicate, pass artifacts, and hold each other accountable under an explicit management process.",
      },
      {
        kind: "heading",
        id: "the-core-building-blocks",
        text: "The Core Building Blocks",
      },
      {
        kind: "list",
        items: [
          "**Agent**: An autonomous actor configured with a distinct `role` (its job title), a `goal` (its primary objective), and a `backstory` (which sets its personality, tone, and cognitive boundaries in system prompts).",
          "**Task**: A discrete unit of work assigned to an agent, specifying the `description` of the work and the exact `expected_output` schema.",
          "**Tools**: Capabilities attached to specific agents (web search, scrapers, database connectors, code interpreters).",
          "**Process**: How the tasks are executed: **Sequential** (linear pipeline where task `N`'s output feeds task `N+1`) or **Hierarchical** (a manager agent dynamically plans, delegates, and reviews results).",
        ],
      },
      {
        kind: "heading",
        id: "a-runnable-crewai-pipeline",
        text: "A Production-Ready Crew in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete, runnable CrewAI script establishing a collaborative two-agent research team:",
      },
      {
        kind: "code",
        filename: "agent_crew.py",
        code: `import os\nfrom crewai import Agent, Task, Crew, Process\nfrom crewai_tools import SerperDevTool\n\n# Configure API keys\nos.environ["SERPER_API_KEY"] = "your_serper_api_key"\nos.environ["OPENAI_API_KEY"] = "your_openai_api_key"\n\nsearch_tool = SerperDevTool()\n\n# 1. Senior Research Analyst Agent\nsenior_researcher = Agent(\n    role="Senior AI Research Analyst",\n    goal="Uncover cutting-edge developments in multi-agent systems and summarize empirical findings",\n    backstory="""You are an expert AI researcher at a top-tier lab. You have an eye for separating \n    genuine architectural breakthroughs from marketing hype. You rigorously verify all claims.""",\n    tools=[search_tool],\n    verbose=True,\n    memory=True,\n)\n\n# 2. Technical Technical Writer Agent\ntech_writer = Agent(\n    role="Principal Systems Writer",\n    goal="Translate dense technical research into actionable, engaging engineering articles",\n    backstory="""You are a veteran systems engineer and technical essayist. You explain complex protocols \n    with intuitive analogies, clean code examples, and zero fluff.""",\n    tools=[],\n    verbose=True,\n)\n\n# 3. Define Sequenced Tasks\nresearch_task = Task(\n    description="Investigate recent advancements in the Model Context Protocol (MCP) in 2025/2026. Focus on enterprise adoption and tooling.",\n    expected_output="A structured 5-bullet summary of verified findings with source URLs.",\n    agent=senior_researcher,\n)\n\nwriting_task = Task(\n    description="Using the research findings, compose an insightful 400-word engineering briefing explaining how developers should adopt MCP.",\n    expected_output="A complete markdown article with an introduction, key technical takeaways, and conclusion.",\n    agent=tech_writer,\n)\n\n# 4. Form the Crew and Execute\ntech_crew = Crew(\n    agents=[senior_researcher, tech_writer],\n    tasks=[research_task, writing_task],\n    process=Process.sequential,\n    verbose=True,\n)\n\nresult = tech_crew.kickoff()\nprint("\\n### Final Synthesized Output:\\n", result)`,
      },
      {
        kind: "heading",
        id: "lessons-from-deeplearningai-certification",
        text: "Key Engineering Takeaways",
      },
      {
        kind: "paragraph",
        html: "After completing the **Practical Multi AI Agents and Advanced Use Cases with crewAI** certification (taught by João Moura on DeepLearning.AI), three critical lessons stand out for production agent architectures:",
      },
      {
        kind: "list",
        items: [
          "**Strict Guardrails on Delegation**: When using `allow_delegation=True`, agents can enter endless polite conversation loops ('Can you check this?' 'Sure, here is X, can you review?'). Always set explicit `max_iter` limits.",
          "**Backstories Are Prompt Engineering**: The backstory is not decorative flavor text. It primes the LLM's attention mechanism to discard irrelevant reasoning paths and stick to its designated domain.",
          "**Tool Granularity**: Agents perform far better with three small, deterministic, single-purpose tools than one massive 'swiss-army knife' tool with dozens of optional parameters.",
        ],
      },
      {
        kind: "paragraph",
        html: "The verified certificate is viewable [on DeepLearning.AI](https://learn.deeplearning.ai/accomplishments/8fc6c6d0-73cf-4b8d-9ff9-691b9f148ff2?usp=sharing).",
      },
    ],
  },
  {
    slug: "how-rag-works",
    title: "How Retrieval-Augmented Generation Works",
    dek: "A vector database, cosine similarity, and an LLM context injection. The mathematical and code mechanics of grounding language models.",
    topic: "Evaluation",
    publishedAt: "2024-10-28",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#rag", "#embeddings", "#llm", "#retrieval"],
    coverImage: "/articles/how-rag-works.png",
    body: [
      {
        kind: "paragraph",
        html: "Large language models are phenomenal pattern recognizers, but they possess two fatal weaknesses in production: their knowledge is frozen at training cutoff, and when asked about facts they do not know, they hallucinate plausible-sounding nonsense with absolute confidence.",
      },
      {
        kind: "paragraph",
        html: "**Retrieval-Augmented Generation (RAG)** eliminates hallucination by turning the model into an open-book test taker. Instead of relying solely on parametric memory (weights), the system retrieves verifiable evidence from an external vector index and injects it directly into the prompt context.",
      },
      {
        kind: "heading",
        id: "the-retrieval-loop",
        text: "The Three Stages of the RAG Loop",
      },
      {
        kind: "list",
        items: [
          "**1. Ingestion & Embedding**: Long documents are split into overlapping chunks (e.g. 500 characters with 100-character overlap) and converted into continuous mathematical vectors `v ∈ ℝᵈ` using an embedding model.",
          "**2. Dense Semantic Retrieval**: When a user poses a question, the query is mapped into the same vector space. The system calculates the distance (typically cosine similarity) between the query vector and millions of stored chunk vectors to retrieve the top-`k` nearest neighbors.",
          "**3. Augmented Synthesis**: The retrieved chunks are formatted into a prompt template alongside a strict grounding directive: *'Answer the question strictly based on the provided context.'*",
        ],
      },
      {
        kind: "mermaid",
        caption:
          "The retrieval loop. Everything left of the model is ordinary information retrieval. The model only ever sees text that was already selected for it.",
        code: 'flowchart TD\n    Q["Question"] --> E["Embedding model"]\n    E --> V["Query vector"]\n    V --> S{"Cosine similarity<br/>search"}\n    D[("Vector database")] --> S\n    S --> K["Top-k chunks"]\n    K --> P["Prompt:<br/>question + context"]\n    Q --> P\n    P --> L["Language model"]\n    L --> A["Grounded answer"]\n\n    DOC["Source documents"] -.chunk + embed.-> D',
      },
      {
        kind: "heading",
        id: "the-mathematics-of-cosine-similarity",
        text: "The Mathematics of Vector Similarity",
      },
      {
        kind: "paragraph",
        html: "Why does comparing floating-point arrays identify semantic meaning? Embedding models map synonymy and semantic intent into geometric direction. A query about *'slow SQL queries'* and a document discussing *'database index bottlenecks'* point in almost identical directions in 768-dimensional space, even without sharing words in common.",
      },
      {
        kind: "formula",
        tex: "\\cos(\\theta) = \\frac{A \\cdot B}{\\lVert A \\rVert \\, \\lVert B \\rVert} = \\frac{\\sum_{i} A_i B_i}{\\sqrt{\\sum_{i} A_i^{2}} \; \\sqrt{\\sum_{i} B_i^{2}}}",
        caption:
          "Cosine similarity measures the angle between vectors. 1.0 means identical orientation, and 0.0 means orthogonal, or unrelated.",
      },
      {
        kind: "paragraph",
        html: "By dividing out the Euclidean norm `‖A‖ ‖B‖`, cosine similarity normalizes for document length: a 2,000-word chapter and a 10-word query can be matched purely on conceptual alignment rather than word count magnitude.",
      },
      {
        kind: "heading",
        id: "a-pure-python-rag-implementation",
        text: "An End-to-End RAG Loop in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete, minimal implementation of semantic search and context injection using NumPy and OpenAI embeddings:",
      },
      {
        kind: "code",
        filename: "simple_rag.py",
        code: `import numpy as np\nfrom openai import OpenAI\n\nclient = OpenAI()\n\n# 1. Corpus of documents\nknowledge_base = [\n    "The Space blog is built with Next.js 16 and Tailwind CSS v4 on Turso SQLite.",\n    "Database transactions use libSQL over HTTP with drizzle-orm for type-safe queries.",\n    "The newsletter delivers articles via Resend and supports RFC 8058 one-click unsubscribe.",\n    "Postgres connection pools should be sized based on available CPU cores and RAM."\n]\n\ndef get_embedding(text: str) -> np.ndarray:\n    res = client.embeddings.create(input=text, model="text-embedding-3-small")\n    return np.array(res.data[0].embedding, dtype=np.float32)\n\n# 2. Ingest corpus vectors\ndoc_vectors = np.array([get_embedding(doc) for doc in knowledge_base])\n\n# 3. Query retrieval\nquery = "How are emails sent from the blog?"\nquery_vector = get_embedding(query)\n\n# Compute cosine similarities\ndot_products = np.dot(doc_vectors, query_vector)\nnorms = np.linalg.norm(doc_vectors, axis=1) * np.linalg.norm(query_vector)\nsimilarities = dot_products / norms\n\ntop_index = np.argmax(similarities)\nbest_context = knowledge_base[top_index]\nprint(f"Top Match (Score: {similarities[top_index]:.4f}): {best_context}")\n\n# 4. Grounded Synthesis\nprompt = f"""Answer the question using ONLY the provided context.\n\nContext:\\n{best_context}\\n\\nQuestion: {query}"""\n\nresponse = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[{"role": "user", "content": prompt}],\n    temperature=0.0,\n)\nprint("\\nAnswer:", response.choices[0].message.content)`,
      },
      {
        kind: "heading",
        id: "where-naive-rag-fails",
        text: "Where Naive RAG Fails in Production",
      },
      {
        kind: "paragraph",
        html: "Moving from a weekend prototype to production RAG reveals real architectural challenges:",
      },
      {
        kind: "list",
        items: [
          "**Embedding Drift**: You must never query an index with an embedding model different from the one that generated the index. Dimensions and semantic projections are not transferable.",
          "**Chunk Truncation**: When crucial context spans across a chunk boundary, both chunks score low on similarity. Implement sliding window chunking with 20% overlap or hierarchical parent-child chunking.",
          "**Needle-in-a-Haystack Dilution**: Injecting 20 retrieved chunks causes the LLM to overlook the key fact if it is buried in the middle of the context window. Always apply a cross-encoder re-ranking pass (e.g. Cohere Rerank) before prompt injection.",
        ],
      },
      {
        kind: "callout",
        title: "Architecture Summary",
        body: "RAG is not just a vector search query. A production RAG system is a data engineering pipeline: clean document ingestion, smart chunking strategies, dense retrieval, cross-encoder re-ranking, and strict system prompt grounding.",
      },
    ],
  },
  {
    slug: "explaiable-ai",
    title: "Explainable AI: Opening the Black Box with SHAP and LIME",
    dek: "High test accuracy is meaningless if a model exploits spurious correlations. How cooperative game theory and local linear surrogates bring mathematical interpretability to deep learning.",
    topic: "Research",
    publishedAt: "2024-10-22",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#xai", "#interpretability", "#machine-learning"],
    coverImage: "/articles/explaiable-ai.png",
    body: [
      {
        kind: "paragraph",
        html: "In applied machine learning, there is a dangerous trap: equating a high validation score with a trustworthy model. Deep neural networks, gradient-boosted decision trees, and large language models frequently achieve 98% accuracy by latching onto spurious background correlations, such as classifying an image as a wolf simply because the training photos contained snow in the background.",
      },
      {
        kind: "paragraph",
        html: "When algorithms make credit underwriting decisions, guide cancer diagnoses, or execute autonomous driving maneuvers, the 'black box' excuse is legally and ethically unacceptable. **Explainable AI (XAI)** is the discipline of making machine learning predictions interpretable, verifiable, and debuggable.",
      },
      {
        kind: "heading",
        id: "intrinsic-vs-post-hoc-interpretability",
        text: "Intrinsic Interpretability vs Post-Hoc Attribution",
      },
      {
        kind: "paragraph",
        html: "Interpretability methods fall into two broad architectural paradigms:",
      },
      {
        kind: "list",
        items: [
          "**Intrinsic (Interpretable by Design)**: Algorithms whose internal decision mechanics are directly inspectable by a human. Sparse linear regressions (where coefficients directly represent feature impact), shallow decision trees, and Generalized Additive Models (GAMs) like Microsoft's Explainable Boosting Machines (EBMs).",
          "**Post-Hoc Attribution**: Techniques that analyze a trained, opaque model from the outside by systematically observing how output probabilities fluctuate when inputs are masked, perturbed, or ablated.",
        ],
      },
      {
        kind: "heading",
        id: "shap-mathematical-cooperative-game-theory",
        text: "SHAP: Cooperative Game Theory in Machine Learning",
      },
      {
        kind: "paragraph",
        html: "The gold standard of post-hoc attribution is **SHAP (SHapley Additive exPlanations)**, developed by Scott Lundberg and Su-In Lee. SHAP adapts Nobel-laureate Lloyd Shapley's cooperative game theory: considering input features as 'players' in a coalition collaborating to produce the prediction (the 'payout').",
      },
      {
        kind: "paragraph",
        html: "The Shapley value `φᵢ` represents the average marginal contribution of feature `i` across all possible feature subsets `S ⊆ F \\ {i}`:",
      },
      {
        kind: "code",
        filename: "shap_formula.txt",
        code: `ϕ_i = ∑ [ |S|! (|F| - |S| - 1)! / |F|! ] * [ f(S ∪ {i}) - f(S) ]\n\nWhere:\n  F = Complete set of all input features\n  S = Subset of features without feature i\n  f(S) = Model prediction evaluated with subset S present`,
      },
      {
        kind: "paragraph",
        html: "Unlike heuristic feature importance scores (such as Gini impurity decrease in Random Forests, which heavily bias toward high-cardinality continuous features), SHAP uniquely satisfies four mathematical axioms: **Efficiency** (attributions sum to the difference between prediction and expected value), **Symmetry**, **Dummy Player** (zero impact yields zero credit), and **Additivity**.",
      },
      {
        kind: "heading",
        id: "practical-shap-in-python",
        text: "Generating Explanations in Python",
      },
      {
        kind: "paragraph",
        html: "Using the Python `shap` library, we can compute exact TreeSHAP attributions for tree ensembles in polynomial time, revealing exactly why an individual prediction was made:",
      },
      {
        kind: "code",
        filename: "explain_prediction.py",
        code: `import xgboost as xgb\nimport shap\nfrom sklearn.datasets import fetch_california_housing\nfrom sklearn.model_selection import train_test_split\n\n# 1. Train a gradient boosted model\nX, y = fetch_california_housing(return_X_y=True, as_frame=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = xgb.XGBRegressor(n_estimators=100, max_depth=4)\nmodel.fit(X_train, y_train)\n\n# 2. Initialize TreeSHAP explainer\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer(X_test.iloc[:5])\n\n# 3. Inspect individual prediction breakdown\nfirst_prediction_shap = shap_values[0]\nprint("Base Value (Mean Prediction):", explainer.expected_value)\nprint("Feature Attributions for Record 0:")\nfor name, val in zip(X.columns, first_prediction_shap.values):\n    print(f"  {name:15s}: {val:+.4f}")`,
      },
      {
        kind: "heading",
        id: "the-attention-is-not-explanation-debate",
        text: "The 'Attention is Not Explanation' Warning",
      },
      {
        kind: "paragraph",
        html: "In modern Transformer architectures, engineers frequently plot multi-head self-attention heatmaps and claim: *'The model paid attention to these tokens when generating its answer.'* However, research (notably Jain & Wallace, 2019) proved that attention weights do not reliably correlate with gradient-based feature importance or causal counterfactual outcomes.",
      },
      {
        kind: "paragraph",
        html: "Interpreting attention matrices as explanations ignores non-linear feedforward layers, residual connections, and layer normalization. For deep LLMs, rigorous XAI requires mechanistic interpretability: probing activation vectors, measuring causal mediation, and steering latent representations.",
      },
      {
        kind: "callout",
        title: "Rule of Thumb",
        body: "Never deploy a high-stakes automated decision system without calculating baseline attribution scores. If your top contributing feature does not make causal sense to domain experts, your model has learned noise, not intelligence.",
      },
    ],
  },
  {
    slug: "spacex-reverse-rocket",
    title: "SpaceX Caught a Rocket With the Launch Tower",
    dek: "On 13 October 2024, the Super Heavy booster came back to the pad and was caught mid-air by a pair of mechanical arms, on the first attempt.",
    topic: "Experiments",
    publishedAt: "2024-10-14",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#spacex", "#aerospace", "#engineering", "#physics"],
    coverImage: "/articles/spacex-reverse-rocket.png",
    body: [
      {
        kind: "paragraph",
        html: "On 13 October 2024, SpaceX made history by catching the Super Heavy booster mid-air using giant robotic arms, known as chopsticks. After the launch from Boca Chica, Texas, the booster separated and executed a controlled descent back to the launch pad, where the arms caught it.",
      },
      {
        kind: "paragraph",
        html: "This was Starship's fifth test flight, and the catch worked on the first attempt. About seven minutes after liftoff the booster came back to the tower and hovered while the arms closed around it. Getting that right first time is the part that is hard to overstate, because there was no way to rehearse the final seconds at full scale.",
      },
      {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Starship_Booster_Return_on_Final_Approach_%2854063904149%29.jpg/1280px-Starship_Booster_Return_on_Final_Approach_%2854063904149%29.jpg",
        alt: "The Super Heavy booster descending vertically alongside the launch tower on final approach, engines lit.",
        caption:
          "The booster on final approach to the tower during Flight 5. Photo by Steve Jurvetson, CC BY 2.0, via Wikimedia Commons.",
        width: 1280,
        height: 1780,
      },
      {
        kind: "paragraph",
        html: "That is a major step toward making rockets rapidly reusable, which could significantly reduce the cost of space missions. Recovering a booster intact and on the pad, rather than downrange or in the ocean, is what turns reuse from a refurbishment project into something closer to a turnaround.",
      },
      {
        kind: "paragraph",
        html: "The reason to catch rather than land is mass and time. Landing legs strong enough to take a booster of this size have to be carried all the way up and back, and every kilogram of leg is a kilogram not going to orbit. Letting the tower take the load moves that structure to the ground, where its weight costs nothing. It also puts the booster back on the mount it launched from, instead of somewhere that needs transport and inspection before it can fly again.",
      },
      {
        kind: "paragraph",
        html: "By getting this method working, SpaceX is not only improving efficiency but moving toward a future where space travel is more frequent and more accessible. It is a crucial part of Elon Musk's stated goal of making space exploration sustainable and affordable.",
      },
    ],
  },
  {
    slug: "logistic-regression",
    title: "Logistic Regression Explained",
    dek: "Despite the name, it is a classification algorithm. It models the probability of a binary outcome from one or more predictor variables.",
    topic: "Research",
    publishedAt: "2024-10-05",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#machine-learning", "#classification", "#statistics"],
    series: { slug: "regression-explained", title: "Regression, Explained", part: 2 },
    coverImage: "/articles/logistic-regression.png",
    body: [
      {
        kind: "paragraph",
        html: "Logistic regression is a classification algorithm used to model the probability of a binary outcome based on one or more predictor variables. Despite its name it is a linear model for classification rather than regression. Here are the concepts that matter.",
      },
      {
        kind: "paragraph",
        html: "**Binary classification.** Logistic regression is primarily used for binary classification, where the target variable has only two possible outcomes, typically represented as 0 and 1.",
      },
      {
        kind: "paragraph",
        html: "**The sigmoid function.** Logistic regression uses the sigmoid function to map predicted values to probabilities between 0 and 1:",
      },
      {
        kind: "formula",
        tex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
        caption:
          "Where z is the linear combination of the input features and their corresponding coefficients.",
      },
      {
        kind: "image",
        src: "/articles/sigmoid-curve.svg",
        alt: "The logistic sigmoid curve, an S-shape rising from near 0 on the left to near 1 on the right, crossing 0.5 at z equals 0.",
        caption:
          "The sigmoid never quite reaches 0 or 1, which is why the model returns a probability rather than a verdict. z = 0 is the decision boundary at the default threshold.",
        width: 720,
        height: 360,
      },
      {
        kind: "paragraph",
        html: "**Decision boundary.** The model separates classes by fitting a decision boundary, typically a straight line in two dimensions, that divides the feature space into regions associated with different classes.",
      },
      {
        kind: "paragraph",
        html: "**Cost function.** Logistic regression uses cross-entropy loss to measure the difference between the predicted probabilities and the actual target values. Training is the process of minimizing it.",
      },
      {
        kind: "paragraph",
        html: "**Regularization.** L1 (Lasso) and L2 (Ridge) regularization can be applied to prevent overfitting, by penalizing large coefficients.",
      },
      {
        kind: "heading",
        id: "in-code",
        text: "What that looks like in code",
      },
      {
        kind: "paragraph",
        html: "This is scikit-learn's own example, on the iris dataset:",
      },
      {
        kind: "code",
        filename: "logistic_regression.py",
        runnable: true,
        code: "from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\n\nX, y = load_iris(return_X_y=True)\nclf = LogisticRegression(random_state=0).fit(X, y)\n\nclf.predict(X[:2, :])\n# array([0, 0])\n\nclf.predict_proba(X[:2, :])\n# array([[9.82e-01, 1.82e-02, 1.44e-08],\n#        [9.72e-01, 2.82e-02, 3.02e-08]])\n\nclf.score(X, y)\n# 0.97",
      },
      {
        kind: "paragraph",
        html: "`predict_proba` is the part worth dwelling on, because it is the sigmoid output rather than a label. The first sample comes back as 98.2 percent class 0, and only then does `predict` collapse that into the label `0`. Keeping the probability is usually more useful than the label: it lets you set your own threshold instead of accepting 0.5, which matters whenever a false positive and a false negative cost different amounts.",
      },
      {
        kind: "paragraph",
        html: "The iris example also shows that the binary case is the starting point rather than the limit. There are three classes here, and the probabilities across each row sum to 1.",
      },
      {
        kind: "callout",
        title: "Regularization is on by default",
        body: "scikit-learn applies L2 regularization out of the box, with the lbfgs solver and C=1.0. So the regularization described above is not something you switch on, it is something you tune. C is the inverse of regularization strength, meaning smaller values regularize harder.",
      },
      {
        kind: "paragraph",
        html: "**Usage.** Logistic regression is widely used in healthcare for predicting disease outcomes, in finance for credit risk analysis, and in marketing for customer churn prediction. Its enduring advantage over heavier models is that the coefficients remain readable, so you can say which feature pushed a decision and in which direction.",
      },
    ],
  },
  {
    slug: "linear-regression",
    title: "Linear Regression Explained",
    dek: "A supervised algorithm that models the relationship between your features and a target, on the assumption that the relationship is a straight line.",
    topic: "Research",
    publishedAt: "2024-09-28",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#machine-learning", "#statistics", "#datascience"],
    series: { slug: "regression-explained", title: "Regression, Explained", part: 1 },
    coverImage: "/articles/linear-regression.png",
    body: [
      {
        kind: "paragraph",
        html: "Linear regression is a supervised learning algorithm used to model the relationship between one or more independent variables (features) and a dependent variable (target). It assumes a linear relationship between the input features and the target, represented by a straight-line equation.",
      },
      {
        kind: "formula",
        tex: "y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots + \\beta_n x_n",
        caption: "β₀ is the intercept and each β is the coefficient on one feature.",
      },
      {
        kind: "heading",
        id: "important-concepts",
        text: "Important concepts",
      },
      {
        kind: "list",
        items: [
          "**Simple linear regression.** There is only one independent variable, and its relationship to the target is modelled with a straight line.",
          "**Multiple linear regression.** The same idea extended to multiple independent variables, which allows more complex relationships to be modelled.",
          "**Coefficients.** The coefficients, or weights, represent the slope of the line. Each one tells you how much the target changes for a one-unit change in the corresponding independent variable.",
          "**Intercept.** The intercept term is the value of the target when all independent variables are zero.",
        ],
      },
      {
        kind: "heading",
        id: "in-code",
        text: "What that looks like in code",
      },
      {
        kind: "paragraph",
        html: "The concepts above map directly onto attributes on a fitted model, which is the fastest way to make them concrete. This is scikit-learn's own example, using data built so that the answer is known in advance: the target is `1 * x₀ + 2 * x₁ + 3`.",
      },
      {
        kind: "code",
        filename: "linear_regression.py",
        runnable: true,
        code: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])\n# y = 1 * x_0 + 2 * x_1 + 3\ny = np.dot(X, np.array([1, 2])) + 3\n\nreg = LinearRegression().fit(X, y)\n\nprint(reg.coef_)       # array([1., 2.])\nprint(reg.intercept_)  # 3.0\nprint(reg.score(X, y)) # 1.0\nprint(reg.predict(np.array([[3, 5]])))  # array([16.])",
      },
      {
        kind: "paragraph",
        html: "Read the output against the definitions. `coef_` came back as `[1., 2.]`, which is the slope on each of the two features, and `intercept_` came back as `3.0`. Those are exactly the numbers the data was built from, so the model recovered the relationship it was shown.",
      },
      {
        kind: "paragraph",
        html: "`score` returns R², the proportion of variance the model explains. Here it is `1.0` because the data is perfectly linear with no noise in it. Real data never does this, and a score of 1.0 on a real dataset is a sign you have leaked the target into your features rather than a sign you have done well.",
      },
      {
        kind: "heading",
        id: "where-it-is-used",
        text: "Where it is used",
      },
      {
        kind: "paragraph",
        html: "Linear regression is widely used for prediction and forecasting across economics, finance, healthcare, and other fields. It is also a common baseline model for evaluating whether a more complex machine learning algorithm is actually earning its complexity. If a gradient-boosted ensemble cannot beat a straight line on your problem, that is worth knowing before you ship the ensemble.",
      },
    ],
  },
  {
    slug: "windows-vs-linux",
    title: "Windows to Linux: What Changed in How I Work",
    dek: "I started on Windows 10 and 11 and thought I had everything I needed. Then the projects got complex enough to show me otherwise.",
    topic: "Systems",
    publishedAt: "2024-09-20",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#windows", "#linux", "#developer-experience", "#os"],
    coverImage: "/articles/windows-vs-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "As a programmer who started out on Windows 10 and 11, I initially thought I had everything I needed. But as I got further into software development I started noticing limitations that were holding me back. Between performance lags and compatibility problems, Windows began to feel like more of a hindrance than a help, especially on the more complex projects.",
      },
      {
        kind: "heading",
        id: "making-the-switch",
        text: "Making the switch",
      },
      {
        kind: "paragraph",
        html: "Frustrated, I started experimenting with Linux distributions. Over the past three years I have worked with several, including Kali Linux, Debian, Garuda Linux, and now Ubuntu. It was not a smooth run. I had a lot of issues early on, and my lack of knowledge led to plenty of failures. Those turned out to be the valuable part. It became clear how essential Linux is for programmers, and especially for anyone working in DevOps.",
      },
      {
        kind: "heading",
        id: "what-actually-improved",
        text: "What actually improved",
      },
      {
        kind: "paragraph",
        html: "After a few years of practice I can say Linux is much easier for programming work than Windows was for me. Four things account for most of it:",
      },
      {
        kind: "list",
        items: [
          "**Security.** Linux is inherently more secure, with better protection against malware, and regular updates keep it a safe environment to develop in.",
          "**Performance.** It is lightweight and does not weigh the system down with unnecessary processes, which shows up as faster compile times and quicker execution.",
          "**GPU support for ML libraries.** As someone who dabbles in machine learning, I found GPU support for libraries like TensorFlow far more straightforward on Linux. On Windows it can be a nightmare of compatibility issues and driver problems.",
          "**Customization and control.** You can shape every part of the environment, including how the system runs, what gets installed, and how resources are allocated.",
        ],
      },
      {
        kind: "heading",
        id: "i-still-use-windows",
        text: "I still use Windows",
      },
      {
        kind: "paragraph",
        html: "For graphic design and video editing I am still on Windows. The professional grade software there is either unavailable on Linux or less capable, and that has not changed for me.",
      },
      {
        kind: "paragraph",
        html: "Switching was transformative for my programming, even though it was not easy at first. The learning curve was worth it. Linux made me a better programmer, and it taught me something about adaptability and continuous learning along the way. If you are a programmer still on Windows, it is worth giving Linux a try.",
      },
    ],
  },
  {
    slug: "go",
    title: "The Rise of Go: Concurrency, Simplicity, and Cloud Infrastructure",
    dek: "How Rob Pike and Ken Thompson's deliberate refusal of language complexity turned Go into the undisputed operating system of the modern cloud.",
    topic: "Engineering",
    publishedAt: "2024-09-12",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#golang", "#backend", "#cloud", "#systems"],
    coverImage: "/articles/go.png",
    body: [
      {
        kind: "paragraph",
        html: "If you inspect the foundations of modern cloud infrastructure (Docker, Kubernetes, Terraform, Prometheus, Etcd, CockroachDB, and Caddy), you notice an unmistakable pattern: almost all of them are written in **Go**.",
      },
      {
        kind: "paragraph",
        html: "Created at Google in 2007 by Robert Griesemer, Rob Pike, and Unix co-creator Ken Thompson, Go was born out of intense frustration with C++ compilation times and the runaway syntactic complexity of enterprise object-oriented languages. Instead of asking what features could be added to a language, the Go designers asked **what could be stripped away** while preserving raw systems performance.",
      },
      {
        kind: "heading",
        id: "the-csp-concurrency-revolution",
        text: "The CSP Concurrency Model: Goroutines vs OS Threads",
      },
      {
        kind: "paragraph",
        html: "Traditional systems languages handle concurrency by spawning operating system threads. An OS thread carries significant overhead: typically a **1MB to 8MB fixed stack**, high context-switch latency mediated by the kernel scheduler, and dangerous shared-memory race conditions requiring defensive mutex locking.",
      },
      {
        kind: "paragraph",
        html: "Go implemented Tony Hoare's **Communicating Sequential Processes (CSP)** formal algebra through two primitives:",
      },
      {
        kind: "list",
        items: [
          "**Goroutines**: User-space green threads managed by the Go runtime's `M:N` scheduler. A goroutine starts with a microscopic **2 KB stack** that dynamically grows and shrinks on the heap as needed. A standard developer laptop can comfortably run 200,000 concurrent goroutines without running out of RAM.",
          "**Channels (`chan`)**: Typed conduits through which concurrent goroutines synchronize and exchange data without shared memory: *'Do not communicate by sharing memory; instead, share memory by communicating.'*",
        ],
      },
      {
        kind: "heading",
        id: "a-production-worker-pool",
        text: "Practical Concurrency: A Production Worker Pool",
      },
      {
        kind: "paragraph",
        html: "Here is a canonical Go worker pool pattern demonstrating buffered channels, worker goroutines, and synchronized completion with `sync.WaitGroup`:",
      },
      {
        kind: "code",
        filename: "worker_pool.go",
        code: `package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"time"\n)\n\ntype Job struct {\n\tID  int\n\tURL string\n}\n\ntype Result struct {\n\tJob        Job\n\tStatusCode int\n\tDuration   time.Duration\n}\n\n// worker processes incoming jobs concurrently from a shared channel\nfunc worker(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {\n\tdefer wg.Done()\n\tfor job := range jobs {\n\t\tstart := time.Now()\n\t\t// Simulate network fetch\n\t\ttime.Sleep(50 * time.Millisecond)\n\t\tresults <- Result{\n\t\t\tJob:        job,\n\t\t\tStatusCode: 200,\n\t\t\tDuration:   time.Since(start),\n\t\t}\n\t}\n}\n\nfunc main() {\n\tconst numJobs = 10\n\tconst numWorkers = 3\n\n\tjobs := make(chan Job, numJobs)\n\tresults := make(chan Result, numJobs)\n\tvar wg sync.WaitGroup\n\n\t// Launch worker pool\n\tfor w := 1; w <= numWorkers; w++ {\n\t\twg.Add(1)\n\t\tgo worker(w, jobs, results, &wg)\n\t}\n\n\t// Enqueue work\n\tfor j := 1; j <= numJobs; j++ {\n\t\tjobs <- Job{ID: j, URL: fmt.Sprintf("https://api.service.internal/v1/resource/%d", j)}\n\t}\n\tclose(jobs) // Closing signals workers to finish\n\n\twg.Wait()\n\tclose(results)\n\n\tfor res := range results {\n\t\tfmt.Printf("Job %d completed with status %d in %v\\n", res.Job.ID, res.StatusCode, res.Duration)\n\t}\n}`,
      },
      {
        kind: "heading",
        id: "the-deployment-advantage",
        text: "The Single Binary and Minimalist Tooling Advantage",
      },
      {
        kind: "paragraph",
        html: "The second reason Go dominates production infrastructure is its compilation model. Unlike Node.js or Python, which require megabytes of interpreter runtimes and complex virtual environments, `go build` produces a **single, statically linked binary** with zero external shared library dependencies.",
      },
      {
        kind: "paragraph",
        html: "In containerized deployments, this allows Docker images to be built `FROM scratch` or `FROM alpine`, resulting in images as small as 12MB. That means near-instant container startup times, minimal attack surfaces with zero CVEs from extraneous operating system utilities, and effortless CI/CD pipelines.",
      },
      {
        kind: "callout",
        title: "The Engineering Takeaway",
        body: "Go succeeded not because it was the most expressive language, but because it solved the team coordination and deployment operational problems of large-scale backend engineering with unyielding simplicity.",
      },
    ],
  },
  {
    slug: "c",
    title: "Why C++ Still Matters: The Backbone of High-Performance AI and Systems",
    dek: "From llama.cpp and TensorRT to low-latency game engines, modern C++ remains the undisputed champion of bare-metal control and zero-cost abstractions.",
    topic: "Systems",
    publishedAt: "2024-09-05",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#cpp", "#performance", "#systems", "#programming"],
    coverImage: "/articles/c.png",
    body: [
      {
        kind: "paragraph",
        html: "Every few years, a new programming language arrives with claims that it will render C++ obsolete. Yet in 2026, when you inspect the cutting edge of technological innovation, specifically the explosive growth of **large language model inference engines** such as Georgi Gerganov's `llama.cpp`, vLLM's custom CUDA kernels and NVIDIA's TensorRT-LLM, you find that C++ remains utterly irreplaceable.",
      },
      {
        kind: "paragraph",
        html: "Why does a language designed by Bjarne Stroustrup in 1979 continue to anchor the most demanding computational workloads on the planet?",
      },
      {
        kind: "heading",
        id: "the-ai-inference-reality",
        text: "The AI Inference Reality: Python on Top, C++ at the Core",
      },
      {
        kind: "paragraph",
        html: "It is easy to believe that artificial intelligence is written in Python. Researchers write PyTorch scripts, prompt engineers configure LangChain pipelines, and data scientists train scikit-learn models. But Python is strictly the **ergonomic steering wheel**. The actual engine running underneath is pure, highly optimized C++ and CUDA.",
      },
      {
        kind: "paragraph",
        html: "PyTorch's tensor computational core (ATen), the memory allocators managing GPU VRAM, and the matrix multiplication kernels that stream weights from high-bandwidth memory (HBM) are all built in C++. When serving LLMs with thousands of tokens per second, the microsecond overhead of a garbage collector or interpreted bytecode is an immediate disqualifier.",
      },
      {
        kind: "heading",
        id: "modern-cpp-vs-c-with-classes",
        text: "Modern C++ (C++20/C++23) vs the C Legacy",
      },
      {
        kind: "paragraph",
        html: "Much of the historical criticism of C++ focuses on old C-style pitfalls: manual `malloc()` and `free()`, dangling pointer dereferences, and confusing buffer overflows. However, modern C++ (C++17, C++20, and C++23) is fundamentally a different language built around two core philosophies:",
      },
      {
        kind: "list",
        items: [
          "**RAII (Resource Acquisition Is Initialization)**: Resources (heap memory, file descriptors, GPU buffers, and mutex locks) are bound to object lifetimes. When an object leaves its scope, its destructor runs deterministically, guaranteeing zero memory leaks without runtime garbage collection pauses.",
          "**Zero-Cost Abstractions**: What you don't use, you don't pay for. And what you do use, you couldn't hand-code any better in assembly. Concepts, templates, and `constexpr` evaluation execute entirely at compile time.",
        ],
      },
      {
        kind: "heading",
        id: "type-safety-and-concepts-example",
        text: "Clean Type Safety: C++20 Concepts and Smart Pointers",
      },
      {
        kind: "paragraph",
        html: "Here is an example showing how modern C++ combines compile-time type constraints (Concepts) and automated memory management (`std::unique_ptr`) to eliminate raw pointers while preserving maximum performance:",
      },
      {
        kind: "code",
        filename: "modern_inference_buffer.cpp",
        code: `#include <iostream>\n#include <memory>\n#include <span>\n#include <concepts>\n#include <vector>\n\n// C++20 Concept: Enforce that tensor elements must be floating-point numbers\ntemplate <typename T>\nconcept NumericFloat = std::floating_point<T>;\n\ntemplate <NumericFloat T>\nclass TensorBuffer {\nprivate:\n    size_t m_size;\n    std::unique_ptr<T[]> m_data; // Deterministic memory management: zero manual free()\n\npublic:\n    explicit TensorBuffer(size_t size) \n        : m_size(size), m_data(std::make_unique<T[]>(size)) {}\n\n    // Zero-copy view using std::span\n    std::span<const T> view() const noexcept {\n        return std::span<const T>(m_data.get(), m_size);\n    }\n\n    size_t size() const noexcept { return m_size; }\n    T& operator[](size_t index) noexcept { return m_data[index]; }\n};\n\nint main() {\n    // Type-safe allocation of 1024 float32 activations\n    TensorBuffer<float> layer_activations(1024);\n    layer_activations[0] = 0.854f;\n\n    std::cout << "Allocated " << layer_activations.size() \n              << " elements safely with RAII.\\n";\n    // Memory is freed automatically and deterministically right here\n    return 0;\n}`,
      },
      {
        kind: "heading",
        id: "the-verdict",
        text: "The Verdict: When Control Is Non-Negotiable",
      },
      {
        kind: "paragraph",
        html: "While Rust is rightfully gaining ground for systems where memory safety must be mathematically proven at compile time, C++ remains the lingua franca of game engines (Unreal Engine 5), embedded robotics, high-frequency trading, and AI hardware acceleration. Its vast hardware ecosystem, mature optimizing compilers (Clang/GCC), and total control over CPU cache lines and SIMD vectorization ensure that C++ will remain vital for decades to come.",
      },
    ],
  },
  {
    slug: "sir-don-bradman",
    title: "Winning Without Sixes: What Bradman's 99.94 Says About Consistency",
    dek: "Don Bradman hit only six sixes in his entire Test career and finished with an average of 99.94. The mathematics of eliminating failure modes in sport and software.",
    topic: "Career",
    publishedAt: "2024-08-28",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#strategy", "#discipline", "#performance"],
    coverImage: "/articles/sir-don-bradman.png",
    body: [
      {
        kind: "paragraph",
        html: "Sir Donald Bradman played 52 Test matches for Australia, scored 6,996 runs, and finished his international career with a batting average of **99.94**. Across those twenty years and 80 innings, how many sixes did the greatest batsman in history hit?",
      },
      {
        kind: "paragraph",
        html: "Just **six**.",
      },
      {
        kind: "paragraph",
        html: "In an era where modern T20 cricket idolizes maximums and aerial boundary-clearing, sitting with that statistic reveals a profound mathematical truth about variance, risk management, and long-term durability.",
      },
      {
        kind: "heading",
        id: "the-4-4-sigma-outlier",
        text: "The 4.4-Sigma Outlier: A Statistical Anomaly",
      },
      {
        kind: "paragraph",
        html: "In statistical terms, Bradman is not just the best cricket batsman. He is the greatest statistical outlier across all major human sporting endeavors. The mean batting average for recognized international Test batsmen hovers around 35 to 40, with a standard deviation (`σ`) of roughly 12 to 14.",
      },
      {
        kind: "paragraph",
        html: "Bradman's average places him more than **4.4 standard deviations (`4.4σ`) above the mean**. To put that into perspective:",
      },
      {
        kind: "list",
        items: [
          "**Pelé** in football: ~3.7`σ`",
          "**Michael Jordan** in basketball: ~3.4`σ`",
          "**Wayne Gretzky** in ice hockey: ~3.9`σ`",
          "**Ty Cobb** in baseball: ~4.0`σ`",
        ],
      },
      {
        kind: "paragraph",
        html: "No other athlete in recorded history has stood that far beyond their peer distribution. What produced this impossible divergence?",
      },
      {
        kind: "heading",
        id: "eliminating-failure-modes-from-the-state-space",
        text: "Eliminating Failure Modes from the State Space",
      },
      {
        kind: "paragraph",
        html: "Bradman understood stochastic probability before mathematicians formally mapped it to sports analytics. He famously noted a simple physical constraint: *'You cannot be caught out if the ball stays along the ground.'*",
      },
      {
        kind: "paragraph",
        html: "Every time a batsman lofts the ball into the air, they enter a non-deterministic lottery. Even with immaculate timing, a gust of wind, a mistimed edge, or an athletic fielder creates a non-zero probability of dismissal: `P(caught) > 0`. Over thousands of deliveries, the cumulative probability of failure approaches certainty (`1.0`).",
      },
      {
        kind: "paragraph",
        html: "By refusing to hit aerial shots, Bradman **systematically deleted an entire failure mode from his state machine**. He relied on wristwork, placement, ground boundaries, and ruthless singles.",
      },
      {
        kind: "heading",
        id: "the-parallel-in-systems-engineering",
        text: "The Parallel in Software and Systems Engineering",
      },
      {
        kind: "paragraph",
        html: "In software engineering, developers are constantly tempted to hit flashy sixes: adopting unvetted distributed graph databases, spinning up intricate microservice meshes for low-traffic CRUD apps, or writing clever, unreadable metaprogramming macros.",
      },
      {
        kind: "paragraph",
        html: "High-variance architectural choices produce exciting launch demos, but they inevitably manifest as disastrous `p99` tail latencies, hard-to-reproduce race conditions, and catastrophic cascading failures when under load.",
      },
      {
        kind: "callout",
        title: "The Engineering Takeaway",
        body: "Five-nines reliability (99.999% uptime) is never achieved through heroic fire-fighting. It is achieved by ruthlessly keeping the ball on the ground: choosing boring, battle-tested technologies, enforcing idempotent retries, writing defensive unit tests, and eliminating high-variance operations.",
      },
    ],
  },
  {
    slug: "industry-visit",
    title: "A Day with Creative Software",
    dek: "Inside Creative Software with the Peradeniya Computer Engineering team. Observing how enterprise architecture, CI/CD, and agile engineering operate at global scale.",
    topic: "Career",
    publishedAt: "2024-08-15",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#industry-visit", "#creative-software", "#peracom"],
    coverImage: "/articles/industry-visit.png",
    body: [
      {
        kind: "paragraph",
        html: "Stepping outside the university computer laboratories into a mature software engineering company is always an eye-opening experience. During our undergraduate journey at the University of Peradeniya, our department organized an industrial visit to **Creative Software** in Colombo, one of Sri Lanka's pioneer software exporters with a track record spanning over two decades.",
      },
      {
        kind: "paragraph",
        html: "While academic engineering trains you to solve complex algorithmic puzzles, write compilers, and build hardware-software interfaces from scratch, industry visits reveal the other half of the discipline: how teams of dozens of engineers coordinate to deliver software that stays up 24/7 across thousands of enterprise clients.",
      },
      {
        kind: "heading",
        id: "enterprise-architecture-and-scale",
        text: "Enterprise Architecture and Scalability",
      },
      {
        kind: "paragraph",
        html: "Creative Software engineers build mission-critical systems for global clients in healthcare, construction, logistics, and marine operations across Scandinavia, Europe, and North America. What stood out immediately was how their architectural discussions centered around durability rather than chasing ephemeral trends:",
      },
      {
        kind: "list",
        items: [
          "**Domain-Driven Microservices**: Clean separation of core business domains with resilient asynchronous event buses (RabbitMQ, Kafka) protecting services from cascading outages.",
          "**Multi-Tenant Isolation**: Engineering robust database isolation and encryption layers for European clients requiring strict GDPR and enterprise compliance.",
          "**Container Orchestration**: Production workloads standardized across Docker and Kubernetes, ensuring parity between local development and cloud production clusters.",
        ],
      },
      {
        kind: "heading",
        id: "engineering-rigor-and-culture",
        text: "The Culture of Rigorous Code Review",
      },
      {
        kind: "paragraph",
        html: "One of the most inspiring aspects was observing their code review and deployment culture. In student projects, testing is often an afterthought hurried before submission. At Creative Software, automated testing (unit, integration, end-to-end) and static code analysis are baked into every pull request before any human reviewer even looks at the diff.",
      },
      {
        kind: "paragraph",
        html: "The engineers emphasized that a great code review is a mentorship conversation, not an interrogation. They look for edge cases, resource cleanup, SQL query optimization, and maintainability for the engineer who will touch that file three years later.",
      },
      {
        kind: "callout",
        title: "Key Takeaway",
        body: "Software engineering at scale is not just about writing code. It is about building reliable automated systems that allow teams to ship changes with confidence every day.",
      },
      {
        kind: "paragraph",
        html: "A sincere thank you to the engineering leadership and talent team at Creative Software for their generous hospitality, candid architectural walkthroughs, and warm encouragement to us as aspiring computer engineers.",
      },
    ],
  },
  {
    slug: "my-graduate",
    title: "Graduating in Computer Engineering from the University of Peradeniya",
    dek: "Reflections on completing my B.Sc. (Hons) in Engineering at Peradeniya: four years of systems programming, hardware-software co-design, and lifelong engineering friendships.",
    topic: "Career",
    publishedAt: "2024-08-01",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#graduation", "#university", "#computer-engineering"],
    coverImage: "/articles/my-graduate.png",
    body: [
      {
        kind: "paragraph",
        html: "I have officially graduated with a **B.Sc. (Hons) in Engineering, specializing in Computer Engineering, from the University of Peradeniya**.",
      },
      {
        kind: "paragraph",
        html: "Walking out of the Faculty of Engineering after four intense, demanding, and unforgettable years is a profound feeling. Peradeniya is a unique place: nestled beside the Mahaweli River under the Hantana mountain range, it combines classical academic rigor with an uncompromising work ethic.",
      },
      {
        kind: "heading",
        id: "the-foundations-of-the-degree",
        text: "The Foundations of the Degree",
      },
      {
        kind: "paragraph",
        html: "The Computer Engineering program at Peradeniya is renowned for its depth. We did not simply write web applications. We tore computers apart to understand how they work at every layer of abstraction:",
      },
      {
        kind: "list",
        items: [
          "**Digital Logic & Embedded Systems**: Designing circuits with logic gates, wiring microcontrollers on breadboards, and writing assembly code for hardware peripherals.",
          "**Computer Systems Architecture**: Pipelining, branch prediction, cache hierarchies, memory management units, and instruction-level parallelism.",
          "**Operating Systems Internals**: Writing device drivers, handling POSIX threads, synchronization primitives, virtual memory paging, and file system design.",
          "**Algorithms & Systems Software**: Data structures, compiler design, computer networking protocols (TCP/IP stack), and distributed algorithms.",
        ],
      },
      {
        kind: "heading",
        id: "the-human-journey",
        text: "The Late Nights and Lifelong Camaraderie",
      },
      {
        kind: "paragraph",
        html: "Beyond the textbooks, engineering school is forged in the labs. It was countless late nights tracking down memory leaks in C++, debugging FPGA syntheses, and tuning bioinformatics pipelines for our final year project. It was the shared panic before project demos that inevitably turned into collective celebration when the LEDs flashed and the tests turned green.",
      },
      {
        kind: "paragraph",
        html: "I am deeply grateful to our esteemed lecturers and professors in the Department of Computer Engineering for their guidance, to the technical and lab staff who supported us, to my parents for their unconditional sacrifices, and to my brilliant batch mates who made this journey unforgettable.",
      },
      {
        kind: "callout",
        title: "Moving Forward",
        body: "Graduation is not the finish line of learning. It is simply the acquisition of the tools required to teach yourself anything. Space is the continuation of that curiosity: an open notebook documenting what I learn as I build systems and explore AI.",
      },
    ],
  },
  {
    slug: "fyp",
    title: "Building an Oxford Nanopore Pipeline for RNA-Seq Data Analysis",
    dek: "Developing an end-to-end long-read transcriptomics pipeline using Oxford Nanopore sequencing: basecalling, splice-aware alignment, isoform discovery, and differential expression.",
    topic: "Engineering",
    publishedAt: "2024-05-20",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#final-year-project", "#bioinformatics", "#rna-seq", "#peradeniya"],
    coverImage: "/articles/fyp.png",
    body: [
      {
        kind: "paragraph",
        html: "Our final year project at the University of Peradeniya was titled **'Developing an Oxford Nanopore Technology Based Pipeline for RNA-Seq Data Analysis'**. When we first took on the topic, bioinformatics was an entirely new domain for our team. We had strong foundations in computer systems, algorithms, and high-performance computing, but biology brought a fascinating new level of complexity.",
      },
      {
        kind: "paragraph",
        html: "Traditional short-read sequencing (such as Illumina) produces fragments of 150–300 base pairs. While highly accurate, assembling these tiny jigsaw pieces to identify complex full-length RNA transcript isoforms is computationally ambiguous. **Oxford Nanopore Technologies (ONT)** revolutionizes transcriptomics by reading entire RNA or cDNA molecules in single continuous passes, from 5' end to poly-A tail.",
      },
      {
        kind: "heading",
        id: "the-pipeline-architecture",
        text: "The Computational Pipeline Architecture",
      },
      {
        kind: "paragraph",
        html: "Because native ONT long-read RNA sequencing has unique error profiles and massive raw data volumes (gigabytes of raw electrical signal data), standard short-read pipelines fail. We researched, engineered, and benchmarked an end-to-end computational pipeline:",
      },
      {
        kind: "list",
        items: [
          "**GPU-Accelerated Basecalling (Dorado)**: Translating raw ionic current fluctuations (POD5/FAST5 files) into raw nucleotide sequence reads using deep neural network basecallers on NVIDIA GPUs.",
          "**Quality Control & Filtering (NanoPlot & Chopper)**: Evaluating per-read Phred quality scores (Q-score distributions) and length metrics, filtering out truncated adapters and chimeric artifacts.",
          "**Splice-Aware Sequence Alignment (Minimap2)**: Aligning long cDNA/direct-RNA reads to the reference genome using `minimap2 -ax splice`, specifically tuned to account for non-canonical splice junctions and variable intron sizes.",
          "**Transcript Quantification & Isoform Discovery (StringTie2)**: Reconstructing complete transcript models, identifying novel alternative splicing events, and calculating gene/transcript abundance metrics (TPM).",
          "**Differential Expression (DESeq2 in R)**: Statistical modeling of negative binomial distributions across biological replicates to detect significantly up- and down-regulated genes.",
        ],
      },
      {
        kind: "heading",
        id: "engineering-challenges-and-optimizations",
        text: "Key Systems Challenges Solved",
      },
      {
        kind: "paragraph",
        html: "From a systems engineering perspective, bioinformatics is a stress test for hardware. We encountered two major bottlenecks:",
      },
      {
        kind: "paragraph",
        html: "1. **I/O Bottlenecks**: Processing hundreds of thousands of individual raw signal files overwhelmed standard hard drives. Migrating raw working scratch disks to NVMe arrays and batching reads drastically reduced pipeline idle time.",
      },
      {
        kind: "paragraph",
        html: "2. **GPU Memory Allocation**: Basecalling with high-accuracy models required careful chunking and memory pin management to avoid CUDA out-of-memory errors during long sequencing runs.",
      },
      {
        kind: "heading",
        id: "acknowledgments",
        text: "Acknowledgments",
      },
      {
        kind: "paragraph",
        html: "I had the privilege of working on this research alongside my project partners **Chiran Govinna** and **Tharindu Dhananjaya**. We embraced every hurdle, solved stubborn bugs together, and successfully defended our final thesis.",
      },
      {
        kind: "paragraph",
        html: "Our deepest gratitude goes to our supervisor **Dr. Asitha Bandaranayake** for believing in our engineering capabilities and providing tireless guidance. Sincere thanks to **Prof. Pradeepa C.G. Bandaranayake** for her invaluable domain expertise in molecular biology and bioinformatics, and to **Dr. Bhagya Chandrasekara** whose day-to-day research assistance was indispensable in navigating biological datasets.",
      },
      {
        kind: "callout",
        title: "Project Milestone",
        body: "Bridging computer engineering with computational biology demonstrated the power of multidisciplinary problem solving, and proved that strong systems engineering fundamentals can conquer any new technical domain.",
      },
    ],
  },
  {
    slug: "my-journey",
    title: "The Pentium III That Taught Me to Fix Things Myself",
    dek: "My uncle gave me a PC when I was eleven. Almost every part of it eventually broke, and repairing it became the way I learned.",
    topic: "Career",
    publishedAt: "2024-03-15",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#journey", "#self-learning", "#origins", "#tech"],
    coverImage: "/articles/my-journey.png",
    body: [
      {
        kind: "paragraph",
        html: "When I was eleven, my uncle gave me my first PC: a Pentium III with 20GB of hard drive space, 32MB VGA, 192MB of RAM, and a CD ROM. To a kid it felt like a portal to the future. It was also, almost immediately, a machine full of problems.",
      },
      {
        kind: "paragraph",
        html: "I was not the kind to shy away from that. I dove in headfirst and tried to fix whatever went wrong, and plenty went wrong. At the beginning I mostly failed. I kept going anyway, because I had one goal, which was to get my little PC working no matter what. Over time I started learning from the mistakes instead of just repeating them.",
      },
      {
        kind: "paragraph",
        html: "Slowly it became stable, at least by my standards. Then something else would break. By then I had enough experience from the earlier attempts to keep moving, and I started tinkering with the hardware itself: hard drive crashes, RAM failures, power supply problems, even trouble with the CPU. I faced all of it.",
      },
      {
        kind: "paragraph",
        html: "We did not have the money for new parts, so I worked with used components. That never mattered to me. I only wanted to keep learning and fixing.",
      },
      {
        kind: "paragraph",
        html: "What I am proud of is that I learned all of it on my own, by experimenting and not giving up. I eventually replaced every part of that old PC, turning it into something almost entirely new. I had so many spare parts left over that I built a second PC out of them.",
      },
      {
        kind: "paragraph",
        html: "Looking back, that taught me something invaluable: **there is no better way to learn than doing it yourself.** The knowledge you gain through trial and error stays with you, and it never gets old. I still work this way, always pushing myself to explore new things, and it is the approach that has had the greatest impact on anything I have achieved.",
      },
      {
        kind: "paragraph",
        html: "So to anyone just starting out, my advice is simple. Learn by yourself. It is tough at the beginning and you will make mistakes, but the rewards at the end are worth it. Don't give up, because the journey is what makes success even more beautiful.",
      },
      {
        kind: "paragraph",
        html: "Wishing all of you the best on your learning journey.",
      },
    ],
  },
  {
    slug: "django-and-python-web-development",
    title: "Getting Started with Django",
    dek: "From an empty Linux machine to a working Django app: environment, project, models, views, templates, and URLs.",
    topic: "Engineering",
    publishedAt: "2023-03-12",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#python", "#django", "#webdev", "#backend"],
    coverImage: "/articles/django-and-python-web-development.png",
    body: [
      {
        kind: "paragraph",
        html: "Before we dive into Django, it is worth starting with the basics of web development and the Python programming language.",
      },
      {
        kind: "paragraph",
        html: "Web development involves building websites and web applications that users interact with through a browser. The front end is typically built with HTML, CSS, and JavaScript, while the back end handles the data and the logic. Python can be used for both, though it is most at home on the back end.",
      },
      {
        kind: "paragraph",
        html: "Django is a high-level Python web framework for building web applications quickly. It provides a lot of built-in functionality for the tasks that come up in almost every project, such as user authentication and database management.",
      },
      {
        kind: "heading",
        id: "setting-up-your-environment",
        text: "Setting up your environment",
      },
      {
        kind: "paragraph",
        html: "Here is how to do it on a Linux machine. First, check that Python 3 is installed:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 --version",
      },
      {
        kind: "paragraph",
        html: "If it is not there, install it with your system's package manager. On Ubuntu, along with pip, the package installer for Python:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt-get update\nsudo apt-get install python3\nsudo apt-get install python3-pip",
      },
      {
        kind: "paragraph",
        html: "It is good practice to use a separate virtual environment for each Django project. A virtual environment is an isolated Python environment, so packages you install for one project do not affect the global environment or any other project.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 -m venv myenv\nsource myenv/bin/activate",
      },
      {
        kind: "paragraph",
        html: "With the environment active, install Django into it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install django",
      },
      {
        kind: "heading",
        id: "creating-your-first-project",
        text: "Creating your first project",
      },
      {
        kind: "paragraph",
        html: "Navigate to the directory where you want the project to live, then create it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "django-admin startproject myproject",
      },
      {
        kind: "paragraph",
        html: "To check that it works, move into the project directory and start the development server:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py runserver",
      },
      {
        kind: "paragraph",
        html: "Open [http://localhost:8000](http://localhost:8000) in your browser and you should see the Welcome to Django page.",
      },
      {
        kind: "heading",
        id: "how-a-django-app-fits-together",
        text: "How a Django app fits together",
      },
      {
        kind: "paragraph",
        html: "A Django application is made up of four kinds of piece, and almost everything you write falls into one of them:",
      },
      {
        kind: "list",
        items: [
          "**Models** define the structure of the data your application stores in a database.",
          "**Views** handle the logic for processing requests and returning responses.",
          "**Templates** define the HTML markup returned to the user.",
          "**URLs** map incoming URLs to specific views.",
        ],
      },
      {
        kind: "heading",
        id: "building-your-first-app",
        text: "Building your first app",
      },
      {
        kind: "paragraph",
        html: "From inside your project directory, create the app:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py startapp myapp",
      },
      {
        kind: "paragraph",
        html: "**Define a model.** In your `myapp` directory, create `models.py`:",
      },
      {
        kind: "code",
        filename: "myapp/models.py",
        code: "from django.db import models\n\n\nclass MyModel(models.Model):\n    name = models.CharField(max_length=50)\n    description = models.TextField()",
      },
      {
        kind: "paragraph",
        html: "That defines a table in your database with two columns, `name` and `description`.",
      },
      {
        kind: "paragraph",
        html: "**Create and apply a migration.** The first command writes a migration file based on the changes you made to your models. The second applies it and creates the table:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py makemigrations\npython manage.py migrate",
      },
      {
        kind: "paragraph",
        html: "**Create a view.** In `myapp`, create `views.py`:",
      },
      {
        kind: "code",
        filename: "myapp/views.py",
        code: "from django.shortcuts import render\n\nfrom .models import MyModel\n\n\ndef index(request):\n    mymodels = MyModel.objects.all()\n    return render(request, 'myapp/index.html', {'mymodels': mymodels})",
      },
      {
        kind: "paragraph",
        html: "This view gets all instances of `MyModel` from the database and hands them to a template.",
      },
      {
        kind: "paragraph",
        html: "**Create a template.** Inside `myapp`, create a `templates` directory, and in it a file called `index.html`:",
      },
      {
        kind: "code",
        filename: "myapp/templates/index.html",
        code: "{% for mymodel in mymodels %}\n<h2>{{ mymodel.name }}</h2>\n<p>{{ mymodel.description }}</p>\n{% endfor %}",
      },
      {
        kind: "paragraph",
        html: "**Define a URL.** In `myapp`, create `urls.py`:",
      },
      {
        kind: "code",
        filename: "myapp/urls.py",
        code: "from django.urls import path\n\nfrom . import views\n\nurlpatterns = [\n    path('', views.index, name='index'),\n]",
      },
      {
        kind: "paragraph",
        html: "That maps the root URL of the app to the `index` view.",
      },
      {
        kind: "paragraph",
        html: "**Wire it into the project.** Finally, include the app's URLs in your project's `urls.py`, which serves the app under `/myapp/`:",
      },
      {
        kind: "code",
        filename: "myproject/urls.py",
        code: "from django.urls import include, path\n\nurlpatterns = [\n    path('myapp/', include('myapp.urls')),\n]",
      },
      {
        kind: "paragraph",
        html: "That is a working Django app. There is a great deal more to learn, including user authentication, forms, and deploying to a production server, but the shape of every Django project is the one you have just built: models, views, templates, and URLs.",
      },
    ],
  },
  {
    slug: "stop-conda-from-automatically-activating-the-base-environment",
    title: "How to Stop Conda Activating the Base Environment Automatically",
    dek: "Conda was slowing my machine down, so I stopped it from activating the base environment in every new shell.",
    topic: "Engineering",
    publishedAt: "2023-03-12",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#conda", "#python", "#shell", "#linux"],
    coverImage: "/articles/stop-conda-from-automatically-activating-the-base-environment.png",
    body: [
      {
        kind: "paragraph",
        html: "I was getting slow performance on my PC when using Conda, so I looked at disabling the automatic activation of the base environment on Kali. It takes one command.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --set auto_activate_base false",
      },
      {
        kind: "paragraph",
        html: "What that does, piece by piece:",
      },
      {
        kind: "list",
        items: [
          "`conda config` modifies Conda configuration settings.",
          "`--set` sets a configuration variable to a specific value.",
          "`auto_activate_base` determines whether Conda automatically activates the base environment when a new shell is opened. It defaults to `true`.",
        ],
      },
      {
        kind: "paragraph",
        html: "Setting it to `false` disables that, which reduces the resources Conda uses on shell startup and helps with the sluggishness. If you need the base environment for a particular task, you can still activate it by hand with `conda activate`.",
      },
      {
        kind: "heading",
        id: "where-the-setting-lives",
        text: "Where the setting lives",
      },
      {
        kind: "paragraph",
        html: "The command writes to `~/.condarc`, which is a plain YAML file. You can edit it directly, and you can read it back to confirm the change took:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --show auto_activate_base\ncat ~/.condarc",
      },
      {
        kind: "paragraph",
        html: "Open a new shell afterwards. The change applies to shells started after it, not the one you are sitting in.",
      },
      {
        kind: "callout",
        title: "The option was renamed",
        body: "Newer conda releases call this setting auto_activate. The old auto_activate_base name still works as an alias, but conda now prints a deprecation warning when you use it, and records the value under the new name. If you see that warning, set auto_activate instead.",
      },
      {
        kind: "paragraph",
        html: "So on a current install the same change is:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --set auto_activate false",
      },
      {
        kind: "paragraph",
        html: "Either way the effect is the same. Your shell opens without conda getting involved, and you opt in when you actually want an environment.",
      },
    ],
  },
  {
    slug: "pip-install-pipenv-issue-solved",
    title: "Fixing pip's externally-managed-environment Error",
    dek: "Python 3.11 refused the install because the environment is externally managed. That is a deliberate protection, and there are three ways past it.",
    topic: "Engineering",
    publishedAt: "2023-03-06",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#python", "#pip", "#venv", "#linux"],
    coverImage: "/articles/pip-install-pipenv-issue-solved.png",
    body: [
      {
        kind: "paragraph",
        html: "When I tried to install Pipenv on Python 3.11.2, the install failed with an `externally-managed-environment` error.",
      },
      {
        kind: "paragraph",
        html: "The message means the Python environment is externally managed, so you cannot install packages system-wide with pip. This is not a bug, and it is not the distro being awkward. It comes from **PEP 668**, and it exists because pip and your system package manager both write to the same directories. When pip overwrote a file that apt or dnf depended on, things broke later, in ways that were nearly impossible to trace back.",
      },
      {
        kind: "paragraph",
        html: "The block is triggered by a real marker file, which is worth knowing about because it tells you exactly which interpreter is protected:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "ls /usr/lib/python3.11/EXTERNALLY-MANAGED\ncat /usr/lib/python3.11/EXTERNALLY-MANAGED",
      },
      {
        kind: "paragraph",
        html: "The contents of that file are what pip prints at you. Distributions use it to point you at their preferred fix.",
      },
      {
        kind: "heading",
        id: "a-virtual-environment",
        text: "For a project: a virtual environment",
      },
      {
        kind: "paragraph",
        html: "A virtual environment is a private copy of Python's package directory that belongs to your project rather than the OS. Nothing the system depends on lives inside it, so pip is free to write there.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 -m venv myenv\nsource myenv/bin/activate",
      },
      {
        kind: "paragraph",
        html: "The environment is now active and pip installs into it rather than system-wide:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install pipenv",
      },
      {
        kind: "paragraph",
        html: "When you are done, deactivate it. And if you want it gone entirely, delete the directory, because that is all a venv is:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "deactivate\nrm -rf myenv",
      },
      {
        kind: "heading",
        id: "pipx-for-tools",
        text: "For a command-line tool: pipx",
      },
      {
        kind: "paragraph",
        html: "Pipenv is a tool you run, not a library you import, so there is a better fit. `pipx` creates a dedicated virtual environment for each application and puts the command on your PATH, so you get the tool without managing an environment for it.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt install pipx\npipx install pipenv\npipx ensurepath",
      },
      {
        kind: "paragraph",
        html: "This is the right default for anything you want available system-wide as a command.",
      },
      {
        kind: "heading",
        id: "the-override",
        text: "The override, and when not to use it",
      },
      {
        kind: "paragraph",
        html: "There is a flag that skips the check entirely:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install --break-system-packages pipenv",
      },
      {
        kind: "paragraph",
        html: "The name is honest about what it does. It is reasonable inside a throwaway container or CI job where the whole filesystem is discarded afterwards. On a machine you actually use, it can break your OS package manager months later, long after you have forgotten you ran it. Reach for the venv or pipx instead.",
      },
    ],
  },
  {
    slug: "install-my-sql-in-kali-linux",
    title: "How to Install MySQL on Kali Linux",
    dek: "Kali ships with MariaDB, and it conflicts with MySQL. Here is the sequence that finally worked for me.",
    topic: "Systems",
    publishedAt: "2023-03-04",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#kalilinux", "#mysql", "#database", "#linux"],
    series: { slug: "linux-switch", title: "Moving to Linux", part: 3 },
    coverImage: "/articles/install-my-sql-in-kali-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "Installing MySQL on Kali Linux can be a challenging task, and I struggled with it multiple times. I kept at it and spent considerable time finding a solution, and eventually got it working. This is the sequence that worked.",
      },
      {
        kind: "heading",
        id: "try-the-normal-way-first",
        text: "Try the normal way first",
      },
      {
        kind: "paragraph",
        html: "Update the system, then attempt the standard install:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt update\nsudo apt install mysql-server",
      },
      {
        kind: "paragraph",
        html: "If that fails, download the MySQL APT configuration package and continue below:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb",
      },
      {
        kind: "heading",
        id: "remove-mariadb-first",
        text: "Remove MariaDB first",
      },
      {
        kind: "paragraph",
        html: "The install often will not succeed on a fresh system, because Kali Linux comes with MariaDB as its default database management system and the two conflict. MariaDB has to go first.",
      },
      {
        kind: "paragraph",
        html: "The conflict is not arbitrary. MariaDB started as a fork of MySQL, so both packages want to own the same binary names, the same default data directory at `/var/lib/mysql`, and the same port 3306. apt will not let two packages claim the same files, which is why the install fails rather than warning you.",
      },
      {
        kind: "callout",
        title: "Back up anything you care about first",
        body: "Purging MariaDB removes its configuration, and depending on your setup it can take the databases in /var/lib/mysql with it. If there is anything in there you want, run mysqldump against it before you start.",
      },
      {
        kind: "paragraph",
        html: "Stop and disable the MariaDB server:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl stop mariadb\nsudo systemctl disable mariadb",
      },
      {
        kind: "paragraph",
        html: "Then remove it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt remove mariadb-server mariadb-client",
      },
      {
        kind: "paragraph",
        html: "Then purge it. On Kali, `purge` removes a package along with its configuration files, which `remove` leaves behind:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt purge mariadb-server mariadb-client",
      },
      {
        kind: "paragraph",
        html: "Then run `autoremove`, which clears out packages that were installed as dependencies for something else and are no longer needed:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt autoremove",
      },
      {
        kind: "heading",
        id: "install-mysql",
        text: "Install MySQL",
      },
      {
        kind: "paragraph",
        html: "With MariaDB gone, the install goes through:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt install mysql-server",
      },
      {
        kind: "heading",
        id: "check-it-worked",
        text: "Check it actually worked",
      },
      {
        kind: "paragraph",
        html: "Installing the package is not the same as having a running server, and it is worth confirming which of the two you have before you go looking for problems elsewhere:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl status mysql\nmysql --version",
      },
      {
        kind: "paragraph",
        html: "If it is not running, start it and have it come up on boot:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl start mysql\nsudo systemctl enable mysql",
      },
      {
        kind: "paragraph",
        html: "A fresh install ships with permissive defaults. The bundled hardening script walks through setting a root password and removing anonymous accounts, the test database, and remote root login:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo mysql_secure_installation",
      },
      {
        kind: "paragraph",
        html: "Then confirm you can actually get in:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo mysql -u root -p",
      },
      {
        kind: "paragraph",
        html: "If something still fails after all this, the log is more useful than guessing. `sudo journalctl -u mysql -n 50` will usually name the problem outright, and leftover MariaDB files in the data directory are the most common cause.",
      },
    ],
  },
  {
    slug: "kali-linux-update-warninig",
    title: "Fixing the Legacy trusted.gpg Keyring Warning on apt update",
    dek: "Copying the keyring into trusted.gpg.d silences the warning. Scoping the key to the one repository that needs it is the fix apt actually wants.",
    topic: "Systems",
    publishedAt: "2023-03-04",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#linux", "#apt", "#kalilinux", "#debian"],
    series: { slug: "linux-switch", title: "Moving to Linux", part: 4 },
    coverImage: "/articles/kali-linux-update-warninig.png",
    body: [
      {
        kind: "paragraph",
        html: "This warning comes from the APT package manager and the MySQL repository. It means the signing key is sitting in the old central keyring, `/etc/apt/trusted.gpg`, which apt still reads but has deprecated.",
      },
      {
        kind: "image",
        src: "/articles/kali-apt-key-warning.png",
        alt: "Terminal output from sudo apt update, ending in a warning that the MySQL repository key is stored in the legacy trusted.gpg keyring.",
        caption:
          "The warning as it appears at the end of an otherwise clean apt update. Everything above it succeeded, which is why it is easy to ignore.",
        width: 672,
        height: 334,
      },
      {
        kind: "heading",
        id: "the-quick-fix",
        text: "The quick fix",
      },
      {
        kind: "paragraph",
        html: "Go to the `/etc/apt` folder and list its contents. You should see a file named `trusted.gpg`:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "cd /etc/apt/\nls",
      },
      {
        kind: "paragraph",
        html: "Copy that file into the `trusted.gpg.d` directory, confirm it landed, and update again:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo cp trusted.gpg trusted.gpg.d\ncd trusted.gpg.d\nls\nsudo apt update",
      },
      {
        kind: "paragraph",
        html: "The warning is gone. Worth knowing what this actually did, though.",
      },
      {
        kind: "heading",
        id: "why-apt-complains",
        text: "Why apt complains in the first place",
      },
      {
        kind: "paragraph",
        html: "Anything in `trusted.gpg` or `trusted.gpg.d` is trusted for **every** repository on the system. That is the problem apt is warning about. A key you added for one vendor's repo can sign packages claiming to come from any other repo you have configured.",
      },
      {
        kind: "paragraph",
        html: "The copy above moves the key out of the deprecated file, which stops the warning, but it keeps that system-wide trust. It is the right move if you want the message gone now. It is not the arrangement apt is steering people towards.",
      },
      {
        kind: "heading",
        id: "scoping-the-key",
        text: "Scoping the key to one repository",
      },
      {
        kind: "paragraph",
        html: "The modern approach is `Signed-By`, which binds a key to the single repository that should be allowed to use it. Since APT 2.4, `/etc/apt/keyrings` is the recommended home for keys that are not managed by a package.",
      },
      {
        kind: "paragraph",
        html: "In a classic one-line source, the key goes in brackets before the URL:",
      },
      {
        kind: "code",
        filename: "/etc/apt/sources.list.d/mysql.list",
        code: "deb [signed-by=/etc/apt/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bookworm mysql-8.0",
      },
      {
        kind: "paragraph",
        html: "In the newer deb822 format it is a field rather than a bracket:",
      },
      {
        kind: "code",
        filename: "/etc/apt/sources.list.d/mysql.sources",
        code: "Types: deb\nURIs: http://repo.mysql.com/apt/debian/\nSuites: bookworm\nComponents: mysql-8.0\nSigned-By: /etc/apt/keyrings/mysql.gpg",
      },
      {
        kind: "paragraph",
        html: "Note that `apt-key` is deprecated for this and should not be used to add keys any more. And if you are wondering why the key is scoped this narrowly: it is the difference between trusting one vendor to sign their own packages and trusting them to sign anything at all.",
      },
    ],
  },
  {
    slug: "programing-environment-os",
    title: "Choosing an Operating System for Programming",
    dek: "There is no single best answer. It depends on your preferences, your languages, and the tools you work with.",
    topic: "Systems",
    publishedAt: "2023-02-17",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#os", "#linux", "#macos", "#windows"],
    series: { slug: "linux-switch", title: "Moving to Linux", part: 2 },
    coverImage: "/articles/programing-environment-os.png",
    body: [
      {
        kind: "paragraph",
        html: "The best programming operating system is subjective. It depends on your preferences, and on the programming languages and tools you are using. Here are the popular options and what each one is good at.",
      },
      {
        kind: "heading",
        id: "macos",
        text: "macOS",
      },
      {
        kind: "paragraph",
        html: "Many programmers favour macOS, particularly those working on iOS or macOS software. It has Unix-based command-line tools, a sleek interface, and compatibility with a wide range of development tools and environments.",
      },
      {
        kind: "paragraph",
        html: "The iOS point is not a preference, it is a hard requirement. Xcode only runs on macOS, and building or submitting an iOS app needs it, so that decision gets made for you regardless of what you would otherwise choose.",
      },
      {
        kind: "heading",
        id: "linux",
        text: "Linux",
      },
      {
        kind: "paragraph",
        html: "Many developers prefer Linux because it is open source, has a robust terminal, and is highly customizable. It also offers a wide range of programming tools and environments, which makes it a popular choice for web development, cloud computing, and data analysis.",
      },
      {
        kind: "paragraph",
        html: "There is a practical argument underneath the philosophical one: servers and containers overwhelmingly run Linux, so developing on it means your machine resembles production. Path handling, file permissions, and case-sensitive filenames all behave the same way in both places, which removes a whole category of bug that only appears after deployment.",
      },
      {
        kind: "heading",
        id: "windows",
        text: "Windows",
      },
      {
        kind: "paragraph",
        html: "Windows is widely used in the enterprise world and offers tools and environments for programming in a range of languages. Visual Studio, a popular development environment, is available on Windows, and many other programming tools are designed to run on the platform.",
      },
      {
        kind: "paragraph",
        html: "It is also the least either-or of the three now, because WSL runs a real Linux kernel alongside Windows. That closes most of the gap for server-side work while keeping the applications that only exist on Windows, which is a reasonable position if you need both.",
      },
      {
        kind: "paragraph",
        html: "Ultimately the best programming OS depends on your personal preferences and the specific tasks you need to accomplish. It is worth trying a few and seeing which one works best for you. The honest summary is that all three are workable for most things, and the decision usually gets made by one hard constraint: what you have to ship, and what will only build on one of them.",
      },
    ],
  },
  {
    slug: "intro-to-linux",
    title: "Why Programmers Keep Choosing Linux",
    dek: "Open source, stable, and built around the command line. What makes Linux a good place to develop.",
    topic: "Systems",
    publishedAt: "2023-02-17",
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#linux", "#opensource", "#operating-systems"],
    series: { slug: "linux-switch", title: "Moving to Linux", part: 1 },
    coverImage: "/articles/intro-to-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "There are several reasons why Linux is a popular choice for programmers.",
      },
      {
        kind: "list",
        items: [
          "**Open source.** Programmers can read the source code and modify it to suit their needs, which gives a great deal of flexibility and control over the development environment.",
          "**Robust and stable.** Linux is known for its stability and reliability. It is less prone to crashes and viruses than other operating systems, which matters if you need a stable environment to work in.",
          "**Command-line interface.** The CLI lets you perform complex tasks quickly, and it gives access to a wide range of tools and utilities that are not available through graphical interfaces.",
          "**Package managers.** Tools like apt and yum make it easy to install and manage software, so setting up a development environment with the libraries you need is straightforward.",
          "**A large community.** Linux has a large and active community of developers who contribute to the operating system and the software that runs on it, and who provide support, documentation, and resources.",
          "**Compatibility.** Linux works with a wide range of hardware and software, which is useful if you need to work across a variety of systems.",
        ],
      },
      {
        kind: "heading",
        id: "what-the-cli-argument-means",
        text: "What the command-line argument actually means",
      },
      {
        kind: "paragraph",
        html: "The CLI point is the one that sounds like preference until you have used it. The real argument is not that typing beats clicking, it is that every tool reads and writes plain text, so any tool can be piped into any other. Nobody had to build an integration for it.",
      },
      {
        kind: "paragraph",
        html: "Finding which process is holding a port, for example, is one line rather than an application:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo lsof -i :3000",
      },
      {
        kind: "paragraph",
        html: "So is answering a question nobody wrote a tool for, such as which file extensions appear most often in a project:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "find . -type f -name '*.*' | sed 's/.*\\.//' | sort | uniq -c | sort -rn | head",
      },
      {
        kind: "paragraph",
        html: "That is five programs, none of which know about the others. The composition is the feature, and it is why a shell one-liner often replaces a script you were about to write.",
      },
      {
        kind: "heading",
        id: "package-managers-in-practice",
        text: "Package managers in practice",
      },
      {
        kind: "paragraph",
        html: "The package manager varies by distribution, and knowing which family you are on saves a lot of confusion. Debian and Ubuntu use apt, Fedora and RHEL use dnf, and Arch uses pacman:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt update && sudo apt install build-essential python3-dev   # Debian, Ubuntu, Kali\nsudo dnf install gcc-c++ python3-devel                            # Fedora, RHEL\nsudo pacman -S base-devel python                                  # Arch",
      },
      {
        kind: "paragraph",
        html: "The part that matters for development is that these install libraries and headers, not just applications. When a Python package needs to compile a C extension, the compiler and the development headers are one command away rather than a separate toolchain download.",
      },
      {
        kind: "paragraph",
        html: "Taken together, that is a powerful and flexible development environment, well supplied with the tools, utilities, and libraries that programming projects of any size tend to need.",
      },
    ],
  },
]);

/**
 * Reading time is computed here rather than stored above, so it always
 * describes the body as it currently reads.
 */
export const posts: Post[] = parsedPosts.map((post) => ({
  ...post,
  readingMinutes: readingMinutes(post.body),
}));
