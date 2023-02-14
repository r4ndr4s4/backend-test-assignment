import { Request, Response } from "express";

const removeUserFromProject = async (
  _: Request,
  res: Response
): Promise<Response> => {
  return res.json({
    status: "removeUserFromProject OK",
  });
};

export default removeUserFromProject;
