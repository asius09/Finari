"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { DebtBreakdown } from "@/components/main/dashboard-ui/DebtsBreakdown";
import { TransactionsList } from "@/components/main/transactions-ui/TransactionsList";
import { BalanceCard } from "@/components/main/wallets-ui/BalanceCard";

export default function DashboardPage() {
  return (
    <div className="w-full grid grid-cols-1 flex-wrap gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_40%] gap-6">
        <NetworthCard />
        <DebtBreakdown />
      </div>
      <BalanceCard size="small" />
      {/* Recent Transactions */}
      {/* TODO: ADD LIMIT  */}
      <TransactionsList
        title="Recent Transactions"
        showViewMore={true}
        limit={5}
      />
    </div>
  );
}
