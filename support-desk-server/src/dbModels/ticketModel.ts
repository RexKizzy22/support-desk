import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a ticket"],
      ref: "User"
    },
    product: {
      type: String,
      required: [true, "Please add a product"],
      enum: ["iPhone", "Macbook Pro", "iMac", "iPad"]
    },
    description: {
      type: String,
      required: [true, "Please add a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Ticket", ticketSchema);
