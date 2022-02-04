

function enviarEmail(){

	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			var deuErro = true

			if(deuErro){
				resolve({time: 6, to: "gustavo@gmail.com"})//só aceita um pparametro, por isso o Jason

			}else{
				reject("Fila cheia!")//Só aceita um parametro
			}


		},5000)



	});

}


console.log("Inicio do envio do email")

enviarEmail().then(({time,to})=>{//destructuring ou dados e acesso dados.tim e dados.to

		console.log(`
			Tempo: ${time}

			Para: ${to}

		`)

}).catch((erro)=>{

	console.log("Erro: "+erro)

});

console.log("Email sendo enviado...")