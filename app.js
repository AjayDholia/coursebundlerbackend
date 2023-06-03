import express from "express";
import {config} from 'dotenv';
import  ErrorMiddleware from './middleware/Error.js'
import cookieParser from "cookie-parser";
config({
    path:"./config/config.env"
})
const app = express();

// using Middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(cookieParser());
// import and using routes
import course from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
app.use("/api/v1",course)
app.use("/api/v1",user)

export default app


// this function always use in the end of the app.use because it solve all the error in the list
app.use(ErrorMiddleware)