
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  withGlass?: boolean;
  withPadding?: boolean;
}

const Container = ({
  as: Component = "div",
  size = "lg",
  className,
  withGlass = false,
  withPadding = true,
  children,
  ...props
}: ContainerProps) => {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "mx-auto",
        sizes[size],
        withPadding && "px-4 sm:px-6 lg:px-8",
        withGlass && "glass rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
