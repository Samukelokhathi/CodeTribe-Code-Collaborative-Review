import { User } from "../models/user.types";
import { query } from "../config/database";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<Omit<User, "password">> => {
  const userPassword = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO user (name,email,password,role) VALUE ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email.toLocaleLowerCase(), password, role],
  );

  return rows[0];
};
