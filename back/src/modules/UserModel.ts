import Knex from '../database/Connection'
import method from '../methods/MethodUser'
import bcrypt from 'bcryptjs'
import client from '../redis/redisClient'


interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: number;
}

interface UserUpdate {
    first_name: string;
    last_name: string;
    email: string;
}

class UserModel {
    public async Initial(){
        try{
            const data = await Knex.select().where({activate: 1}).table('products')
            if(data.length > 0){
                return{status: true, data: data, code: 200}
            }
            else{
                return{status: true, data: [], code: 200}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }


    // Cria um usuário
    public async CreateUser(obj:User): Promise<{status: boolean, err?: string, cer?: string, code: number}>{
        try{
            const validationEmail = await method.FindByEmail(obj.email)
            if(validationEmail != true){
                const PassHash = await bcrypt.hash(obj.password, 10)
                try{
                    await Knex('users')
                    .insert({
                        first_name: obj.first_name,
                        last_name: obj.last_name,
                        email: obj.email,
                        password: PassHash,
                        role: obj.role,
                    });
                    return { status: true, cer: 'Cadastro realizado com sucesso.', code: 200 };
                }catch(err){
                    console.log(err)
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Este email já está em uso.', code: 400}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }
    

    // Deleta um usuário
    public async DeleteUser(id: number): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                try{
                    const UserBd = await Knex.select().where({id_user: user.id}).table('users')
                    if(UserBd.length > 0){
                        try{
                            await Knex.delete().where({id_user: id}).table('users')
                            return {status: true, cer: 'Usuário excluido com sucesso.', code: 200}
                        }catch(err){
                            console.log(err)
                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                    else{
                        return{status: false, err: 'Usúario não encontrado ou não existe.', code: 422}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return {status: false, err: 'Você não está autenticado.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    // atualiza um usuário
    public async UpdateUser(obj: UserUpdate): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                try{
                    const UserBd = await Knex.select().where({id_user: user.id}).table('users')
                    if(UserBd.length > 0){
                        try{
                            await Knex.update({
                                first_name: obj.first_name,
                                last_name: obj.last_name,
                                email: obj.email
                            }).where({id_user: user.id}).table('users')
                            return{status: true, cer: 'Informações atualizadas com sucesso!', code: 200}
                        }catch(err){
                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                    else{
                        return{status: false, err: 'Usúario não encontrado ou não existe.', code: 422}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return {status: false, err: 'Você não está autenticado.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }


    // Login do user
    public async Login(email: string, password: string): Promise<{status: boolean, err?: string, cer?: string, code: number}>{
        try{
            const ExistEmail = await method.FindByEmailLogin(email)
            if(ExistEmail.status){
                try{
                    const PasswordCompare = await bcrypt.compare(password, ExistEmail.user[0].password);
                    if(PasswordCompare){
                        try{
                            const cache = await method.createCacheUser(ExistEmail.user[0])
                            if(cache){
                                return {status: true, cer: 'Login realizado com sucesso.', code: 200}
                            }
                            else{
                                return {status: false, err: 'Houve um erro na geração de cache. Tente novamente.', code: 500}
                            }
                        }catch(err){
                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                    else{
                        return{status: false, err: 'Senha incorreta.', code: 404}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'email não encontrado ou não existe.', code: 404}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    // busca todos os usuários
    public async searchAllUsers(): Promise<{status: boolean, err?: string, users?: any[], code: number}> {
        try{
            const findUsers = await Knex.select('id_user', 'first_name', 'last_name', 'email', 'role').table('users')
            if(findUsers.length > 0){
                return {status: true, users: findUsers, code: 200}
            }
            else{
                return {status: false, err: 'Não temos nenhum usuário cadastrado no momento.', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    public async searchUser(): Promise<{status: boolean, err?: string, user?: any[], code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                try{
                    const Response = await Knex.select()
                    .where({id_user: user.id})
                    .table('users')
                    if(Response.length > 0){
                        return{status: true, user: Response, code: 200}
                    }
                    else{
                        return{status: false, err: 'Usuário não encontrado ou não existe.', code: 422}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return {status: false, err: 'Você não está autenticado.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }
}


export default new UserModel()