"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { greetings } from "@/utils/greetings";
import { Bell, Plus, Home, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppRoutes } from "@/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import { TransactionComposer } from "@/components/main/transactions-ui/transaction-composers/TransactionComposer";
import { ModeToggle } from "./Theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const Header = () => {
  const profile = useAppSelector(state => state.userProfile.profile);
  const fullName = profile?.full_name || "User";
  const avatarUrl = profile?.avatar_url || "";
  const [firstName, setFirstName] = useState<string>("");
  const isMobile = useIsMobile();

  const headerBtns = [
    {
      title: "Home",
      url: AppRoutes.HOME,
      icon: Home,
    },
    {
      title: "Notification",
      url: AppRoutes.NOTIFICATION,
      icon: Bell,
    },
    {
      title: "Settings",
      url: AppRoutes.SETTINGS,
      icon: Settings,
    },
    {
      title: "theme",
    },
  ];

  useEffect(() => {
    if (fullName) {
      const firstname: string = fullName.split(" ")[0];
      setFirstName(firstname);
    }
  }, [fullName]);

  return (
    <div
      id="header"
      className={cn(
        "w-full flex px-4 whitespace-nowrap bg-background/80 backdrop-blur-sm border-b border-border/10",
        isMobile
          ? "items-center justify-between pt-4 fixed top-0 left-0 right-0 z-50"
          : "justify-between items-center"
      )}
      style={{ height: "68px" }}
    >
      {/* Mobile Navigation - Glass Effect */}
      {isMobile && (
        <div className="bg-background/80 backdrop-blur-sm absolute top-0 left-0 right-0 h-[68px] z-[-1]" />
      )}

      {/* Greetings with User Name - Hidden on Mobile */}
      {!isMobile && (
        <div className="flex gap-2 items-center justify-start">
          <Avatar className="w-9 h-9 lg:w-10 lg:h-10">
            <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>f</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-[15px] lg:text-[17px] text-foreground font-semibold leading-tight">
              {greetings(firstName)}
            </p>
            <span className="text-[11px] lg:text-[12px] text-muted-foreground font-medium">
              {formatDate()}
            </span>
          </div>
        </div>
      )}

      {/* Logo for Mobile */}
      {isMobile && <Logo />}

      {/* Navigation Bar */}
      <nav className="flex justify-end items-center gap-2">
        <div className="flex justify-end items-center gap-2">
          <TransactionComposer
            btnChildren={
              <>
                <Plus className="h-4 w-4" />
                {isMobile ? "" : "Add Transaction"}
              </>
            }
            btnClassName={cn(
              "h-9 p-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm",
              isMobile ? "w-9" : "lg:w-40"
            )}
            formTitle="Add Transaction"
            formDescription="Tell us what you spent or received"
            isEdit={false}
          />
          {headerBtns.map(btn => {
            if (btn.title === "theme" && !isMobile) {
              return <ModeToggle key={btn.title} />;
            }

            if (!btn.icon) return null;

            const IconComponent = btn.icon;
            return (
              <Button
                key={btn.title}
                variant={"ghost"}
                className="hover:bg-primary/50 cursor-pointer transition-colors rounded-lg h-9 w-9 p-0"
                asChild
              >
                <Link href={btn.url || AppRoutes.HOME}>
                  <IconComponent className="size-[18px] fill-foreground hover:fill-primary transition-colors" />
                </Link>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
