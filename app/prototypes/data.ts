export interface PrototypeMetadata {
  slug: string
  title: string
  description: string
  date: string
}

export const prototypes: PrototypeMetadata[] = [
  {
    slug: 'layer-collapse',
    title: 'Layer Collapse',
    description: 'Skewed stacked cards that compress into the base layer on click',
    date: '2026-03-24',
  },
  {
    slug: 'radial-timeline',
    title: 'Radial Timeline',
    description: 'Pointer-controlled rotating hand following mouse angle',
    date: '2025-01-01',
  },
  {
    slug: 'run',
    title: 'Run Tracker',
    description: 'Cursor dot morphing into vertical line on activity bar hover',
    date: '2025-01-02',
  },
  {
    slug: 'streaming-text',
    title: 'Streaming Text',
    description: 'Token-by-token LLM response demo with speed and shimmer controls',
    date: '2025-01-03',
  },
]
