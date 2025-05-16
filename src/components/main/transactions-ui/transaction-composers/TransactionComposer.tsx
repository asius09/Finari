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
import { useState } from "react";

interface TransactionComposerProps {
  btnChildren?: React.ReactNode;
  btnClassName?: string;
  formTitle: string;
  formDescription: string;
  transactionId?: string;
  isEdit?: boolean;
}

export function TransactionComposer({
  isEdit = false,
  btnChildren,
  btnClassName,
  formTitle,
  formDescription,
  transactionId,
}: TransactionComposerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className={btnClassName}>
          {btnChildren}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {formTitle}
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            {formDescription}
          </p>
        </DialogHeader>
        <InputComposer
          isEdit={isEdit}
          setOpen={setOpen}
          transactionId={transactionId}
        />
      </DialogContent>
    </Dialog>
  );
}
