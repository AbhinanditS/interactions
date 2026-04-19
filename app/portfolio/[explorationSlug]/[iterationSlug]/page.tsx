import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import {
  getExplorationBySlug,
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
  const exploration = getExplorationBySlug(explorationSlug);
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
  const exploration = getExplorationBySlug(explorationSlug);
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
          {iteration.date}
          {" · "}
          {iteration.status}
        </p>

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
    </main>
  );
}
