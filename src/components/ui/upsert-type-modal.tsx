
"use client";

import { useState, useEffect } from 'react';
import { FollowUpTypeConfig } from '@/lib/types';

interface UpsertTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; score: number }) => void;
  type: Partial<FollowUpTypeConfig> | null;
}

const UpsertTypeModal = ({ isOpen, onClose, onSave, type }: UpsertTypeModalProps) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);

  const isEditing = !!type?.id;
  const title = isEditing ? '修改跟进类型' : '新增跟进类型';

  useEffect(() => {
    if (isOpen && type) {
      setName(type.name || '');
      setScore(type.score || 0);
    } else if (!isOpen) {
      // Reset when modal is closed
      setName('');
      setScore(0);
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ name, score });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-slate-900/70 transition-opacity" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
          <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">{title}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="typeName" className="block text-sm font-medium text-slate-700">类型名称</label>
              <input
                type="text"
                id="typeName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="kpiScore" className="block text-sm font-medium text-slate-700">KPI 分值</label>
              <input
                type="number"
                id="kpiScore"
                value={score === 0 ? '' : score}
                onChange={(e) => setScore(parseInt(e.target.value, 10) || 0)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button 
            type="button" 
            onClick={handleSave} 
            className="inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 sm:ml-3 sm:w-auto"
          >
            保存
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpsertTypeModal;
