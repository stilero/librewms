"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", inbound: 65, outbound: 42, stock: 240 },
  { name: "Feb", inbound: 59, outbound: 55, stock: 244 },
  { name: "Mar", inbound: 80, outbound: 67, stock: 257 },
  { name: "Apr", inbound: 81, outbound: 90, stock: 248 },
  { name: "May", inbound: 56, outbound: 52, stock: 252 },
  { name: "Jun", inbound: 55, outbound: 48, stock: 259 },
  { name: "Jul", inbound: 40, outbound: 45, stock: 254 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="inbound" stroke="#3b82f6" activeDot={{ r: 8 }} />
        <Line yAxisId="left" type="monotone" dataKey="outbound" stroke="#ef4444" />
        <Line yAxisId="right" type="monotone" dataKey="stock" stroke="#10b981" />
      </LineChart>
    </ResponsiveContainer>
  )
}
