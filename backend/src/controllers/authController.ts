import { Request,Response,NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterRequestBody {
    username : string;
    email : string;
    password : string;
}

interface LoginRequestBody{
    email : string;
    password : string;
}
export const registerUser = async (req: Request<{},{},RegisterRequestBody>, res: Response, next: NextFunction) => {
const {username, email, password } = req.body;
try {
    if(!username || !email || !password) {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    if(password.length < 8){
        const error : any = new Error("Password must be atleast 8 characters long")
        error.statusCode = 400;
        return next(error);
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        const error : any = new Error("Email already existed");
        error.statusCode = 409;
        return next(error);
    }
    const saltRounds : number = process.env.SALT_ROUNDS ?parseInt(process.env.SALT_ROUNDS as string) : 10;
    const hashPassword : string = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({username,email, password : hashPassword});
    res.status(201).json({
        success : true,
        message : "User registered successfully",
        user_id : newUser._id
    });
} catch (error : any) {
   error.statusCode = error.statusCode || 500;
    next(error);
}
}

export const loginUser = async (req:Request<{}, {}, LoginRequestBody>, res: Response, next : NextFunction) => {
    const {email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const user = await User.findOne({
            email
        })
        if(!user){
            const err : any = new Error("User not found");
            err.statusCode = 404;
           return next(err)
        }
        const isPasswordValid : boolean = await bcrypt.compare(password, user.password as string)
        if(!isPasswordValid){
            const err : any = new Error("Invalid credentials");
            err.statusCode = 401;
            return next(err)
        }
        const token : string = jwt.sign({ userId : user._id }, process.env.JWT_SECRET as string, {expiresIn : "1D"})
        res.status(200).json({
            success : true,
            message : "Login Successfully",
            token
            
        })
    } catch (error : Error | any) {
        error.statusCode = error.statusCode || 500;
        next(error);
        
    }

}