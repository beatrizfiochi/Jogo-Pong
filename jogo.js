var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

var corFundo = 'black';

function criarFundo(){

    //coloca p tamanho máximo da tela
    pincel.canvas.width  = window.innerWidth - 20; 
    pincel.canvas.height = window.innerHeight - 20;

    // Atualiza posição do quadrado, pq ele depende do tamanho da tela
    posicaoXQuadrado = ((pincel.canvas.width - tamanhoQuadrado)/2);
    posicaoYQuadrado = ((pincel.canvas.height - tamanhoQuadrado)/2);
    xDireita = pincel.canvas.width - borda - larguraJogador;

    pincel.fillStyle = corFundo;
    pincel.fillRect(0, 0, pincel.canvas.width, pincel.canvas.height);
}

var borda = 20;
var larguraJogador = 40;
var alturaJogador = 200;
var yEsquerda = borda;
var xEsquerda = borda;
var yDireita = borda;
var xDireita = pincel.canvas.width - borda - larguraJogador;


function desenhoJogadorEsquerda(){
    pincel.fillStyle = 'blue';
    pincel.fillRect(xEsquerda, yEsquerda, larguraJogador, alturaJogador);
}

function desenhoJogadorDireita(){
    pincel.fillStyle = 'red';
    pincel.fillRect(xDireita, yDireita, larguraJogador, alturaJogador);
}

var taxaIncrementoY = 40;

function moveJogadorEsquerda(sentido){
    // Apaga
    pincel.fillStyle = corFundo;
    pincel.fillRect(borda, yEsquerda, larguraJogador, alturaJogador);

    // Calcula
    yEsquerda = yEsquerda + (taxaIncrementoY*sentido);
    if (yEsquerda < borda){
        yEsquerda = borda;
    } else if (yEsquerda > pincel.canvas.height - borda - alturaJogador){
        yEsquerda = pincel.canvas.height - borda - alturaJogador;
    }

    // Desenha
    desenhoJogadorEsquerda();

}

function moveJogadorDireita(sentido){
    // Apaga
    pincel.fillStyle = corFundo;
    pincel.fillRect(xDireita, yDireita, larguraJogador, alturaJogador);

    // Calcula
    yDireita = yDireita + (taxaIncrementoY*sentido);
    if (yDireita < borda){
        yDireita = borda;
    } else if (yDireita > pincel.canvas.height - borda - alturaJogador){
        yDireita = pincel.canvas.height - borda - alturaJogador;
    }
    // Desenha
    desenhoJogadorDireita();
}

//códigos do teclado jogador esquerda W e S
var cimaJogadorEsquerda = "w";
var baixoJogadorEsquerda = "s";
        
//códigos do teclado jogador direita
var cimaJogadorDireita = "ArrowUp";
var baixoJogadorDireita = "ArrowDown";

let pressedKeysMap = {};
function onKeyDown(evento){
  pressedKeysMap[evento.key] = true;
}

function onKeyUp(evento) {
  pressedKeysMap[evento.key] = false;
}

var tamanhoQuadrado = 40;
var angulo = 30;
var VxInicial = 10;
var VyInicial = 10;
var Vx = VxInicial;
var Vy = VyInicial;
// Os valores de posição serão atualizados quando chamar o criarFundo
var posicaoXQuadrado = 0;
var posicaoYQuadrado = 0;

function aceleraQuadrado(){
    console.log("Vx = " + Vx);
    console.log("Vy = " + Vy);
    Vx = Vx*(1.05);
    Vy = Vy*(1.05);
}

function desenhaQuadrado(){
    pincel.fillStyle = 'white';
    pincel.fillRect(posicaoXQuadrado, posicaoYQuadrado, tamanhoQuadrado, tamanhoQuadrado);
}

 //Verifica se a nova posicao da Quadrado esta em cima de um jogador - O que significa uma defesa
function verificaSeQuadradoEncostouNoJogador(xJogador, yJogador){
    //Verifica se a Quadrado está na altura do jogador
    if(((posicaoYQuadrado + tamanhoQuadrado) > yJogador) && (posicaoYQuadrado < (yJogador + alturaJogador) )){
        if(((posicaoXQuadrado + tamanhoQuadrado) > xJogador) && (posicaoXQuadrado < (xJogador + larguraJogador))){
            return true;
        }
    } 
    
    return false;    
}

function atualizaTela(){
    // Apaga
    pincel.fillStyle = corFundo;
    // Nao sei pq, mas não estava apagando o quadrado todo usando a mesma posição e tamanho. Então estou apagando um quadrado maior
    pincel.fillRect(posicaoXQuadrado - 1, posicaoYQuadrado - 1, tamanhoQuadrado + 2, tamanhoQuadrado + 2);

    //Calcula nova posicao
    posicaoXQuadrado = posicaoXQuadrado + Vx;
    posicaoYQuadrado = posicaoYQuadrado + Vy;

    //Verifica se passou dos limites superior e inferior da tela
    if (posicaoYQuadrado < borda){
        posicaoYQuadrado = borda;
        Vy = Vy * -1;
    } else if (posicaoYQuadrado > (pincel.canvas.height - borda - tamanhoQuadrado)){
        posicaoYQuadrado = (pincel.canvas.height - borda - tamanhoQuadrado);
        Vy = Vy * -1;
    }

    //Verifica se a nova posicao da Quadrado esta em cima de um jogador - O que significa uma defesa
    if (verificaSeQuadradoEncostouNoJogador(xDireita, yDireita)){
        Vx = Vx * -1;
        console.log("encostou na direita")
    }
    if (verificaSeQuadradoEncostouNoJogador(xEsquerda, yEsquerda)){
        Vx = Vx * -1;
        console.log("encostou na esquerda")
    }
    
    //Verifica se foi gol
    if(posicaoXQuadrado < 0 - tamanhoQuadrado){
        posicaoXQuadrado = ((pincel.canvas.width - tamanhoQuadrado)/2);
        posicaoYQuadrado = ((pincel.canvas.height - tamanhoQuadrado)/2);
        Vx = VxInicial;
        Vy = VyInicial;
        // teste
        Vx = Vx * -1;
    } else if(posicaoXQuadrado > pincel.canvas.width + tamanhoQuadrado){
        posicaoXQuadrado = ((pincel.canvas.width - tamanhoQuadrado)/2);
        posicaoYQuadrado = ((pincel.canvas.height - tamanhoQuadrado)/2);
        Vx = VxInicial;
        Vy = VyInicial;
        // teste
        Vx = Vx * -1;
    }

    if (pressedKeysMap[baixoJogadorEsquerda]){
        moveJogadorEsquerda(1);
    }
    if (pressedKeysMap[cimaJogadorEsquerda]){
        moveJogadorEsquerda(-1);
    }
    if (pressedKeysMap[baixoJogadorDireita]){
        moveJogadorDireita(1);
    }
    if (pressedKeysMap[cimaJogadorDireita]){
        moveJogadorDireita(-1);
    }

    //Desenha
    desenhaQuadrado();
    desenhoJogadorEsquerda();
    desenhoJogadorDireita();
}

criarFundo();
desenhoJogadorEsquerda();
desenhoJogadorDireita();
desenhaQuadrado();
atualizaTela();

document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

setInterval(atualizaTela, 20);
setInterval(aceleraQuadrado, 1000);
