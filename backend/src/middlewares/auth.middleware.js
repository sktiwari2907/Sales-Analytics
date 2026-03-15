import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../app.js";
import db from "../db/db.js";

export const authenticate = async(req, res, next) => {
    const token = req.cookies.accesstoken;

    if (!token) return res.status(401).json({status: "failure", message: "Not authenticated" });

    const user = jwt.verify(token, ACCESS_SECRET);

    req.user = user;
    next();
};