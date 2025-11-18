import jwt from "jsonwebtoken";
export const signToken = d => jwt.sign(d, process.env.JWT_SECRET, {expiresIn:"7d"});
export const verifyToken = t => jwt.verify(t, process.env.JWT_SECRET);