import express from 'express';
import ProductImage from '../models/ProductImage.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Create a new product image
router.post('/', authenticate, async (req, res) => {
  const { image, filename, contentType } = req.body;

  try {
    const productImage = new ProductImage({ image, filename, contentType });
    await productImage.save();
    res.json({ message: 'Product image created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all product images
router.get('/', authenticate, async (req, res) => {
  try {
    const productImages = await ProductImage.find();
    res.json(productImages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a product image by ID
router.get('/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  try {
    const productImage = await ProductImage.findById(id);
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    res.json(productImage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product image
router.put('/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  const { image, filename, contentType } = req.body;

  try {
    const productImage = await ProductImage.findByIdAndUpdate(id, { image, filename, contentType }, { new: true });
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    res.json(productImage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product image
router.delete('/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  try {
    await ProductImage.findByIdAndDelete(id);
    res.json({ message: 'Product image deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;