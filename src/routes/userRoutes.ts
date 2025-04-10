import { createCategory } from "../controllers/categoryController";
import {
  createPet,
  getPetDetails,
  getPets,
} from "../controllers/petController";
import { createSubCategory } from "../controllers/subCategoryController";
import { getUsers } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/auth";
import express from "express";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/getPetDetails/:petId", authenticateToken, getPetDetails);
router.get("/getPets", authenticateToken, getPets);

// router.post("/addPet", authenticateToken, createPet);-

router.post("/addPet", authenticateToken, upload.array("images", 5), createPet);
router.post("/addCategory", authenticateToken, createCategory);
router.post("/addSubcategory", authenticateToken, createSubCategory);

export default router;
