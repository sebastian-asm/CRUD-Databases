import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
export const client = new MongoClient(url);

export default async function dbConnection() {
  try {
    await client.connect();
    console.log('Connection success to db');
  } catch (error) {
    console.log('Error connection to db:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}
