class DeleteProduct {

    async Api(id){
        try{
            const response = await fetch('http://localhost:8080/product', {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                },
                body: JSON.stringify(id)
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

export default new DeleteProduct()