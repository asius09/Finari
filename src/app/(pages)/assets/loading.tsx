"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section id="asset-page" className="flex flex-col gap-4 lg:gap-6 p-4">
      {/* Asset Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>

      {/* Asset Table Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/3 rounded" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-12 rounded-md" />
            <Skeleton className="h-12 rounded-md" />
            <Skeleton className="h-12 rounded-md" />
            <Skeleton className="h-12 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}
