"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "@/components/tremorCharts/DonutChart";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const expenseData = [
  { name: "Housing", amount: 1200 },
  { name: "Transportation", amount: 300 },
  { name: "Food", amount: 500 },
  { name: "Utilities", amount: 200 },
  { name: "Entertainment", amount: 150 },
];

export const ExpenseBreakdownChart = () => {
  const totalExpenses = expenseData.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <Card className="w-full min-w-xs p-4">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Expense Breakdown
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                This Month
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {["This Week", "This Month", "This Year"].map(period => (
                <DropdownMenuItem key={period} className="text-xs">
                  {period}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-center">
          <DonutChart
            className="h-64 w-64" // Increased size
            data={expenseData}
            category="name"
            value="amount"
            showLabel={true}
            valueFormatter={(number: number) =>
              `$${Intl.NumberFormat("us").format(number)}`
            }
            colors={["violet", "fuchsia", "pink", "rose"]} // More vibrant colors
            showTooltip={true}
            variant="donut"
            label={`Total: $${Intl.NumberFormat("us").format(totalExpenses)}`}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {expenseData.map((expense, index) => (
            <div
              key={expense.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? "bg-violet-500"
                      : index === 1
                        ? "bg-fuchsia-500"
                        : index === 2
                          ? "bg-pink-500"
                          : index === 3
                            ? "bg-rose-500"
                            : "bg-purple-500"
                  }`}
                />
                <p className="text-sm font-medium">{expense.name}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                ${Intl.NumberFormat("us").format(expense.amount)}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs underline-offset-4 hover:underline"
        >
          View All Expenses
          <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};
