//aqui está nossa string de conexão com o banco
//mongodb+srv://pro_mac:mongo1234@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())

//requisição GET no endereço http://localhost:3000/oi
app.get("/oi", (req, res) => {
  res.send("oi");
});

let filmes = [
  {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse:
      "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
  },
  {
    titulo: "Um Sonho de Liberdade",
    sinopse:
      "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
  },
];

//requisição GET para obter a lista de filmes: http://localhost:3000/filmes
app.get("/filmes", (req, res) => {
    res.json(filmes)
})

//requisição para cadastrar um novo filme NAAA MEMÓÓÓRIA
//post http://localhost:3000/filmes
app.post("/filmes", (req, res) => {
  //obtem as informações que chegam
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  //monta o objeto json
  const filme = {titulo: titulo, sinopse: sinopse}
  filmes.push(filme)
  //só para verificar
  res.send(filmes)
})

app.listen(3000, () => console.log("servidor up and running"));
