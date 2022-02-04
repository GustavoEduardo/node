import * as nodemailer from "nodemailer"
import path from "path"
import fs from "fs"
import Config from "../../config/config"
import { IEmailDTO, IEmailService } from "./types/IEmail"

class EmailService implements IEmailService {

    async send({to, message, bcc}: IEmailDTO){
        try {
            const transporter = nodemailer.createTransport({
                host: Config.emailHost,
                port: Config.emailPort,
                secure: Config.emailSSL,
                auth: {
                    user: Config.emailUser,
                    pass: Config.emailPass,
                },
            })
            let response = await transporter.sendMail({
                from: Config.emailFrom,
                to: to.email,
                bcc: bcc?.email,
                subject: message.subject,
                text: message.body.replace(/(<([^>]+)>)/ig, ""),
                html: message.body,
            })

            console.log("MAIL SUCCESS => ", response)
            return true

        } catch(error) {
            console.error("MAIL ERROR => ", error)
            return false
        }
    }

    template(filename:string, replaces:any):string | boolean{
        try {

            let pathname = path.resolve(__dirname, `templates/${filename}`)
            let html = fs.readFileSync(pathname, "utf8")

            for( const [key, value] of Object.entries(replaces) ) {
                html = html.split(`{{${key}}}`).join(String(value))
            }

            return html

        } catch(error) {
            console.log("MAIL TEMPLATE ERROR => ", error)
            return false
        }
    }
}

export default EmailService