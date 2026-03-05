import express, { Response } from "express";
import { authMiddleware, requireRole, AuthRequest } from "../middleware/authMiddleware";
import { createCourseSchema } from "../schemas/courseSchema";
import { prisma } from "../db";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("INSTRUCTOR"),
  async (req: AuthRequest, res: Response) => {
    try {
      const result = createCourseSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Invalid input"
        });
      }

      const { title, description, price } = result.data;

      const course = await prisma.course.create({
        data: {
          title,
          description,
          price,
          instructorId: req.user!.userId
        }
      });

      return res.status(201).json(course);

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }
);

router.get("/", async (req, res) => {
  try{
    const courses= await prisma.course.findMany({
      include:{
        instructor:{
          select:{ id:true, name:true }
        }
      }
    })
    return res.json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
)

router.get("/:id", async(req,res)=>{
  try{
    const course= await prisma.course.findUnique({
      where:{
        id:req.params.id

      },
      include:{
        lessons:true
      }

    
    })
    if(!course){
      return res.status(404).json({
        message:"Course not found"
      })

    }
    return res.json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
})

export default router;