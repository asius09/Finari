"use client";

import { InputComposer } from "@/components/main/transactions-ui/transaction-composers/InputComposer";
import { Card } from "@/components/ui/card";
import { TransactionsContainer } from "@/components/main/transactions-ui/TransactionsContainer";
import { transactionSchema } from "@/schema/transaction.schema";
import { demoTransactions } from "@/data/transactions";
import { z } from "zod";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <TransactionsContainer
        title="All Transactions"
        showFilters={true}
        transactions={demoTransactions}
      />
    </div>
  );
}
