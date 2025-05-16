import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  PERIOD_FILTERS,
  TRANSACTION_TYPE_FILTERS,
  DEBT_FILTERS,
  ASSET_FILTERS,
  WALLET_FILTERS,
  Filters,
  CATEGORY_FILTERS,
} from "@/constants/filter-constant";
import { cn } from "@/lib/utils";

interface FilterProps {
  selectedFilter?: string;
  onFilterChange: (filter: string) => void;
  className?: string;
  filterType?: Filters;
  customFilter?: string[];
}

export function MyFilter({
  selectedFilter = PERIOD_FILTERS[0],
  onFilterChange,
  className = "",
  filterType = Filters.PERIOD_FILTERS,
  customFilter,
}: FilterProps) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-1 outline-none p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent cursor-pointer",
            className
          )}
        >
          <span className="text-xs">{selectedFilter}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {filterOptions.map(filter => (
          <DropdownMenuItem
            key={filter}
            onClick={() => onFilterChange(filter)}
            className="text-xs"
          >
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
