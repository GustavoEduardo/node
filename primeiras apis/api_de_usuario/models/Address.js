var knex = require("../database/connection");


//podemos chamar o model de Service (tudo oque lida com dados)
class Address{

     
    //busca um endereço pelo id do endereco (id_endereco_usuario)
    async searchId(id_endereco){
        try{            
            var result = await knex.select().table("endereços_usuario").where({id_endereco_usuario: id_endereco});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    //lista todos os endereços de um usuário pelo id do usuario (id_usuario)
    async searchUserId(id_usuario){
        try{            
            var result = await knex.select().table("endereços_usuario").where({id_usuario: id_usuario});
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    //cria um novo endereço
    async new(id_usuario, logradouro, numero, cidade , uf, cep, bairro, complemento){
        try{
            await knex.insert({id_usuario, logradouro, numero , cidade , uf, cep, bairro , complemento}).table("endereços_usuario");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }        
    }   

    //edita um endereço no banco
    async update(id_endereco,id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento){
        var address = await this.searchId(id_endereco);
        if(address){
            var editAddress = {};        
            
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

    //Deleta um endereço pelo id informado
    async delete(id_endereco){
        var address = await this.searchId(id_endereco);        
        
        if(address != undefined){
            try{   
                await knex.delete().where({id_endereco_usuario: id_endereco}).table('endereços_usuario');
                return {                    
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Endereço excluído com sucesso."
                    }                
            }catch(err){
                return {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperedo na hora de realizar a operação no banco."                                       
                    }
            }
        }else{
            return {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Endereço com id informado não existe no banco."
                }            
        }               
    }   
    
}

module.exports = new Address();