
"use client";

import { Customer } from "@/lib/types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCrmStore } from "@/lib/store";
import { useMemo } from "react";

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const salespersons = useCrmStore((state) => state.salespersons);

  const salespersonMap = useMemo(() => {
    return new Map(salespersons.map(s => [s.id, s.name]));
  }, [salespersons]);

  if (customers.length === 0) {
    return <p className="text-slate-500 text-center py-8">暂无客户数据。</p>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              公司名称
            </th>
            <th scope="col" className="pl-0 pr-12 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              所属销售
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">查看</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/customer/${customer.id}`} className="block">
                  <div className="text-sm font-medium text-slate-900">{customer.companyName}</div>
                </Link>
              </td>
              <td className="pl-0 pr-12 py-4 whitespace-nowrap font-mono text-sm text-slate-500">
                <Link href={`/customer/${customer.id}`} className="block">
                  {customer.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/customer/${customer.id}`} className="block">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                    {salespersonMap.get(customer.salespersonId) || 'N/A'}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/customer/${customer.id}`} className="text-slate-400 hover:text-slate-600">
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
