var knex = require("../database/connection");
var bcrypt = require("bcrypt");
//const PasswordToken = require("./PasswordToken");// da problema na hora de PasswordToken acessar funções de User


//podemos chamar o model de Service (tudo oque lida com dados)
class User{

     //busca todos os usuarios
    async findAll(){
        try{            
            var result = await knex.select('id','name', 'email', 'role').table("users");
            return result;
        }catch(err){
            console.log(err);
            return undefined;
        }   

    }

    //busca um usuario pelo id
    async searchId(id){
        try{            
            var result = await knex.select('id','name', 'email', 'role').table("users").where({id: id});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }   

    }

     //busca um usuario pelo email etraz o id
     async searchEmail(email){
        try{          
            var result = await knex.select('id').table("users").where({email: email});
            if(result.length > 0){                
                return result[0];
            }else{
                console.log("nenhum usuario encontrado");
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        } 
    }

    //busca um usuario pelo email etraz tudo!!!
    async searchEmailAll(email){
        try{          
            var result = await knex.select().table("users").where({email: email});
            if(result.length > 0){                
                return result[0];
            }else{
                console.log("nenhum usuario encontrado");
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }   

    }
    
    //cria um novo usuario
    async new(email, password, name){
        try{
            var hash = await bcrypt.hash(password,10);
            await knex.insert({email,password: hash,name,role: 0}).table("users");
        }catch(err){
            console.log(err);
        }        
    }

    //edita um usuário no banco
    async update(id, name, email, role){
        var user = await this.searchId(id);
        if(user){
            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var emailExists = await this.findEmail(email);
                    if(emailExists){
                        return {status: false, err: "Email já cadastrado para outro usuário!"};
                    }else{
                        editUser.email = email;
                    }    
                }
            }
            if(name != undefined){
                editUser.name = name;
            }
            if(role != undefined){
                editUser.role = role;
            }

            try{
                await knex('users').where({ id: id }).update(editUser);
                return {status: true}; 
            }catch(err){
                return {status: false, err: err};
            }         

        }else{
            return {status: false, err: `Usuário com ID: ${id} não existe no banco.`};
        }

    }

     //Deleta um usuario pelo id
     async delete(id){
        var user = await this.searchId(id);
        if(user != undefined){
            try{            
                await knex.delete().where({id, id}).table('users');
                return {status: true};
            }catch(err){
                return {status: false, err: err};
            }
        }else{
            return {status: false, err: "Usuário não existe."};
        }               
    }

    //Altera a senha
    async changePassword(newPass, id, token){
        var hash = await bcrypt.hash(newPass,10);
        try {
            await knex.update({password: hash}).where({id: id}).table("users");
            return true;
        } catch (error) {
            return false;
        } 
    }    
    
}

module.exports = new User();