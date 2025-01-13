import express from 'express';
const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { cartItems, total, paymentMethod, phoneNumber } = req.body;

    // Simulate database saving
    const transaction = {
      cartItems,
      total,
      paymentMethod,
      phoneNumber: paymentMethod === 'M-Pesa' ? phoneNumber : null,
      date: new Date(),
    };

    console.log('Transaction saved:', transaction);

    res.status(201).json({ message: 'Transaction recorded successfully', transaction });
  } catch (error) {
    console.error('Error recording transaction:', error);
    res.status(500).json({ error: 'Failed to record transaction' });
  }
});

export { router as ordersRoutes };
