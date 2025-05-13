"use client";

import { InputComposer } from "@/components/main/transactions-ui/transaction-composers/InputComposer";
import { Card } from "@/components/ui/card";
import { TransactionsContainer } from "@/components/main/transactions-ui/TransactionsContainer";
import { transactionSchema } from "@/schema/transaction.schema";
import { z } from "zod";

export default function TransactionsPage() {
  // Dummy transactions data
  const transactions: z.infer<typeof transactionSchema>[] = [
    {
      id: "1",
      user_id: "user_123",
      wallet_id: "Bank Account",
      amount: 1200,
      type: "income",
      category: "Salary",
      description: "Monthly Salary",
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      user_id: "user_123",
      wallet_id: "Cash",
      amount: 50,
      type: "expense",
      category: "Food",
      description: "Lunch at Cafe",
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      user_id: "user_123",
      wallet_id: "Bank Account",
      amount: 200,
      type: "investment",
      category: "Stocks",
      description: "Tech Stocks Purchase",
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      user_id: "user_123",
      wallet_id: "Credit Card",
      amount: 80,
      type: "expense",
      category: "Transport",
      description: "Fuel for Car",
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-6">
      <TransactionsContainer
        title="All Transactions"
        showFilters={true}
        transactions={transactions}
      />
    </div>
  );
}
