class ValidationUser {

    async Validation(obj){
        const validationIsNumber = this.IsNumber(obj)
        if(validationIsNumber.status){
            const info = {
                first_name: obj.first_name.trim(),
                last_name: obj.last_name.trim(),
                email1: obj.email1.trim(),
                email2:obj.email2.trim(),
                password1: obj.password1.trim(),
                password2: obj.password2.trim()
            }
            const validationLength = this.isLength(info)
            if(validationLength.status){
                const validationCompare = this.Compare(info)
                if(validationCompare.status){
                    const newInfo = {
                        first_name: info.first_name,
                        last_name: info.last_name,
                        email: info.email1,
                        password: info.password1
                    }
                    try{
                        const response = await this.Api(newInfo)
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
                    return {status: false, err: validationCompare.err}
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
        if(typeof obj.first_name === 'number'){
            return {status: false, err: 'O campo nome não pode ser numérico.'}
        }
        if(typeof obj.last_name === 'number'){
            return {status: false, err: 'O campo sobrenome não pode ser numérico.'}
        }
        if(typeof obj.email1 === 'number'){
            return {status: false, err: 'O campo email não pode ser numérico.'}
        }
        if(typeof obj.email2 === 'number'){
            return {status: false, err: 'O campo email não pode ser numérico.'}
        }
        if(typeof obj.password1 === 'number'){
            return {status: false, err: 'O campo senha não pode ser numérico.'}
        }
        if(typeof obj.password2 === 'number'){
            return {status: false, err: 'O campo senha não pode ser numérico.'}
        }
        return {status: true}
    }

    isLength(obj){
        if(obj.first_name.length < 3 || obj.first_name.length > 45){
            return {status: false, err: 'Error! nome deve conter no mínimo 3 caracteres e no máximo 45.'}
        }
        if(obj.last_name.length < 3 || obj.last_name.length > 45){
            return {status: false, err: 'Error! sobrenome deve conter no mínimo 3 caracteres e no máximo 45.'}
        }
        if(obj.email1.length < 13 || obj.email1.length > 75){
            return {status: false, err: 'Error! Email deve conter no mínimo 15 caracteres e no máximo 75.'}
        }
        if(obj.email2.length < 13 || obj.email2.length > 75){
            return {status: false, err: 'Error! Email deve conter no mínimo 15 caracteres e no máximo 75.'}
        }
        if(obj.password1.length < 6 || obj.password1.length > 50){
            return {status: false, err: 'Error! Senha deve conter no mínimo 6 caracteres e no máximo 50.'}
        }
        if(obj.password2.length < 6 || obj.password2.length > 50){
            return {status: false, err: 'Error! Senha deve conter no mínimo 6 caracteres e no máximo 50.'}
        }
        return {status: true}
    }

    Compare(obj){
        console.log(obj)
        if(obj.email1 != obj.email2){
            return{status: false, err: 'E-mails diferente.'}
        }
        if(obj.password1 != obj.password2){
            return{status: false, err: 'Senhas diferente.'}
        }
        return{status: true}
    }

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/user', {
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

export default new ValidationUser()