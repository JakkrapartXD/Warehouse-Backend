import express from "express";
import User from "../models/User.js"; // Import the User model

const router = express.Router();

router.route("/create-user").post(async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.route("/").get(async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.route("/edit-user/:id").get(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.route("/update-user/:id").put((req, res, next) => {
  const user_id = req.params.id;
  User.findByIdAndUpdate(user_id, { $set: req.body })
    .then((user) => {
      res.json(user);
      console.log("User updated successfully!");
    })
    .catch((err) => {
      next(err);
    });
});

router.route("/delete-user/:id").delete(async (req, res, next) => {
  console.log(req.params.id);
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ msg: result });
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
