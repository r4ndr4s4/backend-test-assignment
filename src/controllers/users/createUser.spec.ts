import request from "supertest";
import express from "express";

import { asyncHandler } from "../../server";
import auth from "../../middlewares/auth";

import createUser from "./createUser";
import getUserDetails from "./getUserDetails";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

describe("Users controller", () => {
  const app = express();

  app.use(express.json());

  app.use(auth);

  app.post("/users", asyncHandler(createUser));
  app.get("/users/:userId", asyncHandler(getUserDetails));
  app.patch("/users/:userId", asyncHandler(updateUser));
  app.delete("/users/:userId", asyncHandler(deleteUser));

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
