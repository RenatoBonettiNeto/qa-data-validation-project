import { closeDatabase, setupDatabase } from "../database/connection.js";

async function run() {
  try {
    await setupDatabase();
  } catch (error) {
    console.error("Erro ao configurar banco:", error);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

run();
