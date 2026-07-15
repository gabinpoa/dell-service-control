import { criarSolicitacao } from "../models/solicitacao.model.js";
import { validarSolicitacao } from "../validators/solicitacao.validator.js";
import { salvarSolicitacao } from "../repositories/solicitacao.repository.js";

export function registrarSolicitacao(dados) {
  const erro = validarSolicitacao(dados);
  
  if (erro) {
    return {
      sucesso: false,
      mensagem: erro,
    };
  }

  const solicitacao = criarSolicitacao(dados);
  salvarSolicitacao(solicitacao);

  return {
    sucesso: true,
    mensagem: "Solicitação registrada com sucesso.",
    dados: solicitacao,
  };
}