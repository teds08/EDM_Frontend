import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A plain, accessible native <select> styled to match the shadcn look.
 * Swap for @radix-ui/react-select if you need custom option rendering.
 */
const SelectNative = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-10 rounded border border-line bg-paper px-3 text-[13px] text-ink focus-visible:outline-none",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
SelectNative.displayName = "SelectNative";

export { SelectNative };
