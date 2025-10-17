const protocolo = "http://"
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes"

async function obtemFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes =  (await axios.get(URLcompleta)).data
    //console.log(filmes)
    let tabela = document.querySelector('.filmes') 
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    //para cada filme, criar uma nova linha
    for (let filme of filmes)  {
        //a inserção da linha será no início, poderia ser no fim (sem argumentos no insertRow)
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}
async function cadastrarFilme() {
    //montamos a URL completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    //pega os inputs digitados pelo usuário
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    //limpa as caixinhas de input
    tituloInput.value = ""
    sinopseInput.value = ""
    const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
    //limpar a tabela e preencher com a lista nova de filmes
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}