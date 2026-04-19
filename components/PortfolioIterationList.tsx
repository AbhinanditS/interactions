import Link from 'next/link'
import type { PortfolioIteration } from '@/app/portfolio/data'

interface PortfolioIterationListProps {
  iterations: PortfolioIteration[]
}

export function PortfolioIterationList({ iterations }: PortfolioIterationListProps) {
  return (
    <ol style={{ paddingLeft: '1.25rem' }}>
      {iterations.map((iteration) => (
        <li key={iteration.slug} style={{ marginBottom: '1rem' }}>
          <article
            style={{
              borderLeft: '3px solid #ddd',
              paddingLeft: '0.75rem',
            }}
          >
            <p style={{ marginTop: 0, marginBottom: '0.25rem', color: '#666' }}>
              {iteration.date} · {iteration.status}
            </p>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{iteration.title}</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {iteration.links.map((link) => (
                <Link key={`${iteration.slug}-${link.href}`} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
