"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Fix: `useRef` should refer to the actual store type, not the value of a key
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  const { persistor } = makeStore();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={storeRef.current.store}>{children}</Provider>
    </PersistGate>
  );
}
