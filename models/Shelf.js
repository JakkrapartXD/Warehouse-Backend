import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShelfSchema = new Schema({
    shelfId: { type: String, required: true, max: 100 },
    shelfName: { type: String, required: true, max: 100 },
    warehouseId: { type: String, required: true, max: 100 },
    status: { type: String, max: 100 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Shelf = mongoose.model('Shelf', ShelfSchema);

export default Shelf;
