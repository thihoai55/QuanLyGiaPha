import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <div
      data-slot="separator-root"
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };


