import mongoose from 'mongoose'


const OrdersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: /^\+254\d{9}$/, 
    },
    product: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partially Paid'],
        default: 'Unpaid',
    },
    notes: {
        type: String,
        trim: true,
    },
    
}, {
    timestamps: true,
});

const OrderModel= mongoose.model('Orders',OrdersSchema)

export{OrderModel as Order}
