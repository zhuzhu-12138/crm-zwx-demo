
"use client";

import { useState } from 'react';

interface RankingData {
  id: string;
  name: string;
  department: string;
  score: number;
  followUpCounts: Record<string, number>;
}

interface RankingListProps {
  data: RankingData[];
}

const RankingList = ({ data }: RankingListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (data.length === 0) {
    return <p className="text-slate-500 text-center py-8">暂无数据</p>;
  }

  const maxScore = Math.max(...data.map(d => d.score), 0);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.id} className="bg-slate-50 rounded-lg p-4 transition-all">
          <div className="flex items-center cursor-pointer" onClick={() => handleToggle(item.id)}>
            <div className="w-8 text-center text-lg font-medium text-slate-500">{index + 1}</div>
            <div className="flex-1 ml-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-slate-200 text-slate-600">{item.department}</span>
                </div>
                <p className="font-bold text-lg text-slate-900">{item.score} <span className="text-sm font-normal text-slate-500">分</span></p>
              </div>
              <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-700 rounded-full transition-all duration-500"
                  style={{ width: `${maxScore > 0 ? (item.score / maxScore) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          {expandedId === item.id && (
            <div className="mt-4 pt-4 border-t border-slate-200 ml-12 pl-4">
              <h4 className="text-sm font-semibold text-slate-600 mb-2">跟进详情:</h4>
              {Object.keys(item.followUpCounts).length > 0 ? (
                <ul className="space-y-1 text-sm text-slate-500">
                  {Object.entries(item.followUpCounts).map(([type, count]) => (
                    <li key={type}>
                      <span>{type}：</span>
                      <span className="font-medium">{count} 次</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">暂无跟进记录</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RankingList;
