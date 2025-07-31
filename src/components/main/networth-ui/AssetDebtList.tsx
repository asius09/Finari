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
import { AppRoutes } from "@/constants";
import { CurrencyCode } from "@/constants/currencies.constant";
import { formatCurrency } from "@/utils/currency";
import { LoadingTypeEnum } from "@/constants";

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
  const { profile } = useAppSelector(state => state.userProfile);
  const currency = profile?.currency as CurrencyCode;
  const [viewSelection, setViewSelection] =
    useState<ViewSelectionType>("asset");

  const renderLoadingState = () => {
    const loadingText =
      viewSelection === "asset"
        ? "Fetching your assets..."
        : "Retrieving your debts...";

    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="animate-pulse h-8 w-8 rounded-full bg-muted" />
        <p className="text-muted-foreground text-sm">{loadingText}</p>
      </div>
    );
  };

  const renderErrorState = () => {
    const errorMessage =
      viewSelection === "asset"
        ? `Failed to load assets: ${assetError}`
        : `Failed to load debts: ${debtError}`;

    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-destructive">!</span>
        </div>
        <p className="text-destructive text-sm">{errorMessage}</p>
      </div>
    );
  };

  const renderContent = () => {
    if (viewSelection === "asset") {
      if (assetLoading === LoadingTypeEnum.PENDING) {
        return renderLoadingState();
      }
      if (assetError) {
        return renderErrorState();
      }
    } else {
      if (debtLoading === LoadingTypeEnum.PENDING) {
        return renderLoadingState();
      }
      if (debtError) {
        return renderErrorState();
      }
    }

    return (
      <ul className="mt-4" id={`${viewSelection}-list`}>
        {/* Asset Shows Case */}
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
                  <p className="text-base text-foreground font-semibold line-clamp-1">
                    {asset.name}
                  </p>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {formatCurrency(asset.purchase_price as number, currency)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-end items-end">
                <p className="text-xs text-positive line-clamp-1">
                  +340.09(4.02%)
                </p>
                <span className="text-base text-foreground font-semibold line-clamp-1">
                  {formatCurrency(asset.current_value, currency)}
                </span>
              </div>
            </li>
          ))}

        {/* Debts Shows Case */}
        {viewSelection !== "asset" &&
          debts?.slice(0, 5).map(debt => (
            <li
              key={debt.id}
              className="w-full border-t border-border flex justify-between items-start p-3 hover:bg-muted-foreground/5"
            >
              <div className="flex items-start justify-start gap-2">
                <Avatar className="w-12 h-12 rounded-full border border-border flex justify-center items-center">
                  <AvatarFallback>
                    {debt.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start">
                  <p className="text-base text-foreground font-semibold line-clamp-1">
                    {debt.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    <span>
                      {formatCurrency(debt.principal_amount || 0, currency)}
                    </span>
                    <span className="ml-0.5">
                      | End: {formatDate(debt.repayment_end_date, "onlyDate")}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {formatDate(debt.next_payment_date, "dayleft")}
                </span>
              </div>

              <div className="flex flex-col justify-end items-end">
                <p className="text-base text-foreground font-semibold line-clamp-1">
                  {formatCurrency(debt.payment_amount as number, currency)}
                  <span className="text-xs text-muted-foreground ml-1 font-light">
                    /{debt?.repayment_frequency?.slice(0, 3)}
                  </span>
                </p>
                <p className="text-xs text-negative line-clamp-1">
                  {formatCurrency(debt.outstanding_balance as number, currency)}
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
    );
  };

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
            btnChildren="Add Debt"
            formTitle="Create Debt"
            btnClassName="py-0"
          />
        )}
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
