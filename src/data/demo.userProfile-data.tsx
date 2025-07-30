import { UserProfile } from "@/types/modelTypes";

export const demoUserProfile: UserProfile = {
  id: "550e8400-e29b-41d4-a716-446655440000", // UUID format
  full_name: "John Doe", // Required field
  email: "john.doe@example.com", // Required field
  currency: "INR", // Required 3-letter currency code
  avatar_url: "https://example.com/avatar.jpg", // Optional URL
  created_at: new Date().toISOString(), // ISO timestamp
};
