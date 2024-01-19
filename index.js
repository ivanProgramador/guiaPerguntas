const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');


//testando a conexão 

connection.authenticate().then(()=>{
    console.log('Conexão bem sucedida')
}).catch((erro)=>{
    console.log(erro)
})



// avisando que eu vou usar o EJS como view engine 
app.set('view engine','ejs');

//avisando onde fica a pasta do meu css e js estico
app.use(express.static('public'));

// essa configuração faz o app usar o bodyparser pra decodigficar os dados vindos do formulario 
app.use(bodyParser.urlencoded({extended:false}));

//configuração que permite ler dados de formulario rebidos via json 
app.use(bodyParser.json());


app.get('/',(req,res)=>{

    //usando o modelo pergunta para lista as perguntas salvas 
    Pergunta.findAll({raw:true}).then(perguntas=>{
        res.render('index',{perguntas:perguntas});
        });



    
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

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/');
    })

    

});



app.listen(7070,()=>{console.log("App rodando  na porta:7070")});