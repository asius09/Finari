"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { IncomeBreakDownChart } from "@/components/main/dashboard-ui/IncomeBreakDownChart";
import { DebtVsAssets } from "@/components/main/dashboard-ui/DebtVsAssets";
import { TransactionsContainer } from "@/components/main/transactions-ui/TransactionsContainer";
import { demoTransactions } from "@/data/transactions";

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
        <TransactionsContainer
          title="Recent Transactions"
          showViewMore={true}
          transactions={demoTransactions}
        />
      </div>
    </div>
  );
}
