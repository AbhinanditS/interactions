import { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <div className={["ui-card", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}
