import { Router } from "express";
import {
  getAll,
  register,
  login,
} from "../controllers/userController";

// Constants
const router = Router();

// Paths
export const p = {
  register: "/register",
  login: "/login",
  get: "/all"
} as const;

router.post(p.register, register);
router.post(p.login, login);
router.get(p.get, getAll);


export default router;
