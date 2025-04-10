import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/auth";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// user Routes
app.use("/api/", userRoutes);

// auth Routes
app.use("/api/auth", authRoutes);

export default app;
