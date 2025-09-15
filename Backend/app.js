import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.routes.js";
import user_routes from "./src/routes/user.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use("/api/user", user_routes);
app.use("/api/create", short_url);
app.use("/api/auth", auth_routes);
app.get("/:id", redirectFromShortUrl);

// Error handler
app.use(errorHandler);

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("✅ Server is running on http://localhost:5000");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
