import { Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import bcrypt from "bcrypt";
// import asyncHandler from "express-async-handler";
import userService from "../services/userService"; // "@services/userService"
import { ParamMissingError } from "../shared/errors"; // "@shared/errors";
import { IUser } from "../dataModels/userModel"; // "src/dataModels/userModel";
// import { generateToken } from "src/middlewares/auth";

const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } = StatusCodes;
const { error } = console;

/**
 *
 * @desc   register new user
 * @access "public"
 * @route  /users/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: IUser = req.body;

    if (!name || !email || !password) {
      throw new ParamMissingError();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userService.addOne({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(OK).json(newUser);
  } catch (err) {
    error(err.message);
    res.status(FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  }
};

/**
 *
 * @desc   login registered user
 * @access "public"
 * @route  /users/login
 */
export const login = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  try {
    if (!email || !password) {
      throw new ParamMissingError();
    }

    const newUser = await userService.getOne({
      email
    });

    const matched = await bcrypt.compare(password, newUser.password as string);
    if (matched) {
      return res.status(OK).json(newUser);
    } else {
      return res
        .status(UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    }
  } catch (err) {
    error(err.message);
    res.status(BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
  }
};

/**
 *
 * @desc   Get all users
 * @access "private"
 * @route  /api/users
 */
export const getAll = async (_req: Request, res: Response) => {
  const users = await userService.getAll();
  return res.status(OK).json({ users });
};

export const addOne = async (req: Request, res: Response) => {
  const { user } = req.body;
  // Check param
  if (!user) {
    throw new ParamMissingError();
  }
  // Fetch data
  await userService.addOne(user);
  return res.status(CREATED).end();
};

