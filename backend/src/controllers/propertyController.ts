import { Request,Response,NextFunction } from "express";
import Property from "../models/propertyModel"
import {v2 as cloudinary} from "cloudinary"

export const createProperty = async ( req : any , res : Response, next: NextFunction) => {
    try{
        const image = req.files?.image;
        if(!image) {
            const error : any = new Error("Image is required.")
            error.statusCode = 400;
            return next(error);
        }
        const result = await cloudinary.uploader.upload(
            image.tempFilePath,{
                folder : "PropertyImages",
                width : 300,
                crop : "scale"
            }
        )
        const {title, description, price, location} = req.body;
        if(!title.trim() || !description.trim() || !price.trim() || !location.trim()) {
            const error : any = new Error("All fields are required.")
            error.statusCode = 400;
            return next(error);
        }
        const property = await Property.create({
title,
description,
price, 
location,
seller : req.user._id,
image : {
    public_id : result.public_id,
    url : result.secure_url
}
        })
        res.status(201).json({
            success : true,
            message : "Property created successfully.",
            property
        })
    }
    catch(error : any) {
        console.log("Error : ", error.message);
        next(error);
    }
}

export const getAllProperties = async ( req: Request , res : Response, next: NextFunction) => {
    try {
        const properties = await Property.find();
        res.status(200).json({
            success : true,
            message : "Properties retrieved successfully.",
            properties
        })
    } catch (error) {
        next(error);
    }
}

export const getSingleProperty = async ( req: Request, res: Response, next : NextFunction) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if(!property) {
           return res.status(404).json({
                success: false,
                message : "Property not found."

            })
          
        }
          res.status(200).json({
                success : true,
                message : `Property with id ${propertyId} fetch successfully.`,
                property
            })
    } catch (error) {
        next(error);
    }
}

export const updateProperty = async (req: any, res : any, next : NextFunction) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if(!property) {
            return res.status(404).json({
                success : false,
                message : "Property not found."

            })

        }
       if(property.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success : false,
            message : "You are not authorized to update this property."
        })
       }
         const {title, description, price, location} = req.body;
         const image = req.files?.image;
         if(image) {
            await cloudinary.uploader.destroy(property.image.public_id);
            const result = await cloudinary.uploader.upload(
                image.tempFilePath,{
                    folder : "PropertyImages",
                    width : 300,
                    crop : "scale"
                })
                property.image = {
                    public_id : result.public_id,
                    url : result.secure_url
                }
         }
            property.title = title || property.title;
            property.description = description || property.description;
            property.price = price || property.price;
            property.location = location || property.location;
           

         await property.save();
         res.status(200).json({
            success : true,
            message : "Property updated successfully.",
            property
        })
    } catch (error) {
        next(error);
    }
}