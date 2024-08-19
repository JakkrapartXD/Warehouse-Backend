import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExportSchema = new Schema({
    exportId: { type: String, required: true, max: 100 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Export = mongoose.model('Export', ExportSchema);

export default Export;
