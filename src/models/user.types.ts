export type UserRole = "Reviewer" | "Submitter";

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  createdAt: Date;
}

export type SafeUser = Omit<User, "password_hash">;
