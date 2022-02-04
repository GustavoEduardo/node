function enviarEmail(corpo, para, callback){
	//settimeout para simular o envio de email
	setTimeout(() => {
		console.log(`
			Para: ${para}
			---------------------------------
			${corpo}
			---------------------------------
			FIM
		`)

		//logica de envio de email
		var enviado = false

		if(enviado){
			callback("Enviado","4s",undefined,20);//No js não sou obrigado a passar todos os parametros.

		}else{
			callback("Enviado","4s",undefined,20,"Erro de servidor!");
		}

		


	},4000)


}


console.log("Inicio do envio do email.")
enviarEmail("oi. Esse é um email de teste!","gustavo@gmail.com",(status,tempo,data,hora,err)=>{

	if(err == undefined){
		console.log(`
			status: ${status}

			Tempo: ${tempo}

			Hora: ${hora}h			


		`)

	}else{
		console.log("Erro: "+err)
	}
	
	

});
console.log("O email está sendo envido.");//é executado antes pois setTimeout é assincrono!!!