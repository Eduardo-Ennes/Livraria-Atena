class ValidationAddress {

    async Validation(obj){
        const validationIsNumber = this.IsNumber(obj)
        if(validationIsNumber.status){
            const info = {
                id: obj.id,
                state: obj.state.trim(),
                city: obj.city.trim(),
                neighborhood: obj.neighborhood.trim(),
                street: obj.street.trim(),
                number: obj.number,
                complement: obj.complement.trim()
            }
            const validationLength = this.isLength(info)
            console.log(validationLength)
            if(validationLength.status){
                const stateHasNumber = this.hasNumber(info.state)
                const cityHasNumber = this.hasNumber(info.city)
                const neighborhoodHasNumber = this.hasNumber(info.neighborhood)
                if(stateHasNumber || cityHasNumber || neighborhoodHasNumber){
                    return{status: false, err: 'Os campos estado, cidade e bairro não podem conter caracteres numéricos.'}
                }
                else{
                    try{
                        const response = await this.Api(info)
                        if(response.status){
                            return{status: response.status, cer: response.cer, code: response.code}
                        }
                        else{
                            return{status: response.status, err: response.err, code: response.code}
                        }
                    }catch(err){
                        console.log(err)
                        return{status: false, err: 'Houve um erro no servidor. Tente novamente.'}
                    }
                }
            }
            else{
                return {status: false, err: validationLength.err}
            }
        }
        else{
            return {status: false, err: validationIsNumber.err}
        }
    }

    IsNumber(obj){
        if(typeof obj.state === 'number'){
            return {status: false, err: 'O campo estado não pode ser numérico.'}
        }
        if(typeof obj.city === 'number'){
            return {status: false, err: 'O campo cidade não pode ser numérico.'}
        }
        if(typeof obj.neighborhood === 'number'){
            return {status: false, err: 'O campo bairro não pode ser numérico.'}
        }
        if(typeof obj.street === 'number'){
            return {status: false, err: 'O campo rua não pode ser numérico.'}
        }
        if(typeof obj.number === 'number'){
            return {status: false, err: 'O campo número não pode ser numérico.'}
        }
        if(typeof obj.complement === 'number'){
            return {status: false, err: 'O campo complement não pode ser numérico.'}
        }
        return {status: true}
    }

    isLength(obj){
        if(obj.number <= 0){
            return {status: false, err: 'Número não pode ser menor ou igual a 0.'}
        }
        if(obj.state.length > 18){
            return {status: false, err: 'Não há estado brasileiro com mais de 18 catacteres.'}
        }
        if(obj.city.length > 45){
            return {status: false, err: 'Cidade não pode conter mais do que 45 caracteres.'}
        }
        if(obj.neighborhood.length > 45){
            return {status: false, err: 'Bairro não pode conter mais do que 45 caracteres.'}
        }
        if(obj.street.length > 75){
            return {status: false, err: 'Rua não pode conter mais do que 75 caracteres'}
        }
        if(obj.complement.length > 150){
            return {status: false, err: 'Complemento não pode conter mais do que 150 caracteres'}
        }
        return {status: true}
    }

    hasNumber = (str) => /\d/.test(str);

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/address', {
                method: "PUT",
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const res = await response.json()
            if(res.status){
                return{status: res.status, cer: res.cer, code: res.code}
            }
            else{
                return{status: res.status, err: res.err, code: res.code}
            }
        }catch(err){
            console.log(err)
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.'}
        }
    }
}

export default new ValidationAddress()