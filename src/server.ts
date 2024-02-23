import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import { NODE_ENV } from "./env";

import express, { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import apiRouter from "./routes/api";
import logger from "jet-logger";
import { CustomError } from "./shared/errors"; // "@shared/errors";

// Constants
const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Security (helmet recommended in express docs)
if (NODE_ENV === "production") {
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use("/api", apiRouter);

// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message,
    });
  }
);

/***********************************************************************************
 *                                  Static content
 **********************************************************************************/

// Set views dir
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

if (NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static("../client/dist"));

  app.get("*", (_: Request, res: Response) => {
    res.sendFile(path.resolve("../client", "dist", "index.html"));
  });
} else {
  app.use(express.static(path.resolve("public")));

  app.get("/", (_: Request, res: Response) => {
    res.send("<h1>Welcome to Support Desk API</h1>");
  });
}

export default app;
