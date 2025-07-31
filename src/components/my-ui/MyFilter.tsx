// Import necessary components and utilities
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  PERIOD_FILTERS,
  TRANSACTION_TYPE_FILTERS,
  DEBT_FILTERS,
  ASSET_FILTERS,
  WALLET_FILTERS,
  Filters,
  CATEGORY_FILTERS,
} from "@/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Define the interface for the filter component props
interface FilterProps {
  selectedFilter?: string; // Currently selected filter value
  onFilterChange: (filter: string) => void; // Callback when filter changes
  className?: string; // Additional className for styling
  filterType?: Filters; // Type of filter to use (period, transaction type, etc.)
  customFilter?: string[]; // Custom filter options if provided
}

// The main filter component that renders a dropdown menu with filter options
export function MyFilter({
  selectedFilter = PERIOD_FILTERS[0], // Default to first period filter
  onFilterChange,
  className = "",
  filterType = Filters.PERIOD_FILTERS, // Default to period filter type
  customFilter,
}: FilterProps) {
  // State to track if dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Determine which filter options to use based on filterType or customFilter
  const filterOptions =
    customFilter ||
    {
      [Filters.PERIOD_FILTERS]: PERIOD_FILTERS,
      [Filters.TRANSACTION_TYPE_FILTERS]: TRANSACTION_TYPE_FILTERS,
      [Filters.DEBT_FILTERS]: DEBT_FILTERS,
      [Filters.ASSET_FILTERS]: ASSET_FILTERS,
      [Filters.WALLET_FILTERS]: WALLET_FILTERS,
      [Filters.CATEGORY_FILTERS]: CATEGORY_FILTERS,
    }[filterType];

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      {/* Dropdown trigger button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-1 outline-none p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer",
            className
          )}
        >
          {/* Display selected filter value */}
          <span>{selectedFilter}</span>
          {/* Show up/down chevron based on dropdown state */}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      {/* Dropdown menu content */}
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[unset]"
        sideOffset={4}
      >
        {/* Map through filter options to create menu items */}
        {filterOptions.map(filter => (
          <DropdownMenuItem key={filter} onClick={() => onFilterChange(filter)}>
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
