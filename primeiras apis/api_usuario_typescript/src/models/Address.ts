import knex from "../database/connection";

class Address{

    static async searchId(id: string){
        try {
            var address = await knex.select().table("endereços_usuario").where({ id_endereco_usuario: id});        
            if(address.length > 0){
                return address;
            }else{
                return undefined;
            }
        } catch (error) {
            return false;
        }
    }

    static async searchUserId(id: string){
        try {
            var address = await knex.select().table("endereços_usuario").where({ id_usuario: id});        
            if(address.length > 0){
                return address;
            }else{
                return undefined;
            }
        } catch (error) {
            return false;
        }
    }    

    static async new(id_usuario: string, logradouro: string, numero: string, cidade: string, uf: string, cep: string, bairro: string, complemento: string){
        try{
            await knex.insert({id_usuario, logradouro, numero , cidade , uf, cep, bairro , complemento}).table("endereços_usuario");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }        
    }   

    static async update(id_endereco: string,id_usuario: string, logradouro: string, numero: string, cidade: string, uf: string, cep: string, bairro: string, complemento: string){
        var address = await this.searchId(id_endereco);
        if(address){
            var editAddress: any = {};        
            
            if(id_usuario != undefined){
                editAddress.id_usuario = id_usuario;
                if(editAddress.id_usuario.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "id_usuario deve ser preenchido."                                        
                    }};
                }
            }
            if(logradouro != undefined){
                editAddress.logradouro = logradouro;
                if(editAddress.logradouro.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "logradouro deve ser preenchido."                                        
                    }};
                }
            }
            if(numero != undefined){
                editAddress.numero = numero;
                if(editAddress.numero.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "numero deve ser preenchido."                                        
                    }};
                }
            }
            if(cidade != undefined){
                editAddress.cidade = cidade;
                if(editAddress.cidade.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "cidade deve ser preenchida."                                        
                    }};
                }
            }
            if(uf != undefined){
                editAddress.uf = uf;
                if(editAddress.uf.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "uf deve ser preenchido."                                        
                    }};
                }
            }
            if(cep != undefined){
                editAddress.cep = cep;
                if(editAddress.cep.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "cep deve ser preenchido."                                        
                    }};
                }
            }
            if(bairro != undefined){
                editAddress.bairro = bairro;
                if(editAddress.bairro.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "bairro deve ser preenchido."                                        
                    }};
                }
                
            }
            if(complemento != undefined){
                editAddress.complemento = complemento;
            }

            try{
                await knex('endereços_usuario').where({id_endereco_usuario: id_endereco}).update(editAddress);
                return {status: 1,  msg: {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Edição de endereço realizada com sucesso."                                        
                }}; 
            }catch(err){
                return {status: 0,  msg: {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": err                                       
                }};
            }       

        }else{
            return {status: 0, msg: {
                "codigo": 400,
                "status": "erro",
                "mensagem":  `Endereço com id: ${id_endereco} não existe no banco.`                                       
            }};
        }

    }

    static async delete(id: string){
        try {
            await knex.delete().table("endereços_usuario").where({id_endereco_usuario: id})
            return true;
        } catch (error) {
            return false;
        }

    }

}

export default Address;