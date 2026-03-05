
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  score: number;
}

interface ComparisonChartProps {
  data: ChartData[];
}

const ComparisonChart = ({ data }: ComparisonChartProps) => {
  if (data.length === 0) {
    return <p className="text-slate-500 text-center py-8">暂无数据</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} 
            contentStyle={{ 
                background: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.5rem' 
            }}
          />
          <Legend />
          <Bar dataKey="score" fill="#475569" name="KPI得分" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
