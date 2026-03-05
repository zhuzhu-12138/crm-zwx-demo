
"use client";

import { useState } from 'react';
import { useCrmStore } from '@/lib/store';
import { FollowUpTypeConfig } from '@/lib/types';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ConfirmModal from './ui/confirm-modal';
import UpsertTypeModal from './ui/upsert-type-modal';

const TypeManagementPage = () => {
  const { followUpTypes, addFollowUpType, updateFollowUpType, deleteFollowUpType } = useCrmStore();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [upsertingType, setUpsertingType] = useState<Partial<FollowUpTypeConfig> | null>(null);

  const handleSave = (data: { name: string; score: number }) => {
    if (!upsertingType) return;

    if (!data.name.trim() || data.score <= 0) {
      toast.error('类型名称不能为空且分数必须大于0', { position: 'top-center' });
      return;
    }

    if ('id' in upsertingType && upsertingType.id) {
      // Editing existing type
      updateFollowUpType(upsertingType.id, data);
      toast.success('类型已更新', { position: 'top-center' });
    } else {
      // Adding new type
      addFollowUpType(data);
      toast.success('新类型已添加', { position: 'top-center' });
    }
    
    setUpsertingType(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteFollowUpType(deletingId);
      toast.success('类型已删除', { position: 'top-center' });
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">类型管理</h1>
        <button 
          onClick={() => setUpsertingType({})} // Open modal for new type
          className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          新增类型
        </button>
      </div>

      <div className="mt-8 bg-white shadow-sm rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">类型名称</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">KPI 分值</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">操作</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {followUpTypes.map((type) => (
              <tr key={type.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{type.score}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button onClick={() => setUpsertingType(type)} className="text-slate-400 hover:text-slate-600"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setDeletingId(type.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="确认删除类型"
      >
        你确定要删除这个跟进类型吗？此操作无法撤销。
      </ConfirmModal>

      <UpsertTypeModal
        isOpen={!!upsertingType}
        onClose={() => setUpsertingType(null)}
        onSave={handleSave}
        type={upsertingType}
      />
    </>
  );
};

export default TypeManagementPage;
