import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Statistics = ({ transactions }) => {
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [
    { name: "Income", value: incomeTotal },
    { name: "Expense", value: expenseTotal },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="chart-container">
      <PieChart width={400} height={400}>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Statistics;
