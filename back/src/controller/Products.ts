import products from '../modules/products'
import client from '../redis/redisClient'
import Knex from '../database/Connection'
import saveImage from '../methods/updatedImage'
import CreateSaveImage from '../methods/createSaveImage'
import { Request, Response } from 'express'

class ProductsController {

    // Url de criação do produto
    public async createProduct(req: Request, res: Response) {
        const info = {
            image: req.body.image,
            name: req.body.name,
            description: req.body.description,  
            price: req.body.price,
            quantity: req.body.quantity,
            activate: req.body.activate, 
            category: req.body.category,
            promotion: req.body.promotion,
            price_promotion: req.body.price_promotion,
        }
        try{
            const imageUrl = await CreateSaveImage(info.image)
            if(imageUrl){
                info.image = imageUrl
                try{
                    const response = await products.CreateProducts(info)
                    res.status(response.code).json(response)
                }catch(err){
                    res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
                }
            }
            else{
                return res.status(500).json({ status: false, err: 'Erro ao salvar a imagem.', code: 500 });
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Url de atualização do produto
    public async updateProduct(req: Request, res: Response){
        const info = {
            id: req.body.id,
            image: req.body.image, 
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            activate: req.body.activate,
            category: req.body.category,
            promotion: req.body.promotion,
            price_promotion: req.body.price_promotion,
        };
        try{
            const response = await Knex.select().where({id_product: info.id}).table('products')
            if(response.length > 0){
                const oldImage = response[0]?.image || null
                const imageUrl = await saveImage(oldImage, info.image)
                if(imageUrl){
                    info.image = imageUrl
                    try{
                        const response = await products.updateProduct(info)
                        res.status(response.code).json(response)
                    }catch(err){
                        res.status(500).json({ status: false, err: 'Erro ao salvar a imagem ou atualizar o produto.', code: 500, });
                    }
                }
                else{
                    res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
                }
            }
            else{
                res.status(400).json({status: false, err: 'Produto não encontrado ou não existe.', code: 400})
            }
        }catch(err){
            res.status(500).json({ status: false, err: 'Erro ao salvar a imagem ou atualizar o produto.', code: 500, });
        }
   }

   // Url de deleção do produto
   public async deleteProduct(req: Request, res: Response) {
        const id = req.body.id
        try{
            const response = await products.deleteProduct(id)
            res.status(response.code).json(response)
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Url que busca informações do produto e seu propeietário
    public async InfoProduct(req: Request, res: Response) {
        const idParms = req.params.id
        const id = parseInt(idParms)
        try{
            const response = await products.InfoProduct(id)
            res.status(response.code).json(response)
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }


    // Url que busca todos os produtos 
    public async bringAllProducts(req: Request, res: Response) {
        try{
            const bringProducts = await products.searchAllProducts()
            if(bringProducts.status){
                res.status(bringProducts.code).json(bringProducts.pro)
            }
            else{
                res.status(bringProducts.code).json(bringProducts.err)
            }
        }catch(err){
            res.status(500).json('Houve um erro no servidor. Tente novamente.')
        }
    }

    // Url que busca todos os produtos do user logado
    public async bringAllProductsUser(req: Request, res: Response) {
       try{
            const response = await products.searchAllProductsUser()
            if(response.status){
                res.status(response.code).json(response)
            }
            else{
                res.status(response.code).json(response)
            }
       }catch(err){
            res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
       }
    }

    // Url que busca um produto do user para atualização
    public async bringProduct(req: Request, res: Response) {
        const id = req.params.id
        try{
            const User = await client.get('user')
            if(User != null){
                try{
                    const response = await Knex.select().where({id_product: id}).table('products')
                    if(response.length > 0){
                        res.status(200).json({status: true, pro: response, code: 200})
                    }
                    else{
                        res.status(200).json({status: true, pro: [], code: 200})
                    }
                }catch(err){
                    res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
                }
            }
            else{
                res.status(401).json({status: false, err: 'Restrtio. Faça login', code: 401})
            }
        }catch(err){
            res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
        }
     }


    // Url que busca livros de ficção
    public async BringFiccao(req: Request, res: Response){
        try{
            const response = await Knex.select().where({category: 1, activate: 1}).table('products')
            if(response.length > 0){
                res.status(200).json({status: true, data: response})
            }
            else{
                res.status(200).json({status: true, data: []})
            }
        }catch(err){
            res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
        }
    }

    // Url que busca livros de historia
    public async Bringhistory(req: Request, res: Response){
        try{
            const response = await Knex.select().where({category: 2, activate: 1}).table('products')
            if(response.length > 0){
                res.status(200).json({status: true, data: response})
            }
            else{
                res.status(200).json({status: true, data: []})
            }
        }catch(err){
            res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
        }
    }
    
    // Url que busca livros de auto-ajuda
    public async BringAutoAjuda(req: Request, res: Response){
        try{
            const response = await Knex.select().where({category: 3, activate: 1}).table('products')
            if(response.length > 0){
                res.status(200).json({status: true, data: response})
            }
            else{
                res.status(200).json({status: true, data: []})
            }
        }catch(err){
            res.status(500).json({status: false, err: "Houve um erro no servidor. Tente novamente."})
        }
    }
}


export default new ProductsController()