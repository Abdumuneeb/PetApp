// controllers/pet.controller.ts
import Pet from "../models/Pet";
import { Request, Response } from "express";
import cloudinary from "../config/config";
import { Readable } from "stream";

// Image upload route handler
export const uploadImage = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Image upload failed"));
        }
        resolve(result.secure_url);
      }
    );

    Readable.from(file.buffer).pipe(stream);
  });
};

export const createPet = async (req: any, res: Response) => {
  try {
    const { title, description, price, categoryId, subcategoryId, location } =
      req.body;

    const images: string[] = [];

    // Check if files were uploaded
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const imageUrl = await uploadImage(file);
        images.push(imageUrl);
      }
    }

    const newPet = await Pet.create({
      title,
      description,
      price,
      images,
      categoryId,
      subcategoryId,
      postedBy: req.user?.id,
      location: {
        city: location.city,
        coordinates: {
          type: "Point",
          coordinates: location.coordinates, // [lng, lat]
        },
      },
    });

    res
      .status(201)
      .json({ message: "Pet ad posted successfully", pet: newPet });
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPetDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const petId = req.params.petId; // Get the petId from the URL

    const pet = await Pet.findById(petId)
      .populate("categoryId", "name slug")
      .populate("subcategoryId", "name slug")
      .lean(); // Convert to plain JavaScript object

    if (!pet) {
      res.status(404).json({ message: "Pet not found" });
      return;
    }

    // Typecast the pet object to 'any' to allow deletion of properties
    const petDetails: any = {
      ...pet,
      category: pet.categoryId,
      subcategory: pet.subcategoryId,
    };

    // Now it's safe to delete these properties as we've typecasted 'petDetails' to 'any'
    delete petDetails.categoryId;
    delete petDetails.subcategoryId;

    res.status(200).json(petDetails);
  } catch (error) {
    console.error("Error fetching pet details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
