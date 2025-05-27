"use client";
import { DebtCharts } from "@/components/main/debts-ui/DebtCharts";
import { DebtCalendar } from "@/components/main/debts-ui/DebtCalendar";
import { useAppSelector } from "@/store/hook";
import { DebtList } from "@/components/main/debts-ui/DebtList";

export default function DebtPage() {
  const { debts, error } = useAppSelector(state => state.debt);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 h-full">
        <div className="h-full flex flex-col gap-4">
          <DebtCharts debts={debts} />
          <DebtList debts={debts} />
        </div>

        <div className="flex flex-col">
          <DebtCalendar debts={debts} />
        </div>
      </div>
    </div>
  );
}
