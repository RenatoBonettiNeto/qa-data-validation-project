import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
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
