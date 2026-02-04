import { Request, Response, NextFunction } from "express";
import { allowedOrigins } from "../config/cors-config.js";
export default function credentials(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
}
