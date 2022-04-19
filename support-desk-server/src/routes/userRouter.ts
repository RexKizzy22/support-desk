import { Router } from "express";
import {
  getAll,
  updateOne,
  deleteOne,
  register,
  login,
} from "../controllers/userController";

// Constants
const router = Router();

// Paths
export const p = {
  register: "/register",
  login: "/login",
  get: "/all",
  update: "/update",
  delete: "/delete/:id",
} as const;

router.post(p.register, register);
router.post(p.login, login);
router.get(p.get, getAll);
router.put(p.update, updateOne);
router.delete(p.delete, deleteOne);


export default router;
