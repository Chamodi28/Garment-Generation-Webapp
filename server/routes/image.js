import express from "express";
import multer from 'multer'

import { generateImage, editImageUsingImage, detailEditImageUsingImage } from "../controllers/imageController.js";

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, 'tempImage'); // Same name for all uploads
    },
  });
  const upload = multer({ storage: storage });

router.post("/generate", generateImage);
router.post("/edit", upload.single('image'), editImageUsingImage );
router.post("/edit-detail", upload.single('image'), detailEditImageUsingImage );

export { router as imageRouter };
