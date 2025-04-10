import mongoose, { Schema } from "mongoose";
import { ILocation } from "../types/Pets.types";

const petSchema = new Schema<ILocation>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      city: String,
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" },
      },
    },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
