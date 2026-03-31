import dotenv from "dotenv"
dotenv.config()
import express, {Request ,Response} from "express"
import cors from "cors"
import {connectDB} from"./config/db"
import authRoutes from "./routes/authRoute"
import propertyRoutes from "./routes/propertyRoute"
import favouriteRoute from "./routes/favouriteRoute"
import { errorHandler } from "./middleware/errorHandler"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"
const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});
connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/property",propertyRoutes)
app.use("/api/v1/favourite",favouriteRoute )
app.use(errorHandler);


const port : number = process.env.PORT ?parseInt( process.env.PORT as string ) : 5000
app.get("/", (req:Request, res:Response) => {
    res.send("Hello ")
})

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`)
})