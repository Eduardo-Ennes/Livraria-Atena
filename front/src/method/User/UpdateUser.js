class ValidationUser {

    async Validation(obj){
        const validationIsNumber = this.IsNumber(obj)
        if(validationIsNumber.status){
            const info = {
                first_name: obj.first_name.trim(),
                last_name: obj.last_name.trim(),
                email: obj.email1.trim()
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
        if(typeof obj.email === 'number'){
            return {status: false, err: 'O campo email não pode ser numérico.'}
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
        if(obj.email.length < 13 || obj.email.length > 75){
            return {status: false, err: 'Error! Email deve conter no mínimo 15 caracteres e no máximo 75.'}
        }
        return {status: true}
    }

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/user', {
                method: "PUT",
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