import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import cookiParser from 'cookie-parser'

export const app = express()

// middlewares
app.use(errorMiddleware)
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookiParser())

// routes
import  userRoutes  from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import pdfRouter from "./routes/pdf.routes.js";

app.use("/api/user",userRoutes);
app.use("/api/video",videoRouter);
app.use("/api/pdf/",pdfRouter);