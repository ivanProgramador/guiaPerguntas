const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


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
    // A ordem de exibição da laista dos valores e definida dentro 
    // do obejto que o findAll usa como parametro.
    //no caso o atributo order recebe dois arrays sendo que dentro desse array ele recebe um sub array de dois parametros 
    //no primeiro parametro tenho que informar com base em que a lista vai ser ordenada 
    // eu escolhi pelo id e no segundo parametro eu digo se que ele vai listar de forma decrescente  
    //decrescente -> DESC  OU de forma crescente -> ASC
    // eu escolhi cresctene para que as perguntas novas ficarem sempre no topo da lista  

    Pergunta.findAll({raw:true,order:[['id','DESC']]}).then(perguntas=>{
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



app.get("/pergunta/:id",(req,res)=>{

    //buscando por uma pergunta especifica 

    var id = req.params.id; // variavel que vai trazer o id

    // o finOne recebe um objeto que tem o whre como atributo 
    //esse atributo recebe um outro objeto que tem os id´s da abase
    //e compara com o is que recebi da requisição   

    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta =>{

        //depois que essa comparação é feita eu testo se realmente existe algum valor 
        //dentro da variavel pergunta  porque é uma consulta a um base de dados 
        //e a pergunta pode existir ou não etão eu eu faço um teste ora sabe se 
        // a varivel pergunta esta indefinda ou se tem algum valor 

        if(pergunta != undefined){

            //buscando todas as respostas referentes a essa pergunta
            // a comparação vai ser feita pelo id 
            Resposta.findAll({
                where:{perguntaId:pergunta.id},
                order:[['id','DESC']]
            }).then(respostas =>{
                  //se tiver ele vai pra view com a apergunta selecionada 
                  //e as respostass refrentes a ela 
                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas:respostas
                })
               
            })      

        }else{
            //se não tiver ele bolta pra pagina inicial 

            res.redirect('/')

        }
    }

    )

})


app.post('/responder',(req,res)=>{

    //corpo de resposta 
    var corpo = req.body.corpo;

    //id da pergunta 
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo:corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect('/pergunta/'+perguntaId);
    })




})


app.listen(7070,()=>{console.log("App rodando  na porta:7070")});