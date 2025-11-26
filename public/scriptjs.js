async function buscarCodigo() {
    const input = document.querySelector(".codigo");
    const codigo = input.value.trim();
    const msgBox = document.querySelector(".mensagem");

    if (!codigo) {
        alert("Digite um código!");
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:4000/api/buscar/${codigo}`);
        const dados = await resposta.json();

        if (dados.erro) {
            msgBox.value = `📌 Número da Solicitação de Reparo: ${codigo}\n📅 Data de abertura: (não encontrado)\n⚙️ Veículo: \nDescrição: `;
            return;
        }

        msgBox.value = `📌 Número da Solicitação de Reparo: ${dados.CODIGO}
📅 Data de abertura: ${dados["DATA DE ABERTURA"]}
⚙️ Veículo: ${dados.CARRO}
Descrição: ${dados.DEFEITO}`;

    } catch (error) {
        msgBox.value = "Erro ao acessar a API: " + error.message;
    }
}

function verificarEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarCodigo();
    }
}

function copiarMensagem() {
    const campo = document.querySelector(".mensagem");
    campo.select();
    document.execCommand("copy");
    alert("Mensagem copiada!");
}

// adiciona eventos
document.querySelector(".codigo").addEventListener("keypress", verificarEnter);
document.querySelector("button").addEventListener("click", copiarMensagem);