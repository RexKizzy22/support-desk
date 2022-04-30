import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user ID"],
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a ticket ID"],
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Note", noteSchema);
