export function criarSolicitacao({
  cliente,
  equipamento,
  categoria,
  descricao,
  temContratoAtivo,
}) {
  return {
    id: Date.now(),
    cliente,
    equipamento,
    categoria,
    descricao,
    status: "aberta",
    prioridade: temContratoAtivo ? "alta" : "normal",
    criadaEm: new Date().toISOString(),
    historico: [
      {
        dataHora: new Date().toISOString(),
        statusAnterior: null,
        statusNovo: "aberta",
        observacao: "Solicitação criada no sistema.",
      },
    ],
  };
}
