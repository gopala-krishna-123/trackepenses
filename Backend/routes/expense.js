const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

//Add a new expense
router.post("/", async (req, res) => {
  const expense = new Expense({
    label: req.body.label,
      date: req.body.date,
     value: req.body.value,
      
  });

  try {
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//Get all expenses
router.get("/",async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update an expense
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete an expense
router.delete("/:id",async (req, res) => {
    try 
    {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
