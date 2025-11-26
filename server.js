const express = require("express");
const cors = require("cors");
const path = require("path");
const sheetsRoutes = require("./routes/sheetsRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣ Servir a pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// 2️⃣ Rotas da API
app.use("/api", sheetsRoutes);

// 3️⃣ Rota padrão para / (opcional, mas útil)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});