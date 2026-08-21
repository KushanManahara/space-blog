const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string, style: "short" | "long" = "short"): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return style === "long" ? longDate.format(date) : shortDate.format(date);
}

/** 18400 → "18.4k". Matches the compact counts used across the design. */
export function formatCount(value: number): string {
  if (value < 1000) return String(value);
  const thousands = value / 1000;
  return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k`;
}
