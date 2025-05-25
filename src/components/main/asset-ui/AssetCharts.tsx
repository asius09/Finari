"use client";

import { MyFilter } from "@/components/my-ui/MyFilter";
import { LineChart } from "@/components/tremorCharts/LineChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Filters, PeriodFilter } from "@/constants/filter.constant";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { assetSchema } from "@/schema/asset.schema";
import { z } from "zod";
import { chartColors } from "@/lib/charUtils";
import { assetTypes } from "@/constants/constant";
import { assetTypeColorMap } from "@/constants/colors";
import { DonutChart } from "@/components/tremorCharts/DonutChart";

type AssetType = z.infer<typeof assetSchema>;

type RiskAssestmentType = "low" | "high" | "moderate";
enum RiskAssestmentEnum {
  LOW = "low",
  HIGH = "high",
  MODERATE = "moderate",
}

interface AssetData {
  date: string;
  asset: number;
  currency: string;
}

interface AssetChartsProps {
  data?: AssetData[];
  totalAsset?: number;
  currency?: string;
  assets: AssetType[];
}

const demoData: AssetData[] = [
  // Original context (USD, monthly, steady growth)
  {
    date: "2024-01-01",
    asset: 50000,
    currency: "USD",
  },
  {
    date: "2024-02-01",
    asset: 52500,
    currency: "USD",
  },
  {
    date: "2024-03-01",
    asset: 51000,
    currency: "USD",
  },
  {
    date: "2024-04-01",
    asset: 54000,
    currency: "USD",
  },
  {
    date: "2024-05-01",
    asset: 53500,
    currency: "USD",
  },

  // New context 1: USD, representing a long-term investment, with yearly data points
  {
    date: "2022-01-01",
    asset: 120000,
    currency: "USD",
  },
  {
    date: "2023-01-01",
    asset: 135000,
    currency: "USD",
  },
  {
    date: "2024-01-01",
    asset: 155000,
    currency: "USD",
  },
  {
    date: "2025-01-01", // Assuming current year is 2025 based on your previous contexts
    asset: 162000,
    currency: "USD",
  },

  // New context 2: USD, showing a short-term, recent asset fluctuation (e.g., volatile stock)
  {
    date: "2025-04-10",
    asset: 7500,
    currency: "USD",
  },
  {
    date: "2025-04-25", // Bi-weekly or mid-month
    asset: 7200, // A dip
    currency: "USD",
  },
  {
    date: "2025-05-05",
    asset: 7800, // Quick recovery
    currency: "USD",
  },
  {
    date: "2025-05-20",
    asset: 7950,
    currency: "USD",
  },
];

