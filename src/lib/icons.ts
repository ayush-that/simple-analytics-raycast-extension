import { Image } from "@raycast/api";

export const Icons = {
  chartBar: { source: "chart-bar.svg" },
  user: { source: "user.svg" },
  eye: { source: "eye.svg" },
  clock: { source: "clock.svg" },
  globe: { source: "globe.svg" },
  calendar: { source: "calendar.svg" },
  arrowRight: { source: "arrow-right.svg" },
  refresh: { source: "refresh.svg" },
  settings: { source: "settings.svg" },
  plus: { source: "plus.svg" },
  check: { source: "check.svg" },
  pencil: { source: "pencil.svg" },
  trash: { source: "trash.svg" },
  wifi: { source: "wifi.svg" },
  download: { source: "download.svg" },
  alertCircle: { source: "alert-circle.svg" },
  lock: { source: "lock.svg" },
  lockOpen: { source: "lock-open.svg" },
} as const;

export type IconName = keyof typeof Icons;

export function getIcon(name: IconName): Image.ImageLike {
  return Icons[name];
}
