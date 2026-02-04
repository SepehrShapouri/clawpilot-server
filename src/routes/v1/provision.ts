import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.js";

const provisionRoutes = Router();

provisionRoutes.use(authMiddleware);

provisionRoutes.get("/", (req, res) => {
  const gatewayUrl = "ws://54.196.207.159:18789";
  const gatewayToken = "8f9afbf4-ac3a-40c3-885c-4d1ee3bcf0da";

  return res.json({
    gatewayUrl,
    gatewayToken,
    userId: req.user?.id ?? null,
    status: "mock",
  });
});

export default provisionRoutes;
