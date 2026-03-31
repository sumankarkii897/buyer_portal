import mongoose from "mongoose";
const { Schema } = mongoose;

export interface IProperty  {
  image: {
    public_id : string;
    url : string;
  }
  title: string;
  description: string;
  price: number;
  location: string;
  seller: mongoose.Types.ObjectId;
}

const propertySchema = new Schema<IProperty>({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  title : {
    type : String,
    required : true,

  },
  description : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  location : {
    type : String,
    required : true,
  },
  seller : {
    type : mongoose.Types.ObjectId,
    ref : "User",
    required : true,
  }
},
{timestamps : true});

export default mongoose.model<IProperty>("Property", propertySchema);