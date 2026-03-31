import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/userModel";

export const protectRoute = async ( req : any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token) {
            const error : any = new Error("Unauthorized access. Please login to continue.");
            error.statusCode = 401;
            return next(error);
        }
        const decoded : any = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await User.findById(decoded.userId);
        if(!user) {
            const error : any = new Error("User not found.");
            error.statusCode = 404;
            return next(error);
        }
        req.user = user;
        // console.log("user",user);
        
        next();
    } catch (error) {
        const err : any = new Error("Invalid token.");
        err.statusCode = 401;
        return next(err);
    }
}