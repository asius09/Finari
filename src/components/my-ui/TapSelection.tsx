import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface TapSelectionOption {
  title: string;
  value: string;
  icon?: LucideIcon;
  iconClass?: string;
}

interface TapSelectionProps {
  options: TapSelectionOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const TapSelection = ({
  options,
  value,
  onChange,
  className,
  disabled = false,
}: TapSelectionProps) => {
  // Set default value to first option if no value is provided
  useEffect(() => {
    if (!value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [value, options, onChange]);

  return (
    <div
      role="radiogroup"
      aria-labelledby="tap-selection-label"
      className={cn(
        "flex items-center justify-center px-0.75 rounded-lg bg-input border border-input-border h-10 w-full min-w-xs",
        disabled ? "opacity-50 pointer-events-none" : "",
        className
      )}
    >
      {options.map((option, index) => (
        <Button
          type="button"
          key={option.value}
          variant="ghost"
          role="radio"
          aria-checked={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          onKeyDown={e => {
            if (e.key === "ArrowRight") {
              const nextIndex = (index + 1) % options.length;
              onChange(options[nextIndex].value);
            } else if (e.key === "ArrowLeft") {
              const prevIndex = (index - 1 + options.length) % options.length;
              onChange(options[prevIndex].value);
            }
          }}
          className={cn(
            "capitalize gap-2 text-sm h-8 transition-all duration-200 rounded-md cursor-pointer flex items-center justify-center flex-1",
            "hover:bg-card/70 focus-visible:ring-2 focus-visible:ring-ring",
            value === option.value
              ? "bg-card border-0.5 border-border font-medium ring-1 ring-ring/20"
              : "bg-transparent text-muted-foreground hover:text-foreground",
            "max-w-full overflow-hidden"
          )}
          disabled={disabled}
        >
          {option.icon && (
            <div
              aria-hidden="true"
              className="transition-transform duration-200 hover:scale-110 shrink-0"
            >
              <option.icon
                className={cn(
                  "size-4",
                  option.iconClass,
                  value === option.value
                    ? option.iconClass
                    : "text-muted-foreground/70"
                )}
              />
            </div>
          )}
          <span className="truncate">{option.title}</span>
        </Button>
      ))}
    </div>
  );
};

export { TapSelection };
