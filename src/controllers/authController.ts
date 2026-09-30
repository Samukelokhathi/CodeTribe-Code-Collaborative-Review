import { Request, Response } from "express";
import * as UserService from "../services/userService";

const allowedRoles = ["reviewer", "submitter"];

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, role, and name are required" });
  }
  if (!allowedRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: "Role must be 'reviewer' or 'submitter'" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  try {
    const user = await UserService.createUser(name, email, password, role);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Error registering the user" });
  }
};
