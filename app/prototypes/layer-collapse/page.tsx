import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Layer Collapse",
};

export default function LayerCollapsePage() {
  return (
    <main
      style={{ maxWidth: "980px", margin: "0 auto", paddingBottom: "4rem" }}
    >
      <BackToHomeLink />

      <PrototypeFrame title="Layer Collapse">
        <article>
          <p>
            A small interaction study based on the Figma visual: a skewed stack
            of layers that compresses into the bottom base card when clicked.
          </p>

          <p>
            The motion keeps the same angled setup in the resting state, then
            straightens and compresses the upper cards so the transition reads
            as a layered fold-down rather than a simple fade.
          </p>

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <Prototype />
          </div>
        </article>
      </PrototypeFrame>
    </main>
  );
}
