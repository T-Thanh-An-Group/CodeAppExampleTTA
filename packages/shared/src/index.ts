export * from "./auth";
export * from "./chat";

export function formatCompactNumber(count: number): string {
  const safeCount = Math.max(0, Math.floor(Number.isFinite(count) ? count : 0));
  if (safeCount < 1_000) return safeCount.toString();
  if (safeCount < 1_000_000) return `${(safeCount / 1_000).toFixed(1)}K`;
  return `${(safeCount / 1_000_000).toFixed(1)}M`;
}

export function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}
