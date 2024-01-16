const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// avisando que eu vou usar o EJS como view engine 
app.set('view engine','ejs');

//avisando onde fica a pasta do meu css e js estico
app.use(express.static('public'));

// essa configuração faz o app usar o bodyparser pra decodigficar os dados vindos do formulario 
app.use(bodyParser.urlencoded({extended:false}));

//configuração que permite ler dados de formulario rebidos via json 
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/perguntar',(req,res)=>{

    res.render('perguntar');

});

app.post('/salvarpergunta',(req,res)=>{
   
    /* 
      Como eu estou usadno o body-parser
      a requisição vira um objeto chamado body 
      e eu posso chamar os atributos desse objeto e colocar em uma variavel
      
      req -> a requisição  
      body -> o objeto
      titulo -> o atributo

    */
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send('Formulario recebido: titulo = '+titulo+"  descricao = " + descricao )

});



app.listen(8080,()=>{console.log("App rodando  na porta:8080");});