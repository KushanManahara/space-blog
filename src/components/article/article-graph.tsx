"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

type Row = Record<string, string | number>;
type Series = { key: string; label: string };

/**
 * Series colours, drawn from the palette so charts sit with the rest of the
 * article. Read at render time rather than hard-coded so they follow the theme.
 */
const SERIES_TOKENS = [
  "--color-brand",
  "--color-accent-orchid",
  "--color-accent-indigo",
  "--color-fg-3",
] as const;

function useSeriesColors(count: number) {
  const [colors, setColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      setColors(
        Array.from({ length: count }, (_, i) =>
          styles.getPropertyValue(SERIES_TOKENS[i % SERIES_TOKENS.length]).trim(),
        ),
      );
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [count]);

  return colors;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number | string; color?: string }[];
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-line-1 bg-bg-2 px-3 py-2 shadow-lg">
      <p className="text-[12px] font-semibold text-fg-1">{label}</p>
      <div className="mt-1.5 flex flex-col gap-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-[12.5px]">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-fg-2">{entry.name}</span>
            <span className="ml-auto font-semibold text-fg-1 tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleGraph({
  variant,
  title,
  caption,
  note,
  xKey,
  xLabel,
  yLabel,
  series,
  data,
  className,
}: {
  variant: "line" | "area" | "bar";
  title: string;
  caption?: string;
  note?: string;
  xKey: string;
  xLabel?: string;
  yLabel?: string;
  series: Series[];
  data: Row[];
  className?: string;
}) {
  const colors = useSeriesColors(series.length);
  // Clicking a legend entry hides that series.
  const [hidden, setHidden] = React.useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setHidden((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const axisProps = {
    stroke: "var(--color-fg-3)",
    tick: { fill: "var(--color-fg-3)", fontSize: 12 },
    tickLine: false,
  } as const;

  const visible = series.filter((s) => !hidden.has(s.key));

  const renderChart = () => {
    const common = { data, margin: { top: 8, right: 8, bottom: xLabel ? 20 : 4, left: -12 } };
    const grid = (
      <CartesianGrid stroke="var(--color-line-1)" strokeDasharray="3 3" vertical={false} />
    );
    const axes = (
      <>
        <XAxis
          dataKey={xKey}
          {...axisProps}
          label={
            xLabel
              ? {
                  value: xLabel,
                  position: "insideBottom",
                  offset: -12,
                  fill: "var(--color-fg-3)",
                  fontSize: 12,
                }
              : undefined
          }
        />
        <YAxis
          {...axisProps}
          label={
            yLabel
              ? {
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--color-fg-3)",
                  fontSize: 12,
                }
              : undefined
          }
        />
        <Tooltip
          content={<ChartTooltip />}
          // Bar charts draw the cursor as a filled band; the default grey is
          // opaque enough to read as a second series. Line/area use a stroke.
          cursor={
            variant === "bar"
              ? { fill: "var(--color-brand)", fillOpacity: 0.08 }
              : { stroke: "var(--color-line-2)" }
          }
        />
      </>
    );

    if (variant === "bar") {
      return (
        <BarChart {...common}>
          {grid}
          {axes}
          {visible.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={colors[series.findIndex((x) => x.key === s.key)]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      );
    }

    if (variant === "area") {
      return (
        <AreaChart {...common}>
          {grid}
          {axes}
          {visible.map((s) => {
            const color = colors[series.findIndex((x) => x.key === s.key)];
            return (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={color}
                fill={color}
                fillOpacity={0.18}
                strokeWidth={2}
              />
            );
          })}
        </AreaChart>
      );
    }

    return (
      <LineChart {...common}>
        {grid}
        {axes}
        {visible.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={colors[series.findIndex((x) => x.key === s.key)]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <figure
      className={cn(
        "mt-8 w-full max-w-full min-w-0 rounded-lg border border-line-1 bg-bg-2 p-4 sm:px-6.5 sm:pt-6.5 sm:pb-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <figcaption className="text-[14.5px] font-bold text-fg-1">{title}</figcaption>
        {note ? <p className="text-[12.5px] text-fg-3">{note}</p> : null}
      </div>

      {series.length > 1 ? (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {series.map((s, index) => {
            const off = hidden.has(s.key);
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => toggle(s.key)}
                aria-pressed={!off}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-[background-color,border-color,opacity] duration-300 ease-expo",
                  off ? "border-line-1 text-fg-3 opacity-60" : "border-line-2 bg-bg-3 text-fg-1",
                )}
              >
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: colors[index], opacity: off ? 0.4 : 1 }}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Fixed height: ResponsiveContainer needs a sized parent, and it keeps the
          surrounding paragraphs from shifting while the chart mounts. */}
      <div className="mt-5 h-[260px] w-full">
        {colors.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        ) : null}
      </div>

      {caption ? (
        <p className="mt-4 border-t border-line-1 pt-3.5 text-[13.5px] leading-[1.6] text-fg-3">
          {caption}
        </p>
      ) : null}

      {/* The chart is canvas-like to a screen reader; give it the numbers. */}
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">{xLabel ?? xKey}</th>
            {series.map((s) => (
              <th key={s.key} scope="col">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <th scope="row">{String(row[xKey])}</th>
              {series.map((s) => (
                <td key={s.key}>{String(row[s.key] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
