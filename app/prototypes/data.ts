export interface PrototypeMetadata {
  slug: string
  title: string
  description: string
  date: string
}

export const prototypes: PrototypeMetadata[] = [
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
]
