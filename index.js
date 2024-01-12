const express = require("express");
const app = express();

// avisando que eu vou usar o EJS como view engine 
app.set('view engine','ejs');
//avisando onde fica a pasta do meu css e js estico
app.use(express.static('public'));


app.get('/',(req,res)=>{

   


    res.render('index',);


});

app.listen(8080,()=>{console.log("App rodando");});