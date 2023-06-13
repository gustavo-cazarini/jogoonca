import { cells, pieacesEatenbyJaguar } from "./variables.js";
let checkGameOverIntervalId = null;

function getCoordinates(cell) {
    const x = parseInt(cell.getAttribute("data-x"));
    const y = parseInt(cell.getAttribute("data-y"));

    return [x, y];
}

function getCell(x, y) {
    return Array.from(cells).find(
        (cell) =>
            parseInt(cell.getAttribute("data-x")) === x &&
            parseInt(cell.getAttribute("data-y")) === y
    );
}

function checkGameOver() {
    console.log("checkGameOver");
    const sessionId = localStorage.getItem("session_id");
    const jogador1 = localStorage.getItem("partida-jogador1");
    const jogador2 = localStorage.getItem("partida-jogador2");
    const jogadorAtual = localStorage.getItem("idJogador");

    const jaguarCell = Array.from(cells).find((cell) =>
        cell.classList.contains("piece-jaguar")
    );
    const [currentX, currentY] = getCoordinates(jaguarCell);

    var surroundingCells = checkAllDirections(currentX, currentY);
    var bool = surroundingCells.every(
        (cell) => cell && cell.classList.contains("piece-dog")
    );

    if (bool || pieacesEatenbyJaguar === 5) {
        console.log("Game Over");
        clearInterval(window.checkGameOverIntervalId);
        
        // implementa a requisição para o backend quando os cães ou a onça ganharem
        fetch("https://adugo-game-backend-prd.onrender.com/api/end_game", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                session_id: sessionId,
                jogador1: jogador1,
                jogador2: jogador2,
                vitoria: jogadorAtual // ou a variável que contém o nome do vencedor
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("TESTE AQUI");
                console.log(data);
                // tratar a resposta do servidor aqui
            });
    }
}

function checkAllDirections(x, y) {
    const surroundingCells = [
        getCell(x - 1, y - 1),
        getCell(x, y - 1),
        getCell(x + 1, y - 1),
        getCell(x - 1, y),
        getCell(x + 1, y),
        getCell(x - 1, y + 1),
        getCell(x, y + 1),
        getCell(x + 1, y + 1),
    ];

    return surroundingCells;
}

export { checkAllDirections, checkGameOver, getCell, getCoordinates };
