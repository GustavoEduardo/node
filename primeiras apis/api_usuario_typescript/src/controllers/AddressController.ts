import Address from "../models/Address";
import { Request, Response } from 'express';
import User from "../models/User";

class AddressController{

    static async findById(req: Request, res: Response){
        var id = req.params.id_endereco_usuario;
        var result = await Address.searchId(id);
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
                "mensagem": "Nenhum endereço encontrado com o id informado."                        
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
    
    static async findByUserId(req: Request, res: Response){
        var id = req.params.id_usuario;
        var user = await User.searchId(id);
        if(!user){
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": `Não existe usuário com id ${id} cadastrado no banco.`                        
            });

        }
        var result = await Address.searchUserId(id);
        if(result){
            res.status(200);
            res.json( {
                "codigo": 200,
                "status": "sucesso",
                "mensagem": "Operação realizada com sucesso.",
                "dados": result                                  
            });
        }else if(result == undefined){
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": `Nenhum endereço cadastrado para usuario com id ${id}.`                        
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

    static async create(req: Request, res: Response){
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

    static async edit(req: Request, res: Response){
        var id_endereco = req.params.id_endereco_usuario;
        var {id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento} = req.body;
        if(id_usuario){
            var user = await User.searchId(id_usuario);
        }else{
            var user: any = true;
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

    static async remove(req: Request, res: Response){
        var id = req.params.id_endereco_usuario;
        var endereco = await Address.searchId(id);
        if(!endereco){
            res.status(400);
            res.json( {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Nenhum endereço cadastrado para o id informado."                               
            });
        }
        var result = await Address.delete(id);
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
                "mensagem": "Erro inesperado ao realizar a operação no banco."                               
            });
        }

    }


}

export default AddressController;