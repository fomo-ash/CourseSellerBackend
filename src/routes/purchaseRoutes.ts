import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authMiddleware';
import {createPurchaseCourseSchema} from '../schemas/purchaseCourseSchema';
import{ prisma }from '../db';

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole("STUDENT"),
  async (req: AuthRequest, res) => {
    try {

      const result = createPurchaseCourseSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Invalid input"
        });
      }

      const { courseId } = result.data;

      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });

      if (!course) {
        return res.status(404).json({
          message: "Course not found"
        });
      }

      const existingPurchase = await prisma.purchase.findFirst({
        where: {
          userId: req.user!.userId,
          courseId: courseId
        }
      });

      if (existingPurchase) {
        return res.status(400).json({
          message: "Course already purchased"
        });
      }

      const purchase = await prisma.purchase.create({
        data: {
          userId: req.user!.userId,
          courseId
        }
      });

      return res.status(201).json({
        message: "Course purchased successfully",
        purchase
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }
);

export default router;