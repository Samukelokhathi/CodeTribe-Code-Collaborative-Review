import { SafeUser } from "../models/user.types";

declare global {
  namespace Express {
    export interface Request {
      user?: SafeUser;
    }
  }
}
