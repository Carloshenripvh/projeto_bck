const express = require ('express')
const app = express()
const multer = require ('multer')
const pdfex = require('./main');
var path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null , 'upload/')
    },
    filename: (req, file , cb) =>{
        cb(null,+Date.now()+'.pdf')
    }
})

const upload = multer ({ storage })

app.set('view engine','ejs')

app.get('/',(req,res) =>res.render('home'))
// req e entrada , res e saida
app.post('/', upload.single('pdf') ,(req,res)=>{
    console.log(req.body , req.file)
    //console.log(req.file.filename)
    try
    {   // função( nome do arquivo , deletar pdf ao extrair img , extrair pro completo(pular regex) para arquivos em formato não compativel
        pdfex.extract(req.file.filename,true,false)
    }catch(error){
        console.error(error)
    }
    
    res.send('Aguarde Extracao')
})

app.listen(3000,() => console.log('running...'))