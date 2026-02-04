import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.js";

const protectedRoutes = Router();

protectedRoutes.use(authMiddleware);

protectedRoutes.get("/me", (req, res) => {
    return res.json(req.user);
});

export default protectedRoutes;
