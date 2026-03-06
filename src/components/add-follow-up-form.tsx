
"use client";

import { useState } from "react";
import { useCrmStore } from "@/lib/store";
import { toast } from "sonner";

interface AddFollowUpFormProps {
  customerId: string;
  salespersonId: string;
}

const AddFollowUpForm = ({ customerId, salespersonId }: AddFollowUpFormProps) => {
  const { followUpTypes, addFollowUp } = useCrmStore();
  const [type, setType] = useState<string>(followUpTypes[0]?.name || "");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("跟进内容不能为空");
      return;
    }

    addFollowUp({
      customerId,
      salespersonId,
      type,
      content,
      createdAt,
    });

    toast.success("跟进记录已添加", { position: "top-center" });
    setContent("");
    setError("");
    setCreatedAt(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 flex flex-col space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700">跟进类型</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {followUpTypes.map((typeConfig) => (
                <option key={typeConfig.id} value={typeConfig.name}>
                  {typeConfig.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="createdAt" className="block text-sm font-medium text-slate-700">日期</label>
            <input
              type="date"
              id="createdAt"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 bg-gray-50 rounded-md p-2"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700">内容描述</label>
          <textarea
            id="content"
            rows={5} // Adjusted for better height alignment
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError("");
            }}
            className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md p-4 border-gray-300 bg-gray-50 ${error ? 'border-red-500' : ''}`}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
      <div className="mt-4 text-right">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          提交
        </button>
      </div>
    </form>
  );
};

export default AddFollowUpForm;
