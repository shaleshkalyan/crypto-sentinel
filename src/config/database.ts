import { Pool } from 'pg';
import { config } from './constants';

if (!config.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

/**
 * Connection pool
 */
export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 10,
});

/**
 * Database connectivity at app startup
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully !');
  } catch (error) {
    console.error('Database connection failed');
    console.error(error);
    process.exit(1);
  }
};
