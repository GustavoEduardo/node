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
            var deuErro = true;
            if(!deuErro){
                resolve({time: 6, to: "gustavo@gmail.com"}) // Promessa OK!
            }else{
                reject("Fila cheia") // Foi mal, eu falhei :(
            }
        },3000)
    });
}

/*
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
*/



//O mesmo codigo com async_await
async function principal() {

    console.log("Pegando o id...")
    var id = await pegarId()

    console.log("Buscanco o email...")
    var email = await buscarEmailNoBanco()

    console.log("Enviando o email...")
    enviarEmail("Olá, como vai?",email).then(() => {
        console.log("Email enviado, para o usuário com id: " + id)
    }).catch(err => {
        console.log(err);
    });
    //await enviarEmail("Olá, como vai?",email); Se eu colocar o await eu bloqueio o fluxo do app até o envio ser concluido. Não posso por o cath!
}



//******************O mesmo codigo com await no enviarEmail e tratamento de erro***********************************
async function principal() {    
    var id = await pegarId()    
    var email = await buscarEmailNoBanco()
    try{
        await enviarEmail("Olá, como vai?",email);
        console.log("Email Enviado com Secesso!")
    }catch(err){
        console.log(err)
    }
    
}


principal()//duas funções com o mesmo nome. A segunda sobrepõe a primeira
console.log("Função principal rodando.")