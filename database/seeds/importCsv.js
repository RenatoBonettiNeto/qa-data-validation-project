import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { client, connectDatabase } from "../connection.js";

const csvFile = path.resolve("data/municipios.csv");
const csvHeaders = [
  "codigo_municipio_tom",
  "codigo_municipio_ibge",
  "municipio_tom",
  "municipio_ibge",
  "uf"
];

export async function importCsv() {
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFile, { encoding: "latin1" })
      .pipe(csv({ separator: ";", headers: csvHeaders, skipLines: 1 }))
      .on("data", (data) => rows.push(data))
      .on("end", async () => {
        let transactionStarted = false;

        try {
          await connectDatabase();
          console.log(`Importando ${rows.length} registros...`);
          await client.query("BEGIN");
          transactionStarted = true;
          await client.query("TRUNCATE TABLE public.ref_municipios_tom_ibge");

          for (const row of rows) {
            await client.query(
              `
              INSERT INTO public.ref_municipios_tom_ibge
              (codigo_municipio_tom, codigo_municipio_ibge, municipio_tom, municipio_ibge, uf)
              VALUES ($1,$2,$3,$4,$5)
              `,
              [
                row.codigo_municipio_tom,
                row.codigo_municipio_ibge,
                row.municipio_tom,
                row.municipio_ibge,
                row.uf
              ]
            );
          }

          await client.query("COMMIT");
          console.log("Importação finalizada.");
          resolve();
        } catch (error) {
          if (transactionStarted) {
            await client.query("ROLLBACK");
          }

          console.error("Erro na importação:", error);
          reject(error);
        }
      })
      .on("error", reject);

  });
}
