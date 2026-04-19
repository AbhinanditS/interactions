import type { ContentLink, PortfolioStatus } from "./types";

const portfolioStatusLabels: Record<PortfolioStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  figma: "Figma",
  wired: "Wired",
  built: "Built",
  shipped: "Shipped",
};

export function parseIsoDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

export function formatDisplayDate(date: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIsoDate(date));
}

export function formatStatusLabel(status: PortfolioStatus) {
  return portfolioStatusLabels[status];
}

export function formatStatusWithDate(status: PortfolioStatus, date: string) {
  return `${formatStatusLabel(status)} · ${formatDisplayDate(date)}`;
}

export function formatIterationCount(count: number) {
  return `${count} iteration${count === 1 ? "" : "s"}`;
}

export function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

export function getExternalAnchorProps(href: ContentLink["href"]) {
  if (!isExternalLink(href)) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  } as const;
}
