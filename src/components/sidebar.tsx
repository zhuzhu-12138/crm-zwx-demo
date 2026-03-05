
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, BarChart2, ChevronDown, Circle, Settings } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const isFollowUpActive = pathname.startsWith('/records') || pathname.startsWith('/types');
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(isFollowUpActive);

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? 'bg-slate-200 text-slate-900'
      : 'text-slate-700 hover:bg-slate-200';
  };

  // Effect to open the menu if we navigate to a child route
  useEffect(() => {
    if (isFollowUpActive) {
      setIsFollowUpOpen(true);
    }
  }, [isFollowUpActive]);

  return (
    <aside className="w-64 bg-slate-100 p-4 border-r border-slate-200 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800">CRM Pro</h2>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <div className="flex items-center justify-between rounded-lg text-slate-700 hover:bg-slate-200">
              <Link href="/records" className="flex items-center p-2 flex-grow">
                <Users className="w-5 h-5 mr-3" />
                <span>事件跟进</span>
              </Link>
              <button
                onClick={() => setIsFollowUpOpen(!isFollowUpOpen)}
                className="p-2"
                aria-label="Toggle submenu"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${isFollowUpOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {isFollowUpOpen && (
                <ul className="pt-2 pl-4">
                  <li>
                    <Link href="/records" className={`flex items-center p-2 rounded-lg text-sm ${getLinkClass('/records')}`}>
                      <span className="w-6 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </span>
                      <span>事件跟进</span>
                    </Link>
                  </li>
                  <li className="mt-1">
                    <Link href="/types" className={`flex items-center p-2 rounded-lg text-sm ${getLinkClass('/types')}`}>
                      <span className="w-6 flex items-center justify-center">
                        <Settings className="w-4 h-4" />
                      </span>
                      <span>类型管理</span>
                    </Link>
                  </li>
                </ul>
            )}
          </li>
          <li className="mt-2">
            <Link href="/dashboard" className={`flex items-center p-2 rounded-lg ${getLinkClass('/dashboard')}`}>
              <BarChart2 className="w-5 h-5 mr-3" />
              事件考核
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
