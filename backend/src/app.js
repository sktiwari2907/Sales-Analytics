import express from "express";
import registerRoutes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json({limit:"5mb"}));

app.use(cors({
    origin: process.env.API_URL,
    credentials: true
}));
registerRoutes(app);

export const ACCESS_SECRET = process.env.ACCESS_SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;

export default app;