import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
    warehouseId: { type: String, required: true, max: 100 },
    warehouseName: { type: String, required: true, max: 100 },
    author: { type: String, required: true, max: 100 },
    status: { type: String, max: 100 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);

export default Warehouse;
