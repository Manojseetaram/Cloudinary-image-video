import express from "express";
import { generateSignature } from "../controller/sign-uplod";

const router = express.Router();
router.post("/", generateSignature);

export default router;
