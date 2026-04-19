export type IterationStatus = "figma" | "wired" | "built" | "shipped";

export interface PortfolioIteration {
  slug: string;
  title: string;
  summary: string;
  status: IterationStatus;
  date: string;
  liveUrl?: string;
  figmaUrl?: string;
}

export interface PortfolioExploration {
  slug: string;
  title: string;
  summary: string;
  iterations: PortfolioIteration[];
}

export const portfolioExplorations: PortfolioExploration[] = [
  {
    slug: "reading-flow",
    title: "Reading Flow",
    summary:
      "Exploring long-form reading interactions that balance focus, progress awareness, and smooth navigation.",
    iterations: [
      {
        slug: "concept-wireframes",
        title: "Concept Wireframes",
        summary:
          "Initial interaction ideas captured as linked Figma frames covering chapter progress and scroll-linked highlights.",
        status: "figma",
        date: "2026-02-05",
        figmaUrl: "https://www.figma.com/",
      },
      {
        slug: "sticky-waypoint-build",
        title: "Sticky Waypoint Build",
        summary:
          "Built a responsive waypoint rail that tracks section entry and keeps context during long reading sessions.",
        status: "built",
        date: "2026-02-22",
      },
      {
        slug: "v1-ship",
        title: "Reading Flow v1",
        summary:
          "Shipped production version with viewport-aware section markers and low-motion transitions.",
        status: "shipped",
        date: "2026-03-11",
        liveUrl: "https://example.com/reading-flow",
      },
    ],
  },
  {
    slug: "assistant-sidebar",
    title: "Assistant Sidebar",
    summary:
      "Experimenting with in-context assistant surfaces that can be expanded without taking over the primary workspace.",
    iterations: [
      {
        slug: "interaction-map",
        title: "Interaction Map",
        summary:
          "Mapped sidebar entry points, open states, and dismiss behavior in lightweight storyboards.",
        status: "wired",
        date: "2026-01-14",
      },
      {
        slug: "production-rollout",
        title: "Production Rollout",
        summary:
          "Released docked assistant sidebar with remembered width, keyboard toggle, and safe-area support.",
        status: "shipped",
        date: "2026-03-29",
        liveUrl: "https://example.com/assistant-sidebar",
      },
    ],
  },
];

export function getExplorationBySlug(explorationSlug: string) {
  return portfolioExplorations.find(
    (exploration) => exploration.slug === explorationSlug,
  );
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
