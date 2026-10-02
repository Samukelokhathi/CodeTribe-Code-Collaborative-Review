import { query } from "../config/database";

export const createProject = async (
  name: string,
  description: string | null,
  userId: number,
) => {
  const { rows } = await query(
    `INSERT INTO projects (name, description, created_by)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, userId],
  );
  return rows[0];
};

