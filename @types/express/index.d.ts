import { IUser } from "../../src/dataModels/userModel";

 declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
