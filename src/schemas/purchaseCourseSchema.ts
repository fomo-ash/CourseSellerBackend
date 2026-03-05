import {z} from "zod";

export const createPurchaseCourseSchema= z.object({
    courseId: z.string().uuid(),
})