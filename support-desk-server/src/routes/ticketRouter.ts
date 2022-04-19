import express from "express";
import { secure } from "src/middlewares/auth";
import { getTickets, createTicket, getTicket } from "../controllers/ticketController";

const router = express.Router();

router.route("/")
    .get(secure, getTickets)
    .post(secure, createTicket);

router.route("/:id")
    .get(secure, getTicket)

export default router;