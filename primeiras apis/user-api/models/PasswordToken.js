var knex = require("../database/connection");
var User = require("./User");

class PasswordToken{
    //cria o token
    async create(email){
        var user = await User.searchEmail(email);
        if(user != undefined){
            try {
                var token = Date.now(); //UUID
                await knex.insert({
                    userId: user.id,
                    used: 0,//0 não usado
                    token: token 
                }).table("passwordtokens");
                return {status: true, token: token};                               
            } catch (err) {
                console.log(err);
                return {status: false, err: err};                
            }
        }else{
            return {status: false, err: "Nenhum usuário cadastrado com esse email no banco."}
        }
    }
    
    //valida se o token existe e se ja foi usado
    async validate(token){
        try {
            var result = await knex.select().where({token: token}).table("passwordtokens");
            if(result.length > 0){
                var tk = result[0];
                if(tk.used){// tk.used = 1
                    return {status:false};
                }else{
                    return {status: true,token: tk};
                }
            }else{
                return {status:false};
            }
        } catch (err) {
            console.log(err);
            return {status:false};            
        }
       
    }

    //seta o token como usado
    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
    }
}

module.exports = new PasswordToken();