import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import transactionReducer from "./slices/transactionSlice";
import assetReducer from "./slices/assetSlice";
import debtReducer from "./slices/debtSlice";
import walletReducer from "./slices/walletSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userReducer,
  transaction: transactionReducer,
  asset: assetReducer,
  debt: debtReducer,
  wallet: walletReducer,
});
