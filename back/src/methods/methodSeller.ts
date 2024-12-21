import methdodUser from './MethodUser'
import Knex from '../database/Connection'

interface seller {
    id?: number
    cnpj?: string;
    state: string;
    city: string;
    street: string;
    number: number;
    phone?: string;
    own?: number;
}

class MethodSellers {


    // Vreifica se o cnpj ja esta em uso
    public async findCnpj(cnpj: string): Promise<{status: boolean, err?: string, code?: number}> {
        try{
            const cnpjFind = await Knex.select().where({cnpj: cnpj}).table('seller')
            if(cnpjFind.length > 0){
                return {status: true}
            }
            else{
                return {status: false}
            }
        }catch(err){
            console.log(err)
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    // Verifica se o telefone ja esta em uso
    public async findPhone(number: string): Promise<{status: boolean, err?: string, code?: number}> {
        try{
            const phoneFind = await Knex.select().where({phone: number}).table('seller')
            if(phoneFind.length > 0){
                return {status: true}
            }
            else{
                return {status: false}
            }
        }catch(err){
            console.log(err)
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    // Busca um endereço pelo id
    public async findById(id: number): Promise<{status: boolean, err?: string, seller?: any, code?: number}> {
        try{
            const Seller = await Knex.select().where({id_seller: id}).table('seller')
            if(Seller.length > 0){
                return {status: true, seller: Seller[0], code: 200}
            }
            else{
                return {status: false, err: 'Endereço não encontrado ou não existe.', code: 422}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    /* Neste metodo busco se o user tem apenas um endereço seller, se tiver não poderá excluir, por isso retorn TRUE com err */
    public async findIfOneSeller(id: number): Promise<{status: boolean, err?: string, cer?: string, code: number}>{
        try{
            const response = await Knex.select().where({own: id}).table('seller')
            if(response.length === 1){
                return {status: true, err: 'Erro ao excluir endereço. Um vendedor deve ter no mínimo um endereço para exercer a função de vendedor na plataforma.', code: 409}
            }
            else{
                return {status: false, cer: 'Pode excluir', code: 200}
            }
        }catch(err){
            return {status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

}

export default new MethodSellers()