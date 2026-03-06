
"use client";

import { useState, useMemo } from "react";
import { useCrmStore } from "@/lib/store";
import { FollowUpRecord } from "@/lib/types";
import { Phone, Users, Briefcase, Pencil, Trash2 } from "lucide-react";
import EditFollowUpForm from "./edit-follow-up-form";
import { toast } from "sonner";
import ConfirmModal from "./ui/confirm-modal";

interface FollowUpTimelineProps {
  followUps: FollowUpRecord[];
}

const FollowUpTimeline = ({ followUps }: FollowUpTimelineProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { deleteFollowUp, salespersons, followUpTypes } = useCrmStore();

  const salespersonMap = useMemo(() => new Map(salespersons.map(s => [s.id, s.name])), [salespersons]);
  const followUpTypeMap = useMemo(() => new Map(followUpTypes.map(t => [t.name, t])), [followUpTypes]);

  const ICONS: Record<string, React.ReactNode> = {
    "电话": <Phone className="h-5 w-5 text-white" />,
    "会议": <Users className="h-5 w-5 text-white" />,
    "上门拜访": <Briefcase className="h-5 w-5 text-white" />,
  };

  const BG_COLORS: Record<string, string> = {
      "电话": "bg-blue-500",
      "会议": "bg-green-500",
      "上门拜访": "bg-purple-500",
  }

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteFollowUp(deletingId);
      toast.success("记录已删除", { position: "top-center" });
      setDeletingId(null);
    }
  };

  if (followUps.length === 0) {
    return <p className="text-slate-500">暂无跟进记录。</p>;
  }

  return (
    <>
      <div className="flow-root">
        <ul className="-mb-8">
          {followUps.map((item, itemIdx) => (
            <li key={item.id}>
              <div className="relative pb-8">
                {itemIdx !== followUps.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${BG_COLORS[item.type] || 'bg-gray-400'}`}>
                      {ICONS[item.type] || <Users className="h-5 w-5 text-white" />}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {editingId === item.id ? (
                      <EditFollowUpForm 
                        record={item} 
                        onSave={() => setEditingId(null)} 
                        onCancel={() => setEditingId(null)} 
                      />
                    ) : (
                      <div className="pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-slate-500">
                            {salespersonMap.get(item.salespersonId) || 'N/A'} 进行了一次 <span className="font-medium text-slate-900">{item.type}</span>
                          </p>
                          <p className="mt-2 text-sm text-slate-700">{item.content}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-slate-500">
                          <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString('zh-CN')}</time>
                          <div className="mt-2 flex items-center justify-end space-x-2">
                            <button onClick={() => setEditingId(item.id)} className="text-slate-400 hover:text-slate-600">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button onClick={() => setDeletingId(item.id)} className="text-red-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="确认删除"
      >
        你确定要删除这条跟进记录吗？此操作无法撤销。
      </ConfirmModal>
    </>
  );
};

export default FollowUpTimeline;
