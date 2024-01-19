
//chamndo o sequelize 
const Sequelize = require("sequelize");

//importando a conexão 
const connection = require("./database");

//a função define recebe 2 parametros 1 eo nome da tabela  e o 2 é um objeto que descrve as colunas 
const Pergunta = connection.define('perguntas',{
    // a primeira coluna vai se chamar titulo

    titulo:{
        // o typo de dado que ela vai receber e string 
        type: Sequelize.STRING,

        // ela não permite dados nulos
        allowNull: false
    },

    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    }
});



Pergunta.sync({force:false}).then(()=>{});
// Para que seja possivel a manipulaçao do registro com base na rota 
//e necessario exportar esse modulo

module.exports = Pergunta;


