$("#start").click(function () {
    $("#titulo").addClass("invisivel");
    $(this).addClass("invisivel");

    $("#config").removeClass("invisivel");
})


let falas = [];
let falaAtual = 0;
$.ajax({
    url: $("#falas").data("arquivo"),
    dataType: "json",
    success: function(response) {
        falas = response.falas;
        
    }
});

function proximaFala() {
    $("#fala").html(falas[falaAtual]);
    console.log(falas[falaAtual]);
    falaAtual++;
}

$("#next").click(function () {
    $("#historia").addClass("invisivel");
    $("#falas").removeClass("invisivel");
    proximaFala();
});

$("#proxima-fala").click(function () {
    if(falaAtual < falas.length - 1)
        proximaFala();
    else if($("#falas").data("arquivo") === "json/falasIntrodutorias.json")
        window.location.assign("quiz.html");
    else if($("#falas").data("arquivo") === "json/falasPorao.json") {
        comecarQuiz();
        $("#falas").addClass("invisivel");
    }
});
