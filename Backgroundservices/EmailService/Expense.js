const dotenv = require("dotenv");
const sendMail = require("./helpers/sendMail");
const Expense = require("./models/Expense");

dotenv.config();

const expenseEmail = async () => {
  const expenses = await Expense.find({});

  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  if (totalExpense > 0) {
    let messageOption = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "Monthly Expense Report",
      text: `Total Expenses for this month: $${totalExpense}`,
    };
    await sendMail(messageOption);
  }
};

module.exports = expenseEmail;
