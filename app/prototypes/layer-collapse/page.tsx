import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Layer Collapse",
};

export default function LayerCollapsePage() {
  return (
    <Container as="main" size="lg" className="pb-page">
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

          <Section as="div" space="md" className="demo-block">
            <Prototype />
          </Section>
        </article>
      </PrototypeFrame>
    </Container>
  );
}
