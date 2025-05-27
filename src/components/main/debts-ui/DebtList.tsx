"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Debt } from "@/types/modelTypes";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DebtListProps {
  debts: Debt[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "due":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    case "overdue":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    case "paid":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

export const DebtList = ({ debts }: DebtListProps) => {
  return (
    <section className="debt-list rounded-lg border shadow-sm bg-background">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="[&_th]:py-3">
            <TableHead className="font-semibold text-foreground pl-4">
              #
            </TableHead>
            <TableHead className="w-[200px] font-semibold text-foreground pl-4">
              Name
            </TableHead>
            <TableHead className="font-semibold text-foreground pl-4">
              Status
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground pr-4">
              Outstanding
            </TableHead>
            <TableHead className="font-semibold text-foreground pl-4">
              End Date
            </TableHead>
            <TableHead className="font-semibold text-foreground pl-4">
              Info
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debts.map((debt, index) => (
            <TableRow
              key={debt.id}
              className="hover:bg-muted/50 transition-colors [&_td]:py-3"
            >
              <TableCell className="font-medium text-foreground pl-4">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium text-foreground pl-4">
                {debt.name}
              </TableCell>
              <TableCell className="pl-4">
                <Badge
                  className={`${getStatusBadge(debt.payment_status || "unknown")} transition-colors`}
                >
                  {debt.payment_status || "Unknown"}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-foreground pr-4">
                $
                {(debt.outstanding_balance || 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-foreground pl-4">
                {debt.repayment_end_date ? (
                  format(new Date(debt.repayment_end_date), "MMM d, yyyy")
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell className="pl-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer hover:text-foreground transition-colors">
                      <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-background border shadow-lg p-3"
                    >
                      <div className="grid gap-3 w-[260px]">
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Type:
                          </span>
                          <span className="text-muted-foreground capitalize">
                            {debt.debt_type || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Principal:
                          </span>
                          <span className="text-muted-foreground">
                            ${(debt.principal_amount || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Interest Rate:
                          </span>
                          <span className="text-muted-foreground">
                            {(debt.interest_rate || 0).toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Payment Frequency:
                          </span>
                          <span className="text-muted-foreground capitalize">
                            {debt.repayment_frequency || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Next Payment:
                          </span>
                          <span className="text-muted-foreground">
                            {debt.next_payment_date
                              ? format(
                                  new Date(debt.next_payment_date),
                                  "MMM d, yyyy"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-foreground">
                            Details:
                          </span>
                          <span className="text-muted-foreground">
                            {debt.notes || "N/A"}
                          </span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
