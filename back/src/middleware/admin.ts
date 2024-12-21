import client from '../redis/redisClient'
import { Request, Response } from 'express'

async function Admin(req: Request, res: Response, next: any){
    try{
        const User = await client.get('user')
        if(User !=  null){
            const user = JSON.parse(User)
            if(user.role === 3){
                next()
            }
            else{
                res.status(403).json('Você não está autorizado a acessar está área. Apenas para administradores.')
            }
        }
        else{
            res.status(401).json('Você não pode acessar está área. Faça login.')
        }
    }catch(err){
        res.status(500).json('Houve um erro no servidor. Tente novamente.')
    }
}

export default Admin