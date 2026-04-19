export type PortfolioStatus =
  | "planned"
  | "in-progress"
  | "figma"
  | "wired"
  | "built"
  | "shipped";

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioIteration {
  slug: string;
  title: string;
  summary?: string;
  status: PortfolioStatus;
  date: string;
  links: PortfolioLink[];
  liveUrl?: string;
  figmaUrl?: string;
}

export interface PortfolioExploration {
  slug: string;
  title: string;
  date: string;
  status: PortfolioStatus;
  summary: string;
  links: PortfolioLink[];
  iterations: PortfolioIteration[];
}

export const portfolioExplorations: PortfolioExploration[] = [
  {
    slug: "reading-flow",
    title: "Reading Flow",
    date: "2026-03-11",
    status: "shipped",
    summary:
      "Exploring long-form reading interactions that balance focus, progress awareness, and smooth navigation.",
    links: [
      { label: "Prototype", href: "/prototypes/horizontal-slide-scroll" },
      { label: "Live", href: "https://example.com/reading-flow" },
    ],
    iterations: [
      {
        slug: "concept-wireframes",
        title: "Concept Wireframes",
        summary:
          "Initial interaction ideas captured as linked Figma frames covering chapter progress and scroll-linked highlights.",
        status: "figma",
        date: "2026-02-05",
        figmaUrl: "https://www.figma.com/",
        links: [{ label: "Figma", href: "https://www.figma.com/" }],
      },
      {
        slug: "sticky-waypoint-build",
        title: "Sticky Waypoint Build",
        summary:
          "Built a responsive waypoint rail that tracks section entry and keeps context during long reading sessions.",
        status: "built",
        date: "2026-02-22",
        links: [
          {
            label: "Prototype",
            href: "/prototypes/horizontal-slide-scroll",
          },
        ],
      },
      {
        slug: "v1-ship",
        title: "Reading Flow v1",
        summary:
          "Shipped production version with viewport-aware section markers and low-motion transitions.",
        status: "shipped",
        date: "2026-03-11",
        liveUrl: "https://example.com/reading-flow",
        links: [{ label: "Live", href: "https://example.com/reading-flow" }],
      },
    ],
  },
  {
    slug: "assistant-sidebar",
    title: "Assistant Sidebar",
    date: "2026-03-29",
    status: "shipped",
    summary:
      "Experimenting with in-context assistant surfaces that can be expanded without taking over the primary workspace.",
    links: [
      { label: "Prototype", href: "/prototypes/layer-collapse" },
      { label: "Live", href: "https://example.com/assistant-sidebar" },
    ],
    iterations: [
      {
        slug: "interaction-map",
        title: "Interaction Map",
        summary:
          "Mapped sidebar entry points, open states, and dismiss behavior in lightweight storyboards.",
        status: "wired",
        date: "2026-01-14",
        links: [{ label: "Prototype", href: "/prototypes/layer-collapse" }],
      },
      {
        slug: "production-rollout",
        title: "Production Rollout",
        summary:
          "Released docked assistant sidebar with remembered width, keyboard toggle, and safe-area support.",
        status: "shipped",
        date: "2026-03-29",
        liveUrl: "https://example.com/assistant-sidebar",
        links: [
          { label: "Live", href: "https://example.com/assistant-sidebar" },
        ],
      },
    ],
  },
];

export function getPortfolioExplorationBySlug(slug: string) {
  return portfolioExplorations.find((exploration) => exploration.slug === slug);
}

export function getExplorationBySlug(explorationSlug: string) {
  return getPortfolioExplorationBySlug(explorationSlug);
}

export function getIterationBySlug(
  explorationSlug: string,
  iterationSlug: string,
) {
  const exploration = getExplorationBySlug(explorationSlug);

  if (!exploration) {
    return undefined;
  }

  return exploration.iterations.find((iteration) => iteration.slug === iterationSlug);
}
