const express = require('express');
const cors = require('cors');

const path = require("path");
require("dotenv").config();
console.log("SHEET_ID carregado no server:", process.env.SHEET_ID);
const sheetsRoutes = require("./routes/sheetsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣ Servir a pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// 2️⃣ Rotas da API
app.use("/api", sheetsRoutes);

// 3️⃣ Rota padrão para / (opcional, mas útil)
app.get('/', (req, res) => {
  res.send('API funcionando!');
});


// 🔥 Porta ajustada para o Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

