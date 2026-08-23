import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded border border-line bg-paper px-3 text-[13px] text-ink placeholder:text-ink-faint focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
