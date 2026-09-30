export type userRoles = "Reviewer" | "Submitter";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: userRoles;
  createdAt: Date;
}
