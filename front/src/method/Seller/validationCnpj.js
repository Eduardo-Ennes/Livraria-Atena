function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    const calcDV = (cnpj, pesoInicial) => {
        let soma = 0;
        let peso = pesoInicial;
        for (let i = 0; i < cnpj.length; i++) {
            soma += cnpj[i] * peso;
            peso = peso === 2 ? 9 : peso - 1;
        }
        return (soma % 11 < 2) ? 0 : 11 - (soma % 11);
    };

    const cnpjBase = cnpj.slice(0, 12);
    const dv1 = calcDV(cnpjBase, 5);
    const dv2 = calcDV(cnpjBase + dv1, 6);

    return cnpj.endsWith(`${dv1}${dv2}`);
}

export default validarCNPJ;
