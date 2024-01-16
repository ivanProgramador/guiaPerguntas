const express = require("express");
const app = express();

// avisando que eu vou usar o EJS como view engine 
app.set('view engine','ejs');
//avisando onde fica a pasta do meu css e js estico
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render('index',);
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
})

app.post('/salvarpergunta',(req,res)=>{

    res.send('Formulario recebido')


})



app.listen(8080,()=>{console.log("App rodando  na porta:8080");});