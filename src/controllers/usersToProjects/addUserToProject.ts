import { Request, Response } from "express";

const addUserToProject = async (
  _: Request,
  res: Response
): Promise<Response> => {
  return res.json({
    status: "addUserToProject OK",
  });
};

export default addUserToProject;
