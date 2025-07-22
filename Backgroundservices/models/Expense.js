const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
}, {
  timestamps: true  // adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Expense", ExpenseSchema);
