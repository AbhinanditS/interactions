import Link from "next/link";
import { formatDisplayDate } from "@/lib/content/formatters";
import { prototypes } from "./prototypes/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const portfolioHighlights = [
  "Narrative-driven interaction studies",
  "Motion and timing explorations",
  "UI system experiments ready for deeper review",
];

export default function PrototypesIndex() {
  return (
    <Container as="main" size="sm">
      <h1>Interactions</h1>
      <p>A collection of interactions and explorations.</p>

      <Section space="lg">
        <h2 className="mb-2">Portfolio Iterations</h2>
        <Text tone="muted" className="mt-0">
          Curated explorations and refinements from prototype work.
        </Text>

        <Link href="/portfolio" className="home-cta-link">
          Open Portfolio Iterations →
        </Link>

        <ul className="mt-3">
          {portfolioHighlights.map((highlight) => (
            <li key={highlight}>
              <Text as="span" tone="muted">
                {highlight}
              </Text>
            </li>
          ))}
        </ul>
      </Section>

      <Section space="none">
        <h2>Prototypes</h2>
        <ul className="list-unstyled-tight list-gap-lg">
          {prototypes.map((proto) => (
            <li key={proto.slug}>
              <Link href={`/prototypes/${proto.slug}`}>
                <strong>{proto.title}</strong>
              </Link>
              <Text as="div" tone="muted" className="mt-1">
                {proto.description}
              </Text>
              <Text as="small" tone="subtle">
                {formatDisplayDate(proto.date)}
              </Text>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
