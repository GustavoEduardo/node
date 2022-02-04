function pegarUsuarios(){
    return new Promise((resolve, reject) => {// não tem possibilidade de erro pois é apenas um exemplo
        setTimeout(() => {
            //logica para pegar um usuario no banco
            resolve([{nome: "Gustavo",email: "gustavo@gmail.com"},
                    {nome: "Loren",email: "loren@gmail.com"},
                    {nome: "Maria",email: "maria@gmail.com"}
                    ])  
        },3000)
    })
}


console.log("Antes da Função")
async function usuarios(){

        var usuarios = await pegarUsuarios();//espera a execução da promise para atribuir o valor.
        console.log(usuarios)

}


usuarios()

console.log("Depois da Função")

