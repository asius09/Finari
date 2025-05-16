"use client";

import { InputComposer } from "@/components/main/transactions-ui/transaction-composers/InputComposer";
import { Card } from "@/components/ui/card";
import { TransactionsList } from "@/components/main/transactions-ui/TransactionsList";
import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <TransactionsList title="All Transactions" showFilters={true} />
    </div>
  );
}
