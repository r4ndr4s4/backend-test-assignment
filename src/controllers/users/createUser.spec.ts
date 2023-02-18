import request from "supertest";
import express from "express";

import { asyncHandler } from "../../server";
import auth from "../../middlewares/auth";
import error from "../../middlewares/error";

import createUser from "./createUser";

describe("Users controller", () => {
  const app = express();

  app.use(express.json());

  app.use(auth);

  app.post("/users", asyncHandler(createUser));

  app.use(error);

  it("createUser should send 401 (missing auth header)", async () => {
    const timestamp = Date.now();

    await request(app)
      .post("/users")
      .send({
        name: `Rakita András Teszt ${timestamp}`,
        email: `Rakita.Andras+${timestamp}@gmail.com`,
      })
      .expect(401, {
        status: "error",
        message: "X-Auth-User-Email header not found.",
      });
  });

  it("createUser should send 401 (wrong auth header)", async () => {
    const timestamp = Date.now();

    await request(app)
      .post("/users")
      .send({
        name: `Rakita András Teszt ${timestamp}`,
        email: `Rakita.Andras+${timestamp}@gmail.com`,
      })
      .set("X-Auth-User-Email", "xiao@lin.cn")
      .expect(401, {
        status: "error",
        message: "Invalid X-Auth-User-Email header provided.",
      });
  });

  it("createUser should send 500 (missing params)", async () => {
    await request(app)
      .post("/users")
      .send({})
      .set("X-Auth-User-Email", "admin@admin.com")
      .expect(500, {
        status: "error",
        errorCode: "validation_error",
        message: "email is a required field",
      });
  });

  it("createUser should send 200", async () => {
    const timestamp = Date.now();

    await request(app)
      .post("/users")
      .send({
        name: `Rakita András Teszt ${timestamp}`,
        email: `Rakita.Andras+${timestamp}@gmail.com`,
      })
      .set("X-Auth-User-Email", "admin@admin.com")
      .expect(200);
  });
});
