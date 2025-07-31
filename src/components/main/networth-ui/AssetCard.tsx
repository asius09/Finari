"use client";

import { Card } from "@/components/ui/card";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { SparkLineChart } from "@/components/tremorCharts/SparkChart";
import { Filters } from "@/constants";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/currency";
import { CurrencyCode } from "@/constants/currencies.constant";

interface AssetCardProps {
  //TODO: Decide do or not.
  setFilters: (filter: string) => void;
  filter: string;
}

//TODO: make it responsive

const myData = [
  { date: "2024-01-01", value: 10 },
  { date: "2024-01-02", value: 15 },
  { date: "2024-01-03", value: 8 },
  { date: "2024-01-04", value: 12 },
  { date: "2024-01-05", value: 20 },
  // ... more data points
];
export const AssetCard = ({ setFilters, filter }: AssetCardProps) => {
  const { totalAssetsValue, totalInvestment } = useAppSelector(
    state => state.asset
  );
  const { currencySymbol, profile } = useAppSelector(
    state => state.userProfile
  );
  const currency = profile?.currency as CurrencyCode;
  const assetValue = totalAssetsValue - totalInvestment;
  const assetGain = assetValue > 0;
  const percentageChange = ((assetValue / totalInvestment) * 100).toFixed(2);

  return (
    <Card className="w-full p-4 flex flex-col">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Assets</h3>
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
              {formatCurrency(totalAssetsValue, currency, false)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Investment</span>
            <span className="text-sm font-medium text-foreground">
              {formatCurrency(totalInvestment, currency)}
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
              colors={["emerald"]}
            />
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-full ${assetGain ? "bg-positive-bg" : "bg-negative-bg"}`}
            >
              <FinanceArrow positive={assetGain} bg={false} />
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`text-sm font-medium ${assetGain ? "text-positive" : "text-negative"}`}
              >
                {formatCurrency(assetValue, currency)}
              </span>
              <span
                className={`text-xs ${assetGain ? "text-positive" : "text-negative"}`}
              >
                ({percentageChange}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
