import userRepo from "@repos/user-repo";
import { IUser } from "src/dataModels/userModel";
import { UserNotFoundError } from "@shared/errors";
import User from "../dbModels/userModel";
import { generateToken } from "src/middlewares/auth";

const { log, error } = console;

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

    return newUser;
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
    };
  } catch (err) {
    error(err.message);
    throw new Error(err.message);
  }
};

/**
 * Update one user.
 *
 * @param user
 * @returns
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await userRepo.persists(user.id as number);
  if (!persists) {
    throw new UserNotFoundError();
  }
  return userRepo.update(user);
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await userRepo.persists(id);
  if (!persists) {
    throw new UserNotFoundError();
  }
  return userRepo.delete(id);
}

// Export default
export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
