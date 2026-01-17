import { pool } from '../../config/database';
import { CreateAlertDTO, AlertRecord, AlertFilters, Pagination, ActiveAlert } from './types';

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

  /**
   * Build WHERE clause dynamically.
   */
  private static buildWhereClause(
    filters: AlertFilters,
    values: any[]
  ): string {
    const conditions: string[] = [];

    if (filters.userId) {
      conditions.push(`user_id = $${values.length + 1}`);
      values.push(filters.userId);
    }

    if (filters.status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(filters.status);
    }

    return conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';
  }

  /**
   * List alerts with optional filters and pagination
   */
  static async list(
    filters: AlertFilters,
    pagination?: Pagination
  ): Promise<AlertRecord[]> {
    const values: any[] = [];

    const whereClause = this.buildWhereClause(filters, values);

    let query = `
      SELECT *
      FROM alerts
      ${whereClause}`;

    if (filters.orderBy) {
      query += ` ORDER BY ${filters.orderBy} ${filters.direction}`;
    }

    if (pagination?.limit) {
      query += ` LIMIT $${values.length + 1}`;
      values.push(pagination.limit);

      if (pagination.offset !== undefined) {
        query += ` OFFSET $${values.length + 1}`;
        values.push(pagination.offset);
      }
    }

    const { rows } = await pool.query<AlertRecord>(query, values);
    return rows;
  }

  /**
   * Count alerts with optional filters
   */
  static async count(filters: AlertFilters): Promise<number> {
    const values: any[] = [];

    const whereClause = this.buildWhereClause(filters, values);

    const query = `
      SELECT COUNT(*)
      FROM alerts
      ${whereClause}
    `;

    const { rows } = await pool.query<{ count: string }>(
      query,
      values
    );

    return Number(rows[0].count);
  }

  /**
   * Delete alert by id
   * Returns deleted record or null if not found
   */
  static async deleteById(id: string): Promise<AlertRecord | null> {
    const query = `
      DELETE FROM alerts
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await pool.query<AlertRecord>(query, [id]);
    return rows[0] ?? null;
  }

  /**
   * Mark alert as TRIGGERED
   */
  static async markAsTriggered(alertId: string): Promise<void> {
    const query = `
      UPDATE alerts
      SET status = 'TRIGGERED',
          triggered_at = NOW()
      WHERE id = $1
    `;

    await pool.query(query, [alertId]);
  }

  /**
   * Fetch all ACTIVE alerts
   */
  static async listActiveAlerts(): Promise<ActiveAlert[]> {
    const query = `
      SELECT id, coin_id, target_price, condition
      FROM alerts
      WHERE status = 'ACTIVE'
    `;

    const { rows } = await pool.query<ActiveAlert>(query);
    return rows;
  }
}
