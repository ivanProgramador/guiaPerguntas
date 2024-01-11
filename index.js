const express = require("express");
const app = express();

// avisando que eu vou usar o EJS como view engine 
app.set('view engine','ejs');


app.get('/:nome/:lang',(req,res)=>{

    //o render vai direto pra pasta views por isso não é preciso colocar a url completa 
    //mas caso o aruivo esteja dentro de uma subpasta da view ai vei ser preciso 
    //colocar a url apartir da view

    //passando variaveis junto com a view 
    var nome = req.params.nome;
    var lang = req.params.lang;

    var produtos = [
        {nome:'Coca-lata', preco:'5,00'},
        {nome:'Pastel de Carne', preco:'4,50'},
        {nome:'Pizza de Carne', preco:'24,50'}

    ]


    res.render('principal/Perfil',{
        nome: nome,
        lang: lang,
        empresa:'Guia do programador',
        inscritos: 8040,
        msg: false,
        produtos: produtos

    });


});

app.listen(8080,()=>{console.log("App rodando");});