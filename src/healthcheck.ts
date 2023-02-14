import { Request, Response } from "express";

const healthcheck = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "OK",
  });
};

export default healthcheck;
