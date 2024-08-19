import express from 'express';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

router.route('/create-user').post(async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.route('/').get(async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.route('/edit-user/:id').get(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
        if (err) return next(err);
        res.json(user);
        console.log("User updated successfully!");
    });
});

router.route('/delete-user/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return next(err);
        res.status(200).json({ msg: user });
    });
});

export default router;
