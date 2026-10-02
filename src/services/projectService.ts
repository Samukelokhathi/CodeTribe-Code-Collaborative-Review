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


export const findAllProjects = async () => {
  const { rows } = await query(
    "SELECT * FROM projects ORDER BY created_at DESC",
  );
  return rows;
};


export const findProjectById = async (id: number) => {
  const {rows} = await query("SELECT * FROM project WHERE id = $1", [id]);
  return rows[0] || null
};


export const addMember = async () => {
  const {rows } = await query (
    "SELECT *  FROM project "
  )
}