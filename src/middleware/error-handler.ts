import { Request, Response, NextFunction } from "express";
import { logEvents } from "../lib/log-events.js";
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status =
        (err as Error & { status?: number; statusCode?: number }).status ??
        (err as Error & { status?: number; statusCode?: number }).statusCode ??
        500;
    const message = err.message || "Internal Server Error";

    logEvents(`${err.name}: ${message}`, "errLog.txt");
    console.error(err.stack);
    res.status(status).json({ message });
};

export default errorHandler;
