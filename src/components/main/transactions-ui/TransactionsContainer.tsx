import { TransactionsList } from "./TransactionsList";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";
import Link from "next/link";
import { AppRoutes } from "@/constants/constant";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type TransactionsContainerProps = {
  title: string;
  showFilters?: boolean;
  showViewMore?: boolean;
  showCategoryFilter?: boolean;
  showDateFilter?: boolean;
  showWalletFilter?: boolean;
  showTypeFilter?: boolean;
  transactions: z.infer<typeof transactionSchema>[];
};

export const TransactionsContainer = ({
  title,
  showFilters = false,
  showViewMore = false,
  showCategoryFilter = false,
  showDateFilter = false,
  showWalletFilter = false,
  showTypeFilter = false,
  transactions,
}: TransactionsContainerProps) => {
  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg font-semibold whitespace-nowrap">{title}</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {showFilters && (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    Category <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    Date <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    Wallet <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Bank Account</DropdownMenuItem>
                  <DropdownMenuItem>Cash</DropdownMenuItem>
                  <DropdownMenuItem>Credit Card</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                    Type <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Income</DropdownMenuItem>
                  <DropdownMenuItem>Expense</DropdownMenuItem>
                  <DropdownMenuItem>Investment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {showViewMore && (
            <Link
              className="text-sm flex justify-center items-center gap-1 hover:underline"
              href={AppRoutes.TRANSACTIONS}
            >
              View More <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="min-w-[600px] sm:min-w-0">
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
};
