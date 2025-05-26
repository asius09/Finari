import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingLoadingPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* User Profile Loading */}
      <Card className="p-4">
        <CardContent className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-start">
          <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex flex-col gap-2 justify-center text-center md:text-left">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-0.5">
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
          <Skeleton className="w-full md:max-w-20 h-10" />
        </CardContent>
      </Card>

      {/* Settings Loading */}
      <Card className="p-4">
        <CardContent className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="w-full md:max-w-[200px] h-10" />
          </div>
          <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="w-full md:max-w-[200px] h-10" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
