const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category,
      date,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction", error });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;