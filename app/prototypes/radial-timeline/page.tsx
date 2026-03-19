import { Metadata } from "next";
import Link from "next/link";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Radial Timeline",
};

export default function RadialTimelinePage() {
  return (
    <main
      style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/prototypes" style={{ fontSize: "14px" }}>
          {"<- Back to prototypes"}
        </Link>
      </div>

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

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <Prototype />
          </div>

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
    </main>
  );
}
