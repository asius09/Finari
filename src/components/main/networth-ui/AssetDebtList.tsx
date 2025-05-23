"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppSelector } from "@/store/hook";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { AssetComposer } from "./AssetComposer";
import { DebtComposer } from "./DebtComposer";
import Link from "next/link";
import { AppRoutes } from "@/constants/constant";

type ViewSelectionType = "asset" | "debt";

export const AssetDebtList = () => {
  const {
    assets,
    loading: assetLoading,
    error: assetError,
  } = useAppSelector(state => state.asset);
  const {
    debts,
    loading: debtLoading,
    error: debtError,
  } = useAppSelector(state => state.debt);

  const [viewSelection, setViewSelection] =
    useState<ViewSelectionType>("asset");

  const currency = null;
  return (
    <Card className="w-full p-4">
      <CardHeader className="w-full flex justify-between items-center">
        <div
          id="view-selection-input"
          className="bg-input border border-input-border p-0.1 rounded-lg"
        >
          <Button
            onClick={() => setViewSelection("asset")}
            variant={viewSelection === "asset" ? "secondary" : "ghost"}
            className={cn(
              viewSelection === "asset"
                ? "text-foreground"
                : "text-muted-foreground",
              "py-1 text-base font-medium h-6 cursor-pointer"
            )}
          >
            Assets
          </Button>
          <Button
            onClick={() => setViewSelection("debt")}
            variant={viewSelection !== "asset" ? "secondary" : "ghost"}
            className={cn(
              viewSelection !== "asset"
                ? "text-foreground"
                : "text-muted-foreground",
              "py-1 text-base font-medium h-6 cursor-pointer"
            )}
          >
            Debts
          </Button>
        </div>

        {viewSelection === "asset" ? (
          <AssetComposer
            btnChildren="Add Asset"
            formTitle="Create Asset"
            btnClassName="py-0"
          />
        ) : (
          <DebtComposer
            btnChildren="Add Dabt"
            formTitle="Create Debt"
            btnClassName="py-0"
          />
        )}
      </CardHeader>
      <CardContent>
        <ul className="mt-4" id={`${viewSelection}-list`}>
          {/* Asset Shows Case  */}
          {viewSelection === "asset" &&
            assets?.slice(0, 5).map(asset => (
              <li
                key={asset.id}
                className="w-full border-t border-border flex justify-between items-start p-3 hover:bg-muted-foreground/5"
              >
                <div className="flex items-start justify-start gap-2">
                  <Avatar className="w-12 h-12 rounded-full border border-border flex justify-center items-center">
                    <AvatarImage
                      sizes="sm"
                      src={asset?.details?.image}
                      alt={asset.name}
                    />
                    <AvatarFallback>
                      {asset.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-base text-foreground font-semibold">
                      {asset.name}
                    </p>
                    {/* Invesment  */}
                    <span className="text-xs text-muted-foreground">
                      {currency || "$"}
                      {asset.purchase_price}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-end items-end">
                  {/* Current Value  */}
                  <p className="text-xs text-positive">+340.09(4.02%)</p>
                  <span className="text-base text-foreground font-semibold">
                    {currency || "$"}
                    {asset.current_value}
                  </span>
                </div>
              </li>
            ))}
          {/* Debts Shows Case  */}
          {viewSelection !== "asset" &&
            debts?.slice(0, 5).map(debt => (
              <li
                key={debt.id}
                className="w-full border-t border-border flex justify-between items-start p-3 hover:bg-muted-foreground/5"
              >
                <div className="flex items-start justify-start gap-2">
                  <Avatar className="w-12 h-12 rounded-full border border-border flex justify-center items-center">
                    {/* <AvatarImage
                      sizes="sm"
                      src={debt?.details?.image}
                      alt={debt.name}
                    /> */}
                    <AvatarFallback>
                      {debt.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    {/* TODO: add debt name  */}
                    <p className="text-base text-foreground font-semibold">
                      {debt.name}
                    </p>
                    {/* principal amount  */}
                    <p className="text-xs text-muted-foreground">
                      <span>
                        {currency || "$"}
                        {debt.principal_amount || 0}
                      </span>
                      <span className="ml-0.5">
                        |{/* Last Date */} End:{" "}
                        {formatDate(debt.repayment_end_date, "onlyDate")}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  {/* TODO: handle next payment date and end date*/}
                  <span>{formatDate(debt.next_payment_date, "dayleft")}</span>
                </div>

                <div className="flex flex-col justify-end items-end">
                  {/* Emi */}
                  <p className="text-base text-foreground font-semibold">
                    {currency || "$"}
                    {debt.payment_amount}
                    <span className="text-xs text-muted-foreground ml-1 font-light">
                      /{debt?.repayment_frequency?.slice(0, 3)}
                    </span>
                  </p>
                  {/* Outstanding Balance*/}
                  <p className="text-xs text-negative">
                    {debt.outstanding_balance}
                  </p>
                </div>
              </li>
            ))}
          {viewSelection === "asset"
            ? assets.length > 5 && (
                <Link
                  href={AppRoutes.ASSETS}
                  className="text-sm text-muted-foreground hover:underline hover:text-primary flex justify-center items-center gap-2"
                >
                  view more
                  <ArrowRight className="size-4" />
                </Link>
              )
            : debts.length > 5 && (
                <Link
                  href={AppRoutes.DEBTS}
                  className="text-sm text-muted-foreground hover:underline hover:text-primary flex justify-center items-center gap-2"
                >
                  view more
                  <ArrowRight className="size-4" />
                </Link>
              )}
        </ul>
      </CardContent>
    </Card>
  );
};
