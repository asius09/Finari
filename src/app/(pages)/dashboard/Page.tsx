"use client";

import { NetworthCard } from "@/components/main/dashboard-ui/NetworthCard";
import { ExpenseBreakdownChart } from "@/components/main/dashboard-ui/ExpenseBreakdown";
import { DebtBreakdown } from "@/components/main/dashboard-ui/DebtsBreakdown";
import { TransactionsContainer } from "@/components/main/transactions-ui/TransactionsContainer";
import { demoTransactions } from "@/data/demo.transactions-data";
import { BalanceCard } from "@/components/main/BalanceCard";
import { Wallet } from "@/types/modelTypes";

const demoWallets: Wallet[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    user_id: "demo-user",
    name: "Cash Wallet",
    type: "cash",
    balance: 1234,
    icon: "wallet",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    user_id: "demo-user",
    name: "Kotak Bank",
    type: "bank",
    balance: 5678,
    icon: "bank",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    user_id: "demo-user",
    name: "HDFC Savings",
    type: "bank",
    balance: 10000,
    icon: "piggy-bank",
    created_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    user_id: "demo-user",
    name: "Stock Portfolio",
    type: "bank",
    balance: 25000,
    icon: "line-chart",
    created_at: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40%] gap-6">
          <NetworthCard />
          <DebtBreakdown />
        </div>
        <BalanceCard wallets={demoWallets} size="small" />

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
