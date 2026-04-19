import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import {
  formatDisplayDate,
  formatStatusLabel,
  getExternalAnchorProps,
  isExternalLink,
} from "@/lib/content/formatters";
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
          {formatDisplayDate(iteration.date)}
          {" · "}
          {formatStatusLabel(iteration.status)}
        </Text>

        <p>{iteration.summary}</p>

        {iteration.links.length > 0 && (
          <ul>
            {iteration.links.map((link) => {
              const externalProps = getExternalAnchorProps(link.href);

              return (
                <li key={link.href}>
                  {isExternalLink(link.href) ? (
                    <a href={link.href} {...externalProps}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </PrototypeFrame>
    </Container>
  );
}
