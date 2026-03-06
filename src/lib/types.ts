
export interface FollowUpTypeConfig {
  id: string;
  name: string;
  score: number;
}

export interface Salesperson {
  id: string;
  name: string;
  department: '华东区' | '华北区' | '华南区';
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
  type: string; // This is the name of the follow-up type, e.g., "电话"
  content: string;
  createdAt: string;
  salespersonId: string;
}
