import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Areachart({ data }) {
  return (
    <div className="w-full h-96 border-2 border-blue-500">
      <ResponsiveContainer>
      <AreaChart
  width={730}
  height={250}
  data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
>
  <defs>
    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
    </linearGradient>
    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#ff8042" stopOpacity={0} />
    </linearGradient>
  </defs>

  <XAxis dataKey="name" />
  
  {/* Left Y-axis for totalAmount */}
  <YAxis yAxisId="left" orientation="left" />
  
  {/* Right Y-axis for orderCount */}
  <YAxis yAxisId="right" orientation="right" />

  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />

  {/* Area for totalAmount on left axis */}
  <Area
    yAxisId="left"
    type="monotone"
    dataKey="totalAmount"
    stroke="#8884d8"
    fillOpacity={1}
    fill="url(#colorTotal)"
    name="Total Amount"
  />

  {/* Area for orderCount on right axis */}
  <Area
    yAxisId="right"
    type="monotone"
    dataKey="orderCount"
    stroke="#ff8042"
    fillOpacity={1}
    fill="url(#colorCount)"
    name="Order Count"
  />
</AreaChart>


      </ResponsiveContainer>
    </div>
  );
}

export default Areachart;
