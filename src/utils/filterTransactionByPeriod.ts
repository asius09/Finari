import { PeriodFilter } from "@/constants";
import { Transaction } from "@/types/modelTypes";
import { format } from "date-fns";

/**
 * @param transaction {Transaction[]} : Transactions data
 * @param period {PeriodFilter} : Period Filter like "today", "yesterday", etc.
 * @returns filteredTransaction {Transaction[]} : Filter Transaction Based on period
 */
export const filterTransactionByPeriod = (
  transaction: Transaction[],
  period: PeriodFilter
): Transaction[] => {
  if (transaction.length === 0) return [];
  if (period.toLowerCase() === "all") return transaction;

  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const yesterday = format(
    new Date(now.setDate(now.getDate() - 1)),
    "yyyy-MM-dd"
  );
  const startOfWeek = format(
    new Date(now.setDate(now.getDate() - now.getDay())),
    "yyyy-MM-dd"
  );
  const startOfLastWeek = format(
    new Date(now.setDate(now.getDate() - 7)),
    "yyyy-MM-dd"
  );
  const startOfYear = format(new Date(now.getFullYear(), 0, 1), "yyyy-MM-dd");
  const startOfLastYear = format(
    new Date(now.getFullYear() - 1, 0, 1),
    "yyyy-MM-dd"
  );

  switch (period) {
    case "Today":
      return transaction.filter(
        t => format(new Date(t.date), "yyyy-MM-dd") === today
      );
    case "Yesterday":
      return transaction.filter(
        t => format(new Date(t.date), "yyyy-MM-dd") === yesterday
      );
    case "This Week":
      return transaction.filter(
        t =>
          new Date(t.date) >= new Date(startOfWeek) &&
          new Date(t.date) <= new Date()
      );
    case "Last Week":
      return transaction.filter(
        t =>
          new Date(t.date) >= new Date(startOfLastWeek) &&
          new Date(t.date) < new Date(startOfWeek)
      );
    case "This Year":
      return transaction.filter(
        t =>
          new Date(t.date) >= new Date(startOfYear) &&
          new Date(t.date) <= new Date()
      );
    case "Last Year":
      return transaction.filter(
        t =>
          new Date(t.date) >= new Date(startOfLastYear) &&
          new Date(t.date) < new Date(startOfYear)
      );
    default:
      return transaction;
  }
};
