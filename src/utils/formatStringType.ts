/**
 * @function formatStringType
 * This function formats a string type with special characters into a more readable text.
 * @example - type : "bank_account" to "Bank Account"
 * @example - type : "credit-card" to "Credit Card"
 *
 * 1. Make text in Capital Written text.
 * 2. Remove special characters from it like "-" & "_".
 *
 * @param {string} type : String type to format.
 * @return {string} : Formatted version of the type e.g. "Bank Account"
 */

export const formatStringType = (type: string): string => {
  if (!type) {
    throw new Error("Please provide valid type to format");
  }

  return type
    .split(/[_-]/)
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
};
