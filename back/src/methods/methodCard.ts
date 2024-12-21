import Knex from '../database/Connection'

class MethodCard {

    // Busca o produto pelo id
    public async FindById(id: number): Promise<{status: boolean, pro?: any, err?: string, code: number}> {
        try{
            const findId = await Knex.select().where({id_product: id}).table('products')
            if(findId.length > 0){
                return {status: true, pro: findId[0], code: 200}
            }
            else{
                return {status: false, err: 'Produto não encontrado ou não existe.', code: 400}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

}


export default new MethodCard()