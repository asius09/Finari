"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      className="text-logout-text hover:text-logout-hover w-full justify-start gap-2 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 cursor-pointer"
    >
      <LogOutIcon className="size-4 group-data-[collapsible=icon]:size-5" />
      <span className="group-data-[collapsible=icon]:hidden">Logout</span>
    </Button>
  );
}
