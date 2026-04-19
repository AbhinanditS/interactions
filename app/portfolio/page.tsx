import { PortfolioExplorationList } from '@/components/PortfolioExplorationList'
import { portfolioExplorations } from './data'

export default function PortfolioPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1>Portfolio Explorations</h1>
      <p>Data-first explorations and iteration trails.</p>

      <PortfolioExplorationList explorations={portfolioExplorations} />
    </main>
  )
}
