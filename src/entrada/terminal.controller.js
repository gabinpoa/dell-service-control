import { createInterface } from "readline";
import { registrarSolicitacao } from "../services/solicitacao.service.js";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(mensagem) {
    return new Promise((resolve) => {
        readline.question(mensagem, resolve);
});
}

export async function iniciarRegistroPeloTerminal() {
    try {
        const cliente = await perguntar("Cliente corporativo: ");
        const equipamento = await perguntar("Equipamento: ");
        const categoria = await perguntar("Categoria: ");
        const descricao = await perguntar("Descrição: ");

        
    const contrato = await perguntar("Possui contrato ativo? (s/n): ");
    const dados = {
        cliente,
        equipamento,
        categoria,
        descricao,
        temContratoAtivo: contrato.trim().toLowerCase() === "s"
};

    const resultado = registrarSolicitacao(dados);

    console.log(resultado.mensagem);
    if (resultado.sucesso) {
        console.log(resultado.dados);
    }
} finally {
readline.close();
}
}
