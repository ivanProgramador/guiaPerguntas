/*
EJS é um template engine responsavel por desenhar html 
nos retornos das requisições.

configuração pra avisar ao express pra usar o EJS 

app.set('view engine','ejs');

sequencia 
a rota get recebe os valores lang e nome 

depois eu crio variavei internas com os mesmo nome e passao os valores
dos parametros recebidos pra elas 

quem vai responder a requisição e a função render que recebe 2 parametros 

1 - o html que deve ser exibido 
2 - as variaveis que devem ir pra view 

para enviar variaveis elas tem que ir no formato chave: valor 
*/

  res.render('principal/Perfil',{
        nome: nome,
        lang: lang,
        empresa:'Guia do programador',
        inscritos: 8040

    });

/*

Mostrando os valores no html

<body>

    <h1>Perfil usuario</h1>
    <hr>
    <h3>Nome: <%= nome %> </h3>
    <p>Linguagem favorita <%= lang %></p>
    <P>Empresa:<%= empresa %></P>
    
</body>

*/

/*
 exibição condicional 

 apos o envio das variaveis para a pagina 
 os valores desta variaveis podem ser avaliados  
 por estruturas de decisão no caso abaixo eu testo se o conteudo da variavel 
 msg e verdadeiro ou falso caso seja falso eu não mostro a mensagem 
  
 <body>

    <h1>Perfil usuario</h1>
    <hr>
    <h3>Nome: <%= nome %> </h3>
    <p>Linguagem favorita <%= lang %></p>
    <P>Empresa:<%= empresa %></P>
        <% if(msg == true){%>
            <p>mensagem condicional</p>
        <% }%>
    

    
</body>

*/

/*
 Estrutura de repetição no EJS 

 passanodo array pra pagina inicial 

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

    Mostando os dados dele usando o ejs foreach

    
    <p>Lista de produtos</p>
    <% produtos.forEach(function(produto){ %>
        <%= produto.nome %>  <%= produto.preco %><br>
    <% }) %>

    







*/








