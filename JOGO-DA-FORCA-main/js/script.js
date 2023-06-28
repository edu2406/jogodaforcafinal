let palavrasSrtCtg;
let palavraSecretaAleatoria;
let listdnmc = [];
let acertos = 6;
let palavras = [];

// Carregar palavras do arquivo JSON
fetch('../palavras.json')
  .then(response => response.json())
  .then(data => {
    palavras = data.palavras;
    criaPlvrScrt();
  })
  .catch(error => console.error(error));

function criaPlvrScrt() {
  const indexPalavra = parseInt(Math.random() * palavras.length);
  palavraSecretaAleatoria = palavras[indexPalavra].nome;
  palavrasSrtCtg = palavras[indexPalavra].categoria;
  PalavraNaTela();
}

function PalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = "TEMA: " + palavrasSrtCtg;


    categoria.style.color = "rgb(0, 0, 0)";
    categoria.innerHTML = "TEMA: " + palavrasSrtCtg;


    const Palavrasecreta = document.getElementById("Palavra-secreta");
    Palavrasecreta.innerHTML = "";

    for (i = 0; i < palavraSecretaAleatoria.length; i++) {
        if (listdnmc[i] == undefined) {
            if(palavraSecretaAleatoria[i] == " ") {
            listdnmc[i] = " ";

            Palavrasecreta.innerHTML = Palavrasecreta.innerHTML + "<div class='letrasEspaco'>" + listdnmc[i] + "</div>"
            }

            else {
            listdnmc[i] = "&nbsp;"
            Palavrasecreta.innerHTML = Palavrasecreta.innerHTML + "<div class='letras'>" + listdnmc[i] + "</div>"
            }
        }
        else {
            if(palavraSecretaAleatoria[i] == " ") {
                listdnmc[i] == " ";
                Palavrasecreta.innerHTML = Palavrasecreta.innerHTML + "<div class='letrasEspaco'>" +
                listdnmc[i] + "</div>"
            }
            else{
                Palavrasecreta.innerHTML = Palavrasecreta.innerHTML + "<div class='letras'>" + listdnmc[i] + "</div>"
            }
        }
    }
}
function LetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (acertos > 0) {
        mudarStyleLetra("tecla-" + letra);
        comparaListas(letra);
        PalavraNaTela();
    }
}
function mudarStyleLetra(tecla, condicao) {
   if(condicao == false) {

    document.getElementById(tecla).style.background = "#474747d2";
    document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}
function comparaListas(letra) {
    const pos = palavraSecretaAleatoria.indexOf(letra);
    if (pos < 0) {
        acertos--;
        carregaImagemErro();

        if (acertos == 0) {
            abreModal("OPS!", "Não foi desta vez :( ... A palavra secreta era: <br>" + palavraSecretaAleatoria);
        }
    }
    else {
        for (i = 0;i < palavraSecretaAleatoria.length; i++) {
            if (palavraSecretaAleatoria[i] == letra) {
                listdnmc[i] = letra;
            }
        }
    }

    var vitoria = true;
    for (i = 0; i < palavraSecretaAleatoria.length; i++) {
        if (palavraSecretaAleatoria[i] != listdnmc[i]) {
        vitoria = false;
        }
    }
    if (vitoria == true) {
    abreModal("Boa!", "Você acertou :)");
    acertos = 0;

    }
}
function carregaImagemErro() {
    switch (acertos) {
        case 5:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem1.png') 100% no-repeat";
            break;
        case 4:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem2.png') 100% no-repeat";
            break;
        case 3:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem3.png') 100% no-repeat";
            break;
        case 2:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem4.png') 100% no-repeat";
            break;
        case 1:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem5.png') 100% no-repeat";
            break;
        case 0:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem6.png') 100% no-repeat";
            break;
        default:
            document.getElementById("imgForca").style.background = "url('../imagem/Imagem.png') 100% no-repeat";
    }
}
function abreModal(titulo, mensagem) {

    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({ show: true });
}
let btnEnter = document.querySelector("#BtnEnter");

btnEnter.addEventListener("click",function(){

    location.reload();
});