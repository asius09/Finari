import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./presistReducer";
import persistStore from "redux-persist/es/persistStore";

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>["store"];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
