import express from "express";
import ProductImage from "../models/ProductImage.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware to authenticate requests
import { jwtValidate } from "../middleware/index.js";

// Create a new product image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const filename = req.file.filename;
    const productImage = await ProductImage.create({
      filename,
      updateAt: Date.now(),
    });
    res.json({
      message: "Product image created successfully",
      img: productImage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all product images
router.get("/", jwtValidate, async (req, res) => {
  try {
    const productImages = await ProductImage.find().select("filename");
    res.json(productImages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/test", async (req, res) => {
  res.send("upload file");
});

// Get a product image by ID
router.get("/:id", jwtValidate, async (req, res) => {
  const id = req.params.id;
  try {
    const productImage = await ProductImage.findById(id);
    if (!productImage) {
      return res.status(404).json({ message: "Product image not found" });
    }
    res.json(productImage.filename);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a product image
router.put(
  "/edit/:id",
  upload.single("image"),
  jwtValidate,
  async (req, res) => {
    const id = req.params.id;
    const filename = req.file.filename;
    try {
      const oldImage = await ProductImage.findById(id);
      console.log(oldImage);

      if (oldImage) {
        const filePath = `./uploads/${oldImage.filename}`;
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
        const productImage = await ProductImage.findByIdAndUpdate(id, {
          filename,
          updateAt: Date.now(),
        });
        if (!productImage) {
          return res.status(404).json({ message: "Product image not found" });
        } else {
          res.json(productImage);
        }
      } else {
        return res.status(404).json({ message: "local image not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete a product image
router.delete("/delete/:id", jwtValidate, async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  try {
    const productImage = await ProductImage.findById(id);
    // console.log(productImage.filename);
    if (!productImage) {
      res.status(404).send(`File not found!`);
    } else {
      const filePath = `./uploads/${productImage.filename}`;
      console.log(filePath);
      fs.unlink(filePath, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
      await ProductImage.findByIdAndDelete(id);
      res.json({ message: "Product image deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
