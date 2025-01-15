import express from 'express';
import { Transaction } from '../Models/Transactions.js';

const router = express.Router();

// Record Transaction API
router.post('/transactions', async (req, res) => {
  const { method, amount, items, ...paymentDetails } = req.body;

  // Validate required fields
  if (!method || !amount || !items) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new transaction document
    const transaction = new Transaction({
      method,
      amount,
      items,
      paymentDetails,
      timestamp: new Date(),
    });

    // Save to database
    const savedTransaction = await transaction.save();

    // Send response
    res.status(201).json({ message: 'Transaction recorded successfully', transaction: savedTransaction });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Failed to record transaction' });
  }
});

export { router as transactionRoutes };
