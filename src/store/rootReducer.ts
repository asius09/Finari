import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authenthicationSlice";
import { userProfileReducer } from "./slices/userProfileSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
});
