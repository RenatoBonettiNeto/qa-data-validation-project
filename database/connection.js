import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const sqlPath = path.resolve("database");
let isClientConnected = false;

export const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export default client;

export async function connectDatabase() {
  if (!isClientConnected) {
    await client.connect();
    isClientConnected = true;
  }
}

export async function closeDatabase() {
  if (isClientConnected) {
    await client.end();
    isClientConnected = false;
  }
}

export async function setupDatabase() {
  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres"
  });

  await adminClient.connect();

  try {
    const createDb = fs.readFileSync(`${sqlPath}/migrations/001_create_database.sql`).toString();
    await adminClient.query(createDb);
    console.log("Executado: 001_create_database.sql");
  } catch (error) {
    if (error.code === "42P04") {
      console.log("Banco de dados ja existe. Seguindo com a inicializacao.");
    } else {
      throw error;
    }
  } finally {
    await adminClient.end();
  }

  await connectDatabase();

  const createTable = fs.readFileSync(`${sqlPath}/migrations/002_create_table.sql`).toString();
  await client.query(createTable);

  console.log("Executado: 002_create_table.sql");
}
