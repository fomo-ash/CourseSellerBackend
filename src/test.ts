import { signUpSchema } from "./schemas/authSchema";

const result = signUpSchema.safeParse({
  email: "test@gmail.com",
  password: "123456",
  name: "Ash",
  role: "STUDENT"
});

console.log(result);