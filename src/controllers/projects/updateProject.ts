import { Request, Response } from "express";

const updateProject = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "updateProject OK",
  });
};

export default updateProject;
