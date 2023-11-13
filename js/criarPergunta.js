let perguntas = [
    {
        pergunta: "Pergunta 1",
        respostaA: "resposta a",
        respostaB: "resposta b",
        respostaC: "resposta c",
        respostaD: "resposta d",
    },
    {
        pergunta: "Pergunta 2",
        respostaA: "resposta a",
        respostaB: "resposta b",
        respostaC: "resposta c",
        respostaD: "resposta d",
    },
    {
        pergunta: "Pergunta 3",
        respostaA: "resposta a",
        respostaB: "resposta b",
        respostaC: "resposta c",
        respostaD: "resposta d",
    },
    {
        pergunta: "Pergunta 4",
        respostaA: "resposta a",
        respostaB: "resposta b",
        respostaC: "resposta c",
        respostaD: "resposta d",
    },
];

function adcionaPergunta(indice) {
    let perguntaEl = document.querySelector("#pergunta");
    let opcaoAEl = document.querySelector("#A");
    let opcaoBEl = document.querySelector("#B");
    let opcaoCEl = document.querySelector("#C");
    let opcaoDEl = document.querySelector("#D");
    let pergunta = perguntas[indice];

    perguntaEl.innerHTML = pergunta.pergunta;
    opcaoAEl.innerHTML = pergunta.respostaA;
    opcaoBEl.innerHTML = pergunta.respostaB;
    opcaoCEl.innerHTML = pergunta.respostaC;
    opcaoDEl.innerHTML = pergunta.respostaD;
}

let startEl = document.querySelector("#start");
let quizEl = document.querySelector("#quiz");
let startBtn = document.querySelector("#start button");
let perguntaAtual = 0;

startBtn.addEventListener("click", function () {
    startEl.classList.add("invisivel");
    quizEl.classList.remove("invisivel")

    adcionaPergunta(perguntaAtual);
    perguntaAtual++;
});

let respostasEl = document.querySelectorAll(".respostas");

respostasEl.forEach(e => {
    e.addEventListener("click", function () {
        adcionaPergunta(perguntaAtual);

        if(perguntaAtual < perguntas.length - 1) {
            perguntaAtual++;
        } 
        else {
            perguntaAtual = 0;
        }
    });
});