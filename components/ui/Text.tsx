import { CSSProperties, ElementType, ReactNode } from "react";

type TextTone = "default" | "muted" | "subtle";
type TextSize = "sm" | "md";

interface TextProps {
  as?: ElementType;
  children: ReactNode;
  tone?: TextTone;
  size?: TextSize;
  className?: string;
  style?: CSSProperties;
}

export function Text({
  as: Component = "p",
  children,
  tone = "default",
  size = "md",
  className,
  style,
}: TextProps) {
  return (
    <Component
      className={["ui-text", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={size}
      style={style}
    >
      {children}
    </Component>
  );
}
