"use client";

import { Card } from "@/components/ui/card";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { SparkLineChart } from "@/components/tremorCharts/SparkChart";
import { Filters } from "@/constants";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/currency";
import { CurrencyCode } from "@/constants/currencies.constant";

interface DebtCardProps {
  setFilters: (filter: string) => void;
  filter: string;
}

//TODO: make it responsive

const myData = [
  { date: "2024-01-01", value: 1000 },
  { date: "2024-01-02", value: 1200 },
  { date: "2024-01-03", value: 1100 },
  { date: "2024-01-04", value: 1300 },
  { date: "2024-01-05", value: 1250 },
];

export const DebtCard = ({ setFilters, filter }: DebtCardProps) => {
  const { currencySymbol, profile } = useAppSelector(
    state => state.userProfile
  );
  const currency = profile?.currency as CurrencyCode;

  // Demo data for seamless view
  const totalValue: number = 12500;
  const totalPrincipal = 10000;
  const debtChange = totalValue - totalPrincipal;
  const isDebtIncrease = debtChange > 0; // Increase in debt is shown as positive but with red color
  const percentageChange = ((debtChange / totalPrincipal) * 100).toFixed(2);

  return (
    <Card className="w-full p-4 flex flex-col">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Debts</h3>
        <MyFilter
          onFilterChange={filter => setFilters(filter)}
          selectedFilter={filter}
          filterType={Filters.PERIOD_FILTERS}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        {/* Left Section - Values */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-sm">
              {currencySymbol}
            </span>
            <p className="text-xl font-semibold text-foreground">
              {formatCurrency(totalValue, currency, false)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Principal</span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(totalPrincipal, currency)}
            </span>
          </div>
        </div>

        {/* Right Section - Chart and Change */}
        <div className="flex flex-col items-end gap-2">
          <div className="w-32 h-10">
            <SparkLineChart
              categories={["value"]}
              data={myData}
              index={"date"}
              colors={["rose"]}
            />
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-full ${isDebtIncrease ? "bg-negative-bg" : "bg-positive-bg"}`}
            >
              <FinanceArrow
                positive={isDebtIncrease}
                bg={false}
                opposite={true}
              />
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`text-sm font-medium ${isDebtIncrease ? "text-negative" : "text-positive"}`}
              >
                {isDebtIncrease ? "+" : "-"}
                {formatCurrency(Math.abs(debtChange), currency)}
              </span>
              <span
                className={`text-xs ${isDebtIncrease ? "text-negative" : "text-positive"}`}
              >
                ({isDebtIncrease ? "+" : "-"}
                {percentageChange}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
