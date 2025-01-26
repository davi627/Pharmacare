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
    const savedTransaction = await transaction.save();
    res.status(201).json({ message: 'Transaction recorded successfully', transaction: savedTransaction });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Failed to record transaction' });
  }
});

//Getting the transactions
router.get('/transactions',async(req,res)=>{
    try {
        const transactions=await Transaction.find();
        res.json(transactions);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'})
        
    }
})

// Get Payment Method Analytics
router.get('/payment-analytics', async (req, res) => {
  try {
      const paymentMethodAnalytics = await Transaction.aggregate([
          {
              $group: {
                  _id: {
                      method: '$method',
                      month: { $month: '$timestamp' },
                      year: { $year: '$timestamp' }
                  },
                  totalAmount: { $sum: '$amount' },
                  transactionCount: { $sum: 1 }
              }
          },
          {
              $sort: { '_id.year': 1, '_id.month': 1 }
          }
      ]);

      res.json(paymentMethodAnalytics);
  } catch (error) {
      console.error('Error fetching payment analytics:', error);
      res.status(500).json({ error: 'Failed to fetch payment analytics' });
  }
});

// Get Sales Analytics (Weekly, Monthly, Yearly)
router.get('/sales-analytics', async (req, res) => {
  try {
      const salesAnalytics = {
          weekly: await Transaction.aggregate([
              {
                  $group: {
                      _id: {
                          year: { $year: '$timestamp' },
                          week: { $week: '$timestamp' }
                      },
                      totalAmount: { $sum: '$amount' }
                  }
              },
              { $sort: { '_id.year': 1, '_id.week': 1 } }
          ]),
          monthly: await Transaction.aggregate([
              {
                  $group: {
                      _id: {
                          year: { $year: '$timestamp' },
                          month: { $month: '$timestamp' }
                      },
                      totalAmount: { $sum: '$amount' }
                  }
              },
              { $sort: { '_id.year': 1, '_id.month': 1 } }
          ]),
          yearly: await Transaction.aggregate([
              {
                  $group: {
                      _id: { $year: '$timestamp' },
                      totalAmount: { $sum: '$amount' }
                  }
              },
              { $sort: { '_id': 1 } }
          ])
      };

      res.json(salesAnalytics);
  } catch (error) {
      console.error('Error fetching sales analytics:', error);
      res.status(500).json({ error: 'Failed to fetch sales analytics' });
  }
});
export { router as  transactionRoutes};