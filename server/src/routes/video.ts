import express from "express";
import { createVideo } from "../controller/video";

const router = express.Router();
router.post("/", createVideo);

export default router;
