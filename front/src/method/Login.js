class ValidationCampos {
    async Validation(obj){
        const isNumber = this.IsNumber(obj)
        if(isNumber.status){
            const info = {
                email: obj.email.trim(),
                password: obj.password.trim()
            }
            const validationLength = this.isLength(info)
            if(validationLength.status){
                try{
                    const response = await this.Api(info)
                    if(response.status){
                        return{status: response.status, cer: response.cer}
                    }
                    else{
                        return{status: response.status, err: response.err}
                    }
                }catch(err){
                    console.log(err)
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente.'}
                }
            }
            else{
                return{status: false, err: validationLength.err}
            }
        }
        else{
            return {status: false, err: isNumber.err}
        }
    }
    
    IsNumber(obj){
        if(typeof obj.email === 'number'){
            return {status: false, err: 'O campo email não pode ser numérico.'}
        }
        if(typeof obj.password === 'number'){
            return {status: false, err: 'O campo password não pode ser numérico.'}
        }
        return {status: true}
    }

    isLength(obj){
        if(obj.email.length < 13 || obj.email.length > 75){
            return {status: false, err: 'Error! Email deve conter no mínimo 13 caracteres e no máximo 75.'}
        }
        if(obj.password.length < 6 || obj.password.length > 50){
            return {status: false, err: 'Error! Senha deve conter no mínimo 6 caracteres e no máximo 50.'}
        }
        return {status: true}
    }

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/login', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const res = await response.json()
            if(res.status){
                return{status: true, cer: res.cer}
            }
            else{
                return{status: false, err: res.err}
            }
        }catch(err){
            console.log(err)
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.'}
        }
    }
}

export default new ValidationCampos()