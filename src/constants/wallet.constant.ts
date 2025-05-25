/**
 * This file contains all the types, enums related to the WALLET table or model data for type safty.
 */
export enum WalletTypesEnum {
  CASH = "cash",
  BANK = "bank",
  INVESTMENT = "investment",
  OTHER = "other",
}
export type WalletType = (typeof WalletTypesEnum)[keyof typeof WalletTypesEnum];
/** Array for the wallet types e.g., 'cash' , 'bank' and more. */
export const WalletTypesArray = Object.values(WalletTypesEnum);
