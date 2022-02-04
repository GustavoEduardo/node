import bodyParser from 'body-parser';
import express from 'express';
var app = express();
import router from './routes/index';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/",router);//precisa estar depois do bodyParser

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
});