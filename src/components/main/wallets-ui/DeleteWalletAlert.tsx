"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hook";
import { removeWallet } from "@/store/slices/walletSlice";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import React from "react";
import { cn } from "@/lib/utils";

interface DeleteWalletAlertProps {
  walletId: string;
  btnClassName?: string;
  title?: string;
  icon?: React.ElementType;
}

export const DeleteWalletAlert = ({
  walletId,
  btnClassName,
  title,
  icon: Icon = Trash2,
}: DeleteWalletAlertProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(removeWallet({ walletId }));
      toast.custom(() => (
        <CustomToast type="success" message="Wallet deleted successfully" />
      ));
    } catch (error) {
      console.error("Failed to delete wallet:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          message="Failed to delete wallet. Please try again."
        />
      ));
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-error hover:bg-error/5 flex flex-row justify-start items-center gap-2",
            btnClassName
          )}
        >
          <Icon className="h-4 w-4" />
          {title}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this wallet?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All transactions and data related to
            this wallet will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-error hover:bg-error/50"
          >
            Delete Wallet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
