import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function Chart({ data01 }) {
  return (
    <div className="w-full h-96 border-2 border-red-700">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}  // You can adjust this size
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
