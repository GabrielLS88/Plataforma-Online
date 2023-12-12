let apostaBtn = document.querySelector("#btn-Apostar");
let result = document.querySelector("#result");
let numerosResultados = document.querySelector(".resultados");

let dinheiroUser = document.querySelector("#quantidadeDinheiro");
let dinheiroUserTratada = parseFloat(dinheiroUser.textContent);
let totalDinheiroUser = dinheiroUserTratada;

let contador = 0;
let maxElementosNormal = 7; // Limite de elementos para resolução normal
let maxElementosMobile = 3; // Limite de elementos para dispositivos móveis

apostaBtn.addEventListener("click", function() {
    let numero = gerarNumeroAleatorioZeroUmDois();

    contarAteNumeroEspecifico(numero);

    let valorAposta = parseFloat(document.querySelector("#inputValor").value);

    if (isNaN(valorAposta) || valorAposta <= 0) {
        valorAposta = 0; // Tratamento para apostas inválidas ou zero
    }

    let resultLucroVitoria = document.querySelector("#valorFinal");

    if (valorAposta > 0) {
        resultLucroVitoria.textContent = (valorAposta * 2).toFixed(2);
    } else {
        resultLucroVitoria.textContent = "0.00";
    }

    if (parseFloat(numero) > 2) {
        totalDinheiroUser += valorAposta;
    } else if (parseFloat(numero) < 2) {
        totalDinheiroUser -= valorAposta;
    }

    dinheiroUser.textContent = totalDinheiroUser.toFixed(2);

    let novoNumeroResultado = document.createElement("div");
    novoNumeroResultado.classList.add("numbersResult");
    novoNumeroResultado.textContent = numero + "X";

    if (window.innerWidth <= 768 && contador >= maxElementosMobile) {
        while (numerosResultados.childNodes.length >= maxElementosMobile) {
            numerosResultados.removeChild(numerosResultados.firstChild);
        }
    } else if (window.innerWidth > 768 && contador >= maxElementosNormal) {
        while (numerosResultados.childNodes.length >= maxElementosNormal) {
            numerosResultados.removeChild(numerosResultados.firstChild);
        }
    } else {
        contador++;
    }

    if (parseFloat(numero) < 2) {
        novoNumeroResultado.classList.add("redBackground");
    }

    if (parseFloat(numero) < 2 && window.innerWidth <= 768) {
        result.style.color = "red";
    } else if (parseFloat(numero) > 2) {
        result.style.color = "#00e701";
    }

    numerosResultados.appendChild(novoNumeroResultado);
});

function gerarNumeroAleatorioZeroUmDois() {
    return (Math.random() * (4 - 0.99) + 0.99).toFixed(2);
}

function contarAteNumeroEspecifico(numero) {
    for (let i = 1; i <= numero; i += 0.01) {
        result.textContent = i.toFixed(2);
    }
}
