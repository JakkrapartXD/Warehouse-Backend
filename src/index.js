import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConfig from '../database/db.js';
import {jwtValidate} from "../middleware/index.js";
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

dotenv.config()

// Express Route
import userRoute from '../routes/user.route.js';
import authRoute from '../routes/auth.route.js';
import productRoute from "../routes/product.route.js";
import warehouseRoute from "../routes/warehouse.route.js";
import shelfRoute from "../routes/shelf.route.js"
import exportRoute from "../routes/export.route.js";
import ProductImage from '../routes/productimage.route.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, '../uploads');



// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database successfully connected')
},
    error => {
        console.log('Database could not connected: ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/users', userRoute);
app.use('/auth' , authRoute);
app.use('/products' , productRoute);
app.use('/warehouse' , warehouseRoute);
app.use('/shelf' , shelfRoute);
app.use('/export' , exportRoute);
app.use('/productimg' , ProductImage);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(uploadFolder, filename);
  res.sendFile(imagePath);
});

// PORT
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 404 Error
app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: error.message
  });
  next(createError(404));
});

// Error Handler
app.use((error, req, res, next) => {
    console.log(error.message);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send(error.message);
});

export default app;
