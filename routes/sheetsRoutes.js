const express = require("express");
const router = express.Router();
const { buscarPorCodigo } = require("../services/sheetsServices");

router.get("/buscar/:codigo", async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const registro = await buscarPorCodigo(codigo);
        res.json(registro || { erro: "Código não encontrado na base de dados." });
    } catch (error) {
        res.status(500).json({ erro: "Erro no servidor, não foi possível acessar", detalhe: error.message });
    }
});

module.exports = router;