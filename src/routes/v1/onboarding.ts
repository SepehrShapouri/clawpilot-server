import { Router } from "express";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../../middleware/auth.js";
import db from "../../lib/drizzle/db.js";
import { user } from "../../lib/drizzle/schema.js";

const onboardingRoutes = Router();

onboardingRoutes.use(authMiddleware);

onboardingRoutes.get("/", async (req, res) => {
    const userId = req.user?.id as string | undefined;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const rows = await db
        .select({
            onboardingStep: user.onboardingStep,
            onboardedAt: user.onboardedAt,
        })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    const record = rows[0];
    return res.json({
        userId,
        onboardingStep: record?.onboardingStep ?? "integrations",
        completed: Boolean(record?.onboardedAt),
    });
});

onboardingRoutes.post("/", async (req, res) => {
    const userId = req.user?.id as string | undefined;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = req.body ?? {};
    const onboardingStep =
        typeof payload.onboardingStep === "string"
            ? payload.onboardingStep
            : "integrations";
    const update: {
        onboardingStep: string;
        onboardedAt?: Date | null;
    } = { onboardingStep };

    if (payload.completed === true) {
        update.onboardedAt = new Date();
    } else if (payload.completed === false) {
        update.onboardedAt = null;
    }

    await db.update(user).set(update).where(eq(user.id, userId));

    return res.json({
        userId,
        onboardingStep,
        completed: update.onboardedAt ? true : false,
    });
});

export default onboardingRoutes;
