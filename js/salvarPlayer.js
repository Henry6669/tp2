let player;

function salvarJogador() {
    let inputNome = document.querySelector("#nome");
    let inputSenha = document.querySelector("#senha");

    if(inputNome.value === "") {
        inputNome.classList.add("errado");
        playerLogado = false
    } 

    if(inputSenha.value === "") {
        inputSenha.classList.add("errado");
        playerLogado = false;
    } 

    if(inputNome.value.length > 0 && inputSenha.value.length > 0) {
        definirDificuldade();
    
        player = {
            nome: inputNome.value,
            senha: inputSenha.value,
            perguntas: [],
            dificuldade: dificuldade.nivel,
            vida: 100,
        };
    
        let playerString = JSON.stringify(player);
    
        localStorage.setItem(player.nome, playerString);
        playerLogado = true;
        salvarJogadorAtual();
    }
    else {
        playerLogado = false;
    }
}

function salvarJogadorAtual() {
    localStorage.setItem("player", JSON.stringify(player));
    definirDificuldadeNivel(player.dificuldade);
}

function carregarJogadorAtual() {
    player = JSON.parse(localStorage.getItem("player"));
    if(player.perguntas[0] == null) {
        player.perguntas = []
    } 
    definirDificuldadeNivel(player.dificuldade);
    $("#vida div").css("--vida", player.vida);

}

function carregarJogador() {
    let inputNome = document.querySelector("#nome");
    let inputSenha = document.querySelector("#senha");

    if(inputNome.value === "") {
        inputNome.classList.add("errado");
        playerLogado = false
    } 

    if(inputSenha.value === "") {
        inputSenha.classList.add("errado");
        playerLogado = false;
    } 

    if(inputNome.value.length > 0 && inputSenha.value.length > 0) {
        let playerCarregado = JSON.parse(localStorage.getItem(inputNome.value));

        if(playerCarregado.senha == inputSenha.value) {
            player = playerCarregado;
            definirDificuldadeNivel(player.dificuldade);
            player.perguntas.pop();
            salvarJogadorAtual();
            playerLogado = true;
        } 
        else {
            playerLogado = false;
            inputSenha.classList.add("errado");
        }
    }
    else {
        playerLogado = false;
    }
}

function contaPerguntas(pergunta) {
    player.perguntas.push(pergunta);

    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem(player.nome, JSON.stringify(player));
}

function resetaPerguntasRespondidas() {
    
    player.perguntas = [];
    

    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem(player.nome, JSON.stringify(player));
}

let playerSalvo = true;
$("#salvar-usuario").click(function () {
    salvarJogador();
    if(playerSalvo) {
        $("#config").addClass("invisivel")
        $("#historia").removeClass("invisivel");
    }
})

let playerLogado = true;
$("#carregar-usuario").click(function () {
    carregarJogador();
    if(playerLogado) {
        $("#config").addClass("invisivel")
        $("#historia").removeClass("invisivel");
    }
})

function daDano() {
    player.vida -= dificuldade.dano;

    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem(player.nome, JSON.stringify(player));
}

function recuperaVida() {
    player.vida = 100;

    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem(player.nome, JSON.stringify(player));
}