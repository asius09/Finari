"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { ExpenseBreakdownChart } from "@/components/main/dashboard-ui/ExpenseBreakdown";
import { DebtBreakdown } from "@/components/main/dashboard-ui/DebtsBreakdown";
import { TransactionsList } from "@/components/main/transactions-ui/TransactionsList";
import { BalanceCard } from "@/components/main/wallets-ui/BalanceCard";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col lg:flex-row flex-wrap gap-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_40%] gap-6">
          <NetworthCard />
          <DebtBreakdown />
        </div>
        <BalanceCard size="small" />

        {/* Recent Transactions */}
        <TransactionsList title="Recent Transactions" showViewMore={true} />
      </div>

      <div className="hidden lg:block lg:w-80">
        <ExpenseBreakdownChart />
      </div>
    </div>
  );
}
