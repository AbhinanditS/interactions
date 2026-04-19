import Link from "next/link";
import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import { portfolioExplorations } from "./data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explorations and shipped iteration history, kept separate from prototypes.",
};

export default function PortfolioIndexPage() {
  return (
    <Container as="main" size="md" className="pb-page">
      <BackToHomeLink />

      <PrototypeFrame title="Portfolio">
        <p className="mt-0">
          A catalog of product explorations and shipped iterations. Prototypes
          stay in <code>/prototypes</code> and this section tracks portfolio
          history.
        </p>

        <ul className="list-unstyled list-gap-lg mt-5">
          {portfolioExplorations.map((exploration) => (
            <li key={exploration.slug}>
              <Link href={`/portfolio/${exploration.slug}`}>
                <strong>{exploration.title}</strong>
              </Link>
              <Text tone="muted" className="meta-copy">
                {exploration.summary}
              </Text>
              <Text as="small" tone="subtle">
                {exploration.iterations.length} iteration
                {exploration.iterations.length === 1 ? "" : "s"}
              </Text>
            </li>
          ))}
        </ul>
      </PrototypeFrame>
    </Container>
  );
}
