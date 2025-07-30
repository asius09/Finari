import { CurrencyCode } from "@/constants/currencies.constant";

/**
 * Formats a number into currency string based on the provided currency code.
 *
 * This function takes a number and currency code, and returns a formatted currency string
 * using the appropriate currency symbol and formatting rules. It only shows decimal places
 * when there are actually fractional values. Includes an option to format without currency symbol.
 *
 * @param {number} amount - The numeric value to format (e.g., 1234.56)
 * @param {CurrencyCode} currency - The 3-letter currency code (e.g., 'USD', 'INR', 'EUR')
 * @param {boolean} [withSymbol=true] - Whether to include the currency symbol in the output
 * @returns {string} - The formatted currency string (e.g., "$1,234.56", "1,234")
 *
 * @example
 * // Basic usage
 * formatCurrency(1234.56, 'USD'); // "$1,234.56"
 * formatCurrency(1234, 'INR'); // "₹1,234"
 * formatCurrency(1234.56, 'USD', false); // "1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: CurrencyCode,
  withSymbol: boolean = true
): string => {
  return new Intl.NumberFormat("en-US", {
    style: withSymbol ? "currency" : "decimal",
    currency: withSymbol ? currency : undefined,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
