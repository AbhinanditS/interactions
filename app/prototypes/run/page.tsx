import { Metadata } from "next";
import { BackToHomeLink } from "@/components/BackToHomeLink";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Run Tracker",
};

export default function RunPage() {
  return (
    <main
      style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}
    >
      <BackToHomeLink />

      <PrototypeFrame title="Run Tracker">
        <article>
          <p>
            A cursor dot follows your mouse, morphing into a vertical line when
            hovering over the activity visualization. Inspired by{" "}
            <a
              href="https://rauno.me/run"
              target="_blank"
              rel="noopener noreferrer"
            >
              rauno.me/run
            </a>
            .
          </p>

          <p>
            The vertical bars represent running and cycling activities over the
            year. Heights correspond to distance traveled. Move your cursor over
            the bars to see the line snap and reveal activity details.
          </p>

          <p>
            The morphing effect uses Framer Motion for smooth spring-based
            transitions. The dot scales horizontally into a thin line while
            extending vertically to match the bar height, creating a fluid
            connection between cursor and data.
          </p>

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <Prototype />
          </div>

          <h3>Technical Notes</h3>
          <ul>
            <li>
              Cursor tracking via <code>usePointer</code> hook
            </li>
            <li>Framer Motion spring animations for morphing</li>
            <li>Snap-to-bar behavior on hover proximity</li>
            <li>Activity icons differentiate runs vs rides</li>
          </ul>
        </article>
      </PrototypeFrame>
    </main>
  );
}
