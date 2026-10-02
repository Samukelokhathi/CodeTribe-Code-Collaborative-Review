import { Request, Response } from "express";
import * as UserService from "../services/userService";

const allowedRoles = ["Reviewer", "Submitter"];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, role, and name are required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!allowedRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: "Role must be 'Reviewer' or 'Submitter'" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await UserService.createUser(name, email, password, role);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
      
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email is already registered" });
    }

    console.error("Register error:", error);
    return res
      .status(500)
      .json({ message: "Error registering the user", error: error.message });
  }
};
