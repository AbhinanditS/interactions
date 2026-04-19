import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Radial Timeline",
};

export default function RadialTimelinePage() {
  return (
    <Container as="main" size="md" className="pb-page">
      <BackToHomeLink />

      <PrototypeFrame title="Radial Timeline">
        <article>
          <p>
            Move your mouse around the center point. The hand follows the angle
            from the center to your cursor position, creating an interactive
            radial timeline.
          </p>

          <p>
            The interaction uses basic angle geometry with <code>atan2</code> to
            calculate the angle between the center and pointer position in
            real-time, rotating the hand accordingly. No animation libraries
            needed; pure pointer events and SVG attributes handle the
            responsiveness.
          </p>

          <p>
            Events are positioned around a circle at equal angular intervals.
            The hand sweeps across them as you move your pointer, creating a
            natural way to explore temporal information in a compact radial
            format.
          </p>

          <Section as="div" space="md" className="demo-block">
            <Prototype />
          </Section>

          <h3>Technical Notes</h3>
          <ul>
            <li>
              Uses <code>Math.atan2</code> for angle calculation
            </li>
            <li>Pointer position tracked relative to SVG bounds</li>
            <li>No state libraries or animation frameworks</li>
            <li>Responsive positioning via polar coordinates</li>
          </ul>
        </article>
      </PrototypeFrame>
    </Container>
  );
}
