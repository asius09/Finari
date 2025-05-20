"use client";

import { TransactionsList } from "@/components/main/transactions-ui/TransactionsList";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <TransactionsList title="All Transactions" showFilters={true} />
    </div>
  );
}
