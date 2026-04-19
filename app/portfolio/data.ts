export type PortfolioStatus = 'planned' | 'in-progress' | 'shipped'

export interface PortfolioLink {
  label: string
  href: string
}

export interface PortfolioIteration {
  slug: string
  title: string
  date: string
  status: PortfolioStatus
  links: PortfolioLink[]
}

export interface PortfolioExploration {
  slug: string
  title: string
  date: string
  status: PortfolioStatus
  summary: string
  links: PortfolioLink[]
  iterations: PortfolioIteration[]
}

export const portfolioExplorations: PortfolioExploration[] = [
  {
    slug: 'layer-collapse',
    title: 'Layer Collapse Interaction',
    date: '2026-03-24',
    status: 'shipped',
    summary:
      'Exploring stacked-card compression and expansion transitions for dense navigation surfaces.',
    links: [
      { label: 'Prototype', href: '/prototypes/layer-collapse' },
      { label: 'Notes', href: '/prototypes/layer-collapse#technical-notes' },
    ],
    iterations: [
      {
        slug: 'wireframe-motion-pass',
        title: 'Wireframe Motion Pass',
        date: '2026-03-12',
        status: 'shipped',
        links: [{ label: 'Preview', href: '/prototypes/layer-collapse' }],
      },
      {
        slug: 'easing-and-depth-tuning',
        title: 'Easing + Depth Tuning',
        date: '2026-03-18',
        status: 'shipped',
        links: [{ label: 'Prototype', href: '/prototypes/layer-collapse' }],
      },
    ],
  },
  {
    slug: 'horizontal-slide-scroll',
    title: 'Horizontal Slide Scroll',
    date: '2025-01-04',
    status: 'in-progress',
    summary:
      'Testing editorial storytelling patterns that translate vertical input into horizontal narrative motion.',
    links: [
      { label: 'Prototype', href: '/prototypes/horizontal-slide-scroll' },
      {
        label: 'Full Page',
        href: '/prototypes/horizontal-slide-scroll/full-page',
      },
    ],
    iterations: [
      {
        slug: 'sticky-canvas-baseline',
        title: 'Sticky Canvas Baseline',
        date: '2025-01-01',
        status: 'shipped',
        links: [{ label: 'Prototype', href: '/prototypes/horizontal-slide-scroll' }],
      },
      {
        slug: 'chapter-progress-indicators',
        title: 'Chapter Progress Indicators',
        date: '2025-01-03',
        status: 'in-progress',
        links: [{ label: 'Prototype', href: '/prototypes/horizontal-slide-scroll' }],
      },
    ],
  },
]

export function getPortfolioExplorationBySlug(slug: string) {
  return portfolioExplorations.find((exploration) => exploration.slug === slug)
}
