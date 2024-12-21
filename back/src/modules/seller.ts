// import methodseller from '../methods/methodSeller'
import methodSeller from '../methods/methodSeller';
import MethodUser from '../methods/MethodUser'
import Knex from '../database/Connection'
import client from '../redis/redisClient';

interface seller {
    id?: number;
    cnpj: string;
    state: string;
    city: string;
    street: string;
    number: number;
    phone?: string;
    own?: number;
    user?: number
}

interface sellerUpdate {
    id: number;
    cnpj: string;
    state: string;
    city: string;
    street: string;
    number: number;
    phone: string;
}

interface sellerDelete {
    id: number;
    user: number;
}


class SellerModel {

    // Neste metodo criamos o endereço vendedor apenas na primeira vez para ter a atualização de cache
    public async createSeller(obj: seller): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                try{
                    const ExistCnpj = await methodSeller.findCnpj(obj.cnpj)
                    if(ExistCnpj.status){
                        return{status: false, err: 'Este cnpj já está em uso.', code: 409}
                    }
                    else{
                        try{
                            const ExistPhone = await methodSeller.findPhone(obj.phone as string)
                            if(ExistPhone.status){
                                return{status: false, err: 'Este número de telefone já está em uso.', code: 409}
                            }
                            else{
                                try{
                                    const UserId = await Knex.select().where({id_user: user.id}).table('users')
                                    if(UserId.length > 0){
                                        try{
                                            await Knex.insert({
                                                cnpj: obj.cnpj,
                                                state: obj.state,
                                                city: obj.city,
                                                street: obj.street,
                                                number: obj.number,
                                                phone: obj.phone,
                                                own: user.id
                                            }).table('seller')
                                            await Knex.update({role: 2})
                                            .where({id_user: user.id})
                                            .table('users')
                                            console.log(UserId[0])
                                            const UpdateCache = await MethodUser.restartCacheCreateSeller(UserId[0])
                                            if(UpdateCache.status){
                                                return {status: true, cer: 'Cadastro de vendedor realizado com sucesso.', code: 200}
                                            }
                                            else{
                                                return {status: false, err: UpdateCache.err, code: UpdateCache.code}
                                            }
                                        }catch(err){
                                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                                        }
                                    }
                                    else{
                                        return{status: false, err: 'Não encontramos suas informações no banco de dados.', code: 401}
                                    }
                                }catch(err){
                                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                                }
                            }
                        }catch(err){
                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Área restrita. Faça login.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }



    // cria o endereço do vendedor
    public async create(obj: seller): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                try{
                    const ExistCnpj = await methodSeller.findCnpj(obj.cnpj)
                    if(ExistCnpj.status){
                        return{status: false, err: 'Este cnpj já está em uso.', code: 409}
                    }
                    else{
                        try{
                            const ExistPhone = await methodSeller.findPhone(obj.phone as string)
                            if(ExistPhone.status){
                                return{status: false, err: 'Este número de telefone já está em uso.', code: 409}
                            }
                            else{
                                try{
                                    await Knex.insert({
                                        cnpj: obj.cnpj,
                                        state: obj.state,
                                        city: obj.city,
                                        street: obj.street,
                                        number: obj.number,
                                        phone: obj.phone,
                                        own: user.id
                                    }).table('seller')
                                    await Knex.update({role: 2})
                                    .where({id_user: user.id})
                                    .table('users')
                                    // const UpdateCache = await MethodUser.restartCacheCreateSeller(UserId[0])
                                    return{status: true, cer: 'Cadastro de vendedor realizado com sucesso!', code: 200}
                                }catch(err){
                                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                                }
                            }
                        }catch(err){
                            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                        }
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Área restrita. Faça login.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }



    // atualiza um endereço de vendedor
    public async updateSeller(obj: sellerUpdate): Promise<{status: boolean, cer?: string, err?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                if(user.role === 2){
                    try{
                        const findId = await methodSeller.findById(obj.id)
                        if(findId.status){
                            if(user.id === findId.seller.own){
                                try{
                                    await Knex.update({
                                        cnpj: obj.cnpj,
                                        state: obj.state,
                                        city: obj.city,
                                        street: obj.street,
                                        number: obj.number,
                                        phone: obj.phone
                                    }).where({id_seller: obj.id}).table('seller')
                                    return{status: true, cer: 'Endereço de vendedor atualizado com sucesso!', code: 200}
                                }catch(err){
                                    return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                                }
                            }
                            else{
                                return{status: false, err: 'Restrito. Você não pode atualizar um endereço de vendedor que não é seu.', code: 403}
                            }
                        }
                        else{
                            return{status: false, err: 'Endereço não encontrado ou não existe.', code: 422}
                        }
                    }catch(err){
                        return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
                    }
                }
                else{
                    return{status: false, err: 'Área restrita apenas para vendedores ou admonistradores.', code: 403}
                }
            }
            else{
                return{status: false, err: 'Área restrita. Faça login.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }



    // Deleta um endereço de vendedor
    public async deleteSeller(id: number): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const User = await client.get('user')
            if(User != null){
                const user = JSON.parse(User)
                if(user.role === 2 || user.role === 3){
                    try{
                        const findId = await methodSeller.findById(id)
                        if(findId.status){
                            try{
                                const findIfOneSeller = await methodSeller.findIfOneSeller(user.id)
                                /* Neste caso eu inverti, neste metodo busco quantos endereços de seller o usuário possui, caso ele possua apenas 1 irá retornar TRUE, por que se ele possuir apenas um endereço seller ele não terá permissão para excluir este endereço.*/
                                if(findIfOneSeller.status){
                                    return{status: false, err: findIfOneSeller.err, code: findIfOneSeller.code}
                                }
                                else{
                                    if(user.id === findId.seller.own){
                                        try{
                                            await Knex.delete()
                                            .where({id_seller: id})
                                            .table('seller')
                                            return{status: true, cer: 'Endereço excluido com sucesso!', code: 200}
                                        }catch(err){
                                            return {status: false, err: 'Houve um erro no servidor.', code: 500}
                                        }
                                    }
                                    else{
                                        return{status: false, err: 'Restrito. Você não pode atualizar um endereço de vendedor que não é seu.', code: 403}
                                    }
                                }
                            }catch(err){
                                return {status: false, err: 'Houve um erro no servidor.', code: 500}
                            }
                        }
                        else{
                            return{status: false, err: 'Endereço não encontrado ou não existe.', code: 422}
                        }
                    }catch(err){
                        return {status: false, err: 'Houve um erro no servidor.', code: 500}
                    }
                }
                else{
                    return{status: false, err: 'Área restrita apenas para vendedores ou admonistradores.', code: 403}
                }
            }
            else{
                return{status: false, err: 'Área restrita. Faça login.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor.', code: 500}
        }
    }


    
    // Busca todos os endereços de vendedor no banco de dados
    public async searcAllSellers(): Promise<{status: boolean, err?: string, cer?: any[], code: number}> {
        try{
            const Sellers = await Knex.select().table('seller')
            if(Sellers.length > 0){
                return {status: true, cer: Sellers, code: 200}
            }
            else{
                return {status: false, err: 'Não há nenhum endereço cadastrado em nosso site.', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor.', code: 500}
        }
    }



    // Busca todos os endereços de vendedor do user
    public async searchAllSellersUser() {
        try{
            const User = await client.get('user')
            if(User !=  null){
                const user = JSON.parse(User)
                try{
                    const sellerUser = await Knex.select().where({own: user.id}).table('seller')
                    if(sellerUser.length > 0){
                        return {status: true, data: sellerUser, code: 200}
                    }
                    else{
                        return {status: false, data: [], code: 200}
                    }
                }catch(err){
                    return {status: false, err: 'Houve um erro no servidor.', code: 500}
                }
            }
            else{
                return{status: false, err: 'Área restrita. Faça login.', code: 401}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor.', code: 500}
        }
    }
}

export default new SellerModel()