
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "May", revenue: 18000 },
  { month: "Jun", revenue: 22500 },
  { month: "Jul", revenue: 21000 },
  { month: "Aug", revenue: 29000 },
  { month: "Sep", revenue: 34000 },
  { month: "Oct", revenue: 42000 },
];

const dataByRange = {
  "7days": revenueData.slice(-2),
  "30days": revenueData.slice(-4),
  "90days": revenueData,
};

export default function RevenueChart({ dateRange }) {
  const chartData = dataByRange[dateRange] ?? revenueData;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Revenue Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Showing {dateRange === "7days"
            ? "last 7 days"
            : dateRange === "30days"
              ? "last 30 days"
              : "last 90 days"}
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
