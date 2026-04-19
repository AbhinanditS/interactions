import Link from 'next/link'
import type { PortfolioExploration } from '@/app/portfolio/data'

interface PortfolioExplorationListProps {
  explorations: PortfolioExploration[]
}

export function PortfolioExplorationList({ explorations }: PortfolioExplorationListProps) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {explorations.map((exploration) => (
        <li
          key={exploration.slug}
          style={{
            border: '1px solid #e7e7e7',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
          }}
        >
          <p style={{ marginTop: 0, marginBottom: '0.25rem', color: '#666' }}>
            {exploration.date} · {exploration.status}
          </p>
          <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
            <Link href={`/portfolio/${exploration.slug}`}>{exploration.title}</Link>
          </h2>
          <p style={{ marginTop: 0 }}>{exploration.summary}</p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {exploration.links.map((link) => (
              <Link key={`${exploration.slug}-${link.href}`} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
