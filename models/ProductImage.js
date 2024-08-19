const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productImageSchema = new Schema({
  imageId: {
    type: String,
    required: true,
    max: 100
  },
  image: {
    type: Buffer,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductImage = mongoose.model("ProductImage", productImageSchema);

export default ProductImage;
