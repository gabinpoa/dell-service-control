export function validarSolicitacao(dados) {
    if (!dados.cliente || !dados.cliente.trim()) {
        return "Cliente corporativo é obrigatório.";
    }
    if (!dados.categoria || !dados.categoria.trim()) {
        return "Categoria é obrigatória.";
    }
    if (!dados.descricao || dados.descricao.trim().length < 10) {
        return "Descrição insuficiente para análise.";
    }
    return null;
}