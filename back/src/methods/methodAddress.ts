import Knex from "../database/Connection";

interface BD {
    id: number; 
    state: string; 
    city: string; 
    neighborhood: string; 
    street: string; 
    number: string; 
    complement: string;
    create_at: Date; 
    update_at: Date; 
    own: number;
}

class methodAddress {
    // Busca no banco de dados pelo id
    public async findById(id: number): Promise<
    | {status: boolean, address: undefined, code?: number }
    | {status: boolean, address: BD, code?: undefined}
    > {
        try{
            const findId = await Knex.select().where({id: id}).table('address')
            if(findId.length > 0){
                return {status: true, address: findId[0] as BD}
            }
            else{
                return {status: false, address: undefined, code: 422}
            }
        }catch(err){
            return {status: false, address: undefined, code: 500}
        }
    }
}

export default new methodAddress()