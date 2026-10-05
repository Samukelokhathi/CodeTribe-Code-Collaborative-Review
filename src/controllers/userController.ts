import { Request, Response } from "express";
import * as UserService from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await UserService.findAllUsers();
        return res.status(200).json(users);
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({message: "Error retrieving users"});
    }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (req.user!.id !== id) {
    return res
      .status(403)
      .json({ message: "You can only update your own profile" });
  }

  try {
    const { name, email } = req.body;
    const user = await UserService.updateUser(id, name, email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email is already in use" });
    }
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (req.user!.id !== id) {
    return res
      .status(403)
      .json({ message: "You can only delete your own account" });
  }

  try {
    const user = await UserService.deleteUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};
