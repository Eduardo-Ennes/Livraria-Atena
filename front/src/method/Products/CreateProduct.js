class UpdateProduct {

    async Validation(obj){
        if (!(obj.image instanceof File)) {
            return { status: false, err: "Imagem inválida ou não fornecida.", code: 400 };
        }
        else{
            try {
                const resizedImg = await this.resizeImage(obj.image);
                obj.image = resizedImg.src; 
                const isNumber = this.IsNumber(obj)
                if(isNumber.status){
                    const length = this.isLength(obj)
                    if(length.status){
                        const response = await this.Api(obj)
                        if(response.status){
                            return{status: response.status, cer: response.cer, code: response.code}
                        }
                        else{
                            return{status: response.status, cer: response.cer, code: response.code}
                        }
                    }
                    else{
                        return {status: length.status, err: length.err}
                    }
                    }
                else{
                    return {status: isNumber.status, err: isNumber.err}
                }
            } catch (err) {
                console.error("Erro ao redimensionar a imagem:", err);
                return { status: false, err: "Erro ao processar a imagem. Tente novamente.", code: 500 };
            }
        }
    }

    IsNumber(obj){
        if(typeof obj.name === 'number'){
            return {status: false, err: 'O campo nome não pode ser numérico.'}
        }
        if(typeof obj.price != 'number'){
            return {status: false, err: 'O campo preço deve numérico.'}
        }
        if(typeof obj.quantity != 'number'){
            return {status: false, err: 'O campo quantity deve ser numérico.'}
        }
        if(typeof obj.activate != 'number'){
            return {status: false, err: 'O campo ativo deve ser numérico.'}
        }
        if(typeof obj.category != 'number'){
            return {status: false, err: 'O campo categoria deve ser numérico.'}
        }
        if(typeof obj.promotion != 'number'){
            return {status: false, err: 'O campo promoção deve ser numérico.'}
        }
        if(typeof obj.price_promotion != 'number'){
            return {status: false, err: 'O campo preço promoção deve ser numérico.'}
        }
        if(typeof obj.description === 'number'){
            return {status: false, err: 'O campo descricão não pode ser numérico.'}
        }
        return {status: true}
    }

    isLength(obj){
        if(obj.name.length <= 2 || obj.name.length > 55){
            return {status: false, err: 'O campo name deve conter no mínimo 2 caracteres e no máximo 55'}
        }
        if(obj.price <= 0 || obj.price > 500){
            return {status: false, err: 'O preço do livro deve ser maior que R$0,00 e no maximo R$500,00'}
        }
        if(obj.quantity <= 0){
            return {status: false, err: 'A quantidade em estoque deve ser maior que 0.'}
        }
        if(obj.activate != 0 && obj.activate != 1){
            return {status: false, err: 'O campo ativo deve ser 1 ou 0.'}
        }
        if(obj.category != 1 && obj.category != 2 && obj.category != 3){
            return {status: false, err: 'O campo categoria deve ser 1, 2 ou 3.'}
        }
        if(obj.promotion != 0 && obj.promotion != 1){
            return {status: false, err: 'O campo promotion deve ser 0 ou 1.'}
        }
        if(obj.price_promotion <= 0 || obj.price_promotion > 499){
            return {status: false, err: 'Preço promoção deve ter um valor maior que R$0,00 e no máximo R$499,99.'}
        }
        if(obj.description.length <= 20 || obj.description.length > 2000){
            return {status: false, err: 'O campo descrição deve conter no mínimo 20 caracteres e no máximo 2.000.'}
        }
        return {status: true}
    }

    // Redimenciona imagem para 20rem x 20rem
    async resizeImage(imageFile, widthInRem = 20, heightInRem = 20) {
        return new Promise((resolve, reject) => {
        const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const width = widthInRem * remToPx; // Converter rem para pixels
        const height = heightInRem * remToPx;
    
        const img = new Image();
        img.src = URL.createObjectURL(imageFile);
    
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
    
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
    
            const resizedImg = new Image();
            resizedImg.src = canvas.toDataURL("image/png");
    
            resizedImg.onload = () => resolve(resizedImg);
            resizedImg.onerror = (err) => reject(err);
        };
    
        img.onerror = (err) => reject(err);
        });
    }

    async Api(obj){
        try{
            const response = await fetch('http://localhost:8080/product', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const res = await response.json(obj)
            console.log(res)
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

export default new UpdateProduct()