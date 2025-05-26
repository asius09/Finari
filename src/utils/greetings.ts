"use client";
import { Greetings } from "@/constants";

/**
 * Returns an appropriate greeting based on the current time of day.
 *
 * @returns {Greetings} - Returns the Greetings enum value for the current time
 *
 * @example
 * const greeting = greetings("Bobby");
 * // If time is 10:00 AM, returns:
 * // Greetings.GOOD_MORNING
 * // Good Morning, Bobby
 */

export const greetings = (
  name: string = "Adiba"
  // lastlogin?: number, //TODO: implemnet Welcome messege and then dynamic good morning after some time.
): string => {
  const hour = new Date().getHours();
  const formatName = name.charAt(0).toUpperCase() + name.slice(1); //to make sure the first letter is capital

  if (hour >= 5 && hour < 12) {
    return `${Greetings.GOOD_MORNING}, ${formatName}`;
  } else if (hour >= 12 && hour < 17) {
    return `${Greetings.GOOD_AFTERNOON}, ${formatName}`;
  } else if (hour >= 17 && hour < 21) {
    return `${Greetings.GOOD_EVENING}, ${formatName}`;
  } else {
    return `${Greetings.WELCOME_BACK}, ${formatName}`;
  }
};
