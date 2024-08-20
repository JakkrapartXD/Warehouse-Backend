import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  updateAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductImage = mongoose.model("ProductImage", productImageSchema);

export default ProductImage;
