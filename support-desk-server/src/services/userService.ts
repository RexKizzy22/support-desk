import { IUser } from "src/dataModels/userModel";
import { UserNotFoundError } from "@shared/errors";
import User from "../dbModels/userModel";
import { generateToken } from "src/middlewares/auth";

const { error } = console;

/**
 * Get all users.
 *
 * @returns
 */
const getAll = async (): Promise<IUser[]> => {
  return await User.find();
};

/**
 * Get one users.
 *
 * @returns
 */
const getOne = async (user: IUser): Promise<IUser> => {
  try {
    const newUser = await User.findOne(user).lean().exec();
    if (!newUser) {
      throw new UserNotFoundError();
    }

    const data = {
      id: newUser._id,
      name: newUser.name,
      token: generateToken(newUser._id),
      email: newUser.email,
      password: newUser.password
    };

    return data;
  } catch (err) {
    error(err.message);
    throw new Error("Error: finding user");
  }
};

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
const addOne = async (user: IUser): Promise<IUser> => {
  try {
    const userExists = await User.exists({ email: user.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = await User.create(user);
    return {
      id: newUser._id,
      token: generateToken(newUser._id),
      email: newUser.email,
      password: newUser.password
    };
  } catch (err) {
    error(err.message);
    throw new Error(err.message);
  }
};


// Export default
export default {
  getAll,
  getOne,
  addOne,
} as const;
