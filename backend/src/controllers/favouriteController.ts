import {Request, Response, NextFunction} from "express"
import Favourite from "../models/favouriteModel"
import Property from "../models/propertyModel"

export const addFavourite = async (req: any, res: Response, next: NextFunction) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await Property.findById(propertyId);
        if(!property) {
            res.status(404).json({
                success : false,
                message : "Property not found."
            })
        }
        const existingFavourite = await Favourite.findOne({
            user : req.user._id,
            property : propertyId
        })
        if(existingFavourite) {
            return res.status(400).json({
                success : false,
                message : "Property is already in favourites."
            })
        }
        const favourite = await Favourite.create({
            user  : req.user._id,
            property : propertyId,
           
            
        })
        res.status(201).json({
            success : true,
            message : "Property added to favourites.",
            favourite,
             isFavourite : true
        })
    } catch (error) {
       next(error); 
    }
}

export const removeFavourite = async (req: any, res: Response, next: NextFunction) => {
    try {
        const propertyId = req.params.propertyId;
        const favourite = await Favourite.findOneAndDelete({
            user : req.user._id,
            property : propertyId
        })
        if(!favourite) {
            res.status(404).json({
                success : false,
                message : "Favourite not found."
            })
        }
        res.status(200).json({
            success : true,
            message : "Favourite removed."
        })
    } catch (error) {
        next(error);
    }
}

export const getFavourites = async (req: any, res: Response, next : NextFunction) => {
    try {
        const favourites = await Favourite.find({user : req.user._id}).populate("property");
        res.status(200).json({
            success : true,
            message : "Favourites retrieved successfully.",
            favourites
        })
    } catch (error) {
        next(error);
    }
}
