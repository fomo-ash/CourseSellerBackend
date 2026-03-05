import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(["STUDENT","INSTRUCTOR"])
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});