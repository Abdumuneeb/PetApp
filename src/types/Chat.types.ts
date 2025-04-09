import mongoose, { Document } from "mongoose";

export interface IChat extends Document {
  petId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "Pet";
  };
  senderId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  receiverId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  message: string;
  timestamp: Date;
  readStatus: boolean;
  isRead: boolean;
}
