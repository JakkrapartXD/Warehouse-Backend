import express from 'express';
import Shelf from '../models/shelf.js';

const router = express.Router();

router.route('/create-shelf').post(async (req, res, next) => {
    try {
        const shelf = await Shelf.create(req.body);
        res.json(shelf);
    } catch (err) {
        next(err);
    }
});

router.route('/').get(async (req, res, next) => {
    try {
        const shelf = await Shelf.find();
        res.json(shelf);
    } catch (err) {
        next(err);
    }
});

router.route('/edit-shelf/:id').get(async (req, res, next) => {
    try {
        const shelf = await Shelf.findById(req.params.id);
        if (!shelf) {
            return res.status(404).json({ message: 'Shelf not found' });
        }
        res.json(shelf);
    } catch (err) {
        next(err);
    }
});

router.route('/update-shelf/:id').put((req, res, next) => {
    Shelf.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, shelf) => {
        if (err) return next(err);
        res.json(shelf);
        console.log("Shelf updated successfully!");
    });
});

router.route('/delete-shelf/:id').delete((req, res, next) => {
    Shelf.findByIdAndRemove(req.params.id, (err, shelf) => {
        if (err) return next(err);
        res.status(200).json({ msg: shelf });
    });
});

router.route("/shelfById/:id").get(async (req, res, next) => {
    try {
        const shelf = await Shelf.findById(req.params.id);
        if (!shelf) return res.status(404).json({ message: "Shelf not found" });
        res.json(shelf);
    } catch (error) {
        next(error);
    }
});

export default router;
