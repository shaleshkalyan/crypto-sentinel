import fs from 'fs';
import path from 'path';
import { pool } from '../config/database';

async function runMigration() {
  const sqlPath = path.join(
    __dirname,
    './create_alerts_table.sql'
  );

  const sql = fs.readFileSync(sqlPath, 'utf-8');

  try {
    await pool.query(sql);
    console.log('Migration executed successfully');
  } catch (error) {
    console.error('Migration execution failed');
    console.error(error);
  } finally {
    await pool.end();
  }
}

runMigration();
