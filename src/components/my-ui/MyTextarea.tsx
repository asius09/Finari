import * as React from "react";
import { cn } from "@/lib/utils";

export const MyTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input-border bg-input px-3 py-2 text-sm text-foreground shadow-sm transition-colors",
        "placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

MyTextarea.displayName = "MyTextarea";
