
"use client";

import { useMemo, useState } from 'react';
import { useCrmStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import RankingList from './ranking-list';
import ComparisonChart from './comparison-chart';

const DashboardPage = () => {
  const { followUps, followUpTypes, salespersons } = useCrmStore();
  
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'chart'
  const [selectedMonth, setSelectedMonth] = useState('all'); // e.g., '2023-07' or 'all'
  const [selectedDepartment, setSelectedDepartment] = useState('all'); // e.g., '华东区' or 'all'

  const processedData = useMemo(() => {
    const salespersonMap = new Map(salespersons.map(s => [s.id, s]));
    const scoreMap = new Map(followUpTypes.map(type => [type.name, type.score]));

    const filteredFollowUps = followUps.filter(fu => {
        const salesperson = salespersonMap.get(fu.salespersonId);
        const monthMatch = selectedMonth === 'all' || fu.createdAt.startsWith(selectedMonth);
        const departmentMatch = selectedDepartment === 'all' || salesperson?.department === selectedDepartment;
        return monthMatch && departmentMatch;
    });

    const kpi = filteredFollowUps.reduce((acc, followUp) => {
        const salesperson = salespersonMap.get(followUp.salespersonId);
        if (!salesperson) return acc;

        const score = scoreMap.get(followUp.type) || 0;
        if (!acc[salesperson.id]) {
            acc[salesperson.id] = { 
                id: salesperson.id,
                name: salesperson.name, 
                department: salesperson.department,
                score: 0, 
                followUpCounts: {} 
            };
        }
        acc[salesperson.id].score += score;
        acc[salesperson.id].followUpCounts[followUp.type] = (acc[salesperson.id].followUpCounts[followUp.type] || 0) + 1;
        return acc;
    }, {} as Record<string, { id: string; name: string; department: string; score: number; followUpCounts: Record<string, number> }>);

    const rankingData = Object.values(kpi).sort((a, b) => b.score - a.score);

    return {
        totalFollowUps: filteredFollowUps.length,
        highestScore: rankingData[0]?.score || 0,
        highestScorerName: rankingData[0]?.name || 'N/A',
        rankingData,
    };
  }, [followUps, followUpTypes, salespersons, selectedMonth, selectedDepartment]);

  const monthOptions = useMemo(() => {
    const months = new Set(followUps.map(fu => fu.createdAt.slice(0, 7)));
    return ['all', ...Array.from(months).sort().reverse()];
  }, [followUps]);

  const departmentOptions = useMemo(() => {
    const departments = new Set(salespersons.map(s => s.department));
    return ['all', ...Array.from(departments)];
  }, [salespersons]);

  const TabButton = ({ tab, children }: { tab: string, children: React.ReactNode }) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tab ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
        {children}
    </button>
  );

  return (
    <div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">事件考核</h1>
            <div className="flex items-center space-x-4">
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="rounded-md border-gray-300 bg-gray-50 shadow-sm">
                    {monthOptions.map(month => (
                        <option key={month} value={month}>{month === 'all' ? '所有月份' : month}</option>
                    ))}
                </select>
                <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} className="rounded-md border-gray-300 bg-gray-50 shadow-sm">
                    {departmentOptions.map(dep => (
                        <option key={dep} value={dep}>{dep === 'all' ? '所有部门' : dep}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-800">总跟进次数</h3>
                <p className="mt-2 text-3xl font-bold text-slate-900">{processedData.totalFollowUps}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-800">最高KPI得分</h3>
                <p className="mt-2 text-3xl font-bold text-slate-900">{processedData.highestScore}</p>
                <p className="text-sm text-slate-500">{processedData.highestScorerName}</p>
            </div>
        </div>

        <div className="mt-8">
            <div className="flex space-x-2 border-b border-slate-200 mb-4">
                <TabButton tab="list">排名列表</TabButton>
                <TabButton tab="chart">对比图表</TabButton>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                {activeTab === 'list' ? (
                    <RankingList data={processedData.rankingData} />
                ) : (
                    <ComparisonChart data={processedData.rankingData} />
                )}
            </div>
        </div>
    </div>
  );
};

export default DashboardPage;
