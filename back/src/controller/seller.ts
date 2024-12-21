import sellerModel from '../modules/seller'
import client from '../redis/redisClient'
import { Request, Response } from 'express'

class SellerController {

    // public async createSellerFirstTime(req: Request, res: Response) {
    //     const info = {
    //         cnpj: req.body.cnpj,
    //         state: req.body.state,
    //         city: req.body.city,
    //         street: req.body.street,
    //         number: req.body.number,
    //         phone: req.body.phone
    //     }
    //     try{
    //         const response = await sellerModel.createSellerFirstTime(info)
    //         console.log(response)
    //         res.status(response.code).json(response)
    //     }catch(err){
    //         res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
    //     }
    // }    

    // Url para criar um endereço para o vendedor
    public async createSeller(req: Request, res: Response) {
        const info = {
            cnpj: req.body.cnpj,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            phone: req.body.phone
        }
        try{
            const response = await sellerModel.createSeller(info)
            console.log(response)
            res.status(response.code).json(response)
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Atualiza um endereço de vendedor
    public async updateSeller(req: Request, res: Response) {
        const info = {
            id: req.body.id as number,
            cnpj: req.body.cnpj as string,
            state: req.body.state as string,
            city: req.body.city as string,
            street: req.body.street as string,
            number: req.body.number as number,
            phone: req.body.phone as string
        }
        try{
            const response = await sellerModel.updateSeller(info)
            res.status(response.code).json(response)
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Deleta um endereço de vendedor
    public async deleteSeller(req: Request, res: Response) {
        const idParams = req.params.id
        const id = parseInt(idParams)
        try{
            const response = await sellerModel.deleteSeller(id)
            res.status(response.code).json(response)
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // busca todos os endereços de vendedor do banco de dados
    public async bringAllSellers(req: any, res: any) {
        try{
            const User = client.get('user')
            if(User != null){
                try{
                    const validation = await sellerModel.searcAllSellers()
                    if(validation.status){
                        res.status(validation.code).json(validation.cer)
                    }
                    else{
                        res.status(validation.code).json(validation.err)
                    }
                }catch(err){
                    res.status(500).json('Houve um erro no servidor. Tente novamente.')
                }
            }
            else{
                res.status(403).json('Não há nenhum usuário logado.')
            }
        }catch(err){
            res.status(500).json('Houve um erro no servidor. Tente novamente.')
        }
    }

    // busca todos os endereços de vendedor do usuário
    public async bringAllSellersUser(req: Request, res: Response){
        try{
            const responde = await sellerModel.searchAllSellersUser()
            res.status(responde.code).json(responde)
        }catch(err){
            res.status(500).json({status: 500, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }
}

export default new SellerController()