"use client";

import { DonutChart } from "@/components/tremorCharts/DonutChart";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { chartColors } from "@/lib/charUtils";
import { Debt } from "@/types/modelTypes";
import { useAppSelector } from "@/store/hook";
import { DebtType, LoadingTypeEnum } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { debtTypeColorMap } from "@/constants";
import { formatStringType } from "@/utils/formatStringType";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DebtChartProps {
  debts: Debt[];
}

/**
 * Transforms raw debt data into chart-friendly format
 * @param {Debt[]} debts - Array of debt objects
 * @param {number} totalDebt - Total outstanding debt amount
 * @returns {DebtData[]} - Array of chart-ready debt data objects
 */

interface DebtData {
  outstanding: number;
  type: DebtType;
  percentage: number;
  color: keyof typeof chartColors;
}

enum DebtToIncomeRatio {
  HEALTHY = 0.15, // 15% or less of income towards debt is considered healthy
  MODERATE = 0.2, // 20% of income towards debt is moderate
  HIGH = 0.35, // 35% of income towards debt is high
  CRITICAL = 0.5, // 50% or more of income towards debt is critical
}

/**
 * Transforms raw debt data into chart-friendly format with color mapping
 * @param {Debt[]} debts - Array of debt objects
 * @param {number} totalDebt - Total outstanding debt amount
 * @returns {DebtData[]} - Array of chart-ready debt data objects with colors
 */
const getDebtData = ({
  debts,
  totalDebt,
}: {
  debts: Debt[];
  totalDebt: number;
}): DebtData[] => {
  if (!debts || !totalDebt || totalDebt <= 0) {
    return [];
  }

  return debts.map(debt => ({
    outstanding: debt.outstanding_balance || 0,
    type: formatStringType(debt.debt_type) as DebtType,
    percentage: Number(
      ((debt.outstanding_balance / totalDebt) * 100).toFixed(2)
    ),
    color: debtTypeColorMap[debt.debt_type as keyof typeof debtTypeColorMap],
  }));
};

export const DebtCharts = ({ debts }: DebtChartProps) => {
  const {
    totalOutstanding: totalDebt,
    totalMonltyPayment,
    loading,
  } = useAppSelector(state => state.debt);

  const monthlyIncome: number = 450000; //TODO: Add this into the user profile
  const currency = "$"; //TODO: ADD CURRENCY EXHANGE
  const debtPercentageOfSalary: number =
    (totalMonltyPayment / monthlyIncome) * 100;

  const debtData = getDebtData({ debts, totalDebt });

  if (loading === LoadingTypeEnum.PENDING) {
    return (
      <Card className="p-6">
        <CardHeader className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-lg" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-36 rounded-lg" />
            <Skeleton className="h-8 w-48 rounded-lg" />
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col lg:flex-row gap-8 items-center">
          {/* Debt Composition Chart Skeleton */}
          <div className="w-40 h-40 flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-full aspect-square" />
          </div>

          {/* Debt Breakdown Details Skeleton */}
          <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-lg" />
                </div>
                <div className="pl-6 space-y-1.5">
                  <Skeleton className="h-3.5 w-36 rounded-lg" />
                  <Skeleton className="h-3.5 w-28 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardHeader className="w-full flex flex-col sm:flex-row justify-between items-start">
        <div>
          <p className="text-xl font-bold text-foreground">Debt Breakdown</p>
          <p className="text-sm text-muted-foreground">
            Visual representation of your debt composition
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold tracking-tight text-foreground">
            ${totalDebt.toLocaleString()}
          </p>
          <Badge
            className={cn(
              "px-2.5 py-0.5 rounded-full backdrop-blur-sm transition-colors text-xs",
              {
                "bg-positive-bg text-positive":
                  debtPercentageOfSalary <= DebtToIncomeRatio.HEALTHY,
                "bg-amber-100 text-amber-800":
                  debtPercentageOfSalary > DebtToIncomeRatio.HEALTHY &&
                  debtPercentageOfSalary <= DebtToIncomeRatio.MODERATE,
                "bg-orange-100 text-orange-800":
                  debtPercentageOfSalary > DebtToIncomeRatio.MODERATE &&
                  debtPercentageOfSalary <= DebtToIncomeRatio.HIGH,
                "bg-negative-bg text-negative":
                  debtPercentageOfSalary > DebtToIncomeRatio.HIGH,
              }
            )}
          >
            <span className="font-medium">
              {currency || "$"}
              {totalMonltyPayment.toLocaleString()}
              <span className="text-[10px] ml-0.5">/mo</span>
            </span>
            {/* <span className="text-[10px] text-muted-foreground/80 ml-1">
              {debtPercentageOfSalary.toFixed(2)}%
            </span> */}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="w-full flex flex-col lg:flex-row gap-8 items-center">
        {/* Debt Composition Chart */}
        <div className="w-56 h-48 flex items-center justify-center">
          <DonutChart
            className="w-full h-full cursor-pointer"
            data={debtData}
            variant="pie"
            category="type"
            value="outstanding"
            colors={debtData.map(d => d.color)}
            showLabel={true}
          />
        </div>

        {/* Debt Breakdown Details */}
        <div className="w-full h-full p-4 flex flex-wrap justify-start space-2 items-start">
          {debts.map(debt => {
            const percentage = (
              (debt.outstanding_balance / totalDebt) *
              100
            ).toFixed(2);
            const colorKey =
              debtTypeColorMap[debt.debt_type as keyof typeof debtTypeColorMap];
            const colorStyles = chartColors[colorKey];

            return (
              <div key={debt.id} className="flex flex-col gap-1 w-40">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${colorStyles.bg}`}
                  ></div>
                  <p className={`text-sm font-medium ${colorStyles.text}`}>
                    {formatStringType(debt.debt_type)}
                  </p>
                </div>
                <div className="pl-5 text-xs space-y-0.5">
                  <p className="text-muted-foreground">
                    ${debt.outstanding_balance.toLocaleString()}{" "}
                    <span className="font-medium">({percentage}%)</span>
                  </p>
                  {debt.payment_amount && (
                    <p className="text-muted-foreground">
                      <span className="font-medium">
                        ${debt.payment_amount.toLocaleString()}
                      </span>
                      /month
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
