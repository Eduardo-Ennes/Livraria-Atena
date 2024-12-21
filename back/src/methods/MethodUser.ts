import { json } from 'express';
import Knex from '../database/Connection'
import client from '../redis/redisClient'
import generate_token from './generateToken';


interface User {
    id_user: number;
    first_name: string;
    last_name: string;
    email: string;
    role: number;
    logado: string;
}

interface BD {
    id_user: number; 
    first_name: string; 
    last_name: string; 
    email: string; 
    password: string; 
    role: number; 
    create_at: Date; 
    update_at: Date; 
    logado: string
}


class MethodUsers {

    // Verifica um user pelo nome
    public async FindByName(name: string): Promise<boolean> {
        try{
            const result = await Knex.select().from('users').where({first_name: name})
            if(result.length > 0){
                return true
            }else{
                return false
            }
        }catch(err){
            console.log('FindByEmail: ' + err)
            return false
        }
    }

    public async FindByPassword(password: any): Promise<boolean> {
        try{
            const result = await Knex.select().from('users').where({password: password})
            if(result.length > 0){
                return true
            }else{
                return false
            }
        }catch(err){
            return false
        }
    }

    // Verifica um user pelo id
    public async FindById(id: number): Promise<boolean> {
        try{
            const result = await Knex.select().where({id_user: id}).table('users')
            if(result.length > 0){
                return true
            }
            else{
                return false
            }
        }catch(err){
            console.log('FindById: ' + err)
            return false
        }
    }

    // Verifica pelo e-mail
    public async FindByEmail(email: string): Promise<boolean> {
        try{
            const result = await Knex.select().where({email: email}).table('users')
            if(result.length > 0){
                return true
            }else{
                return false
            }
        }catch(err){
            console.log('FindByEmail: ' + err)
            return false
        }
    }

    // Verifica se o campo está vazio
    public async Digited(name: any): Promise<Boolean> {
        if(name != '' && name != ' '){
            return true
        }
        else{
            return false
        }
    }

    // Verifica se é um number
    public async IsNumber(number: any): Promise<boolean> {
        if(typeof number == 'number'){
            return true
        }
        else{
            return false
        }
    }

    // Busca pelo o e-mail, porem, retorna o user
    public async FindByEmailLogin(email: string): Promise<
    | { status: true; user: Array<BD> }
    | { status: false; user: undefined }
    > {
        try{
            const user = await Knex.select().where({email: email}).table('users')
            if(user.length > 0){
                return {status: true, user: user as Array<BD> }
            }
            else{
                return {status: false, user: undefined}
            }
        }catch(err){
            return {status: false, user: undefined}
        }
    }

    // Cria o cahe do usuário
    public async createCacheUser(obj: User): Promise<boolean> {
        const info = {
            id: obj.id_user,
            first_name: obj.first_name,
            last_name: obj.last_name,
            email: obj.email,
            role: obj.role,
        }
        try{
            const useString = JSON.stringify(info)
            await client.set('user', useString)
            await client.del('logado')
            await client.set('logado', 'true')
            return true
        }catch(err){
            return false
        }
    }

    // Metodo para deletar e criar um novo cache para vendedor
    public async restartCacheCreateSeller(obj: User): Promise<{status: boolean, cer?: string, err?: string, code: number}>{
        const info = {
            id: obj.id_user,
            first_name: obj.first_name,
            last_name: obj.last_name,
            email: obj.email,
            role: 2,
        }
        try{
            await client.del('user')
            const useString = JSON.stringify(info)
            await client.set('user', useString)
            return {status: true, cer: 'Cache atualizado com sucesso.', code: 200}
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor ao apagar o cache. Tente novamente.', code: 500}
        }
    }
}

export default new MethodUsers()