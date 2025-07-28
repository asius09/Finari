import { TransactionItem } from "./TransactionItem";
import { ArrowRight, Filter, XCircle } from "lucide-react";
import Link from "next/link";
import { AppRoutes, LoadingTypeEnum } from "@/constants";
import { Filters } from "@/constants";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { useAppSelector } from "@/store/hook";
import { Transaction } from "@/types/modelTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

//TODO: add "wallet" filter with user wallets
//TODO: add "period" filter with transaction types

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

  const [displayTransactions, setDisplayTransactions] =
    useState<Transaction[]>(transactions);

  const [selectedFilters, setSelectedFilters] = useState({
    category: "Category", //category filter
    period: "Period", //period filter
    wallet: "Wallet", //wallet filter
    type: "Type", //type filter
  });
  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]:
        value.toLowerCase() === "all"
          ? filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()
          : value,
    }));
  };

  useEffect(() => {
    //if all the filters are "All" then show all the transactions
    if (
      selectedFilters.category === "Category" &&
      selectedFilters.period === "Period" &&
      selectedFilters.wallet === "Wallet" &&
      selectedFilters.type === "Type"
    ) {
      setDisplayTransactions(transactions);
      return;
    }
    //if any of the filters are not "All" then filter the transactions
    const filteredTransactions = transactions.filter(
      transaction =>
        transaction.category.toLowerCase() ===
          selectedFilters.category.toLowerCase() ||
        transaction.type.toLowerCase() === selectedFilters.type.toLowerCase() ||
        transaction.date.toLowerCase() === selectedFilters.period.toLowerCase() ||
        transaction.wallet_id.toLowerCase() ===
          selectedFilters.wallet.toLowerCase()
    );
    setDisplayTransactions(filteredTransactions);
  }, [selectedFilters, transactions]);

  return (
    <div className="space-y-4 w-full max-w-2xl overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg font-semibold whitespace-nowrap">{title}</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {showFilters ? (
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <MyFilter
                selectedFilter={selectedFilters.category}
                filterType={Filters.CATEGORY_FILTERS}
                onFilterChange={value => handleFilterChange("category", value)}
              />

              {/* Period Filter  */}
              <MyFilter
                selectedFilter={selectedFilters.period}
                filterType={Filters.PERIOD_FILTERS}
                onFilterChange={value => handleFilterChange("period", value)}
              />

              {/* Wallet Filter */}
              <MyFilter
                selectedFilter={selectedFilters.wallet}
                filterType={Filters.WALLET_FILTERS}
                onFilterChange={value => handleFilterChange("wallet", value)}
              />

              {/* Type Filter */}
              <MyFilter
                selectedFilter={selectedFilters.type}
                filterType={Filters.TRANSACTION_TYPE_FILTERS}
                onFilterChange={value => handleFilterChange("type", value)}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {showCategoryFilter && (
                <MyFilter
                  filterType={Filters.PERIOD_FILTERS}
                  onFilterChange={value => handleFilterChange("period", value)}
                />
              )}

              {showPeriodFilter && (
                <MyFilter
                  selectedFilter={selectedFilters.period}
                  filterType={Filters.PERIOD_FILTERS}
                  onFilterChange={value => handleFilterChange("wallet", value)}
                />
              )}
              {showWalletFilter && (
                <MyFilter
                  selectedFilter={selectedFilters.wallet}
                  filterType={Filters.WALLET_FILTERS}
                  onFilterChange={value => handleFilterChange("wallet", value)}
                />
              )}

              {showTypeFilter && (
                <MyFilter
                  selectedFilter={selectedFilters.type}
                  filterType={Filters.TRANSACTION_TYPE_FILTERS}
                  onFilterChange={value => handleFilterChange("type", value)}
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
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-row items-start sm:items-center justify-between p-3 gap-2 sm:gap-4 border-b"
              >
                <div className="flex items-center gap-3 w-full sm:flex-1 sm:min-w-0">
                  <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-24 rounded mt-1" />
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:flex-1 flex justify-start sm:justify-center min-w-0 mt-2 sm:mt-0">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="w-full sm:w-auto sm:flex-1 text-right sm:text-left min-w-0 mt-2 sm:mt-0">
                  <Skeleton className="h-5 w-20 rounded" />
                  <Skeleton className="h-3 w-24 rounded mt-1" />
                </div>
                <div className="flex items-center gap-4 sm:gap-4 mt-2 sm:mt-0">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
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
