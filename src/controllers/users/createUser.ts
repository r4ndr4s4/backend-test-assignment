import { Request, Response } from "express";

const createUser = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "createUser OK",
  });
};

export default createUser;
