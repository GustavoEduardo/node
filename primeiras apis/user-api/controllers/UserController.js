var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var bcryp = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const secret = "159357852456açsldkfjhg";//jwt

//informações do remetente para envio de email
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",//smtp-relay.gmail.com
    port: 465,//587 465
    secure: true,//SSL TSL
    auth: {
        user: "gustavolimaeduardo@gmail.com",
        pass: ""
    }
});

class UserController{

    async index(req, res){
        var users = await User.findAll();        
        res.status(200);
        res.json(users);
        return; 
    }

    async create(req, res){
        var {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "E-mail inválido"});
            return;//precisa do return quando se trabalha com controller
        }
        if(name == undefined){
            res.status(400);
            res.json({err: "Nome inválido"});
            return;
        }
        if(password == undefined){
            res.status(400);
            res.json({err: "Senha inválida"});
            return;
        }

        var emailExists = await User.searchEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "Já existe usuario com esse email cadastrado!"})
            return;
        }

        await User.new(email,password,name);

        res.status(200);
        res.send("Usuário cadastrado!");
        
    }
 
    async findById(req, res){
        var id = req.params.id;
        if(isNaN(id)){
            res.status(406);
            res.json({err: "Id informado não é um número"});
            return;
        }
        var user = await User.searchId(id);

        if(user == undefined){
            res.status(404);
            res.json({});
            return;
        }else{
            res.status(200);
            res.json(user);
            return;
        }
        
    }

    async edit(req, res){
        var {id,name,email,role} = req.body;

        var result = await User.update(id, name, email, role);

        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Edição de usuário realizada.")
            }else{
                res.status(406);
                res.send(result.err)
            }

        }else{
            res.status(406);
            res.send("Ocorreu um erro na hora da edição!")
        }
    }

    async remove(req, res){
        var id = req.params.id;
        var result = await User.delete(id);
        if(result.status){
            res.status(200);
            res.send("Usuário removido.");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);

        if(result.status){            
            res.status(200);
            transporter.sendMail({
                from: "Gustavo Lima <gustavolimaeduardo@gmail.com>",
                to: "gustavo.lima@jmonix.com.br",email,
                subject: "Teste Node Mailler",
                text: "Link da página para definir nova Senha",
                html: "<br><a href='https://google.com'>Clique aqui para definir nova Senha</a>"//Tela de recuperação de senha
            }).then(message=>{
               console.log(result.token+ " message: "+message);
               res.send("Email enviado.")
            }).catch(err =>{
                console.log("Erro")
                res.send(err);
            });            
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var result= await PasswordToken.validate(token);
        if(result.status){
            var ok = await User.changePassword(password, result.token.userId,result.token.token);
            if(ok){
                await PasswordToken.setUsed(token);            
                res.status(200);
                res.send("Senha Alterada.");                
            }else{
                res.status(400);
                res.send("Erro inesperado na hora da alteração de senha.")
            }            
        }else{
            res.status(406);
            res.send("Token Inválido!")
        }
    }

    async login(req, res){
        var {email, password} = req.body;
        var user = await User.searchEmailAll(email);
        if(user != undefined){
            var result = await bcryp.compare(password, user.password);
            if(result){
                var tokenJWT = jwt.sign({email: user.email, role: user.role}, secret);
                res.status(200);
                res.json({tokenjwt: tokenJWT});
            }else{
                res.status(406);
                res.send("Senha incorreta.");
            }
        }else{
            res.status(406);
            res.send("Email não cadastrado.");
        }
    }

}

module.exports = new UserController();