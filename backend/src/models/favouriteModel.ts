import mongoose from "mongoose";

interface IFavourite {
    user : mongoose.Types.ObjectId;
    property : mongoose.Types.ObjectId;
    isFavourite : boolean;
}

const favouriteSchema = new mongoose.Schema<IFavourite>({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    property : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Property",
        required : true
    },
    isFavourite : {
        type : Boolean,
        default : true
    }
},
{ timestamps : true})

favouriteSchema.index({ user : 1, property : 1}, {unique : true})

export default mongoose.model<IFavourite>("Favourite", favouriteSchema)