import React from 'react'
import { CartesianGrid, PieChart, ResponsiveContainer } from 'recharts';

function Chart({data01 , data02}) {
  return (
    <div>   
        <ResponsiveContainer  width="100%" height={400} >

            <PieChart width={730} height={250} >
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            <CartesianGrid strokeDasharray="3 3" />
            </PieChart>
        </ResponsiveContainer>

    </div>
  )
}

export default Chart