import express from "express";
import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import { apiLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(apiLimiter);
app.use(errorHandler);
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/courses",courseRoutes);
app.use("/lessons",lessonRoutes);
app.use("/purchases", purchaseRoutes);
    

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
