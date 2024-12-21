import { Request, Response } from 'express'
import client from '../redis/redisClient'
import cardModel from '../modules/cardModel'

class cartController {

    public async addProductInCard(req: Request, res: Response) {
        try{
            const info = {
                id: req.body.id,
                image: req.body.image,
                name: req.body.name,
                quantity_pro: req.body.quantity_pro,
                promotion: req.body.promotion,
                price: req.body.price,
                price_promotion: req.body.price_promotion
            }
            try{
                const validation = await cardModel.CardProduct(info)
                res.status(validation.code).json(validation)
            }catch(err){
                res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    public async deleteProductInCard(req: Request, res: Response) {
        try{
            const info = {
                id: req.body.id,
                name: req.body.name,
                quantity_pro: req.body.quantity_pro,
                promotion: req.body.promotion,
                price: req.body.price,
                price_promotion: req.body.price_promotion
            }
            try{
                const validation = await cardModel.deleteProduct(info)
                res.status(validation.code).json(validation)
            }catch(err){
                res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Busca todos os produtos no carrinho, não tem no methodCard
    public async bringAllCard(req: Request, res: Response) {
        try{
            const Card = await client.get('card')
            const Total = await client.get('total')
            const Logado = await client.get('logado')
            if(Card != null && Total != null && Logado != null){
                const card = JSON.parse(Card)
                const total = JSON.parse(Total)
                const logado = JSON.parse(Logado)
                res.status(200).json({status: true, data: card, total: total.toFixed(2), logado: logado, code: 200})
            }
            else{
                res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

}


export default new cartController()