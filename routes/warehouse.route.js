import express from 'express';
import Warehouse from '../models/Warehouse.js';

const router = express.Router();

router.route('/create-warehouse').post(async (req, res, next) => {
    try {
        const warehouse = await Warehouse.create(req.body);
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
});

router.route('/').get(async (req, res, next) => {
    try {
        const warehouse = await Warehouse.find();
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
});

router.route('/edit-warehouse/:id').get(async (req, res, next) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
});

router.route('/update-warehouse/:id').put((req, res, next) => {
    Warehouse.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, warehouse) => {
        if (err) return next(err);
        res.json(warehouse);
        console.log("Warehouse updated successfully!");
    });
});

router.route('/delete-warehouse/:id').delete((req, res, next) => {
    Warehouse.findByIdAndRemove(req.params.id, (err, warehouse) => {
        if (err) return next(err);
        res.status(200).json({ msg: warehouse });
    });
});

router.route("/warehouseById/:id").get(async (req, res, next) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
        res.json(warehouse);
    } catch (error) {
        next(error);
    }
});

export default router;
