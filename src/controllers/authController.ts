import { Request, Response } from "express";
import { User } from "../models/user.types";
import * as UserService from "../services/userService"


export const register = async (req: Request, res: Response) => {
    try {
        const user = await UserService.registerUser(req.body)
    } catch (error) {
        
    }

}
