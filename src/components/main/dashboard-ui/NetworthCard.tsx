"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hook";
// import { formatCurrency } from "@/utils/formatCurrency";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { LineChart, TooltipProps } from "@/components/tremorCharts/LineChart";
import { MyFilter } from "@/components/my-ui/MyFilter";

const fixedData = {
  "1 Month": [
    { date: "Jan 1", assets: 125000, liabilities: 45000, netWorth: 80000 },
    { date: "Jan 8", assets: 125800, liabilities: 45100, netWorth: 80700 },
    { date: "Jan 15", assets: 126500, liabilities: 45200, netWorth: 81300 },
    { date: "Jan 22", assets: 127200, liabilities: 45300, netWorth: 81900 },
    { date: "Jan 29", assets: 127900, liabilities: 45400, netWorth: 82500 },
  ],
  "3 Months": [
    { date: "Oct", assets: 120000, liabilities: 40000, netWorth: 80000 },
    { date: "Nov", assets: 121500, liabilities: 40500, netWorth: 81000 },
    { date: "Dec", assets: 123000, liabilities: 41000, netWorth: 82000 },
  ],
  "6 Months": [
    { date: "Jul", assets: 100000, liabilities: 35000, netWorth: 65000 },
    { date: "Aug", assets: 102000, liabilities: 35500, netWorth: 66500 },
    { date: "Sep", assets: 104000, liabilities: 36000, netWorth: 68000 },
    { date: "Oct", assets: 106000, liabilities: 36500, netWorth: 69500 },
    { date: "Nov", assets: 108000, liabilities: 37000, netWorth: 71000 },
    { date: "Dec", assets: 110000, liabilities: 37500, netWorth: 72500 },
  ],
  "1 Year": [
    { date: "Jan", assets: 100000, liabilities: 35000, netWorth: 65000 },
    { date: "Feb", assets: 101500, liabilities: 35200, netWorth: 66300 },
    { date: "Mar", assets: 103000, liabilities: 35400, netWorth: 67600 },
    { date: "Apr", assets: 104500, liabilities: 35600, netWorth: 68900 },
    { date: "May", assets: 106000, liabilities: 35800, netWorth: 70200 },
    { date: "Jun", assets: 107500, liabilities: 36000, netWorth: 71500 },
    { date: "Jul", assets: 109000, liabilities: 36200, netWorth: 72800 },
    { date: "Aug", assets: 110500, liabilities: 36400, netWorth: 74100 },
    { date: "Sep", assets: 112000, liabilities: 36600, netWorth: 75400 },
    { date: "Oct", assets: 113500, liabilities: 36800, netWorth: 76700 },
    { date: "Nov", assets: 115000, liabilities: 37000, netWorth: 78000 },
    { date: "Dec", assets: 116500, liabilities: 37200, netWorth: 79300 },
  ],
  "All Time": [
    { date: "2019", assets: 80000, liabilities: 30000, netWorth: 50000 },
    { date: "2020", assets: 90000, liabilities: 32000, netWorth: 58000 },
    { date: "2021", assets: 100000, liabilities: 34000, netWorth: 66000 },
    { date: "2022", assets: 110000, liabilities: 36000, netWorth: 74000 },
    { date: "2023", assets: 120000, liabilities: 38000, netWorth: 82000 },
  ],
};

export const NetworthCard = () => {
  const {
    assets,
    loading: assetLoading,
    error: assetError,
    totalAssetsValue,
  } = useAppSelector(state => state.asset);
  const {
    debts,
    loading: debtLoading,
    error: debtError,
    totalOutstanding,
  } = useAppSelector(state => state.debt);

  const currentNetworth = totalOutstanding - totalAssetsValue;
  const isNetWorthPostive = currentNetworth > 0; //TODO: make it better.
  // TODO: Replace mock data with real data from financialOverview state
  //   const { totalNetworth, networthChangePercentage } = useAppSelector(
  //     state => state.financialOverview
  //   );

  const { profile } = useAppSelector(state => state.userProfile);
  const currency = profile?.currency;
  // TODO: Add support for more currencies beyond USD and INR

  /*
  TODO: Implement proper net worth calculation
  Net-worth data 
  liabilities - assets = networth
  increase or decrease icon + or - {number} (percentage)
  {currency} {number[networth]}
  graph btns 
  graph for all the networth
  */
  const totalNetworth = Math.floor(Math.random() * 1000000) + 10000; // Random net worth between 10,000 and 1,000,000
  const networthChangePercentage = (Math.random() * 20 - 10).toFixed(2); // Random percentage change between -10% and +10%
  const isPositiveChange = Number(networthChangePercentage) >= 0;
  const [period, setPeriod] = useState("1 Year");
  const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
  const currencyFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number)}`;

  const data = fixedData[period as keyof typeof fixedData];
  return (
    <Card className="w-full flex-1 max-w-lg md:max-w-2xl p-4">
      <CardHeader className="flex justify-between items-start gap-0">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Net Worth
          </h3>
          <div
            className="flex items-baseline gap-1"
            aria-labelledby="networth-value"
          >
            <span className="text-lg font-medium text-muted-foreground">
              {currency === "USD" ? "$" : "₹"}
            </span>
            <p className="text-3xl font-bold text-foreground">
              {currencyFormatter(currentNetworth)}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            isPositiveChange ? "bg-positive-bg" : "bg-negative-bg",
            "outline-none rounded-2xl px-1.5 py-0.5 h-8 flex items-center justify-between border-none"
          )}
        >
          <FinanceArrow positive={isPositiveChange} bg={false} />
          <span
            className={cn(
              isPositiveChange ? "text-positive" : "text-negative",
              "text-xs font-medium"
            )}
          >
            ({isPositiveChange ? "+" : "-"}512.20){" "}
            {Math.abs(Number(networthChangePercentage))}%
          </span>
        </Badge>
      </CardHeader>

      {/* TODO: Add loading state for chart */}
      {/* TODO: Add error handling for chart data */}
      <CardContent>
        <div className="flex justify-end items-center mb-1">
          <MyFilter
            onFilterChange={filter => setPeriod(filter)}
            selectedFilter={period}
          />
        </div>
        <LineChart
          className="h-36"
          data={data}
          index="date"
          categories={["netWorth"]}
          showLegend={false}
          showYAxis={true}
          startEndOnly={false}
          yAxisWidth={60}
          intervalType="equidistantPreserveStart"
          autoMinValue={true}
          valueFormatter={currencyFormatter}
          enableLegendSlider={true}
          colors={["primary"]}
          tooltipCallback={props => {
            if (props.active) {
              setTooltipData(props);
            } else {
              setTooltipData(null);
            }
            return null;
          }}
        />
      </CardContent>
    </Card>
  );
};
