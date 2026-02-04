import { fromNodeHeaders } from "better-auth/node";
import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth/auth.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      session?: any;
    }
  }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user and session to the request object
    req.user = session.user;
    req.session = session.session;
    next();
};
