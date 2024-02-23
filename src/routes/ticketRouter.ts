/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { secure } from "../middlewares/auth";
import {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController";
import noteRouter from "./noteRouter";

const router = express.Router();

// Re-route to noteRouter
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(secure, getTickets).post(secure, createTicket);

router.route("/:id")
  .get(secure, getTicket)
  .put(secure, updateTicket)
  .delete(secure, deleteTicket);


export default router;
