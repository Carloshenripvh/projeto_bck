const Sequilize = require('sequelize')
require('dotenv').config();
/*const sequelize = new Sequilize('test','root','T3bdnsr3d4ftATk',{
    host:'34.132.190.245',
    dialect : 'mysql'
})
*/

const sequelize = new Sequilize(process.env.TABLE,process.env.LOGIN,process.env.PASS,{
    host: process.env.HOST ,
    dialect : 'mysql'
})

sequelize.authenticate().then(function () {
    console.log("Sucesso Ao conectar ao Banco de dados!")
}).catch(function () {
    console.log("Houve error ao conectar ao Banco de Dados")
})

const Postagem = sequelize.define('lista',{
    livro : {
        type : Sequilize.STRING
    }
})

exports.insert = function(refb) {
    Postagem.create({
        livro : refb
    })
}

exports.show =  async function (req, res){
    try{
        const livro = await Postagem.findAll();
        return livro;
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

Postagem.sync()

