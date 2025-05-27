"use client";

import { useState } from "react";
import { addMonths, format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Debt } from "@/types/modelTypes";
import { useDebtPayments } from "@/hooks/useDebtPayments";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const debtCalendarModifierStyles = {
  upcomingPayment: { position: "relative" as const },
  pastDuePayment: { position: "relative" as const },
  paidPayment: { position: "relative" as const },
};

interface DebtCalendarProps {
  debts: Debt[];
}

const getDebtsForDate = (date: Date, debts: Debt[]) => {
  return debts.filter(debt => {
    const paymentDate = debt.next_payment_date
      ? new Date(debt.next_payment_date)
      : null;
    return paymentDate && paymentDate.toDateString() === date.toDateString();
  });
};

interface StatusBadgeConfig {
  variant: "default" | "secondary" | "destructive" | "outline";
  label: string;
  className: string;
}

const STATUS_BADGE_CONFIGS: Record<string, StatusBadgeConfig> = {
  upcoming: {
    variant: "outline",
    label: "Upcoming",
    className: "border-yellow-500 text-yellow-500",
  },
  due: {
    variant: "outline",
    label: "Due Now",
    className: "border-red-500 text-red-500",
  },
  overdue: {
    variant: "outline",
    label: "Overdue",
    className: "border-red-500/50 text-red-500/80",
  },
  paid: {
    variant: "outline",
    label: "Paid",
    className: "border-green-500 text-green-500",
  },
  unknown: {
    variant: "outline",
    label: "Unknown",
    className: "border-gray-500 text-gray-500",
  },
};

const getStatusBadge = (status: string): StatusBadgeConfig => {
  return STATUS_BADGE_CONFIGS[status] || STATUS_BADGE_CONFIGS.unknown;
};

export const DebtCalendar = ({ debts }: DebtCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { upcomingPayments, pastDuePayments, paidPayments } =
    useDebtPayments(debts);

  const modifiers = {
    upcomingPayment: upcomingPayments,
    pastDuePayment: pastDuePayments,
    paidPayment: paidPayments,
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDate(prev => addMonths(prev, direction === "prev" ? -1 : 1));
  };

  return (
    <Card className="w-full p-0 pb-4">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-4">
        <div className="flex flex-col space-y-2 sm:space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Debt Payment Calendar
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Track your debt payment statuses
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px极2 py-1 border-muted-foreground/20 text-xs"
            >
              <span className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse" />
              <span>Upcoming ({upcomingPayments.length})</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2 py-1 border-muted-foreground/20 text-xs"
            >
              <span className="h-2 w-2 bg-red-500 rounded-full" />
              <span>Past Due ({pastDuePayments.length})</span>
            </Badge>
            <Badge
              variant="outline"
              className="极flex items-center gap-1 px-2 py-1 border-muted-foreground/20 text-xs"
            >
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              <span>Paid ({paidPayments.length})</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col px-0 pb-0">
        {debts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No debts to display.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="flex items-center justify-between px-4 sm:px-6 mb-2 sm:mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMonthChange("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm sm:text-base font-medium">
                {format(currentDate, "MMMM yyyy")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMonthChange("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-2 sm:px-4">
              <Calendar
                mode="single"
                modifiers={modifiers}
                modifiersStyles={debtCalendarModifierStyles}
                className="w-full min-w-[280px]"
                month={currentDate}
                onMonthChange={setCurrentDate}
                classNames={{
                  months: "w-full",
                  month: "w-full",
                  table: "w-full",
                  head_cell:
                    "w-[14%] text-[8px] sm:text-xs text-center uppercase flex items-center justify-center text-bold",
                  cell: "w-[14%] text-[8px] sm:text-xs text-center cursor-pointer flex items-center justify-center",
                  nav_button_previous: "hidden",
                  nav_button_next: "hidden",
                  caption: "hidden",
                  day: "h-6 sm:h-8 w-6 sm:w-8 p-0 relative hover:bg-accent rounded-full transition-colors",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
                formatters={{
                  formatWeekdayName: date => format(date, "EEEEE"),
                }}
                components={{
                  Day: ({ date, displayMonth }) => {
                    const debtsForDate = getDebtsForDate(date, debts);
                    const isUpcoming = upcomingPayments.some(
                      d => d.toDateString() === date.toDateString()
                    );
                    const isPastDue = pastDuePayments.some(
                      d => d.toDateString() === date.toDateString()
                    );
                    const isPaid = paidPayments.some(
                      d => d.toDateString() === date.toDateString()
                    );

                    if (date.getMonth() !== displayMonth.getMonth()) {
                      return <div className="h-6 sm:h-8 w-6 sm:w-8 p-0" />;
                    }

                    return (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="h-6 sm:h-8 w-6 sm:w-8 p-0 flex items-center justify-center rounded-full relative hover:bg-accent/50 transition-colors">
                            <span className="z-10 text-xs font-medium">
                              {date.getDate()}
                            </span>
                            {(isUpcoming || isPastDue || isPaid) && (
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                <div
                                  className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full border ${
                                    isUpcoming
                                      ? "border-yellow-500/50 bg-yellow-500/20 animate-pulse"
                                      : isPastDue
                                        ? "border-red-500/50 bg-red-500/20 animate-pulse"
                                        : "border-green-500/50 bg-green-500/20"
                                  }`}
                                />
                              </div>
                            )}
                          </div>
                        </HoverCardTrigger>
                        {debtsForDate.length > 0 && (
                          <HoverCardContent
                            className="w-72 sm:w-80 p-3 sm:p-4"
                            side="top"
                            align="center"
                          >
                            <div className="space-y-2 sm:space-y-3">
                              <h4 className="font-semibold text-base sm:text-lg">
                                Debts due on {format(date, "MMM d, yyyy")}
                              </h4>
                              <div className="space-y-1 sm:space-y-2">
                                {debtsForDate.map((debt, index) => {
                                  const status = getStatusBadge(
                                    debt.payment_status || "unknown"
                                  );
                                  return (
                                    <div
                                      key={index}
                                      className="p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm sm:text-base">
                                          {debt.name}
                                        </p>
                                        <Badge
                                          variant={
                                            status.variant as
                                              | "default"
                                              | "secondary"
                                              | "destructive"
                                              | "outline"
                                          }
                                          className={status.className}
                                        >
                                          {status.label}
                                        </Badge>
                                      </div>
                                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                        Amount: $
                                        {debt.outstanding_balance?.toLocaleString()}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </HoverCardContent>
                        )}
                      </HoverCard>
                    );
                  },
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
