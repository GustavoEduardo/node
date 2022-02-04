const express = require("express");//importando o express
const app = express();//iniciando o express e atribuindo a variavel app


//criando as rotas defalt, blog, videos e ola...

app.get("/",function(req, res){//Só a barra aponta para a pagina principal. (requisição, resposta)
	res.send("Bem vindo ao meu site")
})


// /rota/:parametro? a interrogação diz que o parametro é opcional
app.get("/blog/:artigo?",function(req, res){

	let artigo = req.params.artigo;//recupera o parametro da url

	if(artigo){//Ex -->   http://localhost:4000/blog/como_programar
		res.send(`Artigo: ${artigo}`)
	}else{
		res.send("Bem vindo ao meu blog")
	}
	
})

//rota com parametro obrigatório
app.get("/videos/:video",function(req, res){

	let video = req.params.video
	res.send(`Assista agora ${video}`)
})

//rota com mais de um  parametro
app.get("/ola/:nome/:empresa",function(req, res){

	let nome = req.params.nome
	let empresa = req.params.empresa
	res.send(`Ola ${nome} da empresa ${empresa}`)
})


//Query params. Está em desuso na url Ex. canal=meu_canal


app.listen(4000,function(err){//iniciando o servidor na porta escolhida e recuperando um possivel erro
	if(err){
		console.log("Ocoorreu um erro.")
	}else{
		console.log("Servidor iniciado com sucesso.")
	}
})


/*	npm init na pasta do projeto cria o arquivo package.jason e inicia o npm na pasta
	npm install express -- save		instala o express na pasta do projeto
	npm install nodemon - g 	instala o nodemon de forma global no projeto
	nodemon index.js iniciando com o nodemon não precisa reiniciar manualmente a cada auteração
*/