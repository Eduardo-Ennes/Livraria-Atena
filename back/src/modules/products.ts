import Knex from '../database/Connection'
import methodPro from '../methods/methodProducts'
import methodDeleteImg from '../methods/deleteImage'
import client from '../redis/redisClient';

interface ProductsCreate{
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    activate: number;
    category: number;
    promotion: number;
    price_promotion: number;
}

interface ProductsUpdate{
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    activate: number;
    category: number;
    promotion: number;
    price_promotion: number;
}

class ProductsModel {

    // cria o produto
    public async CreateProducts(obj: ProductsCreate): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                if(user.role === 2 || user.role === 3){
                    try{
                        await Knex.insert({
                            image: obj.image,
                            name: obj.name,
                            description: obj.description,  
                            price: obj.price,
                            quantity: obj.quantity,
                            activate: obj.activate, 
                            category: obj.category,
                            promotion: obj.promotion,
                            price_promotion: obj.price_promotion,
                            own: user.id
                        }).table('products')
                        return{status: true, cer: 'Livro cadastrado com sucesso.', code: 200}
                    }catch(err){
                        return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
                    }
                }
                else{
                    return{status: false, err: 'Restritro. Área de vendedores ou administradores.', code: 403}
                }
            }
            else{
                return{status: false, err: 'Restrito. Faça login', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }
    }

    // Atualiza o produto
    public async updateProduct(obj: ProductsUpdate): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        console.log('ENTROU')
        // console.log(obj)
        try{
            const User = await client.get('user')
            if(User !=  null){
                const user = JSON.parse(User)
                    if(user.role === 2 || user.role === 3){
                        const ProductId = await methodPro.findById(obj.id)
                        if(user.id === ProductId.pro.own){
                            try{
                                await Knex.update({
                                    image: obj.image,
                                    name: obj.name,
                                    description: obj.description,
                                    price: obj.price,
                                    quantity: obj.quantity,
                                    activate: obj.activate,
                                    category: obj.category,
                                    promotion: obj.promotion,
                                    price_promotion: obj.price_promotion,
                                }).where({id_product: obj.id}).table('products')
                                return{status: true, cer: 'Livro atualizado com sucesso!', code: 200}
                            }catch(err){
                                return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
                            }
                        }
                        else{
                            return {status: false, err: 'Você não pode atualizar um produto que não é seu.', code: 403}
                        }
                    }
                    else{
                        return{status: false, err: 'Restritro. Área de vendedores ou administradores.', code: 403}
                    }
            }
            else{
                return{status: false, err: 'Restrito. Faça login', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        } 
    }

    // Deleta um produto
    public async deleteProduct(id: number): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                if(user.role === 2 || user.role === 3){
                    try{
                        const FindId = await methodPro.findById(id)
                        if(FindId.status){
                            if(user.id === FindId.pro.own){
                                console.log(FindId.pro.image)
                                methodDeleteImg(FindId.pro.image)
                                try{
                                    await Knex.delete()
                                    .where({id_product: id})
                                    .table('products')
                                    return{status: true, cer: 'Livro excluido com sucesso!', code: 200}
                                }catch(err){
                                    return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
                                }
                            }
                            else{
                                return{status: false, err: 'Restrito. Você não pode excluir um livro que não é seu.', code: 403}
                            }
                        }
                        else{
                            return{status: FindId.status, err: 'Livro não encontrado ou não existe.', code: 422}
                        }
                    }catch(err){
                        return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
                    }
                }
                else{
                    return{status: false, err: 'Restritro. Área de vendedores ou administradores.', code: 403}
                }
            }
            else{
                return{status: false, err: 'Restrito. Faça login', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }
    }

    public async InfoProduct(id: number){
        const data: any = []
        try{
            const product = await Knex.select().where({id_product: id}).table('products')
            if(product.length > 0){
                data.push(product[0])
                try{
                    const user = await Knex.select().where({id_user: product[0].own}).table('users')
                    if(user.length > 0){
                        data.push(user[0])
                        try{
                            const userSeller = await Knex.select().where({own: product[0].own}).table('seller')
                            if(userSeller.length > 0){
                                data.push(userSeller[0])
                                try{
                                    const User_logado = await client.get('user')
                                    if(User_logado != null){
                                        const user_logado = JSON.parse(User_logado)
                                        data.push(user_logado)
                                        return{status: true, data: data, code: 200}
                                    }
                                    else{
                                        const info_user = {
                                            id: 0
                                        }
                                        data.push(info_user)
                                        return{status: true, data: data, code: 200}
                                    }
                                }catch(err){
                                    return {status: false, err: 'Houve um erro no servidor.', code: 500}
                                }
                            }
                            else{
                                return {status: false, err: 'Algo inesperado aconteceu. O dados do proprietário do produto não foram encontrados. Com isso, o produto não pode ser comprado. Desculpe o transtorno', code: 400}
                            }
                        }catch(err){
                            return {status: false, err: 'Houve um erro no servidor.', code: 500}
                        }
                    }
                    else{
                        return {status: false, err: 'Algo inesperado aconteceu. O proprietário do produto não foi encontrado. Com isso, o produto não pode ser comprado. Desculpe o transtorno.', code: 400}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor.', code: 500}
                }
            }
            else{
                return {status: false, err: 'Produto não encontrado ou não existe.', code: 422}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor.', code: 500}
        }
    }

    // Busca todos os produtos 
    public async searchAllProducts(): Promise<{status: Boolean, err?: string, pro?: any[], code: number}> {
        try{
            // Activate 1 => Produtos a venda
            // Activate 0 => produtos que não estão a venda
            const Products = await Knex.select().where({activate: 1}).table('products')
            if(Products.length > 0){
                return {status: true, pro: Products, code: 200}
            }
            else{
                return {status: false, err: 'Não temos nenhum produto cadastrado ou a venda.', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }
    }

    // Busca todos os produtos do usuário
    public async searchAllProductsUser(): Promise<{status: boolean, err?: string, pro?: any[], code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                try{
                    const user = await JSON.parse(User)
                    const pro = await Knex.select().where({own: user.id}).table('products')
                    if(pro.length > 0){
                        return{status: true, pro: pro, code: 200}
                    }
                    else{
                        return{status: false, err: 'Você não possui nenhum produto cadastrado.', code: 200}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
                }
            }   
            else{
                return {status: false, err: 'Restrito. Faça login', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }
    }
}


export default new ProductsModel()