import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, slug } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      res
        .status(400)
        .json({ message: "Category with this slug already exists" });
      return;
    }

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
