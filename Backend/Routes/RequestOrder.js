import express from 'express';
import { Order } from '../Models/RequestOrder.js';

const router = express.Router();

// Posting the Order
router.post('/orders', async (req, res) => {
    const { 
        name, 
        phone, 
        address, 
        product, 
        quantity, 
        pricePerUnit, 
        totalPrice, 
        orderDate, 
        deliveryDate, 
        paymentStatus, 
        status, 
        notes 
    } = req.body;

    try {
        const order = new Order({
            name,
            phone,
            address,
            product,
            quantity,
            pricePerUnit,
            totalPrice,
            orderDate,
            deliveryDate,
            paymentStatus,
            status,
            notes,
        });

        await order.save();
        res.status(201).json(order);
        console.log('Order saved successfully');
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error);
    }
});

export {router as OrderRouter}
