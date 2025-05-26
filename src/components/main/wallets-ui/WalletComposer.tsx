"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Banknote, Loader2, Plus, TrendingUp, Wallet } from "lucide-react";
import { walletFormSchema } from "@/schema/wallet.schema";
import { MyInput } from "@/components/my-ui/MyInput";
import { TapSelection } from "@/components/my-ui/TapSelection";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { LoadingTypeEnum, WalletTypesEnum } from "@/constants";
import { cn } from "@/lib/utils";
import {
  addWallet,
  modifyWallet,
  // updateWallet,
} from "@/store/slices/walletSlice";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { toast } from "sonner";

type WalletFormType = z.infer<typeof walletFormSchema>;

interface WalletComposerProps {
  buttonContent?: {
    icon: React.ReactNode;
    title: string;
  };
  walletId?: string;
  isEdit?: boolean;
  btnClassName?: string;
}

export function WalletComposer({
  buttonContent = {
    icon: <Plus className="h-4 w-4" />,
    title: "Create New Wallet",
  },
  walletId,
  isEdit = false,
  btnClassName = "",
}: WalletComposerProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { loading, wallets } = useAppSelector(state => state.wallet);
  const dispatch = useAppDispatch();
  const walletForm = useForm<WalletFormType>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      name: "",
      type: "bank",
      balance: 0,
    },
  });

  useEffect(() => {
    if (isEdit && walletId) {
      const walletToEdit = wallets.find(wallet => wallet.id === walletId);
      if (walletToEdit) {
        walletForm.reset({
          name: walletToEdit.name,
          type: walletToEdit.type,
          balance: walletToEdit.balance,
        });
      }
    }
  }, [isEdit, walletId, wallets, walletForm]);

  const handleSubmit = async (data: WalletFormType) => {
    try {
      if (!user) {
        throw new Error("User ID is required to create/update a wallet");
      }

      if (isEdit && walletId) {
        const result = await dispatch(
          modifyWallet({
            wallet: { ...data, id: walletId },
          })
        );
        if (modifyWallet.rejected.match(result)) {
          throw new Error(result.payload as string);
        }
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Wallet Updated"
            message="Wallet updated successfully!"
          />
        ));
      } else {
        const result = await dispatch(
          addWallet({
            wallet: { ...data },
            userId: user.id || "",
          })
        );
        if (addWallet.rejected.match(result)) {
          throw new Error(result.payload as string);
        }
        toast.custom(() => (
          <CustomToast
            type="success"
            title="Wallet Created"
            message="Wallet created successfully!"
          />
        ));
      }

      setOpen(false);
      walletForm.reset();
    } catch (error) {
      console.error("Error creating/updating wallet:", error);
      toast.custom(() => (
        <CustomToast
          type="error"
          title={isEdit ? "Wallet Update Failed" : "Wallet Creation Failed"}
          message={
            error instanceof Error ? error.message : "Failed to process wallet"
          }
        />
      ));
    }
  };

  const walletOptions = Object.values(WalletTypesEnum).map((type: string) => ({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
    icon:
      type === "cash"
        ? Wallet
        : type === "bank"
          ? Banknote
          : type === "investment"
            ? TrendingUp
            : Wallet,
    iconClass:
      type === "cash"
        ? "text-green-500"
        : type === "bank"
          ? "text-warning"
          : type === "investment"
            ? "text-info"
            : "text-mute-forground",
  }));

  const currency = "₹";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={"outline"}
          className={cn("gap-2 w-full", btnClassName)}
        >
          {buttonContent.icon}
          {buttonContent.title}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="wallet-form-description">
        <DialogHeader>
          <DialogTitle className="text-center w-full mb-3">
            {isEdit ? "Edit Wallet" : "Create New Wallet"}
          </DialogTitle>
          <Form {...walletForm}>
            <form
              onSubmit={walletForm.handleSubmit(async data => {
                try {
                  await handleSubmit(data);
                } catch (error) {
                  console.error("Error processing wallet:", error);
                }
              })}
              className="space-y-6"
              id="wallet-form-description"
            >
              <FormField
                control={walletForm.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Wallet Name</FormLabel>
                    <FormControl>
                      <MyInput
                        placeholder="Enter wallet name"
                        {...field}
                        className={cn(
                          fieldState.error &&
                            "border-destructive ring-destructive/20 h-10"
                        )}
                        onChange={e => field.onChange(e)}
                        aria-invalid={!!fieldState.error}
                        autoComplete="off"
                        disabled={loading === LoadingTypeEnum.PENDING}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={walletForm.control}
                name="type"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Wallet Type</FormLabel>
                    <TapSelection
                      options={walletOptions}
                      value={field.value}
                      onChange={field.onChange}
                      className={cn(
                        "h-10 w-full",
                        fieldState.error &&
                          "border-destructive ring-destructive/20"
                      )}
                      aria-invalid={!!fieldState.error}
                      disabled={loading === LoadingTypeEnum.PENDING}
                    />
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={walletForm.control}
                name="balance"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {currency}
                        </span>
                        <MyInput
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={e => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                          className={cn(
                            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-7 h-10",
                            fieldState.error &&
                              "border-destructive ring-destructive/20"
                          )}
                          aria-invalid={!!fieldState.error}
                          disabled={loading === LoadingTypeEnum.PENDING}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer h-10 flex items-center justify-center gap-2"
                disabled={loading === LoadingTypeEnum.PENDING}
              >
                {loading === LoadingTypeEnum.PENDING ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : isEdit ? (
                  "Update Wallet"
                ) : (
                  "Create Wallet"
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
