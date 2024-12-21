import { Request, Response } from 'express'
import UserModel from '../modules/UserModel'
import client from '../redis/redisClient'

class UserController {
    public async Initial(req: Request, res: Response){
        try{
            const Card = await client.get('card')
            const Total = await client.get('total')
            const Logado = await client.get('logado')
            if(Card === null){
                const card: any = []
                const useCard = JSON.stringify(card)
                await client.set('card', useCard)
            }
            if(Total === null){
                const total = 0
                const userTotal = JSON.stringify(total)
                await client.set('total', userTotal)
            }
            if(Logado === null){
                await client.set('logado', 'false')
            }
            try{    
                const validation = await UserModel.Initial()
                if(validation.status){
                    res.status(validation.code).json({status: true, data: validation.data})
                }
                else{
                    res.status(validation.code).json({status: false, err: 'Houve um erro no servidro. Tente novamente.'})
                }
            }catch(err){
                res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.'})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.'})
        }
    }

    public async Logado(req: Request, res: Response){
        const Logado = await client.get('logado')
        if(Logado != null){
            const logado = JSON.parse(Logado)
            res.status(200).json({logado: logado})
        }
        else{
            res.status(500).json({logado: false})
        }
    }

    public async createUser(req: Request, res: Response){
        const info = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role: 1
        }
        const verification = await UserModel.CreateUser(info)
        if(verification.status){
            res.status(verification.code).json(verification)
        }
        else{
            res.status(verification.code).json(verification)
        }
    }

    public async deleteUser(req: Request, res: Response){
        var id = req.body.id
        const validation = await UserModel.DeleteUser(id)
        if(validation.status){
            res.status(validation.code).json(validation)
        }
        else{
            res.status(validation.code).json(validation)
        }
    }

    public async updateUser(req: Request, res: Response){
        const info = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        const validation = await UserModel.UpdateUser(info)
        if(validation.status){
            res.status(validation.code).json({status: validation.status, cer: validation.cer})
        }
        else{
            res.status(validation.code).json({status: validation.status, err: validation.err})
        }
    }

    public async BringUser(req: Request, res: Response){
        const User = await UserModel.searchUser()
        if(User.status){
            res.status(User.code).json(User)
        }
        else{
            res.status(User.code).json(User)
        }
    }

    public async loginUser(req: Request, res: Response){
        var email = req.body.email
        var password = req.body.password
        try{
            const validation = await UserModel.Login(email, password)
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

    public async Logout(req: Request, res: Response) {
        try{
            const deleteUserCache = await client.del('user')
            const deleteUserCard = await client.del('card')
            const deleteUserLogado = await client.del('logado')
            const deleteUserTotal = await client.del('total')
            if(deleteUserCache == 1 && deleteUserCard === 1 && deleteUserLogado === 1 && deleteUserTotal){
                res.status(200).json({status: true, cer: 'Volte sempre!', code: 200})
            }else{
                res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    // Leva informações do cache user para a page logout
    public async LogoutInfomations(req: Request, res: Response) {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                res.status(200).json({status: true, data: user, code: 200})
            }
            else{
                res.status(401).json({status: false, err: 'Área restrita. Faça login.', code: 401})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    public async BringInformationUser(req: Request, res: Response){
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                res.status(200).json({status: true, data: user, code: 200})
            }
            else{
                res.status(500).json({status: false, err: 'Restrito. Faça login!', code: 403})
            }
        }catch(err){
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    public async teste(req: Request, res: Response){
        const User = await client.get('user')
        const logado = await client.get('logado')
        const Card = await client.get('card')
        const Total = await client.get('total')
        if(Card == null){
            res.json('Não tem dados no cache')
        }
        else{
            const UserObj = JSON.parse(Card)
            res.json(UserObj)
        }
    }

    public async teste2(req: Request, res: Response) {
        res.json('DELETADO!')
    }
}


export default new UserController()