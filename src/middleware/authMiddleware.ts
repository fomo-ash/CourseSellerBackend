import type { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    user?:{
        userId:string;
        role:string;
    }
}

export const authMiddleware= (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{

try{
    const authHeader=req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    const decoded= jwt.verify(
        token,
        process.env.JWT_SECRET!) as { userId:string; role:string };

    req.user={
        userId: decoded.userId,
        role: decoded.role
    }

    next();
    

}
catch(error){
    console.error(error);
    return res.status(401).json({
        message:"Internal server error"
    })
}


}

export const requireRole=(role:string)=>{
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
        if(!req.user){
            return res.status(401).json({
                message:"Unauthorised"
            })
        }
        if(role !== req.user.role){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        next();
    }
}