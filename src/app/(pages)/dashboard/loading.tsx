"use client";
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full grid grid-cols-1 flex-wrap gap-6 p-4">
      {/* Top Cards: Net Worth + Debt Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_40%] gap-6">
        <Skeleton className="h-80 w-full rounded-lg" />
        <Skeleton className="h-80 w-full rounded-lg" />
      </div>

      {/* Balance Card */}
      <Skeleton className="h-24 w-full rounded-lg" />

      {/* Transactions List */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3 rounded" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
