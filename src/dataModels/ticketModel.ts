import { Types } from "mongoose"

type Status = "new" | "open" | "closed";

export type ITicket = {
  user: string | Types.ObjectId;
  product: string;
  description: string;
  status: Status;
};
