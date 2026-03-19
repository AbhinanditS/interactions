import { prototypes } from "./prototypes/data";
import Link from "next/link";

export default function PrototypesIndex() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Prototypes</h1>
      <p>A collection of interactions and explorations.</p>

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
    </main>
  );
}
