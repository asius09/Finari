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
    <div className="w-full h-full flex flex-col gap-8 p-6">
      {/* Main Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column - Charts and Metrics */}
        <div className="flex flex-col gap-8">
          {/* Net Worth Summary Card */}
          <div className="bg-background rounded-xl shadow-sm">
            <NetworthMainCard
              filter={period}
              setFilters={filter => setPeriod(filter as PeriodFilter)}
            />
          </div>

          {/* Assets & Debts Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl shadow-sm">
              <AssetCard
                filter={period}
                setFilters={filter => setPeriod(filter as PeriodFilter)}
              />
            </div>
            <div className="bg-background rounded-xl shadow-sm">
              <DebtCard
                filter={period}
                setFilters={filter => setPeriod(filter as PeriodFilter)}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Asset/Debt List */}
        <div className="bg-background rounded-xl shadow-sm p-6">
          <AssetDebtList />
        </div>
      </div>
    </div>
  );
}