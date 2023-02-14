import { Request, Response } from "express";

const getRelatedProjects = async (
  _: Request,
  res: Response
): Promise<Response> => {
  return res.json({
    status: "getRelatedProjects OK",
  });
};

export default getRelatedProjects;
