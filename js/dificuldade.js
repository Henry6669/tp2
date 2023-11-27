let dificuldades = {
    facil: {
        nivel: "facil",
        tempo: 500,
        dano: 20,
        perguntas: 4,
    },
    medio: {
        nivel: "medio",
        tempo: 300,
        dano: 25,
        perguntas: 4,
    },
    dificil: {
        nivel: "dificil",
        tempo: 100,
        dano: 25,
        perguntas: 4,
    },
    insano: {
        nivel: "insano",
        tempo: 100,
        dano: 50,
        perguntas: 4,
    },
    dev: {
        tempo: 70,
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