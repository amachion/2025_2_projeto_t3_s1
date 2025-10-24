const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const stringConexao = process.env.CONEXAO_BD;

async function conectarAoMongoDB() {
  await mongoose.connect(stringConexao);
}

//requisição GET no endereço http://localhost:3000/oi
app.get("/oi", (req, res) => {
  res.send("oi");
});

// let filmes = [
//   {
//     titulo: "Forrest Gump - O Contador de Histórias",
//     sinopse:
//       "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
//   },
//   {
//     titulo: "Um Sonho de Liberdade",
//     sinopse:
//       "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
//   },
// ];

//requisição GET para obter a lista de filmes: http://localhost:3000/filmes
app.get("/filmes", async (req, res) => {
  const filmes = await Filme.find()
  res.json(filmes);
});

//requisição para cadastrar um novo filme no banco, lá longe
//post http://localhost:3000/filmes
app.post("/filmes", async (req, res) => {
  //obtem as informações que chegam
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  //monta um objeto de acordo com o model Filme (classe)
  const filme = new Filme({ titulo: titulo, sinopse: sinopse });
  //mandar o filme para o banco
  await filme.save()
  //buscar a lista de filmes atualizada do banco
  const filmes = await Filme.find()
  res.json(filmes);
});

app.listen(3000, () => {
  try {
    conectarAoMongoDB();
    console.log("servidor up and running and connection ok");
  } 
  catch (e) {
    console.log("erro: " + e);
  }
});
