"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { IncomeBreakDownChart } from "@/components/main/dashboard-ui/IncomeBreakDownChart";
import { DebtVsAssets } from "@/components/main/dashboard-ui/DebtVsAssets";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr_1fr] gap-6">
        <NetworthCard />
        <IncomeBreakDownChart />
        <DebtVsAssets />
      </div>
      <div className="flex gap-2">
        <div className="w-24 p-2 rounded-lg bg-popover border shadow-sm flex flex-col items-center">
          <p className="text-[10px] text-muted-foreground">Cash</p>
          <p className="text-sm font-medium">$1,234</p>
        </div>
        <div className="w-24 p-2 rounded-lg bg-popover border shadow-sm flex flex-col items-center">
          <p className="text-[10px] text-muted-foreground">Bank</p>
          <p className="text-sm font-medium">$5,678</p>
        </div>
        <div className="w-24 p-2 rounded-lg bg-popover border shadow-sm flex flex-col items-center">
          <p className="text-[10px] text-muted-foreground">Total</p>
          <p className="text-sm font-medium">$6,912</p>
        </div>
      </div>

      <div className="grid grid-cols-1">
        {/* Recent Transactions */}
        <div className="p-6 rounded-lg bg-popover">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm">Groceries</p>
              <p className="text-sm text-destructive">-$50.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">Salary</p>
              <p className="text-sm text-success">+$2,500.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
