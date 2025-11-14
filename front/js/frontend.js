const protocolo = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
  const filmesEndpoint = "/filmes";
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  const filmes = (await axios.get(URLcompleta)).data;
  //posicionar no elemento tabela da página
  let tabela = document.querySelector(".filmes");
  //posicionar no tbody:
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  //varrer o vetor de filmes
  for (let filme of filmes) {
    //inserir uma linha na tabela, na primeira posição:
    let linha = corpoTabela.insertRow(0);
    //caso queira no final, usar o insert sem parâmetro
    //insere uma coluna para cada elemento do filme
    let colunaTitulo = linha.insertCell(0);
    let colunaSinopse = linha.insertCell(1);
    colunaTitulo.innerHTML = filme.titulo;
    colunaSinopse.innerHTML = filme.sinopse;
  }
}

async function cadastrarFilme() {
  const filmesEndpoint = "/filmes";
  //monta a URL completa usando a crase
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
  //se posicionar nos inputs
  let tituloInput = document.querySelector("#tituloInput");
  let sinopseInput = document.querySelector("#sinopseInput");
  //pega o que o usuário digitou em cada um
  let titulo = tituloInput.value;
  let sinopse = sinopseInput.value;
  if (titulo && sinopse) {
    //limpa as caixinhas de digitação
    tituloInput.value = "";
    sinopseInput.value = "";
    //envia a requisição para o servidor
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data;
    //reconstruir a tabela de filmes
    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    corpoTabela.innerHTML = "";
    //para cada filme, criar uma linha
    //para cada linha, duas colunas com título e sinopse
    for (let filme of filmes) {
      let linha = corpoTabela.insertRow(0);
      let celulaTitulo = linha.insertCell(0);
      let celulaSinopse = linha.insertCell(1);
      celulaTitulo.innerHTML = filme.titulo;
      celulaSinopse.innerHTML = filme.sinopse;
    }
    exibirAlerta('.alert-filmes', "Filme cadastrado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
  }
  else {
    //exibir o alerta por até 2 segundos
    exibirAlerta('.alert-filmes', "Preencha todos os campos!", ['show', 'alert-danger'], ['d-none'], 2000)
  }
}
async function cadastrarUsuario() {
  //1. posicionar nos campos de input do modal
  let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
  let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
  //2. captura o que o usuário digitou
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value
  if (usuarioCadastro && passwordCadastro) {
    //cadastrar, utilizando uma uma estrutura try - catch
    try {
      //1. definir o endpoint
      const cadastroInput = '/signup'
      //2. montar a URL completa
      const URLcompleta = `${protocolo}${baseURL}${cadastroInput}`
      await axios.post(URLcompleta, {login: usuarioCadastro, password: passwordCadastro})
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""

      exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", 
                   ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)

      esconderModal("#modalCadastro", 2000)
    }
    catch (error) {
      //exibir o alerta que o usuário já existe
      exibirAlerta('.alert-modal-cadastro', "Usuário já existe!", 
                   ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)

      esconderModal("#modalCadastro", 2000)
    }
  }
  else {
    //exibir o alerta para digitar tudo
    exibirAlerta('.alert-modal-cadastro', "Preencha todos os campos!", 
                  ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
  }  
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
  let alert = document.querySelector(seletor)
  alert.innerHTML = innerHTML
  //... é o operador spread que "varre" a lista e entrega à função
  alert.classList.add(...classesToAdd)
  alert.classList.remove(...classesToRemove)
  setTimeout(() => {
    alert.classList.add(...classesToRemove)
    alert.classList.remove(...classesToAdd)
  }, timeout)
}

function esconderModal (seletor, timeout) {
  setTimeout (() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
  }, timeout)
}

const fazerLogin = async () => {
  //1. posicionar nos inputs
  let usuarioLoginInput = document.querySelector("#usuarioLoginInput")
  let passwordLoginInput = document.querySelector("#passwordLoginInput")
  //2. captura os valores digitados
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value
  if (usuarioLogin && passwordLogin) {
    //requisição com try - catch
    try {
      //montar a URL
      let loginEndpoint = '/login'
      let URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
      //faz a requisição capturando a resposta do back
      let response = await axios.post (URLcompleta, {login: usuarioLogin, password: passwordLogin})
      //console.log(response.data);
      //armazenar o token no localStorage que persiste enquanto a sessão está ativa
      const token =response.data.token
      localStorage.setItem('tokenFilmes', token)
      //limpa as caixinhas
      usuarioLoginInput.value = ""
      passwordLoginInput.value = ""
      exibirAlerta('.alert-modal-login', 'Login realizado com sucesso', ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
      esconderModal('#modalLogin', 2000)
      //alterar o status do botão de cadastro de filme
      let cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
      cadastrarFilmeButton.disabled = false
      //alterar o texto do link de login
      let loginLink = document.querySelector('#loginLink')
      loginLink.innerHTML = "Logout"
    }
    catch (error) {
      exibirAlerta('.alert-modal-login', 'Falha no login', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
  }
  else {
    exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
  }
}
function atualizarEstadoLogin () {
  const token = localStorage.getItem('tokenFilmes')
  let cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
  let loginLink = document.querySelector('#loginLink')
  if (token) {
    cadastrarFilmeButton.disabled = false
    loginLink.innerHTML = "Logout"
  }
  else {
    cadastrarFilmeButton.disabled = true
    loginLink.innerHTML = "Login"
  }
}
function fazerLogout () {
  //remover itens persistidos
  localStorage.removeItem('tokenFilmes')
  //desabilitar o botão de cadastrar Filme
  const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
  cadastrarFilmeButton.disabled = true
  //alterar o texto do link para Login
  const loginLink = document.querySelector("#loginLink")
  loginLink.innerHTML = 'Login'
}

function loginOuLogout () {
  const loginLink = document.querySelector("#loginLink")
  if (loginLink.innerHTML === 'Login') {
    const modal = new bootstrap.Modal("#modalLogin")
    modal.show()
  }
  else {
    fazerLogout()
  }
}
