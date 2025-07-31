import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
      <div>
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </div>
  );
}
