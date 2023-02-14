import { Request, Response } from "express";

const createProject = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "createProject OK",
  });
};

export default createProject;
