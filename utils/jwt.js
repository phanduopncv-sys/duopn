import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const sign = (data) => jwt.sign(data, JWT_SECRET);
export const verify = (token) => jwt.verify(token, JWT_SECRET);