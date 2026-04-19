import { CSSProperties, ElementType, ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  style?: CSSProperties;
}

export function Container({
  as: Component = "div",
  children,
  size = "md",
  className,
  style,
}: ContainerProps) {
  return (
    <Component
      className={["ui-container", className].filter(Boolean).join(" ")}
      data-size={size}
      style={style}
    >
      {children}
    </Component>
  );
}
