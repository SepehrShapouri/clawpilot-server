import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import credentials from "./middleware/credentials.js";
import { corsConfig } from "./config/cors-config.js";
import errorHandler from "./middleware/error-handler.js";
import v1Router from "./routes/v1/v1.js";
/* routes imports would go here */

const app: Application = express();

// Middleware
app.use(credentials);
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

/*
 * Add your routes here
 */
app.use("/api/v1/", v1Router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the TypeScript Express API!",
    status: "online",
  });
});

// Custom error handler middleware
app.use(errorHandler);

export default app;
