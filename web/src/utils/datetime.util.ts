
export function formatTime(date: string | Date | null | undefined): string {
  if (!date) return "";

  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  if (diff < 60_000) return "now";

  if (diff < 3_600_000) {
    return `${Math.floor(diff / 60_000)}m`;
  }

  if (diff < 86_400_000) {
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diff < 604_800_000) {
    return d.toLocaleDateString([], {
      weekday: "short",
    });
  }

  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}