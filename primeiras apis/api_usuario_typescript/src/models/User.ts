import knex from '../database/connection';

class User{

    static async validateEmail(email: string){
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
      
    static async findEmail(email: string){
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

    static async findCpf(cpf: string){
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
    
    static async findAll(){
        try {
            var result = await knex.select().table("usuarios");
            return result;            
        }catch (err) {
            return false;
        }
        
        
    }

    static async searchId(id: string){
        try {
            var user = await knex.select().table("usuarios").where({id_usuario: id});
            if(user.length > 0){
                return user;
            }else{
                return undefined;
            }
        } catch (error) {
            return false;
        }
    }

    static async new(nome:string, sobrenome:string, email:string, telefone:string, cpf:string) { 
        try{
            await knex.insert({nome, sobrenome, email, telefone, cpf}).table("usuarios");
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    static async update(id: string, nome: string, sobrenome: string, email: string, telefone: string, cpf: string){
        var user = await this.searchId(id);
        if(user){
            var editUser: any = {};
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

    static async delete(id: string){
        try {
            await knex.delete().table("usuarios").where({id_usuario: id});
            return true;
        } catch (error) {
            return false;
        }

    }
}

export default User;