import { User, SafeUser, UserRole } from "../models/user.types";
import { query } from "../config/database";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query(
    `SELECT id, name, email, password_hash, role,
            created_at AS "createdAt"
     FROM users
     WHERE email = $1`,
    [email.trim().toLowerCase()],
  );
  return rows[0] || null;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole,
): Promise<SafeUser> => {
  const userPassword = await bcrypt.hash(password, 10);

  const { rows } = await query(
    `INSERT INTO users (name,email,password_hash,role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role`,
    [name, email.toLocaleLowerCase(), userPassword, role],
  );

  return rows[0];
};

export const findUserById = async (id: number) => {
  const { rows } = await query(
    "SELECT id, name, email, role FROM users WHERE id = $1",
    [id],
  );
  return rows[0] || null;
};

export const updateUser = async (id: number, name?: string, email?: string) => {
  const { rows } = await query(
    `UPDATE users
     SET name = COALESCE($1, name),
         email = COALESCE($2, email)
     WHERE id = $3
     RETURNING id, name, email, role`,
    [name, email, id],
  );
  return rows[0] || null;
};

export const deleteUser = async (id: number) => {
  const { rows } = await query("DELETE FROM users WHERE id = $1 RETURNING id", [
    id,
  ]);
  return rows[0] || null;
};
