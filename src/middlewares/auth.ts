import { NextFunction, Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../dbModels/userModel";

const { UNAUTHORIZED, NOT_FOUND } = StatusCodes;
const { error } = console;

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

export const secure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorized =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  if (!authorized) {
    return res.status(UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findOne({ _id: id })
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return res.status(NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }

    const currentUser = { ...user, id: user._id };

    req.user = currentUser;
    next();
  } catch (err) {
    error(err.message);

    return res.status(UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};
