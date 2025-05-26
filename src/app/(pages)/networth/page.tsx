"use client";
import { AssetCard } from "@/components/main/networth-ui/AssetCard";
import { DebtCard } from "@/components/main/networth-ui/DebtCard";
import { NetworthMainCard } from "@/components/main/networth-ui/NetworthMainCard";
import { PERIOD_FILTERS, PeriodFilter } from "@/constants";
import { AssetDebtList } from "@/components/main/networth-ui/AssetDebtList";
import { useState } from "react";

export default function NetWorthPage() {
  const [period, setPeriod] = useState<PeriodFilter>(PERIOD_FILTERS[0]);
  return (
    <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <NetworthMainCard
          filter={period}
          setFilters={filter => setPeriod(filter as PeriodFilter)}
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <AssetCard
            filter={period}
            setFilters={filter => setPeriod(filter as PeriodFilter)}
          />
          <DebtCard
            filter={period}
            setFilters={filter => setPeriod(filter as PeriodFilter)}
          />
        </div>
      </div>

      <div>
        <AssetDebtList />
      </div>
    </div>
  );
}
