import { checkGameOver, getCell, getCoordinates } from "./getcheck.js";
import {
    highlightCells,
    highlightOccupiedCells,
    isCellHighlighted,
    removeHighlight,
} from "./highlight.js";
import {
    isJaguar,
    isPiece,
    isValidMove,
    jaguarEat,
    movePiece,
    selectPiece,
} from "./pieces.js";
import { cells, selectedPiece } from "./variables.js";
/*



*/
function onInitGame() {
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (isPiece(cell)) {
                selectPiece(cell);
                highlightCells();
                highlightOccupiedCells();
            } else if (selectedPiece) {
                const [selectedX, selectedY] = getCoordinates(selectedPiece);
                const [currentX, currentY] = getCoordinates(cell);

                var cellAtual = getCell(currentX, currentY);
                var cellProx = getCell(selectedX, selectedY);

                if (
                    isJaguar(selectedPiece) &&
                    !isValidMove(cellAtual, cellProx)
                ) {
                    jaguarEat(selectedPiece);
                    removeHighlight();
                }

                if (
                    isValidMove(cellAtual, cellProx) &&
                    !isPiece(cell) &&
                    isCellHighlighted(cell)
                ) {
                    movePiece(cell);
                    removeHighlight();
                }
            }
        });
    });
}

onInitGame();
/*

    Adicionado...

*/
let spanTempo = document.querySelector('#tempo');
let tempoTurno = 15;
let turno = 0;
let btnSair = document.querySelector('#btn-sair');

spanTempo.textContent = tempoTurno;

const timerStart = () => {
    setInterval(() => {
        if (tempoTurno == 0) {
            turno += 1;
            tempoTurno = 15;
            vezde(turno);
        }
        spanTempo.textContent = tempoTurno;
        tempoTurno -= 1;
    }, 1000);
}

function vezde(val) {
    let bol = val % 2;
    if (bol == 0) {
        console.log('onca');
    } else {
        console.log('cachorro');
    }
}

timerStart();
vezde(turno);

btnSair.addEventListener('click', () => {
    if (confirm('Você tem certeza que deseja sair?')) {
        location.href = '../../inicial.html';
    }
});

/*

    Todo:
        Arrumar funções abaixo

*/
window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    // Animação de desaparecimento
    loadingScreen.style.transition = "opacity 1s ease-in-out";

    // Após 5 segundos, comece a animação de desaparecimento
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
    }, 2000);

    // Após a animação de desaparecimento, remova a tela de carregamento e mostre o conteúdo principal
    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
    }, 3000); // Este tempo deve ser a soma do tempo de espera antes da animação iniciar e a duração da animação
});

setInterval(function () {
    checkGameOver();
}, 1000);

var audio = new Audio("music.mp3");
audio.volume = 0.3;

document.getElementById("play-button").addEventListener("click", function () {
    audio.play();
});

document.getElementById("mute-Button").addEventListener("click", function () {
    if (audio.muted) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
});

document.querySelectorAll(".piece-jaguar").forEach((element) => {
    element.addEventListener("click", () => {
        const gif = document.getElementById("myGif");
        gif.style.display = "block";

        setTimeout(() => {
            gif.style.display = "none";
        }, 2000);
    });
});
