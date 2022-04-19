import { NextFunction, Request, Response } from "express";
import StatusCodes, { ReasonPhrases } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "src/dbModels/userModel";

const { UNAUTHORIZED } = StatusCodes;
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

  if (authorized) {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      let userID = jwt.verify(token as string, process.env.JWT_SECRET as string);
      let user = await User.findOne({ _id: userID }).select("-password").lean().exec();
      req.user = user;
      next();
    } catch (err) {
      error(err.message);
      res.status(UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
    }
  }

  res.status(UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
};
