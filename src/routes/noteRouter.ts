import express from "express";
import { secure } from "../middlewares/auth";
import { addNote, getNotes } from "../controllers/noteController";

const router = express.Router({ mergeParams: true });

router.route("/").get(secure, getNotes).post(secure, addNote);

export default router;
