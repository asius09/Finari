"use client";

import { BalanceCard } from "@/components/main/wallets-ui/BalanceCard";

export default function WalletsPage() {
  return (
    <div className="w-ful flex flex-col h-full overflow-x-hidden">
      <BalanceCard size="large" />
    </div>
  );
}
