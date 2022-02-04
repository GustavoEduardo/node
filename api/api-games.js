const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express()

//outros dominios podem consumir a api
app.use(cors({
  allowedOrigins: [
      'github.com', 'file:///C:/Users/gustavo.lima/Documents/g/node-master/api/consumo_axios/loja-de-games.html'
  ]
}))

const jwtSecret = "g13579$";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Validação do token
function auth (req, res, next) {
  const authToken = req.headers['authorization'];//tipo token

  if(authToken !=  undefined){
    const bearer = authToken.split(' ');//separa o tipo do token (bearer[0]) do token (bearer[1])
    var token = bearer[1];

    jwt.verify(token, jwtSecret, (err, data) => {
      if(err){
        res.status(401);
        res.json({msg: "Token inválido"});
      }else{
        req.token = token;
        //console.log(req.data)
        req.logeddUser = {id: data.id, name: data.name, email: data.email};
        next();
      }

    })

  }else{
    res.status(401);
    res.json({msg: "Token inválido"});

  }

}



//Banco de dados falso
var BD = {
   games: [
	  {
     "id": 1,
	   "name": "Super Mario",
	   "year": 1993,
	   "price": 50
	  },
	  {
	   "id": 2,
	   "name": "Zelda",
	   "year": 2001,
	   "price": 99
	  },
	  {
	   "id": 3,
	   "name": "Minecraft",
	   "year": 2005,
	   "price": 30
	  },
   ],
   users: [
     {
       "id": "1",
       "name": "Gustavo",
       "email": "gustavo@gmail.com",
       "password": "123"       
     },
     {
      "id": "2",
      "name": "Lima",
      "email": "lima@gmail.com",
      "password": "321"
    }

   ]
}


//retorna todos os games
app.get('/games', auth, (req, res) => {
  res.statusCode = 200
  res.json({games: BD.games, user: req.logeddUser})
})

//retorna um game pelo id
app.get('/game/:id',auth, (req, res) => {

  var id = parseInt(req.params.id)

  if(isNaN(id)) res.sendStatus(400)

  var g = BD.games.find(g => g.id == id)

  if(g == undefined) {
     res.sendStatus(404)
  }else{
     res.statusCode = 200
     res.json(g)
  }

})

//adiciona um game
app.post('/game',auth,(req, res) =>{

	var {id, name, year, price} = req.body;

	BD.games.push({
			id: id,
			name: name,
			year: year,
			price: price
	})


	res.sendStatus(200)

})

//deleta um game pelo id
app.delete('/game/:id',auth,(req, res) =>{

	var id = parseInt(req.params.id);

  if(isNaN(id)) res.sendStatus(400);

  var index = BD.games.findIndex(g => g.id == id);

  if(index == -1) {
    res.sendStatus(404)
  }else{
  	BD.games.splice(index,1)
    res.sendStatus(200)
  }

})


//alterando game pelo id
app.put("/game/:id",auth,(req, res) => {

  if(isNaN(req.params.id)){
      res.sendStatus(400);
  }else{
      
      var id = parseInt(req.params.id);

      var game = BD.games.find(g => g.id == id);

      if(game != undefined){

          var {name, price, year} = req.body;

          
          if(name != undefined){
              game.name = name;
          }

          if(price != undefined){
              game.price = price;
          }

          if(year != undefined){
              game.year = year;
          }
          
          res.sendStatus(200);

      }else{
          res.sendStatus(404);
      }
  }

});

//Autenticação de usuario
app.post("/auth",(req, res) => {
  var {email, password} = req.body;

  if(email == undefined){
    res.status(400)
    res.json({msg: "email inválido"})
  }else if(password == undefined){
    res.status(400)
    res.json({msg: "senha inválida"})
  }else{
    var user = BD.users.find(u => u.email == email);

    if(user != undefined){
            
      if(password == user.password){

        jwt.sign({name: user.name,id: user.id, email: user.email},jwtSecret,{expiresIn: "8h"},(err, token) => {
          if(err){
            res.status(500)
            res.json({err: err})
          }else{
            res.status(200)
            res.json({token: token})
          }
        });
      }else{
        res.status(401)
        res.json({msg: "Senha inválida"})
      }
      
    }else{
      res.status(404)
      res.json({msg: "Email não cadastrado"})
    }

  }

});







const port = 3000

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`)
})