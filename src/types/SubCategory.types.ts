import mongoose from "mongoose";

export interface ISubCategory {
  name: string;
  slug: string;
  categoryId: mongoose.Schema.Types.ObjectId;
}
