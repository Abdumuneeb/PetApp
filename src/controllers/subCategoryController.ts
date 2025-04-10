import { Request, Response } from "express";
import SubCategory from "../models/SubCategory";
import Category from "../models/Category";

// Define the interface for the subcategory body request
interface CreateSubCategoryRequestBody {
  name: string;
  slug: string;
  categoryId: string; // categoryId is an ObjectId (string format)
}

export const createSubCategory = async (
  req: Request<{}, {}, CreateSubCategoryRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, slug, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(400).json({ message: "Category not found" });
      return;
    }

    // Check if subcategory already exists within the category
    const existingSubCategory = await SubCategory.findOne({ slug, categoryId });
    if (existingSubCategory) {
      res
        .status(400)
        .json({ message: "Subcategory already exists in this category" });
      return;
    }

    const newSubCategory = new SubCategory({ name, slug, categoryId });
    await newSubCategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Server error" });
  }
};
