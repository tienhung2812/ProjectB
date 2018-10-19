import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { name: 'Mon', Posts: 2200, Threads: 3400 },
  { name: 'Tue', Posts: 1280, Threads: 2398 },
  { name: 'Wed', Posts: 5000, Threads: 4300 },
  { name: 'Thu', Posts: 4780, Threads: 2908 },
  { name: 'Fri', Posts: 5890, Threads: 4800 },
  { name: 'Sat', Posts: 4390, Threads: 3800 },
  { name: 'Sun', Posts: 4490, Threads: 4300 },
];

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Posts" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Threads" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;