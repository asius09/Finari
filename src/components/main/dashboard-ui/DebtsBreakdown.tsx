"use client";

import { DonutChart } from "@/components/tremorCharts/DonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyCode } from "@/constants/currencies.constant";
import { useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/currency";

const debtData = [
  {
    name: "Credit Card",
    amount: 15000,
  },
  {
    name: "Student Loan",
    amount: 20000,
  },
  {
    name: "Mortgage",
    amount: 50000,
  },
];

export const DebtBreakdown = () => {
  const currency = useAppSelector(
    state => state.userProfile.profile?.currency
  ) as CurrencyCode;
  return (
    <Card className="w-full min-w-xs p-4">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Debt Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-4">
          <div className="w-1/3">
            <div className="space-y-2">
              {debtData.map((debt, index) => (
                <div key={debt.name} className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === 0
                        ? "bg-lime-500"
                        : index === 1
                          ? "bg-emerald-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium">{debt.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(debt.amount, currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3">
            <DonutChart
              className="mx-auto"
              data={debtData}
              category="name"
              value="amount"
              showLabel={true}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
              }
              colors={["lime", "emerald", "blue"]}
              showTooltip={true}
              variant="pie"
              label="Total Debt"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
