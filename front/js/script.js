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