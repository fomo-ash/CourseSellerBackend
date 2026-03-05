import express from "express";
import { signUpSchema, loginSchema } from "../schemas/authSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../db";


const router = express.Router();
export default router;

router.post("/signup", async (req,res)=>{
  try {

    const result = signUpSchema.safeParse(req.body);

    if(!result.success){
      return res.status(400).json({ message:"Invalid input" });
    }

    const { email, password, name, role } = result.data;

    const hashedPassword = await bcrypt.hash(password,10);

    await prisma.user.create({
      data:{
        email,
        password: hashedPassword,
        name,
        role
      }
    });

    return res.status(201).json({ message:"User created successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message:"Error creating user" });
  }
});

router.post("/login", async (req,res)=>{
  try {

    const result = loginSchema.safeParse(req.body);

    if(!result.success){
      return res.status(400).json({ message:"Invalid input" });
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where:{ email }
    });

    if(!user){
      return res.status(400).json({ message:"User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return res.status(400).json({ message:"Invalid password" });
    }

    const token = jwt.sign(
      { userId:user.id, role:user.role },
      process.env.JWT_SECRET!,
      { expiresIn:"1h" }
    );

    return res.json({ token });

  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message:"Error logging in" });
  }
});