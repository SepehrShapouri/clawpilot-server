import { Router } from "express";
import authRoutes from "./auth.js";
import protectedRoutes from "./protected.js";
import provisionRoutes from "./provision.js";
import onboardingRoutes from "./onboarding.js";

const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/protected", protectedRoutes);
v1Router.use("/provision", provisionRoutes);
v1Router.use("/onboarding", onboardingRoutes);

export default v1Router;
