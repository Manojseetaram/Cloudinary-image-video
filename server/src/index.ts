import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import videoRoutes from "./routes/video";
import signUploadRoutes from "./routes/sign-upload";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/video", videoRoutes);
app.use("/api/sign-upload", signUploadRoutes);

// Start server
app.listen(port, async () => {
    await connectDB();
    console.log(`Server started listening on port: ${port}`);
});
