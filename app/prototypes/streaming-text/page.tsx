import { Metadata } from "next";
import Link from "next/link";
import { PrototypeFrame } from "@/components/PrototypeFrame";
import { Prototype } from "./Prototype";

export const metadata: Metadata = {
  title: "Streaming Text",
};

export default function StreamingTextPage() {
  return (
    <main
      style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "4rem" }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/prototypes" style={{ fontSize: "14px" }}>
          {"<- Back to prototypes"}
        </Link>
      </div>

      <PrototypeFrame title="Streaming Text">
        <article>
          <p>
            This prototype shows the basic feel of LLM streaming: a response is
            revealed one token-sized chunk at a time instead of waiting for the
            full answer to finish first.
          </p>

          <p>
            Use the controls to change how quickly chunks arrive and how strong
            the shimmer is on fresh text. Faster streaming feels more
            responsive, while a stronger shimmer makes the newest tokens easier
            to spot.
          </p>

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <Prototype />
          </div>

          <h3>How It Works</h3>
          <p>
            The demo splits a prepared response into small chunks and appends
            them on a timer. Each new chunk gets a brief highlight treatment so
            you can see the moving frontier of the stream.
          </p>

          <p>
            Real LLM APIs usually deliver these partial updates over a stream
            transport such as Server-Sent Events or a readable stream. The UI
            pattern is the same: append incoming text, keep the latest region
            visually active, and let the user perceive progress before the final
            completion arrives.
          </p>

          <h3>Technical Notes</h3>
          <ul>
            <li>Chunked token simulation driven by a repeating timer</li>
            <li>Speed slider controls the delay between streamed chunks</li>
            <li>Shimmer slider adjusts the intensity of the latest-token glow</li>
            <li>Replay action resets the stream and starts the sequence again</li>
          </ul>
        </article>
      </PrototypeFrame>
    </main>
  );
}
