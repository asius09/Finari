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
import React from "react";
import { cn } from "@/lib/utils";

interface DeleteWalletAlertProps {
  btnClassName?: string;
  btnTitle?: string;
  title: string;
  content: string;
  icon?: React.ElementType;
  handleDelete: () => void;
}

export const RemoveEntry = ({
  btnClassName,
  btnTitle,
  title,
  content,
  icon: Icon = Trash2,
  handleDelete,
}: DeleteWalletAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-error hover:bg-error/50 flex flex-row justify-start items-center gap-2",
            btnClassName
          )}
        >
          <Icon className="h-4 w-4" />
          {btnTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-error hover:bg-error/50"
          >
            Delete Wallet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
