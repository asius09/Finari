/**
 * @function FormatAssetType
 * This function formate default asset type to the more bettter readable text.
 * @example - asset type : "bank_account" to "Bank Account"
 *
 * 1. Make text in Capital Written text.
 * 2. Remove special charaters from it like "-" & "_".
 *
 * @param {string} type : Asset type to format.
 * @return {string} type : Formatted version of the type e.g. "Bank Account"
 */

export const formatAssetType = (type: string): string => {
  if (!type) {
    throw new Error("Please provide valid type to format");
  }

  return type
    .split("_")
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
};
