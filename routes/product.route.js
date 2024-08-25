import Product from '../models/Product.js';
import express from "express";
import ProductImage from "../models/ProductImage.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsFolder);
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

const router = express.Router();

router.route('/create-product').post(upload.single("image"),async (req, res, next) => {
    try {
        console.log(req.file);
        const {productId,productName,quantity,price} = req.body;
        const filename = req.file.filename;
        const product = await Product.create({
            productId,
            productName,
            quantity,
            price,
            imagename : filename,
            updateAt: Date.now(),
            createdAt: Date.now(),
        })
        res.json(product);
    } catch (err) {
        next(err);
    }
});

router.route('/').get(async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.route('/edit-product/:id').put(async (req, res, next) => {
    const Id = req.params.id;
    Product.findByIdAndUpdate(Id, { $set: req.body })
    .then((product) => {
      res.json(product);
      console.log("product updated successfully!");
    })
    .catch((err) => {
      next(err);
    });
});

router.route("/update-product/:id").put(upload.single("image"),async (req, res) => {
    const Id = req.params.id;
    const filename = req.file.filename;
    // console.log(Id);
    const {productId,productName,quantity,price} = req.body;
    try {
        const oldImage = await Product.findById(Id);
        // console.log(oldImage.imagename);
        if (oldImage) {
          const oldFilePath = path.join(uploadsFolder, oldImage.imagename);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
          const updatedProduct = await Product.findByIdAndUpdate(
            Id,
            {
                productId,
                productName,
                quantity,
                price,
                imagename : filename,
                updateAt: Date.now(),
            },
            { new: true }
        );
        if (!updatedProduct) {
            console.error(error);
        res.status(500).send("เกิดข้อผิดพลาดขณะอัปเดตสินค้า");
            } else {
                res.json(updatedProduct);
        console.log("Product updated successfully!");
            }

        } else {
          return res.status(404).json({ message: "local image not found" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      }

    
});

router.route("/delete-product/:id").delete(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const productImage = await Product.findById(id);
        if (!productImage) {
            res.status(404).send(`File not found!`);
          } else {
            const filePath = `./uploads/${productImage.imagename}`;
            console.log(`filepath ${filePath}`);
            fs.unlink(filePath, function (err) {
              if (err) return console.log(err);
              console.log("file deleted successfully");
            });
            await Product.findByIdAndDelete(id);
            res.json({ message: "Product deleted successfully" });
          }   
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route("/productByWarehouseId/:id").get(async (req, res, next) => {
    try {
        const products = await Product.find({warehouseId: req.params.id});
        if (!products) return res.status(404).json({ message: "Warehouse not found" });
        res.json(products);
    } catch (error) {
        next(error);
    }
});

export default router;
