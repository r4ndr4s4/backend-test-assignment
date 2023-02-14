import { Request, Response } from "express";

const getUserDetails = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "getUserDetails OK",
  });
};

export default getUserDetails;
