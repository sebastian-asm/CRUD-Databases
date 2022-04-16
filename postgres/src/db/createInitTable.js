import dbConnection from './dbConnection.js';

export default async function createInitTable() {
  try {
    const db = dbConnection();
    const createTable = `
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.connect();
    await db.query(createTable);
    await db.end();
  } catch (error) {
    console.log('Error connection to db:', error.message);
    process.exit(1);
  }
}
