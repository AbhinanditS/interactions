import Link from "next/link";

export function BackToHomeLink() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Link href="/" style={{ fontSize: "14px" }}>
        {"← Back home"}
      </Link>
    </div>
  );
}
