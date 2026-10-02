import { Request, Response } from "express";
import * as ProjectService from "../services/projectService";
import * as UserService from "../services/userService";


export const addProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const project = await ProjectService.createProject(
      name,
      description || null,
      req.user!.id,
    );
    return res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Error creating project" });
  }
};


export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.findAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("List projects error:", error);
    return res.status(500).json({ message: "Error retrieving projects" });
  }
};
