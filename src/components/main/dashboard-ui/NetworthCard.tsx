"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { MyFilter } from "@/components/my-ui/MyFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { FinanceArrow } from "@/components/my-ui/FinanceArrow";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { CurrencyCode } from "@/constants/currencies.constant";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/currency";

const fixedData = {
  "1 Month": [
    { date: "Jan 1", netWorth: 80000 },
    { date: "Jan 8", netWorth: 80700 },
    { date: "Jan 15", netWorth: 81300 },
    { date: "Jan 22", netWorth: 81900 },
    { date: "Jan 29", netWorth: 82500 },
  ],
  "3 Months": [
    { date: "Oct", netWorth: 80000 },
    { date: "Nov", netWorth: 81000 },
    { date: "Dec", netWorth: 82000 },
  ],
  "6 Months": [
    { date: "Jul", netWorth: 65000 },
    { date: "Aug", netWorth: 66500 },
    { date: "Sep", netWorth: 68000 },
    { date: "Oct", netWorth: 69500 },
    { date: "Nov", netWorth: 71000 },
    { date: "Dec", netWorth: 72500 },
  ],
  "1 Year": [
    { date: "Jan", netWorth: 65000 },
    { date: "Feb", netWorth: 66300 },
    { date: "Mar", netWorth: 67600 },
    { date: "Apr", netWorth: 68900 },
    { date: "May", netWorth: 70200 },
    { date: "Jun", netWorth: 71500 },
    { date: "Jul", netWorth: 72800 },
    { date: "Aug", netWorth: 74100 },
    { date: "Sep", netWorth: 75400 },
    { date: "Oct", netWorth: 76700 },
    { date: "Nov", netWorth: 78000 },
    { date: "Dec", netWorth: 79300 },
  ],
  "All Time": [
    { date: "2019", netWorth: 50000 },
    { date: "2020", netWorth: 58000 },
    { date: "2021", netWorth: 66000 },
    { date: "2022", netWorth: 74000 },
    { date: "2023", netWorth: 82000 },
  ],
};

export const NetworthCard = () => {
  // Hardcoded values
  const currentNetworth = 82500;
  const isNetWorthPositive = true;
  const networthChangePercentage = 3.1;
  const isPositiveChange = true;
  const [period, setPeriod] = useState("1 Month");
  const isLoading = false;
  const hasError = false;

  const { currencySymbol, profile } = useAppSelector(
    state => state.userProfile
  );
  const currency = profile?.currency as CurrencyCode;
  const data = fixedData[period as keyof typeof fixedData];

  if (hasError) {
    return (
      <Card className="w-full flex-1 md:max-w-2xl p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Net Worth
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div className="text-red-500 text-sm font-medium">
              Error loading net worth data. Please try again later.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full flex-1 md:max-w-2xl p-4">
      <CardHeader className="flex justify-between items-start gap-0">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Net Worth
          </h3>
          <div
            className="flex items-baseline gap-1"
            aria-labelledby="networth-value"
          >
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <span className="text-base md:text-lg font-medium text-muted-foreground">
                  {currencySymbol}
                </span>
                <p
                  className={cn(
                    "text-2xl lg:text-3xl font-bold",
                    isNetWorthPositive ? "text-positive" : "text-negative"
                  )}
                >
                  {formatCurrency(currentNetworth, currency, false)}
                </p>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <Skeleton className="h-8 w-24 rounded-2xl" />
        ) : (
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
                "text-[10px] lg:text-xs font-medium"
              )}
            >
              ({isPositiveChange ? "+" : "-"}
              {networthChangePercentage}%)
            </span>
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex justify-end items-center mb-1">
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <MyFilter
              onFilterChange={filter => setPeriod(filter)}
              selectedFilter={period}
            />
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-36 lg:h-56 w-full" />
        ) : (
          <LineChart
            className="h-36 lg:h-40"
            data={data}
            index="date"
            categories={["netWorth"]}
            showLegend={false}
            showYAxis={true}
            startEndOnly={false}
            yAxisWidth={60}
            intervalType="equidistantPreserveStart"
            autoMinValue={true}
            valueFormatter={value => formatCurrency(value, currency)}
            enableLegendSlider={true}
            colors={["primary"]}
          />
        )}
      </CardContent>
    </Card>
  );
};
