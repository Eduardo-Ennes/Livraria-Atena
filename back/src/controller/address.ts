import { Request, Response } from 'express'
import client from '../redis/redisClient'
import AddressModel from '../modules/addressModel'

class addressController {

    // Url que cria um endereço de entrega
    public async createAddress(req: Request, res: Response) {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                const info = {
                    state: req.body.state,
                    city: req.body.city,
                    neighborhood: req.body.neighborhood,
                    street: req.body.street,
                    number: req.body.number,
                    complement: req.body.complement,
                    own: user.id
                }
                try{
                    const response = await AddressModel.createAddress(info)
                    if(response.status){
                        res.status(response.code).json(response)
                    }
                    else{
                        res.status(response.code).json(response)
                    }
                }catch(err){
                    res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.'})
                }
            }
            else{
                res.status(403).json({status: false, err: 'Não há nenhum usuário logado.'})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.'})
        }
    }

    // Url que atualiza um endereço de entrega
    public async updateAddress(req: Request, res: Response) {
        const info = {
            id: req.body.id,
            state: req.body.state,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement
        }
        const response = await AddressModel.updateAddress(info)
        if(response.status){
            if(response.code != undefined){
                res.status(response.code).json(response)
            }
        }
        else{
            if(response.code != undefined){
                res.status(response.code).json(response)
            }
        }
    }

    // Url que deleta um endereço de entrega
    public async deleteAddress(req: Request, res: Response) {
        const id = req.body.id
        console.log(id)
        const response = await AddressModel.deleteAddress(id)
        if(response.status){
            res.status(response.code).json(response)
        }
        else{
            res.status(response.code).json(response)
        }
    }

    // Url que busca todos os endereços de entrega
    public async bringAllAddress(req: Request, res: Response) {
        try{
            const validation = await AddressModel.searchAllAddress()
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

    // Url que busca os endereços de entrega do user
    public async bringAllAddressUser(req: Request, res: Response) {
        try{
            const User = await client.get('user')
            if(User != null){
                try{
                    const user = JSON.parse(User)
                    const validation = await AddressModel.searchAllAddressUser(user.id)
                    if(validation.status){
                        res.status(validation.code).json(validation)
                    }
                    else{
                        res.status(validation.code).json(validation)
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
}


export default new addressController()