import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import _ from "colors";
import { NODE_ENV } from './env'

import express, { NextFunction, Request, Response } from "express";
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

// Common middlewares

// Show routes called in console during development
// if (NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

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
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message,
    });
  }
);

/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views dir
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static dir
let staticDir;
let dirname = path.resolve();

if (NODE_ENV === "production") {
  // Set build folder as static
  // staticDir = path.join(dirname, "../client/dist");
  // app.use(express.static(staticDir));
  app.use(express.static(path.join(dirname, '/client/dist')));

  // Serve index.html file
  // app.get("*", (_: Request, res: Response) => {
  //   res.sendFile(path.join(dirname, "../client/dist/index.html"));
  // });

  app.get("*", (_: Request, res: Response) => res.sendFile(path.resolve(dirname, 'client', 'dist', 'index.html')) )
} else {
  staticDir = path.join(__dirname, "public");
  app.use(express.static(staticDir));
  
  // Serve index.html file
  app.get("*", (_: Request, res: Response) => {
    res.send("<h1>Welcome to Support Desk API</h1>");
  });
}


// Export here and start in a diff file (for testing).
export default app;
