import { chartColors } from "@/lib/charUtils";
// asset.constant.ts

// Enum for internal usage
export enum AssetTypeEnum {
  CASH = "cash",
  BANK_ACCOUNT = "bank_account",
  INVESTMENT = "investment",
  PROPERTY = "property",
  PERSONAL_ITEM = "personal_item",
  STOCK = "stock",
  OTHER = "other",
}

// Readonly array for dropdowns, iterating, etc.
export const assetTypes = [
  AssetTypeEnum.CASH,
  AssetTypeEnum.BANK_ACCOUNT,
  AssetTypeEnum.INVESTMENT,
  AssetTypeEnum.PROPERTY,
  AssetTypeEnum.PERSONAL_ITEM,
  AssetTypeEnum.STOCK,
  AssetTypeEnum.OTHER,
] as const;

// Type derived from the array
export type AssetType = (typeof assetTypes)[number];

// UI helpers (labels/icons/colors)
export const assetTypeColorMap: Record<
  AssetTypeEnum,
  keyof typeof chartColors
> = {
  [AssetTypeEnum.CASH]: "emerald",
  [AssetTypeEnum.BANK_ACCOUNT]: "blue",
  [AssetTypeEnum.INVESTMENT]: "orange",
  [AssetTypeEnum.STOCK]: "yellow",
  [AssetTypeEnum.PROPERTY]: "violet",
  [AssetTypeEnum.PERSONAL_ITEM]: "rose",
  [AssetTypeEnum.OTHER]: "gray",
};
