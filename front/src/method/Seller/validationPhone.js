function validatipnPhone(numero) {
    // Remove caracteres não numéricos
    numero = numero.replace(/[^\d]+/g, '');

    // Verifica se o número possui 11 dígitos
    if (numero.length !== 11) return false;

    // Verifica se o número inicia com o dígito 9 (celular)
    // e se o DDD (2 primeiros dígitos) está no intervalo válido (11 a 99)
    const ddd = numero.slice(0, 2);
    const celular = numero.slice(2);

    if (!/^[1-9][1-9]$/.test(ddd)) return false; // Valida DDD
    if (!/^9\d{8}$/.test(celular)) return false; // Valida celular

    return true;
}

export default validatipnPhone;