import { CSSProperties, ElementType, ReactNode } from "react";

type SectionSpace = "none" | "sm" | "md" | "lg";

interface SectionProps {
  as?: ElementType;
  children: ReactNode;
  space?: SectionSpace;
  className?: string;
  style?: CSSProperties;
}

export function Section({
  as: Component = "section",
  children,
  space = "md",
  className,
  style,
}: SectionProps) {
  return (
    <Component
      className={["ui-section", className].filter(Boolean).join(" ")}
      data-space={space}
      style={style}
    >
      {children}
    </Component>
  );
}
