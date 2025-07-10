import express from 'express';
import multer from 'multer';
import path from 'path';
import Payment from '../models/Payment.js';

const router = express.Router();

// Multer setup to store uploads in /uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route to handle payment submission
router.post('/', upload.single('screenshot'), async (req, res) => {
  try {
    const { productId, customerId, amount } = req.body;
    const screenshotUrl = req.file ? req.file.path : null;

    const newPayment = new Payment({
      productId,
      customerId,
      amount,
      screenshotUrl,
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment submitted successfully', payment: newPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit payment' });
  }
});

export default router;