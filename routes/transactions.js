import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Add a new transaction
router.post("/add", async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    if (!amount || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newTransaction = new Transaction({ amount, description });
    await newTransaction.save();
    
    res.status(201).json({ message: "Transaction added!", transaction: newTransaction });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all transactions
router.get("/all", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
