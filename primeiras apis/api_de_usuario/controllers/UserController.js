var User = require("../models/User");


class UserController{

    async index(req, res){
        var users = await User.findAll();
        if(users == false){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de realizar a operação no Banco."                           
                }
            );
            return;
           
        }else{
            res.status(200);
            res.json(
                {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Ação Realizada com sucesso.",
                    "dados": [
                        {
                            users                        
                        }
                    ]
                                        
                }
            );
            return;
        }         
    }

    async create(req, res){
        var {nome, sobrenome, email, telefone, cpf} = req.body;        

        if(nome == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Nome é obrigatório e não foi informado!"                    
                }
            );
            return;
        }
        if(sobrenome == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Sobrenome é obrigatório e não foi informado!"                    
                }
            );
            return;
        }
        if(email == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Email é obrigatório e não foi informado!"                    
                }
            );
            return;
        }
        if(telefone == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Telefone é obrigatório e não foi informado!"                    
                }
            );
            return;
        }
        if(cpf == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "CPF é obrigatório e não foi informado!"                    
                }
            );
            return;
        }

        if(nome.length == 0|| sobrenome.length == 0 || email.length == 0 || telefone.length == 0|| cpf.length == 0){
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

        var valido = await User.validateEmail(email);

        if(!valido){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "E-mail informado não é válido!"                    
                }
            );
            return;
        }       

        var emailExiste = await User.findEmail(email);


        if(emailExiste){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "E-mail informado já cadastrado para outro usuário!"                    
                }
            );
            return;
        }

        var cpfExiste = await User.findCpf(cpf);

        if(cpfExiste){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "CPF informado já cadastrado para outro usuário!"                    
                }
            );
            return;
        }

        var cadastrado = await User.new(nome, sobrenome, email, telefone, cpf);

        if(cadastrado){
            res.status(200);
            res.json(
                {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Usuário cadastrado com sucesso!"                    
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
 
    async findById(req, res){
        var id = req.params.id;
        if(isNaN(id)){
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
        var user = await User.searchId(id);

        if(user == false){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de realizar a operação no Banco."                    
                }
            );
            return;
        }else if(user == undefined){
            res.status(400);
            res.json(
                {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Nenhum usuário encontrado com o Id informado."                    
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
                            user                      
                        }
                    ]                   
                }
            );
            return;
        }
        
    }

    async edit(req, res){
        var id = req.params.id;
        var {nome, sobrenome, email, telefone, cpf} = req.body;        

        var result = await User.update(id,nome, sobrenome, email, telefone, cpf);

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

    async remove(req, res){
        var id = req.params.id;
        var result = await User.delete(id);
        if(result.status){
            res.status(200);
            res.json(
                result.msg
            );
        }else{
            res.status(400);
            res.json(
                result.msg
            );
        }
    }    


}

module.exports = new UserController();