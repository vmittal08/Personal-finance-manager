import React from "react";
import { Table } from "react-bootstrap";

const TransactionList = ({ transactions }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td className={transaction.type === "income" ? "text-success" : "text-danger"}>
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">No transactions found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TransactionList;
