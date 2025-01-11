import express from 'express'
import multer from 'multer'
import path from 'path'
import { Products } from '../Models/Products.js'
const router= express.Router()



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

// Posting the products
router.post('/Products', upload.single('image'), async (req, res) => {
    console.log(req.file); // Add this to log the file data
    try {
        const { name, price, quantity, batch, expiry, discount } = req.body;
        const image = req.file ? req.file.path : null;

        const products = new Products({
            name,
            price,
            quantity,
            batch,
            expiry,
            discount,
            image
        });

        await products.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Getting all products
router.get('/Products', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

//deleting the product by id

router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

export {router as ProductsRouter}