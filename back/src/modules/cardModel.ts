import Knex from '../database/Connection'
import client from '../redis/redisClient'

interface card {
    id: number;
    name: string;
    quantity_pro: number;
    promotion: number;
    price: number;
    price_promotion: number;
}

class cardModel {

    public async CardProduct(obj: card) {
        try{
            const Product = await Knex.select().where({id_product: obj.id}).table('products')
            if(Product.length > 0){
                try{
                    const Card = await client.get('card')
                    const Total = await client.get('total')
                    if(Card != null && Total != null){
                        var card = JSON.parse(Card)
                        var totalPrice = JSON.parse(Total)
                        try{
                            const InCard = card.filter((product: any) => product.id == obj.id)
                                if(InCard.length > 0){
                                    if(obj.quantity_pro === 1){
                                        const quantity_pro = InCard[0].quantity_pro + 1
                                        if(quantity_pro <= Product[0].quantity){
                                            if(obj.promotion === 1){
                                                InCard[0].quantity_pro += 1
                                                totalPrice += obj.price_promotion
                                                const CardCache = JSON.stringify(card);
                                                const totalCache = JSON.stringify(totalPrice);
                                                await client.set('card', CardCache);
                                                await client.set('total', totalCache);
                                                return{status: true, cer: 'Produto adicionado com sucesso!', code: 200}
                                            }
                                            else{
                                                InCard[0].quantity_pro += 1
                                                totalPrice += obj.price
                                                const CardCache = JSON.stringify(card);
                                                const totalCache = JSON.stringify(totalPrice);
                                                await client.set('card', CardCache);
                                                await client.set('total', totalCache);
                                                return{status: true, cer: 'Produto adicionado com sucesso!', code: 200}
                                            }
                                        }
                                        else{
                                            return{status: false, err: `Você adicionou o livro ${obj.name} ${quantity_pro} vezes no carrinho, porém, em estoque há apenas ${Product[0].quantity} livros.`, code: 409}
                                        }
                                    }
                                    else{
                                        const quantity_pro = InCard[0].quantity_pro - 1
                                        if(quantity_pro > 0){
                                            if(obj.promotion === 1){
                                                InCard[0].quantity_pro -= 1
                                                totalPrice -= obj.price_promotion
                                                const CardCache = JSON.stringify(card);
                                                const totalCache = JSON.stringify(totalPrice);
                                                await client.set('card', CardCache);
                                                await client.set('total', totalCache);
                                                return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                            }
                                            else{
                                                InCard[0].quantity_pro -= 1
                                                totalPrice -= obj.price
                                                const CardCache = JSON.stringify(card);
                                                const totalCache = JSON.stringify(totalPrice);
                                                await client.set('card', CardCache);
                                                await client.set('total', totalCache);
                                                return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                            }
                                        }
                                        else{
                                            try{
                                                const deleteProductCard = await this.deleteProduct(obj)
                                                if(deleteProductCard.status){
                                                    return{status: deleteProductCard.status, cer: deleteProductCard.cer, code: deleteProductCard.code}
                                                }
                                                else{
                                                    return{status: deleteProductCard.status, err: deleteProductCard.err, code: deleteProductCard.code}
                                                }
                                            }catch(err){
                                                return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                                            }
                                        }
                                    }
                                }
                                else{
                                    if(obj.promotion === 1){
                                        totalPrice += obj.price_promotion
                                        card.push(obj)
                                        const CardCache = JSON.stringify(card)
                                        const totalCache = JSON.stringify(totalPrice)
                                        await client.set('card', CardCache)
                                        await client.set('total', totalCache)
                                        return{status: true, cer: 'Produto adicionado com sucesso!', code: 200}
                                    }
                                    else{
                                        totalPrice += obj.price
                                        card.push(obj)
                                        const CardCache = JSON.stringify(card)
                                        const totalCache = JSON.stringify(totalPrice)
                                        await client.set('card', CardCache)
                                        await client.set('total', totalCache)
                                        return{status: true, cer: 'Produto adicionado com sucesso!', code: 200}
                                    }
                                }
                        }catch(err){
                            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }   
                    else{
                        return{status: false, err: 'Os caches card e total não existem.', code: 500}
                    }
                }catch(err){
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Algo inesperado aconteceu. Produto não foi encontrado ou não existe. Com isso, o produto não pode ser comprado. Desculpe pelo transtorno.', code: 400}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }


    public async deleteProduct(obj: card) {
        try{
            const Product = await Knex.select().where({id_product: obj.id}).table('products')
            if(Product.length > 0){
                try{
                    const Card = await client.get('card')
                    const Total = await client.get('total')
                    if(Card != null && Total != null){
                        var card = JSON.parse(Card)
                        var totalPrice = JSON.parse(Total)
                        if(card.length > 0){
                            const newCard = card.filter((products: any) => products.id != obj.id)
                            card.push(newCard)
                            if(obj.quantity_pro > 1){
                                if(obj.promotion === 1){
                                    totalPrice = totalPrice - (obj.price_promotion * obj.quantity_pro)
                                    const CardCache = JSON.stringify(newCard)
                                    const totalCache = JSON.stringify(totalPrice)
                                    await client.set('card', CardCache)
                                    await client.set('total', totalCache)
                                    return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                }
                                else{
                                    totalPrice = totalPrice -  (obj.price * obj.quantity_pro)
                                    const CardCache = JSON.stringify(newCard)
                                    const totalCache = JSON.stringify(totalPrice)
                                    await client.set('card', CardCache)
                                    await client.set('total', totalCache)
                                    return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                }
                            }
                            else{
                                if(obj.promotion === 1){
                                    totalPrice -= obj.price_promotion
                                    const CardCache = JSON.stringify(newCard)
                                    const totalCache = JSON.stringify(totalPrice)
                                    await client.set('card', CardCache)
                                    await client.set('total', totalCache)
                                    return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                }
                                else{
                                    totalPrice -= obj.price
                                    const CardCache = JSON.stringify(newCard)
                                    const totalCache = JSON.stringify(totalPrice)
                                    await client.set('card', CardCache)
                                    await client.set('total', totalCache)
                                    return{status: true, cer: 'Produto excluido com sucesso!', code: 200}
                                }
                            }
                        }
                        else{
                            return{status: false, err: 'Erro! O carrinho não possui nenhum produto!', code: 409}
                        }
                    }
                    else{
                        return{status: false, err: 'Os caches card e total não existem.', code: 500}
                    }
                }catch(err){
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Algo inesperado aconteceu. Produto não foi encontrado ou não existe. Com isso, o produto não pode ser comprado. Desculpe pelo transtorno.', code: 400}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

}

export default new cardModel()