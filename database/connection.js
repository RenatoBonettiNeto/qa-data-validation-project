import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const sqlPath = path.resolve("database");

export async function setupDatabase() {

  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres"
  });

  await adminClient.connect();

  const createDb = fs.readFileSync(`${sqlPath}/migrations/001_create_database.sql`).toString();
  await adminClient.query(createDb);
  console.log("Executado: 001_create_database.sql");

  await adminClient.end();

  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  await client.connect();

  const createTable = fs.readFileSync(`${sqlPath}/migrations/002_create_table.sql`).toString();
  await client.query(createTable);
  console.log("Executado: 002_create_table.sql");

  await client.end();
}