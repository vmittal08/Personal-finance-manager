import "./dashboard.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/requests";
import { Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import TransactionList from "./TransactionList";
import Statistics from "./Statistics";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaList, FaChartPie, FaEdit, FaTrash } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [filterRange, setFilterRange] = useState("7");
  const [transactionType, setTransactionType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [editTransaction, setEditTransaction] = useState(null);

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Other"],
    expense: ["Food", "Transport", "Rent", "Utilities", "Shopping", "Other"],
  };

  useEffect(() => {
    // const verifyUser = async () => {
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   if (!user) {
    //     navigate("/login");
    //   } else {
    //     setCurrentUser(user);
    //     setUpdateTrigger(true);
    //   }
    // };

    const verifyUser = async () => {
      const user = { _id: "dummy-user-id" }; // Fake user
      setCurrentUser(user);
      setUpdateTrigger(true);
    };

    verifyUser();
  }, [navigate]);

  useEffect(() => {
    // const loadTransactions = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetchTransactions({
    //       userId: currentUser?._id,
    //       filterRange,
    //       startDate,
    //       endDate,
    //       transactionType,
    //     });
    //     setTransactions(response.data.transactions);
    //   } catch (error) {
    //     toast.error("Failed to load transactions.");
    //   }
    //   setIsLoading(false);
    // };

    const loadTransactions = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setTransactions([
          {
            title: "Sample Income",
            amount: 100,
            type: "income",
            category: "food",
            date: "2025-02-28",
          },
          {
            title: "Sample Expense",
            amount: 50,
            type: "expense",
            category: "food",
            date: "2025-02-27",
          },
        ]); // Fake data
        setIsLoading(false);
      }, 1000);
    };

    if (currentUser) {
      loadTransactions();
    }
  }, [updateTrigger, filterRange, startDate, endDate, transactionType]);

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      if (editTransaction) {
        response = await updateTransaction({
          ...formValues,
          id: editTransaction.id,
        });
        toast.success("Transaction updated!");
      } else {
        response = await createTransaction({
          ...formValues,
          userId: currentUser._id,
        });
        toast.success("Transaction added!");
      }

      if (response.data.success) {
        setTransactions((prevTransactions) =>
          editTransaction
            ? prevTransactions.map((t) =>
                t._id === editTransaction._id ? response.data.transaction : t
              )
            : [...prevTransactions, response.data.transaction]
        );
        setModalVisible(false);
        setFormValues({
          title: "",
          amount: "",
          category: "",
          description: "",
          date: "",
          type: "",
        });
        setEditTransaction(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding/updating transaction");
    }
    setIsLoading(false);
  };

  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setFormValues(transaction);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t._id !== id));
        toast.success("Transaction deleted!");
      } catch (error) {
        toast.error("Failed to delete transaction.");
      }
    }
  };

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const chartData = [
    { name: "Income", value: incomeTotal },
    { name: "Expense", value: expenseTotal },
  ];
  const COLORS = ["#28a745", "#dc3545"];

  return (
    <>
      <Navbar />
      <Container
        className="dashboard-container"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${process.env.PUBLIC_URL}/images/bg1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <div className="filter-section">
                <Form.Select
                  value={filterRange}
                  onChange={(e) => setFilterRange(e.target.value)}
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="365">Last Year</option>
                  <option value="custom">Custom</option>
                </Form.Select>

                <Form.Select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Form.Select>
                <Button onClick={() => setViewMode("list")}>
                  <FaList />
                </Button>
                <Button onClick={() => setViewMode("chart")}>
                  <FaChartPie />
                </Button>
              </div>

              <Button onClick={() => setModalVisible(true)}>
                Add Transaction
              </Button>
              <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {editTransaction ? "Edit" : "Add"} Transaction
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={formValues.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formValues.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories[formValues.type]?.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formValues.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button type="submit">Save Transaction</Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>

            {filterRange === "custom" && (
              <div className="date-filters">
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  placeholderText="Start Date"
                />
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  placeholderText="End Date"
                />
              </div>
            )}

            {viewMode === "list" ? (
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.title}</td>
                      <td>{transaction.amount}</td>
                      <td
                        style={{
                          color:
                            transaction.type === "income" ? "green" : "red",
                        }}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </td>
                      <td>{transaction.category}</td>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>
                        <FaEdit
                          onClick={() => handleEdit(transaction)}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        />
                        <FaTrash
                          onClick={() => handleDelete(transaction._id)}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        <ToastContainer />
      </Container>
    </>
  );
};

export default Dashboard;
