import { Router } from "express";
import userRouter from "./userRouter";
import ticketRouter from "./ticketRouter";
// import noteRouter from "./noteRouter";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/users", userRouter);
baseRouter.use("/tickets", ticketRouter);

export default baseRouter;
