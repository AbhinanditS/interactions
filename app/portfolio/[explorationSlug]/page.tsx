import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
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
    <Container as="main" size="md" className="pb-page">
      <BackToHomeLink />

      <PrototypeFrame title={exploration.title}>
        <p className="mt-0">{exploration.summary}</p>

        <h3>Iterations</h3>
        <ul className="list-unstyled list-gap-md">
          {exploration.iterations.map((iteration) => (
            <li key={iteration.slug}>
              <Link href={`/portfolio/${exploration.slug}/${iteration.slug}`}>
                <strong>{iteration.title}</strong>
              </Link>
              <Text as="div" tone="muted" className="meta-row">
                <small>
                  {iteration.status} · {iteration.date}
                </small>
              </Text>
            </li>
          ))}
        </ul>
      </PrototypeFrame>
    </Container>
  );
}
