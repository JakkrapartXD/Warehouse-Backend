import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.route('/create-product').post(async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
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

router.route('/edit-product/:id').get(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
});

router.route("/update-product/:id").put(async (req, res) => {
    try {
        const updateData = {};

        // Loop through the nested object
        Object.keys(req.body).forEach((key) => {
            if (typeof req.body[key] === 'object' && req.body[key] !== null) {
                // If the value is an object, merge its keys into updateData
                Object.keys(req.body[key]).forEach((value) => {
                    updateData[`${value}`] = req.body[key][value];
                });
            } else {
                updateData[key] = req.body[key];
            }
        });

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        res.json(updatedProduct);
        console.log("Product updated successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("เกิดข้อผิดพลาดขณะอัปเดตสินค้า");
    }
});

router.route("/delete-product/:id").delete(async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: result });
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
