import { Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import bcrypt from "bcrypt";
// import asyncHandler from "express-async-handler";
import userService from "@services/userService";
import { ParamMissingError } from "@shared/errors";
import { IUser } from "src/dataModels/userModel";
// import { generateToken } from "src/middlewares/auth";

const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN } = StatusCodes;
const { log, error } = console;

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

    return res.status(OK).json({ message: newUser });
  } catch (error) {
    error(error.message);
    res.status(FORBIDDEN).json({ message: ReasonPhrases.FORBIDDEN });
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
      email,
    });

    const matched = await bcrypt.compare(password, newUser.password as string);
    if (matched) {
      return res.status(OK).json({ message: newUser });
    } else {
      return res
        .status(UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    }
  } catch (err) {
    error(err.message);
    res.status(BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
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

export const updateOne = async (req: Request, res: Response) => {
  const { user } = req.body;
  // Check param
  if (!user) {
    throw new ParamMissingError();
  }
  // Fetch data
  await userService.updateOne(user);
  return res.status(OK).end();
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }
  // Fetch data
  await userService.delete(Number(id));
  return res.status(OK).end();
};
