import Cnpj from './validationCnpj'
import Phone from './validationPhone'

class CreateSellerValidation {

    async Validation(obj){
        console.log(obj)
        const isNumber = this.IsNumber(obj)
        if(isNumber.status){
            const length = this.isLength(obj)
            if(length.status){
                const ValidCnpj = Cnpj(obj.cnpj)
                if(ValidCnpj){
                    const ValidPhone = Phone(obj.phone)
                    if(ValidPhone){
                        try{
                            const responde = await this.Api(obj)
                            if(responde.status){
                                return{status: responde.status, cer: responde.cer, code: responde.code}
                            }
                            else{
                                return{status: responde.status, err: responde.err, code: responde.code}
                            }
                        }catch(err){
                            console.log(err)
                            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                    else{
                        return{status: false, err: 'Número de telefone inválido.'}
                    }
                }
                else{
                    return{status: false, err: 'Cnpj inválido.'}
                }
            }
            else{
                return{status: length.status, err: length.err}
            }
        }
        else{
            return{status: isNumber.status, err: isNumber.err}
        }
    }

    IsNumber(obj){
        if(typeof obj.cnpj === 'number'){
            return {status: false, err: 'O campo cnpj não pode ser numérico.'}
        }
        if(typeof obj.state === 'number'){
            return {status: false, err: 'O campo estado não pode ser numérico.'}
        }
        if(typeof obj.city === 'number'){
            return {status: false, err: 'O campo cidade não pode ser numérico.'}
        }
        if(typeof obj.street === 'number'){
            return {status: false, err: 'O campo rua não pode ser numérico.'}
        }
        if(typeof obj.number != 'number'){
            return {status: false, err: 'O campo número deve ser numérico.'}
        }
        if(typeof obj.phone === 'number'){
            return {status: false, err: 'O campo telefone não pode ser numérico.'}
        }
        return {status: true}
    }

    isLength(obj){
        if(obj.state.length > 18){
            return {status: false, err: 'Não há estado brasileiro com mais de 18 catacteres.'}
        }
        if(obj.city.length > 45){
            return {status: false, err: 'Cidade não pode conter mais do que 45 caracteres.'}
        }
        if(obj.street.length > 75){
            return {status: false, err: 'Rua não pode conter mais do que 75 caracteres'}
        }
        if(obj.number <= 0){
            return {status: false, err: 'Número não pode ser menor ou igual a 0.'}
        }
        return {status: true}
    }

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/seller', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const res = await response.json()
            if(res.status){
                return{status: res.status, cer: res.cer}
            }
            else{
                return{status: res.status, err: res.err}
            }
        }catch(err){
            console.log(err)
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.'}
        }
    }

}

export default new CreateSellerValidation()