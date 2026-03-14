import express from "express";
import { setupDatabase } from "./setupDatabase.js";

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    await setupDatabase();

    app.get("/", (req, res) => {
      res.json({ message: "Servidor funcionando" });
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);
  }
}

startServer();