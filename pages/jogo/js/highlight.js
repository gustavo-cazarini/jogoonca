import { getCoordinates, getCell } from "./getcheck.js";
import { cells, positions, selectedPiece } from "./variables.js";
/*



*/
function highlightCells() {
    highlightOccupiedCells();
    removeHighlight();
    if (selectedPiece) { 
        const [selectedX, selectedY] = getCoordinates(selectedPiece);
        highlightAllPossibleDirections(selectedX, selectedY);
    }
}

function removeHighlight() {
    console.log("removeHighlight()");
    cells.forEach((cell) => {
        cell.classList.remove("highlight");
        cell.classList.remove("occupied-highlight");
        cell.classList.remove("occupied");
    });
}

function clearHighlights() {
    console.log("clearHighlights()");
    cells.forEach((cell) => cell.classList.remove("highlight"));
}

function highlightAllPossibleDirections(selectedX, selectedY) {
    const selectedCell = getCell(selectedX, selectedY);

    // transformando 'positions' num objeto para facilitar a pesquisa
    const positionsMap = positions.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    // convertendo coordenadas para string
    const currentPos = `${selectedX}.${selectedY}`;

    // pegando as células adjacentes da célula selecionada na estrutura de dados 'positions'
    const adjacentCells = positionsMap[currentPos];

    if (adjacentCells) {
        adjacentCells.forEach((pos) => {
            const [x, y] = pos.split(".").map(Number);
            const highlightCell = getCell(x, y);

            if (highlightCell) {
                if (
                    highlightCell.classList.contains("piece-dog") ||
                    highlightCell.classList.contains("piece-jaguar")
                ) {
                    // Adiciona a classe 'occupied' para destacar células ocupadas em vermelho
                    highlightCell.classList.add("occupied");
                } else {
                    highlightCell.classList.add("highlight");
                }
            }
        });
    }
}

function highlightOccupiedCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        if (
            cell.classList.contains("piece-dog") ||
            cell.classList.contains("piece-jaguar")
        ) {
            cell.classList.add("occupied-highlight");
        }
    });
}

function isCellHighlighted(cell) {
    return cell.classList.contains("highlight");
}

export {
    highlightCells,
    highlightAllPossibleDirections,
    highlightOccupiedCells,
    isCellHighlighted,
    clearHighlights,
    removeHighlight,
};
