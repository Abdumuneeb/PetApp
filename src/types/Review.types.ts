import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  reviewedUserId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
  rating: number;
  comment?: string;
}
