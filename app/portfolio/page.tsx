import Link from "next/link";
import { BackToHomeLink } from "../../components/BackToHomeLink";

const portfolioHighlights = [
  {
    title: "Narrative-driven interaction studies",
    description:
      "Interaction concepts that were iterated from early prototype ideas into presentable case-study snapshots.",
    href: "/prototypes/streaming-text",
  },
  {
    title: "Motion and timing explorations",
    description:
      "Prototype work focused on pacing, transitions, and responsive movement behaviors.",
    href: "/prototypes/horizontal-slide-scroll",
  },
  {
    title: "UI system experiments",
    description:
      "Reusable interaction patterns and component ideas prepared for deeper product review.",
    href: "/prototypes/layer-collapse",
  },
];

export default function PortfolioPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <BackToHomeLink />
      <h1>Portfolio Iterations</h1>
      <p style={{ color: "#666" }}>
        Curated explorations and refinements from prototype work.
      </p>

      <ul style={{ listStyle: "none", marginLeft: 0, paddingLeft: 0 }}>
        {portfolioHighlights.map((item) => (
          <li key={item.title} style={{ marginBottom: "1.25rem" }}>
            <Link href={item.href}>
              <strong>{item.title}</strong>
            </Link>
            <p style={{ marginTop: "0.25rem", color: "#666", marginBottom: 0 }}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
