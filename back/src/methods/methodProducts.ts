import Knex from '../database/Connection'
import method from '../methods/MethodUser'


interface ProductsUpdate{
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    activate: number;
    category: number;
    promotion: number;
    price_promotion: number;
}

interface ProductsCreate{
    name: string;
    description: string;
    price: number;
    quantity: number;
    activate: number;
    category: number;
    promotion: number;
    price_promotion: number;
}


class MethodProducts {

    // Busca um produto pelo id
    public async findById(id: number): Promise<{status: boolean, pro?: any}> {
        try{
            const productId = await Knex.select().where({id_product: id}).table('products')
            if(productId.length > 0){
                return {status: true, pro: productId[0]}
            }
            else{
                return{status: false}
            }
        }catch(err){
            console.log(err)
            return {status: false}
        }
    }

    // Valida o id de deleção de produto
    public async validationIdProduct(id: number): Promise<{status: boolean, err?: string, code?: number, pro?: any}> {
        try{
            const Product = await Knex.select().where({id_product: id}).table('products')
            if(Product.length > 0){
                return {status: true, pro: Product[0]}
            }else{
                return {status: false, err: 'Produto não encontrado ou não existe.', code: 404}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }
    }
}

export default new MethodProducts()