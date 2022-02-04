//promises aninhadas (promise hell) podem ser um problema quando alguem ou vc precisar entener o código no futuro!!!

function pegarId(){
    return new Promise((resolve, reject) => {// não tem possibilidade de erro pois é apenas um exemplo
        setTimeout(() => {
            resolve(5) //id ficticio  
        },1500)
    })
}

function buscarEmailNoBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("victorlima@guia.com.br")
        },2000);
    })
}

function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout(() => {  
            var deuErro = false;
            if(!deuErro){
                resolve({time: 6, to: "gustavo@gmail.com"}) // Promessa OK!
            }else{
                reject("Fila cheia") // Foi mal, eu falhei :(
            }
        },3000)
    });
}


console.log("Inicio!");
//promises aninhadas. Chamo uma dentro da outra para deixar o código mais sincrono
pegarId().then((id) => {
    buscarEmailNoBanco(id).then((email) => { 
        enviarEmail("Olá, como vai?",email).then(() => {
            console.log("Email enviado, para o usuário com id: " + id)
        }).catch(err => {
            console.log(err);
        })
    })
})
console.log("Enviando...");


