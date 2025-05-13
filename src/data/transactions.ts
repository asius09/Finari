import { transactionSchema } from "@/schema/transaction.schema";

export const demoTransactions = Array.from({ length: 10 }, (_, i) => {
  const isIncome = i % 2 === 0;
  return transactionSchema.parse({
    id: `550e8400-e29b-41d4-a716-44665544000${i}`,
    user_id: "550e8400-e29b-41d4-a716-446655440000",
    wallet_id: "550e8400-e29b-41d4-a716-446655440001",
    amount: isIncome ? 1000 + i * 100 : 500 + i * 50,
    type: isIncome ? "income" : "expense",
    category: isIncome ? "Salary" : ["Food", "Transport", "Bills"][i % 3],
    description: isIncome
      ? "Monthly salary"
      : `Expense for ${["food", "transport", "bills"][i % 3]}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
  });
});
