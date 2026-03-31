import {Request, Response, NextFunction} from "express";

export const authorizeRole = (roles : string) => {
    return (req : any , res : Response , next : NextFunction) => {
        if(req.user.role !== roles.toLowerCase()) {
            return res.status(403).json({
                success : false,
                message : "Access denied."
            })

        }
        next();
    }
}