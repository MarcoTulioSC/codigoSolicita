const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

async function buscarPorCodigo(codigo) {
    
    const spreadsheetId = process.env.SHEET_ID;

    console.log("ID da planilha carregado:", spreadsheetId);
    console.log(">> Buscar código:", codigo);
    const range = "Solicitação Manutenção!A:J"; // ajuste conforme sua planilha
    const codigoBusca = String(codigo).trim();

    const resposta = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    const linhas = resposta.data.values;
    console.log(">> Total de linhas recebidas:", linhas.length);

    if (!linhas || linhas.length === 0) return null;

    const cabecalho = linhas.shift();
    const objetos = linhas.map(l => {
        let obj = {};
        cabecalho.forEach((c, i) => obj[c.toUpperCase()] = l[i]);
        return obj;
    });

    

    return objetos.find(r => r["CODIGO"] === codigo);
    //console.log(">> Resultado encontrado:", achado);

    //return achado;
}

module.exports = { buscarPorCodigo };