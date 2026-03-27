import dotenv from "dotenv"
dotenv.config()
import express, {Request ,Response} from "express"
import cors from "cors"
import {connectDB} from"./config/db"
import authRoutes from "./routes/authRoute"
import { errorHandler } from "./middleware/errorHandler"
const app = express()
app.use(cors())
app.use(express.json())

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);


const port : number = process.env.PORT ?parseInt( process.env.PORT as string ) : 5000
app.get("/", (req:Request, res:Response) => {
    res.send("Hello ")
})

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`)
})