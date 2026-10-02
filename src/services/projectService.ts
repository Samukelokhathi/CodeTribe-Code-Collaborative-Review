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
  const { rows } = await query("SELECT * FROM project WHERE id = $1", [id]);
  return rows[0] || null;
};

export const addMember = async (projectId: number, userId: number) => {
  const { rows } = await query(
    `INSERT INTO project_members (project_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [projectId, userId],
  );
  return rows[0] || null;
};

export const removeMember = async (projectId: number, userId: number) => {
  const { rows } = await query(
    `DELETE FROM project_members
     WHERE project_id = $1 AND user_id = $2
     RETURNING *`,
    [projectId, userId],
  );
  return rows[0] || null;
};
