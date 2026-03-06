
"use client";

import { useCrmStore } from "@/lib/store";
import { useParams } from "next/navigation";
import AddFollowUpForm from "./add-follow-up-form";
import FollowUpTimeline from "./follow-up-timeline";
import { useMemo } from "react";

const CustomerDetailPage = () => {
  const params = useParams();
  const customerId = params.id as string;

  const { customers, followUps, salespersons } = useCrmStore();

  const salespersonMap = useMemo(() => new Map(salespersons.map(s => [s.id, s])), [salespersons]);

  const customer = useMemo(() => customers.find((c) => c.id === customerId), [customers, customerId]);
  const customerFollowUps = useMemo(() => 
    followUps
      .filter((f) => f.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), 
    [followUps, customerId]
  );

  if (!customer) {
    return <p>客户不存在。</p>;
  }

  const salesperson = salespersonMap.get(customer.salespersonId);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg p-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">{customer.companyName}</h1>
        <div className="mt-4 flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-slate-600">
            <span className="w-20 shrink-0 font-medium text-slate-500">ID</span>
            <span className="font-mono text-xs bg-slate-100 py-0.5 px-1.5 rounded">{customer.id}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <span className="w-20 shrink-0 font-medium text-slate-500">行业</span>
            <span>{customer.industry}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <span className="w-20 shrink-0 font-medium text-slate-500">所属销售</span>
            <span>{salesperson?.name || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">新增跟进事项</h2>
        {salesperson && <AddFollowUpForm customerId={customer.id} salespersonId={salesperson.id} />}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">历史跟进流</h2>
        <FollowUpTimeline followUps={customerFollowUps} />
      </div>
    </div>
  );
};

export default CustomerDetailPage;
