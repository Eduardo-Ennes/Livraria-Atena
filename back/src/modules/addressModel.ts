import Knex from '../database/Connection'
import methodAddress from '../methods/methodAddress';
import client from '../redis/redisClient';

interface address {
    id: number ;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
    own?: number 
    user?: number;
}

interface CreateAddress {
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string;
    own?: number 
}


class AddressModel {

    // Cria um endereço para entrega
    public async createAddress(obj: CreateAddress): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            await Knex.insert({
                state: obj.state,
                city: obj.city,
                neighborhood: obj.neighborhood,
                street: obj.street,
                number: obj.number,
                complement: obj.complement,
                own: obj.own
            }).table('address')
            return {status: true, cer: 'Endereço de entrega cadastrado com sucesso.', code: 200}
        }catch(err){
            return {status: false, err: 'Houve um err no servidor. Tente novamente.', code: 500}
        }
    }

    // Atualiza um endereço de entrega
    public async updateAddress(obj: address): Promise<{status: boolean, cer?: string, err?: string, code: number | undefined}> {
        try{
            const User = await client.get('user')
            if(User != null){
                try{
                    const user = await JSON.parse(User)
                    const findId = await methodAddress.findById(obj.id)
                    if(findId.status){
                        if(findId.address != undefined){
                            if(user.id === findId.address.own){
                                try{
                                    await Knex.update({
                                        state: obj.state,
                                        city: obj.city,
                                        neighborhood: obj.neighborhood,
                                        street: obj.street,
                                        number: obj.number,
                                        complement: obj.complement
                                    })
                                    .where({id: obj.id})
                                    .table('address')
                                    return{status: true, cer: 'Endereço atualizado com sucesso', code: 200}
                                }catch(err){
                                    return {status: false, err: 'Houve um erro na busca do endereço no banco de dados.', code: 500}
                                }
                            }
                            else{
                                return{status: false, err: 'Você não pode atualizar um endereço que não é seu.', code: 403}
                            }
                        }
                    }
                    else{
                        if(findId.code === 500){
                            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: findId.code}
                        }
                        if(findId.code === 422){
                            return{status: false, err: 'Endereço não encontrado ou não existe.', code: findId.code}
                        }
                    }
                }catch(err){
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 200}
                }
            }
            else{
                return{status: false, err: 'Redirecionar', code: 401}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }

        return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
    }

    // Deleta um endereço de entrega
    public async deleteAddress(id: any): Promise<{status: boolean, err?: string, cer?: string, code: number | undefined}> {
        try{
            const User = await client.get('user')
            if(User != null){
                try{
                    const user = await JSON.parse(User)
                    const findId = await methodAddress.findById(id)
                    if(findId.status){
                        if(findId.address != undefined){
                            if(user.id === findId.address.own){
                                try{
                                    await Knex.delete().where({id: id}).table('address')
                                    return{status: true, cer: 'Endereço deletado com sucesso.', code: 200}
                                }catch(err){
                                    return {status: false, err: 'Houve um err no servidor. Tente novamente.', code: 500}
                                }
                            }
                            else{
                                return{status: false, err: 'Você não pode atualizar um endereço que não é seu.', code: 403}
                            }
                        }
                    }
                    else{
                        if(findId.code === 500){
                            return{status: false, err: 'Houve um erro no servidor. Tente novamente.', code: findId.code}
                        }
                        if(findId.code === 422){
                            return{status: false, err: 'Endereço não encontrado ou não existe.', code: findId.code}
                        }
                    }
                }catch(err){
                    return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 200}
                }
            }
            else{
                return{status: false, err: 'Restrito. Faça login!', code: 401}
            }
        }catch(err){
            return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
        }

        return{status: false, err: 'Houve um erro no servidor. Tente novamente', code: 500}
    }

    // Busca todos os endereos de entrega
    public async searchAllAddress(): Promise<{status: boolean, err?: string, cer?: any[], code: number}> {
        try{
            const Address = await Knex.select().table('address')
            if(Address.length > 0){
                return {status: true, cer: Address, code: 200}
            }
            else{
                return {status: false, err: 'Não há nenhum endereço cadastrado em nosso banco de dados.', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um err no servidor. Tente novamente.', code: 500}
        }
    }

    // Busca todos os endereços de entrega do user
    public async searchAllAddressUser(id: number): Promise<{status: boolean, err?: string, cer?: string, code: number}> {
        try{
            const Address = await Knex.select().where({own: id}).table('address')
            if(Address.length > 0){
                // Corrigir tipagem Address
                return {status: true, cer: Address, code: 200}
            }
            else{
                return {status: false, err: 'Você não possui endereços de entrega.', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um err no servidor. Tente novamente.', code: 500}
        }
    }
}


export default new AddressModel()