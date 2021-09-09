const express = require ('express')
const app = express()
const multer = require ('multer')
const pdfex = require('./main');
var path = require('path');

require("dotenv").config();

const morgan = require("morgan");
const mongoose = require("mongoose");

const cors = require("cors");

/**
 * Database setup
 */
 mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null , 'upload/')
//     },
//     filename: (req, file , cb) =>{
//         cb(null,+Date.now()+'.pdf')
//     }
// })

// const upload = multer ({ storage })

// app.set('view engine','ejs')

// app.get('/',(req,res) =>res.render('home'))
// // req e entrada , res e saida
// app.post('/', upload.single('pdf') ,(req,res)=>{
//     console.log(req.body , req.file)
//     //console.log(req.file.filename)
//     try
//     {   // função( nome do arquivo , deletar pdf ao extrair img , extrair pro completo(pular regex) para arquivos em formato não compativel
//         pdfex.extract(req.file.filename,false, false)
//     }catch(error){
//         console.error(error)
//     }
    
//     res.send('Aguarde Extracao')
// })
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "src", "uploads"))
);

app.use(require("./routes"));

app.listen(3001, () => console.log('running...'))