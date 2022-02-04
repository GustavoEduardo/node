var jwt =require("jsonwebtoken");
const secret = "159357852456açsldkfjhg";//poderia estar em um arquivo separado

module.exports = function(req, res, next){
    const autkToken = req.headers["authorization"]

    if(autkToken != undefined){
        const bearer = autkToken.split(" ");
        var token = bearer[1];

        try {
            var decoded= jwt.verify(token, secret);
            console.log(decoded)
            if(decoded.role == "1"){//posso criar um middleware para cada regra.
                next();
            }else{
                res.status(403);
                res.send("Você não tem permissão de administrador.");
                return;
            }            
        } catch (err) {
            res.status(403);
            res.send("Você não está autenticado.");
            return;            
        }  
    }else{
        res.status(403);
        res.send("Você não está autenticado.");
        return;
    }
}