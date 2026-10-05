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

export const assignMember = async (req: Request, res: Response) => {
  const projectId = Number(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const project = await ProjectService.findProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.created_by !== req.user!.id) {
      return res
        .status(403)
        .json({ message: "Only the project owner can add members" });
    }

    const user = await UserService.findUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const member = await ProjectService.addMember(projectId, Number(userId));
    if (!member) {
      return res
        .status(409)
        .json({ message: "User is already a member of this project" });
    }

    return res
      .status(201)
      .json({ message: "User assigned to project successfully", member });
  } catch (error) {
    console.error("Assign member error:", error);
    return res
      .status(500)
      .json({ message: "Failed to assign user to project", error });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  const projectId = Number(req.params.id);
  const userId = Number(req.params.userId);

  try {
    const project = await ProjectService.findProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.created_by !== req.user!.id) {
      return res
        .status(403)
        .json({ message: "Only the project owner can remove members" });
    }

    const removed = await ProjectService.removeMember(projectId, userId);
    if (!removed) {
      return res
        .status(404)
        .json({ message: "User is not a member of this project" });
    }

    return res
      .status(200)
      .json({ message: "User removed from project successfully" });
  } catch (error) {
    console.error("Remove member error:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove user from project" });
  }
};
