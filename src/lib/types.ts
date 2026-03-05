
export interface FollowUpTypeConfig {
  id: string;
  name: string;
  score: number;
}

export interface Salesperson {
  id: string;
  name: string;
  department: '华东区' | '华北区';
}

export interface Customer {
  id: string;
  companyName: string;
  industry: string;
  salespersonId: string;
}

export interface FollowUpRecord {
  id: string;
  customerId: string;
  type: string;
  content: string;
  createdAt: string;
  salespersonId: string;
}
