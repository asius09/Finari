"use client";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface FinanceArrowProps {
  positive: boolean;
  bg: boolean;
}

const Arrows = {
  POSITIVE: ArrowUpRight,
  NEGATIVE: ArrowDownLeft,
} as const;

export const FinanceArrow = ({ positive, bg = true }: FinanceArrowProps) => {
  const Icon = positive ? Arrows.POSITIVE : Arrows.NEGATIVE;
  return (
    <span
      className={cn(
        bg
          ? positive
            ? "bg-positive-bg p-1.5 "
            : "bg-negative-bg p-1.5 "
          : "",
        "rounded-full"
      )}
    >
      <Icon
        className={cn("h-4 w-4", positive ? "text-positive" : "text-negative")}
      />
    </span>
  );
};
