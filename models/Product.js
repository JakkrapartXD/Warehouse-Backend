import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productId: { type: String, required: true, max: 100 },
    productName: { type: String, required: true, max: 100 },
    quantity: { type: String, required: true, max: 100 },
    price: { type: String, required: true, max: 100 },
    warehouseId: { type: String, max: 100 },
    warehouseName: { type: String, max: 100 },
    shelfId: { type: String, max: 100 }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
