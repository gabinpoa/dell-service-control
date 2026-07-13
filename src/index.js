import { existsSync, readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";

function validarSolicitacao(solicitacao) {
  if (!solicitacao.cliente) return "Cliente corporativo é obrigatório.";
  if (!solicitacao.categoria) return "Categoria é obrigatória.";
  if (!solicitacao.descricao || solicitacao.descricao.length < 10) {
    return "Descrição insuficiente para análise.";
  }
  return null;
}

function definirPrioridade(temContratoAtivo) {
  return temContratoAtivo ? "alta" : "normal";
}

const solicitacao = {
  cliente: "Empresa Alpha",
  equipamento: "Notebook Latitude 5440",
  categoria: "suporte técnico",
  descricao: "Equipamento não liga após atualização.",
  status: "aberta",
  prioridade: definirPrioridade(true),
};

const erro = validarSolicitacao(solicitacao);
if (erro) console.log("Erro de validação:", erro);
else {
  writeFileSync(
    "./data/solicitacoes.json",
    JSON.stringify([solicitacao], null, 2),
  );
  console.log("Solicitação registrada com sucesso.");
}

const terminal = createInterface({
  input: process.stdin,
  output: process.stdout,
});
function perguntar(mensagem) {
  return new Promise((resolve) => {
    terminal.question(mensagem, resolve);
  });
}

async function coletarDadosSolicitacao() {
  const cliente = await perguntar("Cliente corporativo: ");
  const equipamento = await perguntar("Equipamento: ");
  const categoria = await perguntar("Categoria: ");
  const descricao = await perguntar("Descrição: ");
  const contrato = await perguntar("Contrato ativo? (s/n): ");
  return {
    cliente,
    equipamento,
    categoria,
    descricao,
    temContratoAtivo: contrato.toLowerCase() === "s",
  };
}

function criarSolicitacao(dados) {
  return {
    id: Date.now(),
    cliente: dados.cliente,
    equipamento: dados.equipamento,
    categoria: dados.categoria,
    descricao: dados.descricao,
    status: "aberta",
    prioridade: definirPrioridade(dados.temContratoAtivo),
    criadaEm: new Date().toISOString(),
  };
}

function criarHistoricoInicial() {
  return {
    dataHora: new Date().toISOString(),
    statusAnterior: null,
    statusNovo: "aberta",
    observacao: "Solicitação registrada no sistema.",
  };
}
solicitacao.historico = [criarHistoricoInicial()];

function carregarSolicitacoes() {
  if (!existsSync("./data/solicitacoes.json")) {
    return [];
  }
  const conteudo = readFileSync("./data/solicitacoes.json", "utf-8");
  return JSON.parse(conteudo);
}

function salvarSolicitacao(solicitacao) {
  const solicitacoes = carregarSolicitacoes();
  solicitacoes.push(solicitacao);
  writeFileSync(
    "./data/solicitacoes.json",
    JSON.stringify(solicitacoes, null, 2),
  );
}

async function iniciar() {
  try {
    console.log("Dell Enterprise Service Control");
    const dados = await coletarDadosSolicitacao();
    const solicitacao = criarSolicitacao(dados);
    const erro = validarSolicitacao(solicitacao);
    if (erro) {
      console.log("Erro de validação:", erro);
      return;
    }
    solicitacao.historico = [criarHistoricoInicial()];
    salvarSolicitacao(solicitacao);
    console.log("Solicitação registrada com sucesso.");
    console.log(solicitacao);
  } catch (erro) {
    console.error("Erro inesperado:", erro.message);
  } finally {
    terminal.close();
  }
}

iniciar();
