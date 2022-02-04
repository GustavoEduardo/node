import User from '../models/User';
import { Request, Response } from 'express';


class UserController{
    
    static async index(req: Request, res: Response){
        var result = await User.findAll();
        if(result.length > 0){
            res.status(200);
            res.json( {
                "codigo": 200,
                "status": "sucesso",
                "mensagem": "Operação realizada com sucesso.",
                "dados": result                                        
            })
        }else if(result.length == 0){
            res.status(200);
            res.json( {
                "codigo": 200,
                "status": "sucesso",
                "mensagem": "Nenhum usuário encontrado."                                        
            })           
        }else{
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Erro inesperado na hora de realizar a operação no banco."                                        
            })
        }
    }

    static async findById(req: Request, res:Response){
        var id = req.params.id;       

        var result = await User.searchId(id);

        if(result){
            res.status(200);
            res.json( {
                "codigo": 200,
                "status": "sucesso",
                "mensagem": "Operação realizada com sucesso.",
                "dados": result[0]                                  
            });
        }else if(result == undefined){
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Nenhum usuário encontrado com o id informado."                        
            });
        }else{
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Erro inesperado na hora de realizar a operação no banco."                                
            });

        }
    }
    
     static async create(req: Request, res:Response) {

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

    static async edit(req: Request, res: Response){
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

    static async remove(req: Request, res:Response){
        var id = req.params.id;
        var user = await User.searchId(id);
        if(!user){
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Nenhum usuário cadastrado para o id informado."                               
            });
        }       
     
        var result = await User.delete(id);

        if(result){
            res.status(200);
            res.json( {
                "codigo": 200,
                "status": "sucesso",
                "mensagem": "Operação realizada com sucesso."                        
            });
        }else{
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Erro inesperado ao tentar realizar a operação no banco."                        
            });

        }
        
    }
 
}

export default UserController;