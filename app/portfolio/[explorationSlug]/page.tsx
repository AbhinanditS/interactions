import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortfolioIterationList } from '@/components/PortfolioIterationList'
import { getPortfolioExplorationBySlug, portfolioExplorations } from '../data'

export async function generateStaticParams() {
  return portfolioExplorations.map((exploration) => ({
    explorationSlug: exploration.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ explorationSlug: string }>
}): Promise<Metadata> {
  const { explorationSlug } = await params
  const exploration = getPortfolioExplorationBySlug(explorationSlug)

  if (!exploration) {
    return {}
  }

  return {
    title: `${exploration.title} · Portfolio`,
  }
}

export default async function PortfolioExplorationPage({
  params,
}: {
  params: Promise<{ explorationSlug: string }>
}) {
  const { explorationSlug } = await params
  const exploration = getPortfolioExplorationBySlug(explorationSlug)

  if (!exploration) {
    notFound()
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/portfolio">← Back to all explorations</Link>
      </p>

      <p style={{ marginBottom: '0.25rem', color: '#666' }}>
        {exploration.date} · {exploration.status}
      </p>
      <h1 style={{ marginTop: 0 }}>{exploration.title}</h1>
      <p>{exploration.summary}</p>

      <h2>Exploration Links</h2>
      <ul>
        {exploration.links.map((link) => (
          <li key={`${exploration.slug}-${link.href}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <h2>Iterations</h2>
      <PortfolioIterationList iterations={exploration.iterations} />
    </main>
  )
}
