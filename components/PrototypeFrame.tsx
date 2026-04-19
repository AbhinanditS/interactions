"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

interface PrototypeFrameProps {
  children: ReactNode;
  title?: string;
}

export function PrototypeFrame({ children, title }: PrototypeFrameProps) {
  return (
    <Container size="xl" className="py-frame">
      {title && <h1 className="mb-4">{title}</h1>}
      <Card>{children}</Card>
    </Container>
  );
}
