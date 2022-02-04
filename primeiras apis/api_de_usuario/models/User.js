var knex = require("../database/connection");


//podemos chamar o model de Service (tudo oque lida com dados)
class User{

     //busca todos os usuarios
    async findAll(){
        try{            
            var result = await knex.select().table("usuarios");
            return result;
        }catch(err){
            console.log(err);
            return false;
        }   

    }

    //busca um usuario pelo id
    async searchId(id_usuario){
        try{
                 
            var result = await knex.select().table("usuarios").where({id_usuario: id_usuario});
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

    //verifica se email informado é válido
    async validateEmail(email){
        var arroba = email.indexOf('@');
        if(arroba == -1) return false;
        if(arroba == email.length -1) return false;
        if(arroba == 0) return false;
        var ponto = email.indexOf('.');
        if(ponto < arroba) return false;
        if((arroba +1) == ponto) return false;
        if(email.indexOf('.com') == -1) return false;
        if(email.indexOf(' ') != -1) return false;
        if(email[email.length -1] =="." || email[email.length -2] ==".") return false;

        //mais de um @
        const arrobas = email.split("@");
        if (arrobas.length>2) return false        
        
        return true;       
    }
      
    //verifica se existe usuario com o email no banco
    async findEmail(email){
        try {
            var result = await knex.select().from("usuarios").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch (err) {
            console.log(err);
            return true;//para não cadastrar dois email iguais se a consulta der erro
        }
        
    }

    //verifica se existe usuario com o CPF no banco
    async findCpf(cpf){
        try {
            var result = await knex.select().from("usuarios").where({cpf: cpf});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch (err) {
            console.log(err);
            return true;
        }
        
    }
    
    //cria um novo usuario
    async new(nome, sobrenome, email, telefone, cpf){
        try{
            await knex.insert({nome, sobrenome, email, telefone, cpf}).table("usuarios");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }        
    }   

    //edita um usuário no banco
    async update(id, nome, sobrenome, email, telefone, cpf){
        var user = await this.searchId(id);
        if(user){
            var editUser = {};
            if(email != undefined){
                let valido = await this.validateEmail(email);
                if(!valido){
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Email inválido!"                                        
                    }};
                }
                var emailExiste = await this.findEmail(email);
                if(emailExiste){
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "Email já cadastrado no banco!"                                        
                    }};
                }    
                if(email != user.email){                                       
                    editUser.email = email;                       
                }
            }
            if(cpf != undefined){
                var cpfExiste = await this.findCpf(cpf);
                if(cpfExiste){
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "CPF já cadastrado no banco!"                                        
                    }};
                }
                if(cpf != user.cpf){                                    
                    editUser.cpf = cpf;
                    if(editUser.cpf.length ==0)  {
                        return  {status: 0, msg: {
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "cpf deve ser preenchido."                                        
                        }};
                    }
                }
            }  
            if(nome != undefined){
                editUser.nome = nome;
                if(editUser.nome.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "nome deve ser preenchido."                                        
                    }};
                }
            }
            if(sobrenome != undefined){
                editUser.sobrenome = sobrenome;
                if(editUser.sobrenome.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "sobrenome deve ser preenchido."                                        
                    }};
                }
            }
            if(telefone != undefined){
                editUser.telefone = telefone;
                if(editUser.telefone.length ==0)  {
                    return  {status: 0, msg: {
                        "codigo": 400,
                        "status": "erro",
                        "mensagem": "telefone deve ser preenchido."                                        
                    }};
                }
            }            

            try{
                await knex('usuarios').where({id_usuario: id }).update(editUser);
                return {status: 1,  msg: {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Edição de usuário realizada com sucesso."                                        
                }};     
            }catch(err){
                return {status: 0,  msg: {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de realizar a operação no banco."                                        
                }};
            }       

        }else{
            return {status: 0, msg: {
                "codigo": 400,
                "status": "erro",
                "mensagem":  `Usuário com id: ${id} não encontrado.`                                       
            }};
        }      

    }

    //deleta um usuario pelo id
    async delete(id){
        var user = await this.searchId(id);
        if(user != undefined){
            try{            
                await knex.delete().where({id_usuario: id}).table('usuarios');
                return {status: 1, msg: {
                    "codigo": 200,
                    "status": "sucesso",
                    "mensagem": "Usuário excluído com sucesso."                                        
                }};
            }catch(err){
                return  {status: 1, msg: {
                    "codigo": 400,
                    "status": "erro",
                    "mensagem": "Erro inesperado na hora de executar a ação no banco."                                        
                }};
            }
        }else{
            return  {status: 0, msg: {
                "codigo": 400,
                "status": "erro",
                "mensagem": "Nenhum usuário encontrado com o id informado."                                        
            }};
        }               
    }   
    
}

module.exports = new User();
