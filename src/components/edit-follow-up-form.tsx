
"use client";

import { useState } from "react";
import { useCrmStore } from "@/lib/store";
import { FollowUpRecord } from "@/lib/types";
import { toast } from "sonner";

interface EditFollowUpFormProps {
  record: FollowUpRecord;
  onSave: () => void;
  onCancel: () => void;
}

const EditFollowUpForm = ({ record, onSave, onCancel }: EditFollowUpFormProps) => {
  const { followUpTypes, updateFollowUp } = useCrmStore();
  const [type, setType] = useState<string>(record.type);
  const [content, setContent] = useState(record.content);
  const [createdAt, setCreatedAt] = useState<string>(new Date(record.createdAt).toISOString().slice(0, 10));
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("跟进内容不能为空");
      return;
    }

    updateFollowUp(record.id, {
      type,
      content,
      createdAt,
    });

    toast.success("跟进记录已更新", { position: "top-center" });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-lg border border-slate-300 my-4">
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor={`type-${record.id}`} className="block text-sm font-medium text-slate-700">跟进类型</label>
          <select
            id={`type-${record.id}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {followUpTypes.map((typeConfig) => (
                <option key={typeConfig.id} value={typeConfig.name}>
                  {typeConfig.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor={`createdAt-${record.id}`} className="block text-sm font-medium text-slate-700">日期</label>
          <input
            type="date"
            id={`createdAt-${record.id}`}
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`content-${record.id}`} className="block text-sm font-medium text-slate-700">内容描述</label>
          <textarea
            id={`content-${record.id}`}
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError("");
            }}
            className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md p-4 ${error ? 'border-red-500' : 'border-slate-300'}`}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          取消
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          保存
        </button>
      </div>
    </form>
  );
};

export default EditFollowUpForm;
