import { cells, pieacesEatenbyJaguar } from "./variables.js";

function getCoordinates(cell) {
    const x = parseInt(cell.getAttribute("data-x"));
    const y = parseInt(cell.getAttribute("data-y"));

    return [x, y];
}

function getCell(x, y) {
    console.log("getCell()");
    return Array.from(cells).find(
        (cell) =>
            parseInt(cell.getAttribute("data-x")) === x &&
            parseInt(cell.getAttribute("data-y")) === y
    );
}

function checkGameOver() {
    const jaguarCell = Array.from(cells).find((cell) =>
        cell.classList.contains("piece-jaguar")
    );
    const [currentX, currentY] = getCoordinates(jaguarCell);

    var surroundingCells = checkAllDirections(currentX, currentY);
    var bool = surroundingCells.every(
        (cell) => cell && cell.classList.contains("piece-dog")
    );

    if (bool || pieacesEatenbyJaguar === 5) {
        setInterval(() => {
            alert("Fim de jogo!");
        }, 50);
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
