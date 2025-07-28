import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "./requestmethods";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [updatedId, setUpdatedId] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("0");
  const [updatedDate, setUpdatedDate] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search term

  const handleAddExpense = () => setShowAddExpense(!showAddExpense);
  const handleShowReport = () => setShowReport(!showReport);
  const handleShowEdit = () => setShowEdit(!showEdit);

  const fetchExpenses = async () => {
    try {
      const response = await publicRequest.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount,
      });
      fetchExpenses();
      setShowAddExpense(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdateExpense = async () => {
    try {
      await publicRequest.put(`/expenses/${updatedId}`, {
        label: updatedLabel,
        date: updatedDate,
        value: updatedAmount,
      });
      fetchExpenses();
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <h1 className="text-2xl font-medium text-[#555]">Expense Tracker</h1>

      <div className="flex justify-between mt-5 w-[90%]">
        <div className="flex space-x-4">
          <button
            className="bg-[#af8978] p-2 text-white"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
          <button
            className="bg-blue-400 p-2 text-white"
            onClick={handleShowReport}
          >
            Expense Report
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-2 border-[#444]"
        />
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="absolute top-[20%] left-[10%] z-50 bg-white p-5 w-[400px] shadow-xl">
          <FaWindowClose
            className="text-red-500 text-2xl cursor-pointer float-right"
            onClick={handleAddExpense}
          />
          <h2 className="text-lg font-bold mb-4">Add New Expense</h2>
          <input
            type="text"
            placeholder="Expense Name"
            className="border p-2 w-full mb-2"
            onChange={(e) => setLabel(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 w-full mb-2"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full mb-2"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-[#af8978] text-white p-2 w-full"
            onClick={handleExpense}
          >
            Add
          </button>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="absolute top-[20%] left-[30%] z-50 bg-white p-5 w-[500px] shadow-xl">
          <FaWindowClose
            className="text-red-500 text-2xl cursor-pointer float-right"
            onClick={handleShowReport}
          />
          <h2 className="text-lg font-bold mb-4">Expense Report</h2>
          {expenses.length > 0 ? (
            <PieChart
              series={[
                {
                  data: expenses.map((e) => ({
                    label: e.label,
                    value: e.value,
                  })),
                  innerRadius: 30,
                  outerRadius: 100,
                },
              ]}
              width={400}
              height={300}
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}

      {/* Expense List */}
      <div className="mt-10 w-[90%] space-y-4">
        {expenses
          .filter((expense) =>
            expense.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border p-4"
            >
              <div>
                <h3 className="font-semibold">{expense.label}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">${expense.value}</span>
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setUpdatedId(expense._id);
                    setUpdatedLabel(expense.label);
                    setUpdatedAmount(expense.value);
                    setUpdatedDate(expense.date.slice(0, 10));
                    setShowEdit(true);
                  }}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteExpense(expense._id)}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="absolute top-[25%] right-0 z-50 bg-white p-5 w-[400px] shadow-xl">
          <FaWindowClose
            className="text-red-500 text-2xl cursor-pointer float-right"
            onClick={() => setShowEdit(false)}
          />
          <h2 className="text-lg font-bold mb-4">Edit Expense</h2>
          <input
            type="text"
            value={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            value={updatedAmount}
            onChange={(e) => setUpdatedAmount(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            className="bg-[#af8978] text-white p-2 w-full"
            onClick={handleUpdateExpense}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
