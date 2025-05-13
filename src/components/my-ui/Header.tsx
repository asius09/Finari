"use client";

import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { greetings } from "@/utils/greetings";
import { Bell, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppRoutes } from "@/constants/constant";
import { Button } from "../ui/button";
import Link from "next/link";

export const Header = () => {
  const theme = "dark";
  const { full_name: fullName, avatarUrl } = useAppSelector(
    state => state.userProfile
  );
  const [firstName, setFirstName] = useState<string>("");

  const headerBtns = [
    {
      title: "Notification",
      url: AppRoutes.NOTIFICATION,
      icon: Bell,
    },
    {
      title: "theme",
      icon: theme === "dark" ? Moon : Sun,
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
          <p className="text-2xl text-foreground font-bold">{greetings()}</p>
          <span className="text-xs text-muted-foreground font-medium">
            {formatDate()}
          </span>
        </div>
      </div>
      <nav className="flex justify-end items-center  min-h-20">
        {headerBtns.map(btn => {
          return btn.title !== "theme" ? (
            <Button
              key={btn.title}
              variant={"ghost"}
              className="hover:bg-primary/50 cursor-pointer transition-colors rounded-lg"
              asChild
            >
              <Link href={btn.url || AppRoutes.HOME}>
                {" "}
                {/* TODO : REMOVE HOME*/}
                <btn.icon className="size-5 fill-foreground hover:fill-primary transition-colors" />
              </Link>
            </Button>
          ) : (
            <Button
              key={btn.title}
              variant={"ghost"}
              className="hover:bg-primary/50 cursor-pointer transition-colors rounded-lg"
            >
              <btn.icon className="size-5 fill-foreground hover:fill-primary transition-colors " />
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
