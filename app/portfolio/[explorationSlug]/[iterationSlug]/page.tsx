import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
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
    <main style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}>
      <BackToHomeLink />

      <PrototypeFrame title={iteration.title}>
        <p style={{ marginTop: 0, color: "#666" }}>
          <Link href={`/portfolio/${exploration.slug}`}>{exploration.title}</Link>
          {" · "}
          {formatDisplayDate(iteration.date)}
          {" · "}
          {formatStatusLabel(iteration.status)}
        </p>

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
    </main>
  );
}
