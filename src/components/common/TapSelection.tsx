"use client";
import { Button } from "@/components/ui/button";
interface TapSelectionProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TapSelection = ({
  options,
  value,
  onChange,
  className,
}: TapSelectionProps) => {
  return (
    <div
      className={`flex gap-1 p-1 rounded-lg bg-input border border-input-border h-10 w-full ${className}`}
    >
      {options.map(option => (
        <Button
          key={option}
          variant="ghost"
          onClick={() => onChange(option)}
          className={`flex-1 capitalize gap-2 text-sm ${
            value === option ? "bg-card" : "bg-transparent"
          }`}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export { TapSelection };
