export type userRoles = "Reviewer" | "Submitter";

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: userRoles;
  createdAt: Date;
}
