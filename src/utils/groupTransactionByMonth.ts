import { Transaction } from "@/types/modelTypes";
import { format } from "date-fns";

/**
 * Group transactions by month
 * @param {Transaction[]} transactions - The transactions to group by month
 * @returns {Record<string, Transaction[]>} The grouped transactions by month
 */
export const groupTransactionByMonth = (transactions: Transaction[]) => {
  const groups: Record<string, Transaction[]> = transactions.reduce(
    (acc, transaction) => {
      const month = format(new Date(transaction.date), "MMMM yyyy");
      acc[month] = acc[month] || [];
      acc[month].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );

  //sort the groups by month and year in descending order
  const sortedGroups = Object.entries(groups).sort((a, b) => {
    const [monthA, yearA] = a[0].split(" ");
    const [monthB, yearB] = b[0].split(" ");
    return (
      new Date(`${yearB} ${monthB}`).getTime() -
      new Date(`${yearA} ${monthA}`).getTime()
    );
  });

  //convert the sorted groups back to an object
  return Object.fromEntries(sortedGroups);
};
