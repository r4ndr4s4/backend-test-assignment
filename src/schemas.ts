import { object, string, date } from "yup";

export const userSchema = object({
  name: string().required(),
  email: string().email().required(),
});

export const projectSchema = object({
  name: string().required(),
});

export const logSchema = object({
  startDate: date().required(),
  endDate: date().required(),
  projectId: string().uuid().required(),
});
