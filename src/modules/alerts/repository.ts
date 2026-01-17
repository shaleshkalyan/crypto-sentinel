import { pool } from '../../config/database';
import { CreateAlertDTO, AlertRecord, AlertFilters, Pagination } from './types';

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
    pagination: Pagination
  ): Promise<AlertRecord[]> {
    const values: any[] = [];

    const whereClause = this.buildWhereClause(filters, values);

    const query = `
      SELECT *
      FROM alerts
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    values.push(pagination.limit, pagination.offset);

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
}
