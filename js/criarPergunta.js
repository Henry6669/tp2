let perguntas = [];
let perguntaAtual;
let perguntasDisponiveis = [];
let quantidadePerguntas = dificuldades.facil;

function carregaPerguntas() {
    perguntasDisponiveis = [];
    for(let i = 0; i < perguntas.length; i++) {
        if(!player.perguntas.includes(i))
            perguntasDisponiveis.push(i);
    } 
}

function perguntaAleatoria() {
    let min = 0;
    let max = perguntasDisponiveis.length;

    let id = Math.floor(Math.random() * (max - min) + min);
    valor = perguntasDisponiveis[id];
    contaPerguntas(valor);
    perguntasDisponiveis.splice(id, 1);
    return perguntas[valor];
}

function comecarQuiz() {
    carregaPerguntas();
    proximaPergunta();
    quantidadePerguntas = dificuldade.perguntas - player.perguntas.length;
    $("#time").removeClass("invisivel");
    $("#vida").removeClass("invisivel");
    $("#quiz").removeClass("invisivel");
    iniciaCronometro();
}

$.ajax({
    url: "json/perguntas.json",
    dataType: "json",
    success: function(response) {
        perguntas = response.perguntas;
        carregarJogadorAtual();
    },
    error: function(error) {
        console.log("Erro ao buscar as perguntas: " + error);
    }
});

function proximaPergunta() {
    let proxima = perguntaAleatoria();
    adcionaPergunta(proxima);
    perguntaAtual = proxima;
    quantidadePerguntas--;
}

function adcionaPergunta(pergunta) {
    let perguntaEl = document.querySelector("#pergunta");
    let opcaoAEl = document.querySelector("#A");
    let opcaoBEl = document.querySelector("#B");
    let opcaoCEl = document.querySelector("#C");
    let opcaoDEl = document.querySelector("#D");
    
    perguntaEl.innerHTML = pergunta.pergunta;
    opcaoAEl.innerHTML = pergunta.respostaA;
    opcaoBEl.innerHTML = pergunta.respostaB;
    opcaoCEl.innerHTML = pergunta.respostaC;
    opcaoDEl.innerHTML = pergunta.respostaD;

    resetaTime();
}

function resetaTime() {
    let time =  $("#time div");
    time.css("--time", 100);
}

function perde() {
    recuperaVida();
    clearInterval(cronometro);
    resetaPerguntasRespondidas();
    $("#final").removeClass("invisivel");
    $("#perdeu").removeClass("invisivel");


};

function vence() {
    recuperaVida();
    clearInterval(cronometro);
    resetaPerguntasRespondidas();
    $("#final").removeClass("invisivel");
    $("#venceu").removeClass("invisivel");
}

$(".voltar-inicio").click( function () {
    window.location.assign("index.html")
});

$(".responder-novamente").click(function () {
    resetaPerguntasRespondidas();
    carregaPerguntas();
    proximaPergunta();
    quantidadePerguntas = dificuldade.perguntas - 1;
    $("#final").addClass("invisivel");
    $("#perdeu").addClass("invisivel");
    $("#venceu").addClass("invisivel");
    $("#vida div").css("--vida", 100);
    
    iniciaCronometro();
});

function acerto() { 
    if(quantidadePerguntas === 0) {
        vence();
    }
}


function erro() {
    let vida =  $("#vida div");
    let vidaValor = parseInt(vida.css("--vida")) - dificuldade.dano;
    $("main").css({"background-image": 'url("imgs/mesa.png"), url("imgs/personagem-3.png"), url("imgs/fundo-porao.jpeg")'});
    setTimeout(function () {
        $("main").css({"background-image": 'url("imgs/mesa.png"), url("imgs/personagem-2.png"), url("imgs/fundo-porao.jpeg")'});
    }, 1000);
    vida.css("--vida", vidaValor);
    daDano()
    
    if(vidaValor === 0) {
        perde();
    } 
}

let respostasEl = $(".respostas");
respostasEl.click(function () {
    if($(this).data("opcao") === perguntaAtual.respostaCorreta) {
        acerto();
    } else {
        erro();
    }

    proximaPergunta();   
});

let cronometro;
function iniciaCronometro() {
    cronometro = setInterval(function () {
        let time =  $("#time div");
        let timeValor = time.css("--time") - 1;
        time.css("--time", timeValor);
    
        if(timeValor <= 0) {
            erro();
            proximaPergunta();
        }
    }, dificuldade.tempo);
}
