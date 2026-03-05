import {z} from "zod";

export const createLessonSchema = z.object({
    title:z.string(),
    content: z.string(),
    courseId: z.string()

})