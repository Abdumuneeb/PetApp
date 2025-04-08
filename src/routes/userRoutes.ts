import { getUsers } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/auth";
import express from "express";

const router = express.Router();

router.get("/", authenticateToken, getUsers);

export default router;
