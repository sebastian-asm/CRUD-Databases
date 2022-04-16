import { createConnection } from 'mysql2/promise';

export default async function dbConnection() {
  return await createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'local',
    connectionLimit: 7,
    multipleStatements: true,
  });
}
