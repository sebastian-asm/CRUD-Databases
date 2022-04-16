import pg from 'pg';

export default function dbConnection() {
  const { Client } = pg;
  return new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'local',
    port: 5432,
  });
}
