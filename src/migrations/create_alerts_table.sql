CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  coin_id TEXT NOT NULL,
  target_price NUMERIC NOT NULL CHECK (target_price > 0),
  condition TEXT NOT NULL CHECK (condition IN ('ABOVE', 'BELOW')),
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'TRIGGERED')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  triggered_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_coin_status ON alerts(coin_id, status);
