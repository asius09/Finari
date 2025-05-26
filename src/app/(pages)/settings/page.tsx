"use client";

import { UserView } from "@/components/main/profile-ui/UserView";
import SettingLoadingPage from "./loading";
import { Suspense } from "react";

export default function SettingPage() {
  return (
    <div id="setting-page">
      <Suspense fallback={<SettingLoadingPage />}>
        <UserView />
      </Suspense>
    </div>
  );
}
