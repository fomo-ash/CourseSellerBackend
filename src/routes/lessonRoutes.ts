import express, {Response} from 'express';
import { authMiddleware, AuthRequest, requireRole } from '../middleware/authMiddleware';
import { createLessonSchema } from '../schemas/lessonSchema';
import { prisma } from '../db';

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("INSTRUCTOR"),
  async (req: AuthRequest, res: Response) => {
    try {

      const result = createLessonSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Invalid input"
        });
      }

      const { title, content, courseId } = result.data;

      const course = await prisma.course.findUnique({
        where: {
          id: courseId
        }
      });

      if (!course) {
        return res.status(404).json({
          message: "Course not found"
        });
      }

      if (course.instructorId !== req.user!.userId) {
        return res.status(403).json({
          message: "Forbidden"
        });
      }

      const lesson = await prisma.lesson.create({
        data: {
          title,
          content,
          courseId
        }
      });

      return res.status(201).json(lesson);

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }
);

router.get("/course/:courseId/", async(req,res)=>{
    try{

        const { courseId } = req.params;
        const lessons = await
        prisma.lesson.findMany({
                where:{
            courseId: req.params.courseId
                }
        })
        return res.json(lessons);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})

export default router;