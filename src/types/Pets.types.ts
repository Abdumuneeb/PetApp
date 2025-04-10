import mongoose from "mongoose";

export interface ILocation {
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: mongoose.Schema.Types.ObjectId;
  subcategoryId?: mongoose.Schema.Types.ObjectId;
  postedBy: mongoose.Schema.Types.ObjectId;
  location: {
    city: string;
    coordinates: {
      type: string;
      coordinates: number[];
    };
  };
  isSold: boolean;
}
