const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

const stringConexao = process.env.CONEXAO_BD;

async function conectarAoMongoDB() {
  await mongoose.connect(stringConexao);
}

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

app.post('/signup', async (req, res) => {
  try {
    const login = req.body.login
    const password = req.body.password
    const passwordCriptografada = await bcrypt.hash(password, 10)
    const usuario = new Usuario({ login: login, password: passwordCriptografada})
    const respMongo = await usuario.save()
    console.log (respMongo)
    res.status(201).end()
  }
  catch (exception) {
    console.log(exception)
    res.status(409).end()
  }
})

const PORTA = 3000
app.listen(PORTA, () => {
  try {
    conectarAoMongoDB();
    console.log("servidor up and running on " + PORTA + " and connection ok");
  } 
  catch (e) {
    console.log("erro: " + e);
  }
});
