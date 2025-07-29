import { TransactionItem } from "./TransactionItem";
import { ArrowRight, ChevronDown, Filter, XCircle } from "lucide-react";
import Link from "next/link";
import {
  AppRoutes,
  CategoryFilter,
  LoadingTypeEnum,
  PeriodFilter,
  TransactionType,
  WALLET_FILTERS,
} from "@/constants";
import { Filters } from "@/constants";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { useAppSelector } from "@/store/hook";
import { Transaction } from "@/types/modelTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { groupTransactionByMonth } from "@/utils/groupTransactionByMonth";
import { useEffect, useState } from "react";
import { filterTransactionByPeriod } from "@/utils/filterTransactionByPeriod";

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
  const { wallets } = useAppSelector(state => state.wallet);

  const { transactions, loading, error } = useAppSelector(
    state => state.transaction
  );
  const wallet_filters = wallets.map(wallet => wallet.name);

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
    const filterTransactions = () => {
      // If all filters are default, show all transactions
      if (
        selectedFilters.category === "Category" &&
        selectedFilters.period === "Period" &&
        selectedFilters.wallet === "Wallet" &&
        selectedFilters.type === "Type"
      ) {
        setDisplayTransactions(transactions);
        return;
      }

      // First filter by period
      let filtered = filterTransactionByPeriod(
        transactions,
        selectedFilters.period as PeriodFilter
      );

      // Then apply other filters using AND logic instead of OR
      filtered = filtered.filter(transaction => {
        const categoryMatch =
          selectedFilters.category === "Category" ||
          transaction.category.toLowerCase() ===
            selectedFilters.category.toLowerCase();

        const typeMatch =
          selectedFilters.type === "Type" ||
          transaction.type.toLowerCase() === selectedFilters.type.toLowerCase();

        const walletMatch =
          selectedFilters.wallet === "Wallet" ||
          transaction.wallet_id ===
            wallets.find(
              wallet =>
                wallet.name.toLowerCase() ===
                selectedFilters.wallet.toLowerCase()
            )?.id;

        return categoryMatch && typeMatch && walletMatch;
      });

      setDisplayTransactions(filtered);
    };

    filterTransactions();
  }, [selectedFilters, transactions, wallets]);
  
  const groupedTransactions = groupTransactionByMonth(displayTransactions);
  const groupedTransactionsArray = Object.entries(groupedTransactions);

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{title}</h2>

          {/* Filters Section */}
          <div className="flex flex-col gap-3">
            {showFilters ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <MyFilter
                  selectedFilter={selectedFilters.category}
                  filterType={Filters.CATEGORY_FILTERS}
                  onFilterChange={value =>
                    handleFilterChange("category", value)
                  }
                  className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                />
                <MyFilter
                  selectedFilter={selectedFilters.period}
                  filterType={Filters.PERIOD_FILTERS}
                  onFilterChange={value => handleFilterChange("period", value)}
                  className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                />
                <MyFilter
                  selectedFilter={selectedFilters.wallet}
                  customFilter={["All", ...wallet_filters]}
                  onFilterChange={value => handleFilterChange("wallet", value)}
                  className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                />
                <MyFilter
                  selectedFilter={selectedFilters.type}
                  filterType={Filters.TRANSACTION_TYPE_FILTERS}
                  onFilterChange={value => handleFilterChange("type", value)}
                  className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {showCategoryFilter && (
                  <MyFilter
                    filterType={Filters.PERIOD_FILTERS}
                    onFilterChange={value =>
                      handleFilterChange("period", value)
                    }
                    className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                  />
                )}
                {showPeriodFilter && (
                  <MyFilter
                    selectedFilter={selectedFilters.period}
                    filterType={Filters.PERIOD_FILTERS}
                    onFilterChange={value =>
                      handleFilterChange("wallet", value)
                    }
                    className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                  />
                )}
                {showWalletFilter && (
                  <MyFilter
                    selectedFilter={selectedFilters.wallet}
                    filterType={Filters.WALLET_FILTERS}
                    onFilterChange={value =>
                      handleFilterChange("wallet", value)
                    }
                    className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                  />
                )}
                {showTypeFilter && (
                  <MyFilter
                    selectedFilter={selectedFilters.type}
                    filterType={Filters.TRANSACTION_TYPE_FILTERS}
                    onFilterChange={value => handleFilterChange("type", value)}
                    className="w-full text-sm p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-muted"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Transactions List */}
        <div className="w-full">
          {loading === LoadingTypeEnum.PENDING ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border-b">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-1/2 rounded" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded" />
                </div>
              ))}
            </div>
          ) : error && loading === LoadingTypeEnum.FAILED ? (
            <div className="p-4 text-center text-red-500 text-sm">
              Error loading transactions: {error}
            </div>
          ) : displayTransactions?.length > 0 ? (
            <div className="space-y-6">
              {groupedTransactionsArray.map(([month, transactions]) => (
                <div key={month} className="space-y-4">
                  <h3 className="text-lg font-semibold sticky top-0 bg-background py-2">
                    {month}
                  </h3>
                  <div className="space-y-3">
                    {transactions.map(transaction => (
                      <TransactionItem
                        key={"list" + transaction.id}
                        transaction={transaction}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {showViewMore && (
                <div className="flex justify-center pt-6">
                  <Link
                    className="text-sm flex items-center gap-2 hover:underline font-medium"
                    href={AppRoutes.TRANSACTIONS}
                  >
                    View More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
