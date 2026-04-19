import { prototypes } from "./prototypes/data";
import Link from "next/link";

const portfolioHighlights = [
  "Narrative-driven interaction studies",
  "Motion and timing explorations",
  "UI system experiments ready for deeper review",
];

export default function PrototypesIndex() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Interactions</h1>
      <p>A collection of interactions and explorations.</p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Portfolio Iterations</h2>
        <p style={{ color: "#666", marginTop: 0 }}>
          Curated explorations and refinements from prototype work.
        </p>

        <Link
          href="/portfolio"
          style={{
            display: "inline-block",
            fontWeight: 700,
            padding: "0.6rem 0.9rem",
            border: "1px solid #111",
            borderRadius: "8px",
            marginBottom: "0.9rem",
          }}
        >
          Open Portfolio Iterations →
        </Link>

        <ul style={{ marginTop: "0.75rem", color: "#666" }}>
          {portfolioHighlights.map((highlight) => (
            <li key={highlight} style={{ marginBottom: "0.35rem" }}>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Prototypes</h2>
        <ul style={{ listStyle: "none", marginLeft: 0 }}>
          {prototypes.map((proto) => (
            <li key={proto.slug} style={{ marginBottom: "1.5rem" }}>
              <Link href={`/prototypes/${proto.slug}`}>
                <strong>{proto.title}</strong>
              </Link>
              <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
                {proto.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
