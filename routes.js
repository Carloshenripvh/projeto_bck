const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const mysql = require('./mysql');

const pdfex = require('./main');

const Post = require("./models/Post");
const { extrai } = require("./generate");


routes.get("/posts", async (req, res) => {
  const posts = await Post.find().limit(4);

  return res.json(posts);
});

routes.get("/posts/processed", async (req, res) => {
  const livros = await mysql.show();
  const json = JSON.stringify(livros);
    // const livro_vet = [];
    // const obj = JSON.parse(json, function (key, value) {
    //     if (key == "livro") {
    //       livro_vet.push(value);
    //     }
    //   });
      // console.log(livro_vet[0])
  return res.status(200).send(livros);
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });
  try{   
    // função( nome do arquivo , deletar pdf ao extrair img , extrair pro completo(pular regex) para arquivos em formato não compativel
    pdfex.extract(key,true,false);
    // console.log(`nome:${name},size:${size},key:${key},url:${url} teste: ${test}`)

  }catch(error){
      console.error(error);
  }

  return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;
