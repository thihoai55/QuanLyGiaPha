import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

function DropdownMenu({ children, ...props }) {
  return (
    <div className="relative inline-block text-left" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuTrigger({ asChild = false, children, ...props }) {
  if (asChild) {
    return React.cloneElement(children, { ...props });
  }
  return (
    <button {...props}>
      {children}
    </button>
  );
}

function DropdownMenuContent({ align = "start", children, ...props }) {
  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
    end: "right-0"
  };
  
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        alignmentClasses[align],
        "top-full mt-1"
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({ children, ...props }) {
  return (
    <div
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuLabel({ children, ...props }) {
  return (
    <div
      className="px-2 py-1.5 text-sm font-semibold"
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ ...props }) {
  return (
    <div
      className="-mx-1 my-1 h-px bg-muted"
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
