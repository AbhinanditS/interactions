import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import {
  getPortfolioExplorationBySlug,
  getIterationBySlug,
  portfolioExplorations,
} from "../../data";

export async function generateStaticParams() {
  return portfolioExplorations.flatMap((exploration) =>
    exploration.iterations.map((iteration) => ({
      explorationSlug: exploration.slug,
      iterationSlug: iteration.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ explorationSlug: string; iterationSlug: string }>;
}): Promise<Metadata> {
  const { explorationSlug, iterationSlug } = await params;
  const exploration = getPortfolioExplorationBySlug(explorationSlug);
  const iteration = getIterationBySlug(explorationSlug, iterationSlug);

  if (!exploration || !iteration) {
    return {};
  }

  return {
    title: `${iteration.title} · ${exploration.title}`,
    description: iteration.summary,
  };
}

export default async function IterationPage({
  params,
}: {
  params: Promise<{ explorationSlug: string; iterationSlug: string }>;
}) {
  const { explorationSlug, iterationSlug } = await params;
  const exploration = getPortfolioExplorationBySlug(explorationSlug);
  const iteration = getIterationBySlug(explorationSlug, iterationSlug);

  if (!exploration || !iteration) {
    notFound();
  }

  return (
    <Container as="main" size="md" className="pb-page">
      <BackToHomeLink />

      <PrototypeFrame title={iteration.title}>
        <Text tone="muted" className="mt-0">
          <Link href={`/portfolio/${exploration.slug}`}>{exploration.title}</Link>
          {" · "}
          {iteration.date}
          {" · "}
          {iteration.status}
        </Text>

        <p>{iteration.summary}</p>

        {(iteration.liveUrl || iteration.figmaUrl) && (
          <ul>
            {iteration.liveUrl && (
              <li>
                <a href={iteration.liveUrl} target="_blank" rel="noreferrer">
                  View live experience
                </a>
              </li>
            )}
            {iteration.figmaUrl && (
              <li>
                <a href={iteration.figmaUrl} target="_blank" rel="noreferrer">
                  Open Figma file
                </a>
              </li>
            )}
          </ul>
        )}
      </PrototypeFrame>
    </Container>
  );
}
