import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const gradientButtonVariants = cva(buttonVariants(), {
  variants: {
    variant: {
      gradient:
        "rounded-full from-primary-light to-primary-dark bg-linear-to-b text-white hover:scale-101 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "gradient",
    size: "default",
  },
});

export interface MyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  className?: string;
}

const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
MyButton.displayName = "MyButton";

export { MyButton, gradientButtonVariants };
