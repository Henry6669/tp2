let dificuldades = {
    facil: {
        nivel: "facil",
        tempo: 700,
        dano: 20,
        perguntas: 10,
    },
    medio: {
        nivel: "medio",
        tempo: 500,
        dano: 25,
        perguntas: 10,
    },
    dificil: {
        nivel: "dificil",
        tempo: 200,
        dano: 25,
        perguntas: 10,
    },
    dev: {
        tempo: 100,
        dano: 25,
        perguntas: 3,
    }
}

let dificuldade = dificuldades.facil;

function definirDificuldade() {
    dificuldade = dificuldades[$("#dificuldades").val()];
}

function definirDificuldadeNivel(nivel) {
    dificuldade = dificuldades[nivel];
}

function carregaDificuldade() {
    dificuldade = JSON.parse(localStorage.getItem("dificuldade"));
    if(dificuldade === null) {
        dificuldade = dificuldades.facil;
    }
}

function salvaDificuldade() {
    dificuldade = dificuldades[$("#dificuldades").val()];
    localStorage.setItem("dificuldade", JSON.stringify(dificuldade));
}

dificuldade = dificuldades.dev;