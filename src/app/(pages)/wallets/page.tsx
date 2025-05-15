"use client";

import { BalanceCard } from "@/components/main/wallets-ui/BalanceCard";
import { demoWallets } from "@/data/demo.wallets-data";

export default function WalletsPage() {
  return (
    <div className="w-ful flex flex-col h-full overflow-x-hidden">
      <BalanceCard wallets={demoWallets} size="large" />
    </div>
  );
}
