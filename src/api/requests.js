import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions"; // Adjust URL based on your backend

// Create a new transaction
export const createTransaction = async (transactionData) => {
  return await axios.post(`${API_URL}/create`, transactionData);
};

// Fetch transactions
export const fetchTransactions = async (filters) => {
  return await axios.get(`${API_URL}/list`, { params: filters });
};

// Update a transaction
export const updateTransaction = async (transactionData) => {
  return await axios.put(`${API_URL}/update/${transactionData.id}`, transactionData);
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  return await axios.delete(`${API_URL}/delete/${transactionId}`);
};
