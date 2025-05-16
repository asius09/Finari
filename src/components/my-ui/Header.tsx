"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { greetings } from "@/utils/greetings";
import { Bell, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppRoutes } from "@/constants/constant";
import { Button } from "../ui/button";
import Link from "next/link";
import { TransactionComposer } from "@/components/main/transactions-ui/transaction-composers/TransactionComposer";
import { ModeToggle } from "./Theme";

export const Header = () => {
  const profile = useAppSelector(state => state.userProfile.profile);
  const fullName = profile?.full_name || "Adiba";
  const avatarUrl = profile?.avatar_url || "";
  const [firstName, setFirstName] = useState<string>("");

  const headerBtns = [
    {
      title: "Notification",
      url: AppRoutes.NOTIFICATION,
      icon: Bell,
    },
    {
      title: "theme",
    },
  ];

  useEffect(() => {
    //settinng first name
    if (fullName) {
      const firstname: string = fullName.split(" ")[0];
      setFirstName(firstname);
    }
  });
  return (
    <div
      id="header"
      className="flex justify-between items-center w-full min-h-20"
    >
      <div className="flex gap-2 items-center justify-start">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>f</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-2xl text-foreground font-semibold">
            {greetings(firstName)}
          </p>
          <span className="text-xs text-muted-foreground font-medium">
            {formatDate()}
          </span>
        </div>
      </div>
      <nav className="flex justify-end items-center gap-2 min-h-20">
        <TransactionComposer
          btnChildren={
            <>
              <Plus className="h-4 w-4" /> Add Transaction
            </>
          }
          btnClassName="w-40 h-10 p-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
          formTitle="Add Transaction"
          formDescription="Tell us what you spent or received"
          isEdit={false}
        />
        {headerBtns.map(btn => {
          if (btn.title === "theme") {
            return <ModeToggle key={btn.title} />;
          }

          if (!btn.icon) return null;

          const IconComponent = btn.icon;
          return (
            <Button
              key={btn.title}
              variant={"ghost"}
              className="hover:bg-primary/50 cursor-pointer transition-colors rounded-lg"
              asChild
            >
              <Link href={btn.url || AppRoutes.HOME}>
                <IconComponent className="size-5 fill-foreground hover:fill-primary transition-colors" />
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
