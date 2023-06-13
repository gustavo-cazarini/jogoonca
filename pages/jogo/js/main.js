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

            // Pega a peça do jogador do localStorage
            const playerPiece = localStorage.getItem('peca');

            if (!cell.classList.contains(`piece-${playerPiece}`)) {
                alert('Você não pode mover esta peça!');
                return; // Para a execução do código aqui se a peça não for do jogador
            }

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
                    jaguarEat(selectedPiece,cellAtual);
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

//TO DO: Botao ainda ausente na tela

// document.getElementById("play-button").addEventListener("click", function () {
//     audio.play();
// });

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

// Função para verificar novo movimento
function checkForNewMove() {
    let sessionId = localStorage.getItem("session_id");
    console.log('Verificando novo movimento...');
    fetch('https://adugo-game-backend-prd.onrender.com/api/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
            session_id: sessionId // Aqui vai o ID da sessão
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'move available') {
            console.log('Novo movimento disponível:', data.move);
            // Atualizar o tabuleiro aqui com o novo movimento recebido
            updateBoard(data.move);
        } else {
            console.log('Nenhum novo movimento disponível');
            //print o status do erro
            
        }
    })
    .catch(error => {
        console.error('Ocorreu um erro ao verificar o novo movimento:', error);
        //print o status do erro
    });
}

function updateBoard(newMove) {
    Array.from(cells).forEach((cell) => {
      const cellX = parseInt(cell.getAttribute("data-x"));
      const cellY = parseInt(cell.getAttribute("data-y"));
  
      const move = newMove.find((move) => {
        const x = parseInt(move.x);
        const y = parseInt(move.y);
        return x === cellX && y === cellY;
      });
  
      if (move) {
        const classNames = move.classList.join(" ");
        cell.className = "cell " + classNames;
      }
    });

    highlightCells();
}
    
// Chamar a função checkForNewMove a cada 2 segundos
setInterval(checkForNewMove, 2000); // 2 segundos
