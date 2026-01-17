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
