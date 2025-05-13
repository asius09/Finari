"use client";

/**
 * Enum for different date format types
 * - full: Full date with time and weekday (e.g., "Monday, January 1, 2023 at 12:00 PM")
 * - number: Numeric date format (e.g., "01/01/2023")
 * - relative: Relative time format (e.g., "Yesterday", "Today", "Jan 1")
 * - relative: Relative time format (e.g., "Yesterday", "Today", "Jan 1, 2023, 12:00 PM")
 */
type DateType = "full" | "number" | "relative" | "year";

/**
 * Formats a date string based on the specified type
 * @param {string} date - The date string to format (defaults to current date)
 * @param {DateType} type - The format type (defaults to "full")
 * @returns {string} - Formatted date string based on the specified type
 */
export const formatDate = (
  date: string = new Date().toISOString(),
  type: DateType = "full"
): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (type === "full") {
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (type === "number") {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  if (type === "relative") {
    // Check if date is today
    if (dateObj.toDateString() === now.toDateString()) {
      return "Today";
    }
    // Check if date is yesterday
    if (dateObj.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    // Check if date is within the same year
    if (dateObj.getFullYear() === now.getFullYear()) {
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    // For dates older than current year
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (type === "year") {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
    });
  }

  return dateObj.toISOString();
};
