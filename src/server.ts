import express from "express";
import { Server } from "http";
import helmet from "helmet";
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan"; // TODO check later

import healthcheck from "./healthcheck";

const serve = (port: number): Server => {
  const app = express();

  app.use(morgan("common"));
  app.use(helmet.noSniff());

  app.get("/", healthcheck);

  return app.listen(port, () => {
    console.info(`Server listening on port ${port}.`);
  });
};

export default serve;
