import express from 'express';
import Export from '../models/Export.js';

const router = express.Router();

router.route('/create-export').post(async (req, res, next) => {
    try {
        const exports = await Export.create(req.body);
        res.json(exports);
    } catch (err) {
        next(err);
    }
});

router.route('/').get(async (req, res, next) => {
    try {
        const exports = await Export.find();
        res.json(exports);
    } catch (err) {
        next(err);
    }
});

router.route('/edit-export/:id').get(async (req, res, next) => {
    try {
        const exports = await Export.findById(req.params.id);
        if (!exports) {
            return res.status(404).json({ message: 'Export not found' });
        }
        res.json(exports);
    } catch (err) {
        next(err);
    }
});

router.route('/update-export/:id').put((req, res, next) => {
    Export.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, exports) => {
        if (err) return next(err);
        res.json(exports);
        console.log("Export updated successfully!");
    });
});

router.route('/delete-export/:id').delete((req, res, next) => {
    Export.findByIdAndRemove(req.params.id, (err, exports) => {
        if (err) return next(err);
        res.status(200).json({ msg: exports });
    });
});

router.route("/exportById/:id").get(async (req, res, next) => {
    try {
        const exports = await Export.findById(req.params.id);
        if (!exports) return res.status(404).json({ message: "Export not found" });
        res.json(exports);
    } catch (error) {
        next(error);
    }
});

export default router;
