import { pool } from '../../config/database';
import { CreateAlertDTO, AlertRecord } from './types';

export class AlertRepository {
    /**
     * Function to insert data in alerts table.
     */
  static async create(payload: CreateAlertDTO): Promise<AlertRecord> {
    const query = `
      INSERT INTO alerts (user_id, coin_id, target_price, condition)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [
      payload.userId,
      payload.coinId,
      payload.targetPrice,
      payload.condition,
    ];

    const { rows } = await pool.query<AlertRecord>(query, values);
    return rows[0];
  }
}
