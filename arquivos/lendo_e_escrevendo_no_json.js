const fs = require('fs');


function atualizaUser(nome,login,senha){

	fs.readFile("./usuario.json",'utf8',(err, data)=>{

		if (err) {
		    console.log(err)
		}else{
		  	var user = JSON.parse(data)//converte a string para um json

		  	user.nome = nome;
		  	user.login = login;
		  	user.senha = senha;
		  	
		  	fs.writeFile('./usuario.json',JSON.stringify(user), err => {


				if (err) {
				    console.error(err)
			  	}else{
			  		console.log("Arquivo json alterdo")
			  	}			  	

			});

			}
					  
	});

}


atualizaUser("Gustavo","gus357","@bcI23")