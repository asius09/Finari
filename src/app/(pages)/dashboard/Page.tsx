"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { ExpenseBreakdownChart } from "@/components/main/dashboard-ui/ExpenseBreakdown";
import { DebtBreakdown } from "@/components/main/dashboard-ui/DebtsBreakdown";
import { TransactionsContainer } from "@/components/main/transactions-ui/TransactionsContainer";
import { demoTransactions } from "@/data/demo.transactions-data";
import { BalanceCard } from "@/components/main/wallets-ui/BalanceCard";
import { demoWallets } from "@/data/demo.wallets-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40%] gap-6">
          <NetworthCard />
          <DebtBreakdown />
        </div>
        <BalanceCard size="small" />

        <div className="grid grid-cols-1">
          {/* Recent Transactions */}
          <TransactionsContainer
            title="Recent Transactions"
            showViewMore={true}
            transactions={demoTransactions}
          />
        </div>
      </div>

      <div className="w-full lg:w-80">
        <ExpenseBreakdownChart />
      </div>
    </div>
  );
}
