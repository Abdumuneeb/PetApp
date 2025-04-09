import mongoose, { Schema } from "mongoose";
import { IChat } from "../types/Chat.types";

const chatMessageSchema = new Schema<IChat>(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
