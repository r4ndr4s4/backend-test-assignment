import { Request, Response } from "express";

const deleteProject = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "deleteProject OK",
  });
};

export default deleteProject;
