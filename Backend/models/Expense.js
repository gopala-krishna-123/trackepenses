const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  label: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  
}, {
  timestamps: true  // adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Expense", ExpenseSchema);
