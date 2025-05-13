"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputComposer } from "@/components/main/transactions-ui/transaction-composers/InputComposer";
import { Plus } from "lucide-react";

export function AddTransactionBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2 rounded-full cursor-pointer">
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="inline sm:hidden">Add</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Add Transaction
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            Tell us what you spent or received
          </p>
        </DialogHeader>
        <InputComposer />
      </DialogContent>
    </Dialog>
  );
}
