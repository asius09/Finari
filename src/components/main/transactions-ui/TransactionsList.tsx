import { TransactionItem } from "./TransactionItem";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppRoutes, LoadingTypeEnum } from "@/constants/constant";
import { Filters } from "@/constants/filter-constant";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { useAppSelector } from "@/store/hook";
import { Transaction } from "@/types/modelTypes";

type TransactionsListProps = {
  title: string;
  showViewMore?: boolean;
  showFilters?: boolean; //if its true then all the filter will show
  showCategoryFilter?: boolean;
  showTypeFilter?: boolean;
  showPeriodFilter?: boolean;
  showWalletFilter?: boolean;
};

export const TransactionsList = ({
  title,
  showFilters = false,
  showViewMore = false,
  showCategoryFilter = false,
  showPeriodFilter = false,
  showWalletFilter = false,
  showTypeFilter = false,
}: TransactionsListProps) => {
  const { transactions, loading, error } = useAppSelector(
    state => state.transaction
  );
  const displayTransactions: Transaction[] = transactions;

  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg font-semibold whitespace-nowrap">{title}</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {showFilters ? (
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <MyFilter
                selectedFilter="Category"
                filterType={Filters.CATEGORY_FILTERS}
                onFilterChange={value => console.log(value)}
              />

              {/* Period Filter  */}
              <MyFilter
                selectedFilter="Period"
                filterType={Filters.PERIOD_FILTERS}
                onFilterChange={value => console.log(value)}
              />

              {/* Wallet Filter */}
              <MyFilter
                selectedFilter="Wallet"
                filterType={Filters.WALLET_FILTERS}
                onFilterChange={value => console.log(value)}
              />

              {/* Type Filter */}
              <MyFilter
                selectedFilter="Type"
                filterType={Filters.TRANSACTION_TYPE_FILTERS}
                onFilterChange={value => console.log(value)}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {showCategoryFilter && (
                <MyFilter
                  filterType={Filters.PERIOD_FILTERS}
                  onFilterChange={value => console.log(value)}
                />
              )}

              {showPeriodFilter && (
                <MyFilter
                  selectedFilter="Period"
                  filterType={Filters.PERIOD_FILTERS}
                  onFilterChange={value => console.log(value)}
                />
              )}
              {showWalletFilter && (
                <MyFilter
                  selectedFilter="Wallet"
                  filterType={Filters.WALLET_FILTERS}
                  onFilterChange={value => console.log(value)}
                />
              )}

              {showTypeFilter && (
                <MyFilter
                  selectedFilter="Type"
                  filterType={Filters.TRANSACTION_TYPE_FILTERS}
                  onFilterChange={value => console.log(value)}
                />
              )}
            </div>
          )}

          {showViewMore && (
            <Link
              className="text-sm flex justify-center items-center gap-1 hover:underline whitespace-nowrap"
              href={AppRoutes.TRANSACTIONS}
            >
              View More <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="min-w-[600px] sm:min-w-0">
        {loading === LoadingTypeEnum.PENDING ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : error && loading === LoadingTypeEnum.FAILED ? (
          <div className="p-4 text-center text-red-500">
            Error loading transactions: {error}
          </div>
        ) : displayTransactions?.length > 0 ? (
          displayTransactions.map(transaction => (
            <TransactionItem
              key={"list" + transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};
