
"use client";

import { useState, useMemo } from "react";
import { useCrmStore } from "@/lib/store";
import CustomerList from "@/components/customer-list";
import { useDebounce } from "@/hooks/use-debounce";
import { Search, X } from "lucide-react";

const CustomerPoolPage = () => {
  const customers = useCrmStore((state) => state.customers);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredCustomers = useMemo(() => {
    if (!debouncedSearchTerm) {
      return customers;
    }
    return customers.filter(
      (customer) =>
        customer.companyName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        customer.id.toString().includes(debouncedSearchTerm)
    );
  }, [customers, debouncedSearchTerm]);

  const suggestions = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    return customers
      .filter((customer) =>
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5); // 最多显示5个建议
  }, [customers, searchTerm]);

  const handleSuggestionClick = (companyName: string) => {
    setSearchTerm(companyName);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">事件跟进</h1>
          <p className="mt-2 text-slate-600">共 {filteredCustomers.length} 位客户</p>
        </div>
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="搜索公司名称或ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full bg-white border border-slate-300 rounded-md py-2 pl-10 pr-10 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button onClick={() => setSearchTerm("")} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          {suggestions.length > 0 && searchTerm && (
            <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-slate-200 max-h-60 overflow-auto">
              {suggestions.map((customer) => (
                <li 
                  key={customer.id}
                  onClick={() => handleSuggestionClick(customer.companyName)}
                  className="cursor-pointer select-none relative py-2 px-4 text-slate-700 hover:bg-slate-100"
                >
                  {customer.companyName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-6">
        <CustomerList customers={filteredCustomers} />
      </div>
    </div>
  );
};

export default CustomerPoolPage;
