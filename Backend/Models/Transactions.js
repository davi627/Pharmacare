import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ['cash', 'mpesa'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        batch: { type: String, required: true },
      },
    ],
    paymentDetails: {
      phoneNumber: { type: String },
      transactionId: { type: String }, 
      confirmationCode: { type: String }, 
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', transactionSchema);

export {TransactionModel as Transaction};
