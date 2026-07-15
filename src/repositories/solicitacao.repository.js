import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";

const PASTA_DADOS = "./data";
const CAMINHO_ARQUIVO = "./data/solicitacoes.json";

function garantirArquivo() {
  if (!existsSync(PASTA_DADOS)) {
    mkdirSync(PASTA_DADOS);
  }
  if (!existsSync(CAMINHO_ARQUIVO)) {
    writeFileSync(CAMINHO_ARQUIVO, "[]");
  }
}

export function listarSolicitacoes() {
  garantirArquivo();
  const conteudo = readFileSync(CAMINHO_ARQUIVO, "utf-8");
  return JSON.parse(conteudo);
}

export function salvarSolicitacao(solicitacao) {
  const solicitacoes = listarSolicitacoes();
  solicitacoes.push(solicitacao);
  writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(solicitacoes, null, 2));
  return solicitacao;
}
