import { Request, Response } from "express";
import * as applicationServices from "../services/applicationService";

export const addApplication = async (req: Request, res: Response) => {
  try {
    const newApplication = await applicationServices.createApplication(
      req.body,
    );
    res.status(201).json(newApplication);
  } catch (error:any) {
    console.error("Database Insertion Error Details:", error);

    res.status(500).json({ 
      message: "Error in creating application",
      error: error.message || error 
    });
  }
};
