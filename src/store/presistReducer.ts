"use client";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userProfile"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
