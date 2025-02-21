import express, { Request, Response, Router } from "express";
import { SignupRequestBody } from "../types/signup";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router: Router = express.Router();

router.post(
  "/signup",
  async (
    req: Request<{}, {}, SignupRequestBody>,
    res: Response
  ): Promise<void> => {
    try {
      console.log("req", req.body);

      const { name, email, password, phoneNumber } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error", error: (error as Error).message });
    }
  }
);

export default router;
