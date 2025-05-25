"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { Filters } from "@/constants/filter.constant";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { SparkLineChart } from "@/components/tremorCharts/SparkChart";

interface DebtCardProps {
  //TODO: Decide do or not.
  setFilters: (filter: string) => void;
  filter: string;
}

const myData = [
  { date: "2024-01-01", value: 10 },
  { date: "2024-01-02", value: 15 },
  { date: "2024-01-03", value: 8 },
  { date: "2024-01-04", value: 12 },
  { date: "2024-01-05", value: 20 },
  // ... more data points
];

export const DebtCard = ({ setFilters, filter }: DebtCardProps) => {
  const currency = null; //TODO: add currecy
  const totalValue: number = 0; //TODO: add total value
  const tatalPrincipal = 0; //TODO: add total value
  const positve = false; //TODO:  add total value is greater than invesment or not.

  return (
    <Card className="w-full h-36 p-4">
      <CardHeader className="w-full flex justify-between items-center">
        <span id="debt" className="text-md font-semibold">
          Debts
        </span>
        <MyFilter
          onFilterChange={filter => setFilters(filter)}
          selectedFilter={filter}
          filterType={Filters.PERIOD_FILTERS}
        />
      </CardHeader>

      <CardContent className="w-full flex justify-between items-center">
        <div id="asset-content">
          <p className="text-lg font-semibold text-foreground flex items-center justify-start gap-1">
            <span className="text-muted-foreground">{currency || "$"}</span>
            {totalValue}
          </p>

          <p className="text-xs text-muted-foreground mt-4 flex flex-col justify-start items-start">
            <span>Pricipal</span>
            <span className="flex items-center justify-start">
              {currency || "$"}
              {tatalPrincipal}
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-between items-end">
          <SparkLineChart
            categories={["value"]}
            data={myData}
            index={"date"}
            colors={["rose"]}
            className="align-start"
          />
          {/* //TODO: add increase or decrease lines... */}
          {/* Demo Showcase  */}
          <span className="flex text-xs gap-1 text-foreground">
            <FinanceArrow positive={positve} bg={false} />
            -$234.09 (4.00%)
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
