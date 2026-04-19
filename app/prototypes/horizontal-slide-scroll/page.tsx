import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HorizontalSlideScrollExperience } from "./Prototype";

export const metadata: Metadata = {
  title: "Horizontal Slide Scroll",
  description:
    "A full-viewport editorial prototype with scroll-driven horizontal panels.",
};

export default function HorizontalSlideScrollPage() {
  return (
    <Container as="main" size="xl" className="pb-page">
      <BackToHomeLink />

      <PrototypeFrame title="Horizontal Slide Scroll">
        <article>
          <p>
            This prototype explores a minimal editorial landing page where the
            main gesture is vertical scrolling, but the content travels
            horizontally across the viewport in measured chapters.
          </p>

          <p>
            The framed version follows the same pattern as the other prototypes,
            while adding a dedicated full-page route that opens in a new tab so
            the concept can be experienced at full browser scale.
          </p>

          <p>
            Focus areas include pacing, sticky positioning, clear section
            progress, and a restrained visual system built from soft neutrals,
            oversized typography, and generous spacing.
          </p>

          <Section as="div" space="md" className="demo-block">
            <HorizontalSlideScrollExperience />
          </Section>

          <h3>Technical Notes</h3>
          <ul>
            <li>Viewport-height scroll distance drives horizontal translation</li>
            <li>Sticky scene keeps the canvas locked while panels move</li>
            <li>Active chapter indicators update from normalized scroll progress</li>
            <li>New-tab full-page mode reuses the same prototype component</li>
          </ul>
        </article>
      </PrototypeFrame>
    </Container>
  );
}
