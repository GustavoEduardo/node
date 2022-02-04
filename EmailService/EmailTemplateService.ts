import EmailService from "./EmailService"

interface IRecuperarSenha {
    to:string
    replaces: {
        nome:string
        token:string
    }
}

export default {
    
    async recuperarSenha(data:IRecuperarSenha){

        const mail = new EmailService()
        const template = mail.template("recuperar-senha.html", data.replaces)
        const subject = "♻ Cadastre uma nova senha"

        return await mail.send({
            to: {
                email: data.to
            },
            message: {
                subject: subject,
                body: String(template)
            }
        })
        
    },

    async recuperarSenhaTecnico(data:IRecuperarSenha){

        const mail = new EmailService()
        const template = mail.template("recuperar-senha-tecnico.html", data.replaces)
        const subject = "♻ Cadastre uma nova senha"

        return await mail.send({
            to: {
                email: data.to
            },
            message: {
                subject: subject,
                body: String(template)
            }
        })
        
    },

}