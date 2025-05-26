import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface MyDropdownProps {
  btnClassName?: string;
  value?: string;
  placeholder?: string;
  dropdownMenu: string[];
  onSelect: (selected: string) => void;
}

interface MyDropdownInputProps {
  className?: string;
  value: string;
  placeholder: string;
  dropdownMenu: string[];
  onSelect: (selected: string) => void;
  onChange: (value: string) => void;
}

export const MyDropdown = ({
  btnClassName,
  value,
  placeholder = "Select Category",
  dropdownMenu,
  onSelect,
}: MyDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-48 md:w-56 lg:w-64 flex items-center justify-between h-10 px-3",
            btnClassName
          )}
          aria-label="Open dropdown menu"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="text-left flex-1 truncate" aria-live="polite">
            {value || placeholder}
          </span>
          <ChevronDown
            className="h-4 w-4 ml-2 transition-transform duration-200 rotate-0 data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-full"
        align="start"
        role="menu"
        aria-label="Dropdown options"
      >
        {dropdownMenu.map(dropdownMenuItem => (
          <DropdownMenuItem
            key={dropdownMenuItem}
            onSelect={() => onSelect(dropdownMenuItem)}
            role="menuitem"
            tabIndex={0}
            aria-label={`Select ${dropdownMenuItem}`}
            className="px-3 py-2 text-sm truncate"
          >
            {dropdownMenuItem}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MyDropdownInput = ({
  className,
  value,
  placeholder,
  dropdownMenu,
  onSelect,
  onChange,
}: MyDropdownInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div
      className="relative w-full"
      role="combobox"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-controls="dropdown-menu-content"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={cn("relative", className)}>
            <Input
              className={cn("w-full h-10 pr-10")}
              value={inputValue.charAt(0).toUpperCase() + inputValue.slice(1)}
              placeholder={placeholder}
              onChange={handleInputChange}
              aria-label="Search and select option"
              aria-autocomplete="list"
              aria-controls="dropdown-menu-content"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              aria-label="Toggle dropdown menu"
              aria-haspopup="true"
            >
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 rotate-0 data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-full"
          align="start"
          role="listbox"
          id="dropdown-menu-content"
          aria-label="Available options"
        >
          {dropdownMenu.map(dropdownMenuItem => (
            <DropdownMenuItem
              key={dropdownMenuItem}
              onSelect={() => handleSelect(dropdownMenuItem)}
              role="option"
              tabIndex={0}
              aria-selected={inputValue === dropdownMenuItem}
              aria-label={`Select ${dropdownMenuItem}`}
              className="px-3 py-2 text-sm truncate"
            >
              {dropdownMenuItem.charAt(0).toUpperCase() +
                dropdownMenuItem.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
