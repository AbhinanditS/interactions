"use client";

import { ReactNode } from "react";

interface PrototypeFrameProps {
  children: ReactNode;
  title?: string;
}

export function PrototypeFrame({ children, title }: PrototypeFrameProps) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 0",
      }}
    >
      {title && <h1 style={{ marginBottom: "1rem" }}>{title}</h1>}
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: "8px",
          padding: "2rem",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}
