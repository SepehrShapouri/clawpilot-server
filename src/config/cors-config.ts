const defaultOrigins = ["http://localhost:5173", "http://localhost:3000", "null", "file://"];
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(",")
    : defaultOrigins;

const normalizedOrigins = allowedOrigins.map((origin) => origin.trim()).filter(Boolean);

const corsConfig = {
    origin: (origin: string | undefined, callback: (err: Error | null, ok?: boolean) => void) => {
        if (normalizedOrigins.includes(origin ?? "") || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};

export { corsConfig, normalizedOrigins as allowedOrigins };
