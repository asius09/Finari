"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const IncomeBreakDownChart = () => {
  return (
    <Card className="w-full min-w-xs p-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Income Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm">
            Chart Placeholder
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
