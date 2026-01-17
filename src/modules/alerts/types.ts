export type CreateAlertDTO = {
  userId: string;
  coinId: string;
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW';
};

export type AlertRecord = {
  id: string;
  user_id: string;
  coin_id: string;
  target_price: number;
  condition: 'ABOVE' | 'BELOW';
  status: 'ACTIVE' | 'TRIGGERED';
  created_at: string;
  triggered_at: string | null;
};

export type ListValidationType = {
  page: number;
  limit: number;
  userId: string;
  status: 'ACTIVE' | 'TRIGGERED'
};

export type PaginationParamsType = {
  page: number;
  limit: number;
};

export type AlertFilters = {
  userId?: string;
  status?: 'ACTIVE' | 'TRIGGERED';
};

export type Pagination = {
  limit: number;
  offset: number;
};
