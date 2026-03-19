import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Interaction Lab",
  description: "A thinking and prototyping environment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
