import Link from "next/link";
import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { portfolioExplorations } from "./data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explorations and shipped iteration history, kept separate from prototypes.",
};

export default function PortfolioIndexPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}>
      <BackToHomeLink />

      <PrototypeFrame title="Portfolio">
        <p style={{ marginTop: 0 }}>
          A catalog of product explorations and shipped iterations. Prototypes
          stay in <code>/prototypes</code> and this section tracks portfolio
          history.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "1.5rem 0 0" }}>
          {portfolioExplorations.map((exploration) => (
            <li key={exploration.slug} style={{ marginBottom: "1.5rem" }}>
              <Link href={`/portfolio/${exploration.slug}`}>
                <strong>{exploration.title}</strong>
              </Link>
              <p style={{ margin: "0.35rem 0 0.5rem", color: "#666" }}>
                {exploration.summary}
              </p>
              <small style={{ color: "#777" }}>
                {exploration.iterations.length} iteration
                {exploration.iterations.length === 1 ? "" : "s"}
              </small>
            </li>
          ))}
        </ul>
      </PrototypeFrame>
    </main>
  );
}
