// hooks/useDebtPayments.ts
import { useMemo } from "react";
import { Debt } from "@/types/modelTypes";
import { isBefore } from "date-fns";

export const useDebtPayments = (debts: Debt[]) => {
  return useMemo(() => {
    const upcoming: Date[] = [];
    const pastDue: Date[] = [];
    const paid: Date[] = [];
    const today = new Date();

    debts.forEach(debt => {
      if (debt.next_payment_date) {
        const repaymentDate = new Date(debt.next_payment_date);

        // Handle upcoming payments (only active ones)
        if (
          debt.payment_status === "upcoming" &&
          !isBefore(repaymentDate, today)
        ) {
          upcoming.push(repaymentDate);
        }

        // Handle due payments (only due status)
        if (debt.payment_status === "due" && isBefore(repaymentDate, today)) {
          pastDue.push(repaymentDate);
        }

        // Handle overdue payments
        if (
          debt.payment_status === "overdue" &&
          isBefore(repaymentDate, today)
        ) {
          pastDue.push(repaymentDate);
        }

        // Handle paid payments
        if (debt.payment_status === "paid") {
          paid.push(repaymentDate);
        }
      }
    });

    return {
      upcomingPayments: upcoming,
      pastDuePayments: pastDue,
      paidPayments: paid,
    };
  }, [debts]);
};
