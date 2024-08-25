import express from "express";
import Warehouse from "../models/Warehouse.js";

const router = express.Router();

router.route("/create-warehouse").post(async (req, res, next) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
});

router.route("/").get(async (req, res, next) => {
  try {
    const warehouse = await Warehouse.find();
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
});

router.route("/edit-warehouse/:id").get(async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    res.json(warehouse);
  } catch (err) {
    next(err);
  }
});

router.route("/update-warehouse/:id").put(async (req, res, next) => {
  const warehouseid = req.params.id;
  console.log(req.body);
  
  const warehouse = await Warehouse.findByIdAndUpdate(warehouseid, {
    $set: req.body,
  });
  if (!warehouse) {
    return res.status(404).json({ message: "warehouse not found" });
  } else {
    res.json(warehouse);
  }
});

router.route("/delete-warehouse/:id").delete((req, res, next) => {
  Warehouse.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ msg: result });
    })
    .catch((err) => {
      next(err);
    });
});

router.route("/warehouseById/:id").get(async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse)
      return res.status(404).json({ message: "Warehouse not found" });
    res.json(warehouse);
  } catch (error) {
    next(error);
  }
});

export default router;
