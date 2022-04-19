import { Router } from "express";
import userRouter from "./userRouter";
import ticketRouter from "./ticketRouter";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/tickets", ticketRouter);

// Export default.
export default baseRouter;
