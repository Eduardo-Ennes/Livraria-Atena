import client from '../redis/redisClient'
import { Request, Response } from 'express'

async function User(req: Request, res: Response, next: any){
    try{
        const logado = await client.get('logado')
        if(logado != null){
            next()
        }
        else{
            res.status(403).json('Ops! Está área é proibida. Faça login.')
        }
    }catch(err){
        res.status(500).json('Houve um erro no servidor. Tente novamente.')
    }
}

export default User