import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { formatStatusWithDate } from "@/lib/content/formatters";
import { getPortfolioExplorationBySlug, portfolioExplorations } from "../data";

export async function generateStaticParams() {
  return portfolioExplorations.map((exploration) => ({
    explorationSlug: exploration.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ explorationSlug: string }>;
}): Promise<Metadata> {
  const { explorationSlug } = await params;
  const exploration = getPortfolioExplorationBySlug(explorationSlug);

  if (!exploration) {
    return {};
  }

  return {
    title: `${exploration.title} · Portfolio`,
    description: exploration.summary,
  };
}

export default async function ExplorationPage({
  params,
}: {
  params: Promise<{ explorationSlug: string }>;
}) {
  const { explorationSlug } = await params;
  const exploration = getPortfolioExplorationBySlug(explorationSlug);

  if (!exploration) {
    notFound();
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}>
      <BackToHomeLink />

      <PrototypeFrame title={exploration.title}>
        <p style={{ marginTop: 0 }}>{exploration.summary}</p>

        <h3>Iterations</h3>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {exploration.iterations.map((iteration) => (
            <li key={iteration.slug} style={{ marginBottom: "1rem" }}>
              <Link href={`/portfolio/${exploration.slug}/${iteration.slug}`}>
                <strong>{iteration.title}</strong>
              </Link>
              <div style={{ marginTop: "0.3rem", color: "#666" }}>
                <small>{formatStatusWithDate(iteration.status, iteration.date)}</small>
              </div>
            </li>
          ))}
        </ul>
      </PrototypeFrame>
    </main>
  );
}
