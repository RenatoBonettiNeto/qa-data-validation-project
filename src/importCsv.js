import { closeDatabase } from "../database/connection.js";
import { importCsv } from "../database/seeds/importCsv.js";

async function run() {
  try {
    await importCsv();
  } catch (error) {
    console.error("Erro ao importar CSV:", error);
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}

run();
