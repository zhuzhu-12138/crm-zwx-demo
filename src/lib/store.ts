
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Customer, FollowUpRecord, FollowUpTypeConfig, Salesperson } from './types';
import { v4 as uuidv4 } from 'uuid';

interface CrmState {
  salespersons: Salesperson[];
  customers: Customer[];
  followUps: FollowUpRecord[];
  followUpTypes: FollowUpTypeConfig[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  addFollowUp: (followUp: Omit<FollowUpRecord, 'id'>) => void;
  updateFollowUp: (id: string, data: Partial<Omit<FollowUpRecord, 'id'>>) => void;
  deleteFollowUp: (id: string) => void;
  addFollowUpType: (type: Omit<FollowUpTypeConfig, 'id'>) => void;
  updateFollowUpType: (id: string, data: Partial<Omit<FollowUpTypeConfig, 'id'>>) => void;
  deleteFollowUpType: (id: string) => void;
}

const initialSalespersons: Salesperson[] = [
    { id: 'sales-1', name: '张伟', department: '华东区' },
    { id: 'sales-2', name: '李娜', department: '华北区' },
    { id: 'sales-3', name: '王强', department: '华东区' },
    { id: 'sales-4', name: '赵敏', department: '华北区' },
    { id: 'sales-5', name: '刘备', department: '华南区' },
    { id: 'sales-6', name: '孙尚香', department: '华南区' },
];

const initialCustomers: Customer[] = [
  { id: '1', companyName: '深空探索技术有限公司', industry: '航空航天', salespersonId: 'sales-1' },
  { id: '2', companyName: '量子计算先锋公司', industry: '信息技术', salespersonId: 'sales-2' },
  { id: '3', companyName: '基因编辑生物科技', industry: '生物医疗', salespersonId: 'sales-3' },
  { id: '4', companyName: '未来农业集团', industry: '农业科技', salespersonId: 'sales-4' },
  { id: '5', companyName: '智慧城市解决方案', industry: '物联网', salespersonId: 'sales-5' },
  { id: '6', companyName: '虚拟现实娱乐工场', industry: '娱乐', salespersonId: 'sales-6' },
  { id: '7', companyName: '新材料研发中心', industry: '制造业', salespersonId: 'sales-1' },
  { id: '8', companyName: '环保能源科技', industry: '能源', salespersonId: 'sales-2' },
];

const initialFollowUps: FollowUpRecord[] = [
  // 过去月份的数据
  { id: '101', customerId: '1', type: '电话', content: '初步沟通，介绍了我们的星际运输解决方案。', createdAt: '2024-05-10T10:00:00Z', salespersonId: 'sales-1' },
  { id: '102', customerId: '2', type: '会议', content: '与对方技术团队开会，演示了我们量子芯片的性能优势。', createdAt: '2024-05-15T14:30:00Z', salespersonId: 'sales-2' },
  { id: '103', customerId: '4', type: '上门拜访', content: '拜访了客户，了解了他们对智能灌溉系统的需求。', createdAt: '2024-05-20T11:00:00Z', salespersonId: 'sales-4' },
  { id: '104', customerId: '5', type: '电话', content: '客户对我们的智慧停车方案很感兴趣。', createdAt: '2024-05-22T16:00:00Z', salespersonId: 'sales-5' },

  // 当前月份的数据
  { id: '105', customerId: '1', type: '上门拜访', content: '与 CEO 进行了深入交流，对方表达了强烈的合作意愿。', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-1' },
  { id: '106', customerId: '3', type: '会议', content: '提供了我们最新的临床试验数据，客户反馈积极。', createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-3' },
  { id: '107', customerId: '6', type: '电话', content: '讨论了 VR 游戏引擎的授权费用问题。', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-6' },
  { id: '108', customerId: '7', type: '会议', content: '向客户展示了我们新材料的样品，性能优异。', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-1' },
  { id: '109', customerId: '8', type: '电话', content: '客户询问了关于太阳能电池板的转换效率问题。', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-2' },
  { id: '110', customerId: '2', type: '电话', content: '跟进上次会议的反馈，约定下周进行二次演示。', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), salespersonId: 'sales-2' },
];

const initialFollowUpTypes: FollowUpTypeConfig[] = [
    { id: 'type-1', name: '电话', score: 2 },
    { id: 'type-2', name: '会议', score: 5 },
    { id: 'type-3', name: '上门拜访', score: 10 },
];

export const useCrmStore = create<CrmState>()(
  persist(
    (set) => ({
      salespersons: initialSalespersons,
      customers: initialCustomers,
      followUps: initialFollowUps,
      followUpTypes: initialFollowUpTypes,
      addCustomer: (customer) =>
        set((state) => ({
          customers: [...state.customers, { id: uuidv4(), ...customer }],
        })),
      addFollowUp: (followUp) =>
        set((state) => ({
          followUps: [
            ...state.followUps,
            { id: uuidv4(), ...followUp },
          ],
        })),
      updateFollowUp: (id, data) =>
        set((state) => ({
          followUps: state.followUps.map((record) =>
            record.id === id ? { ...record, ...data } : record
          ),
        })),
      deleteFollowUp: (id) =>
        set((state) => ({
          followUps: state.followUps.filter((record) => record.id !== id),
        })),
      addFollowUpType: (type) =>
        set((state) => ({
            followUpTypes: [...state.followUpTypes, { id: uuidv4(), ...type }],
        })),
      updateFollowUpType: (id, data) =>
        set((state) => ({
            followUpTypes: state.followUpTypes.map((type) =>
                type.id === id ? { ...type, ...data } : type
            ),
        })),
      deleteFollowUpType: (id) =>
        set((state) => ({
            followUpTypes: state.followUpTypes.filter((type) => type.id !== id),
        })),
    }),
    {
      name: 'crm-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
