const Address = require("../models/Address");
var User = require("../models/User");


class AddressController{
   
    async create(req, res){
        var {id_usuario, logradouro, numero , cidade , uf, cep, bairro , complemento = ""} = req.body;
                   
        if(id_usuario != undefined){
            var user = await User.searchId(id_usuario);
            if(user == false){
                res.status(400);
                res.json(
                    {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Erro inesperado na hora de procurar usuário no Banco."                    
                    }
                );
                return;
            }else if(user == undefined){
                res.status(400);
                res.json(
                    {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Nenhum usuário encontrado com o ID informado."                    
                    }
                );
                return;
            }else{
                
                if(logradouro == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Logradouro é obrigatório e não foi informado!"                    
                        }
                    );
                    return;
                }
                if(numero == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Número é obrigatório e não foi informado!"                    
                        }
                    );
                    return;
                }
                if(cidade == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Cidade é obrigatória e não foi informada!"                    
                        }
                    );
                    return;
                }
                if(uf == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "UF do estado é obrigatório e não foi informado!"                    
                        }
                    );
                    return;
                }
                if(cep == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "CEP é obrigatório e não foi informado!"                    
                        }
                    );
                    return;
                }
                if(bairro == undefined){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Bairro é obrigatório e não foi informado!"                    
                        }
                    );
                    return;
                }                
                if(id_usuario.length == 0 || logradouro.length == 0 || numero.length == 0|| cidade.length == 0 || uf.length == 0 || cep.length == 0|| bairro.length == 0){
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Os campos obrigatórios devem ser preenchidos!"
                        }
                    );
                    return;
                }     
                var cadastrado = await Address.new(id_usuario, logradouro, numero , cidade , uf.toUpperCase(), cep, bairro , complemento);

                if(cadastrado){
                    res.status(200);
                    res.json(
                        {
                            "codigo": 200,
                            "status": "sucesso",
                            "mensagem": `Endereço cadastrado para usuário com id: ${id_usuario}.`                 
                        }
                    );
                    return;
                }else{
                    res.status(400);
                    res.json(
                        {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Erro inesperado na hora de realizar a operação no Banco."                    
                        }
                    );
                    return;
                }
            }
        }else{
            res.status(400);
                res.json(
                    {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Id do usuário é obrigatório e não foi informado."                    
                    }
                );
                return;
        }   
        
    }
 
    async findById(req, res){
        var id_endereco = req.params.id_endereco_usuario;
        if(isNaN(id_endereco)){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Id informado não é válido!"                    
                }
            );
            return;
        }
        var address = await Address.searchId(id_endereco);

        if(address == false){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de realizar a operação no Banco."                    
                }
            );
            return;
        }else if(address == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Nenhum endereço encontrado com o Id informado."                    
                }
            );
            return;
        }else{
            res.status(200);
            res.json(
                {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Operação realizada com sucesso." ,
                    "dados": [
                        {
                            address                      
                        }
                    ]                   
                }
            );
            return;
        }
        
    }

    async findByUserId(req, res){        
        var id_usuario = req.params.id_usuario;
        if(isNaN(id_usuario)){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Id de usuário informado não é válido!"                    
                }
            );
            return;
        }
        var user = await User.searchId(id_usuario);

        if(user == false){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de buscar o usuário no Banco."                    
                }
            );
            return;
        }else if(user == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Nenhum usuário cadastrado com o id informado."                    
                }
            );
            return;
        }else{
            var address = await Address.searchUserId(id_usuario);

            if(address == false){
                res.status(400);
                res.json(
                    {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Erro inesperado na hora de realizar a operação no Banco."                    
                    }
                );
                return;
            }else if(address == undefined){
                res.status(400);
                res.json(
                    {
                        "codigo": 200,
                        "status": "sucesso",
                        "mensagem": `Operação realizada. Nenhum endereço cadastrado para usuário com id: ${id_usuario}.`
                    }
                );
                return;
            }else{
                res.status(200); 
                res.json(
                    {
                        "codigo": 200,
                        "status": "sucesso",
                        "mensagem": `Operação realizada com sucesso`,
                        "dados": address
                    }
                );
            }
            
        }
        
    }

    async edit(req, res){
        var id_endereco = req.params.id_endereco_usuario;
        var {id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento} = req.body;
        if(id_usuario){
            var user = await User.searchId(id_usuario);
        }else{
            var user = true
        }        
        
        
        if(user == false){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de procurar usuário no Banco."                    
                }
            );
            return;
        }else if(user == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Nenhum usuário encontrado com o ID informado."                    
                }
            );
            return;
        }else{   

            var result = await Address.update(id_endereco,id_usuario, logradouro, numero , cidade , uf, cep, bairro, complemento);

            if(result.status){
                res.status(200);
                res.json( 
                    result.msg
                );
            return;
            }else{
                res.status(400);
                res.json( 
                    result.msg
                );
            }
        }        
        
    }

    async remove(req, res){
        var id_endereco = req.params.id_endereco_usuario;
        var result = await Address.delete(id_endereco);
        if(result.status == "sucesso"){
            res.status(200);
            res.json(                                
                result
            );
            return;
        }else{
            res.status(400);
            res.json(
                result
            );
            return;
        }
    }

}

module.exports = new AddressController();