//TODO: Change to real data for charts
export const AssetCharts = ({
  data = demoData,
  totalAsset = 2340000,
  currency = "USD",
  assets,
}: AssetChartsProps) => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodFilter>("This Year");
  const [filterData, setFilterData] = useState<AssetData[]>(data);
  const [assetTypesValue, setAssetTypesValue] = useState<
    { type: string; value: number; chartColor: string; color: string }[]
  >([]);
  const riskAssestment: RiskAssestmentType = "low";

  /**
   * Dynamically formats a date string based on a selected period filter.
   * This function is primarily used for formatting X-axis labels in charts
   * or for displaying dates in a context-aware manner.
   *
   * - **"Today" / "Yesterday" / "Custom"**: Default to full date (e.g., "23 May 2024").
   * - **"This Week"**: Shows only the day of the month (e.g., "23").
   * - **"Last Week"**: Shows abbreviated day of week and day of month (e.g., "Thu 23").
   * - **"This Month"**: Shows day and numeric month (e.g., "23 05").
   * - **"Last Month"**: Shows day, numeric month, and full year (e.g., "23 05 2024").
   * - **"This Year"**: Shows abbreviated month name (e.g., "May").
   * - **"Last Year"**: Shows abbreviated month name and full year (e.g., "May 2024").
   *
   * @param {string} dateString - The raw date string (e.g., 'YYYY-MM-DD').
   * @param {PeriodFilter} filter - The selected period filter determining the format.
   * @returns {string} The formatted date string.
   */
  const formateDynamicDate = (
    dateString: string,
    filter: PeriodFilter
  ): string => {
    const date = parseISO(dateString);
    let formattedDate: string;

    switch (filter) {
      case "This Year":
        formattedDate = format(date, "MMM");
        break;
      case "Last Month":
        formattedDate = format(date, "dd MM "); // Corrected 'yyy' to 'yyyy'
        break;
      case "This Month":
        formattedDate = format(date, "dd MMM");
        break;
      case "Last Year":
        formattedDate = format(date, "MMM yyyy"); // Corrected 'yyy' to 'yyyy'
        break;
      case "This Week":
        // Changed to 'dd' for brevity and consistency with 'This Week' context on a chart
        formattedDate = format(date, "EEE"); // For example, "23"
        break;
      case "Last Week":
        formattedDate = format(date, "EEE dd"); // For example, "Thu 23"
        break;
      // Default handles "Today", "Yesterday", "Custom", or any unhandled filter
      default:
        formattedDate = format(date, "dd MMM yyyy"); // Default to a full, clear date
        break;
    }
    return formattedDate;
  };

  /**
   * Dynamically prcossed the data based on the selected filter.
   * This is filter is primary use for filtering data.
   * or for displaying data in a context-aware manner.
   *
   * - **"Today" / "Yesterday" / "Custom"**: Default to full date (e.g., "23 May 2024").
   * - **"This Week"**: Shows only the day of the month (e.g., "23").
   * - **"Last Week"**: Shows abbreviated day of week and day of month (e.g., "Thu 23").
   * - **"This Month"**: Shows day and numeric month (e.g., "23 05").
   * - **"Last Month"**: Shows day, numeric month, and full year (e.g., "23 05 2024").
   * - **"This Year"**: Shows abbreviated month name (e.g., "May").
   * - **"Last Year"**: Shows abbreviated month name and full year (e.g., "May 2024").
   *
   *
   * HOW IT'S WORK?
   * Check the filter based on that it shows data
   * This Weak then it limits the data to this week itself.
   * Last Week then limits to last week 7 days data only.
   */

  const processAssetData = (
    originalData: AssetData[],
    filter: PeriodFilter
  ): void => {
    const today = new Date();
    let startPeriod: Date, endPeriod: Date;
    switch (filter) {
      case "This Year":
        const startOfThisYear = startOfYear(today);
        const endOfThisYear = endOfYear(today);
        startPeriod = startOfThisYear;
        endPeriod = endOfThisYear;
        break;
      case "This Month":
        const startOfThisMonth = startOfMonth(today);
        const endOfThisMonth = endOfMonth(today);
        startPeriod = startOfThisMonth;
        endPeriod = endOfThisMonth;
        break;
      case "Last Month":
        const lastMonthDate = subMonths(today, 1);
        startPeriod = startOfMonth(lastMonthDate);
        endPeriod = endOfMonth(lastMonthDate);
        break;
      case "Last Year":
        const lastYearDate = subYears(today, 1);
        const startOfLastYear = startOfYear(lastYearDate); // Jan 1, last year
        const endOfLastYear = endOfYear(lastYearDate); // Dec 31, last year
        startPeriod = startOfLastYear;
        endPeriod = endOfLastYear;
        break;
      case "This Week":
        const startDateThisWeek = startOfWeek(today, { weekStartsOn: 1 });
        startPeriod = startDateThisWeek;
        endPeriod = parseISO(today.toString());
        break;
      case "Last Week":
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday as startPeriod=of week
        const lastWeekDate = subDays(startOfThisWeek, 1); // Go back to last week
        const startDateLastWeek = startOfWeek(lastWeekDate, {
          weekStartsOn: 1,
        });
        const endDateLastWeek = endOfWeek(lastWeekDate, { weekStartsOn: 1 });
        startPeriod = startDateLastWeek;
        endPeriod = endDateLastWeek;
        break;
      default:
        break;
    }
    const filtered: AssetData[] = originalData.filter(d =>
      isWithinInterval(parseISO(d.date), { start: startPeriod, end: endPeriod })
    );
    const filterData = filtered.map(d => ({
      ...d,
      date: formateDynamicDate(d.date, selectedPeriod),
    }));
    setFilterData(filterData);
  };

  useEffect(() => {
    processAssetData(data, selectedPeriod);
  }, [selectedPeriod, data]);

  useEffect(() => {
    const assetTypesValue = assetTypes.map(type => {
      const value = assets
        .filter(asset => asset.asset_type === type)
        .reduce((sum, asset) => sum + asset.current_value, 0);

      const color: string =
        chartColors[assetTypeColorMap[type as keyof typeof assetTypeColorMap]]
          .text +
        " " +
        chartColors[assetTypeColorMap[type as keyof typeof assetTypeColorMap]]
          .bg;

      const colorKey =
        assetTypeColorMap[type as keyof typeof assetTypeColorMap] || "gray";

      return {
        type: type.charAt(0).toUpperCase() + type.slice(1).replace("_", " "),
        value,
        chartColor: colorKey,
        color,
      };
    });

    setAssetTypesValue(assetTypesValue);
  }, [assets]);

  const chartCategoryColors: (keyof typeof chartColors)[] = assetTypesValue.map(
    type => type.chartColor as keyof typeof chartColors
  );

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Line Chart  */}
      <Card className="p-4">
        <CardHeader className="flex justify-between items-center w-full">
          <div>
            <p className="text-muted-foreground text-md lg:text-lg">Asset</p>
            <p className="text-lg lg:text-xl font-bold">
              {/* TODO: work on currency  */}
              <span className="text-sm lg:text-base text-muted-foreground font-semibold">
                {currency && "$"}
              </span>{" "}
              {totalAsset}
            </p>
          </div>

          <MyFilter
            onFilterChange={filter => setSelectedPeriod(filter as PeriodFilter)}
            selectedFilter={selectedPeriod}
            filterType={Filters.PERIOD_FILTERS}
          />
        </CardHeader>
        <CardContent>
          <LineChart
            className="h-40"
            data={filterData}
            index="date"
            categories={["asset"]}
            colors={["emerald"]}
            showGridLines={true}
            yAxisWidth={60}
            showYAxis={true}
            autoMinValue={true}
          />
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card className="p-4">
        <CardHeader className="w-full flex justify-between items-center">
          <p className="text-lg font-medium text-foreground">
            Asset Allocation
          </p>
          <p className="flex gap-2">
            Portfolio :
            <Badge
              variant={"secondary"}
              className={cn(
                riskAssestment === RiskAssestmentEnum.LOW
                  ? "text-yellow-400 bg-yellow-800"
                  : riskAssestment === RiskAssestmentEnum.MODERATE
                    ? "text-emerald-400"
                    : "text-red-400"
              )}
            >
              {riskAssestment}
            </Badge>
          </p>
        </CardHeader>
        <CardContent className="w-full flex justify-between items-start">
          <ul className="w-40">
            {assetTypesValue.map(type =>
              type.value ? (
                <li
                  className="flex items-center justify-start gap-2"
                  key={type.type}
                >
                  <div className={cn("h-2 w-2 rounded-full", type.color)}></div>
                  <p className="text-sm font-light">{type.type}</p>
                </li>
              ) : null
            )}
          </ul>
          <div className="w-full h-full flex items-center justify-cente">
            <DonutChart
              className="h-40 cursor-pointer mx-auto"
              data={assetTypesValue}
              variant="pie"
              category="type"
              value="value"
              colors={chartCategoryColors}
              showLabel={true}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
