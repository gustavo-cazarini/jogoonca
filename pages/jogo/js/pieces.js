import { removeHighlight } from "./highlight.js";
import { getCoordinates, getCell, checkAllDirections } from "./getcheck.js";
import {
    jaguarSound,
    modifySelectedPiece,
    positions,
    selectedPiece,
    modifyPieacesEatenbyJaguar,
    pieacesEatenbyJaguar,
    cells,
} from "./variables.js";
/*



*/
function isPiece(cell) {
    return (
        cell.classList.contains("piece-dog") ||
        cell.classList.contains("piece-jaguar")
    );
}

function selectPiece(piece) {
    if (isJaguar(piece)) {
        //TO DO: Implementar som novamente, estava dando erro na Cloud e parando a execução
        //jaguarSound.play();
    }
    modifySelectedPiece(piece);
}

function isJaguar(cell) {
    return cell.classList.contains("piece-jaguar");
}

function isDog(cell) {
    return cell.classList.contains("piece-dog");
}

function isValidMove(cellAtual, cellProx) {
    const [selectedX, selectedY] = getCoordinates(cellAtual);
    const [currentX, currentY] = getCoordinates(cellProx);

    // transformando 'positions' num objeto para facilitar a pesquisa
    const positionsMap = positions.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    // convertendo coordenadas para string
    const currentPos = `${selectedX}.${selectedY}`;
    const nextPos = `${currentX}.${currentY}`;

    // verificando se 'nextPos' está nas posições adjacentes de 'currentPos'
    if (
        positionsMap[currentPos] &&
        positionsMap[currentPos].includes(nextPos)
    ) {
        return true;
    }

    return false;
}

function isValidJaguarMove(selectedX, selectedY, currentX, currentY) {
    return (
        Math.abs(currentX - selectedX) === 2 &&
        Math.abs(currentY - selectedY) === 2
    );
}

function removeDog(cell) {
    cell.classList.remove("piece-dog");
}

function movePiece(cell) {
    console.log("movePiece()");
    cell.classList.add(selectedPiece.classList[1]);
    selectedPiece.classList.remove(selectedPiece.classList[1]);
    modifySelectedPiece(null);

    let cellsArray = Array.from(cells);
    console.log(cellsArray);
    sendTabletop(cellsArray);
}

function onPieceEatenByJaguar() {
    // Atualiza o placar
    document.getElementById("score").innerText = pieacesEatenbyJaguar;
}

function jaguarEat(jaguarPiece,cellAtual) {
    let x = parseInt(jaguarPiece.getAttribute("data-x"));
    let y = parseInt(jaguarPiece.getAttribute("data-y"));
    let cellPosEliminationAfter;
    let cellsAround = checkAllDirections(x, y);

    let listCellPieceinJaguar = cellsAround.filter(
        (cell) => cell && cell.classList.contains("piece-dog")
    );

    for (let i = 0; i < listCellPieceinJaguar.length; i++) {
        let piece = listCellPieceinJaguar[i];
        let pieceX = parseInt(piece.getAttribute("data-x"));
        let pieceY = parseInt(piece.getAttribute("data-y"));

        if (pieceY === y && pieceX < x) {
            cellPosEliminationAfter = getCell(pieceX - 1, pieceY);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceY === y && pieceX > x) {
            cellPosEliminationAfter = getCell(pieceX + 1, pieceY);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceX === x && pieceY < y) {
            cellPosEliminationAfter = getCell(pieceX, pieceY - 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceX === x && pieceY > y) {
            cellPosEliminationAfter = getCell(pieceX, pieceY + 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        }
        // Direções diagonais
        else if (pieceX > x && pieceY > y) {
            // Diagonal inferior direita
            cellPosEliminationAfter = getCell(pieceX + 1, pieceY + 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceX < x && pieceY < y) {
            // Diagonal superior esquerda
            cellPosEliminationAfter = getCell(pieceX - 1, pieceY - 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceX > x && pieceY < y) {
            // Diagonal superior direita
            cellPosEliminationAfter = getCell(pieceX + 1, pieceY - 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        } else if (pieceX < x && pieceY > y) {
            // Diagonal inferior esquerda
            cellPosEliminationAfter = getCell(pieceX - 1, pieceY + 1);
            if (
                cellPosEliminationAfter &&
                !cellPosEliminationAfter.classList.contains("piece-dog") && cellPosEliminationAfter === cellAtual
            ) {
                piece.classList.remove("piece-dog");
                movePiece(cellPosEliminationAfter);
                modifyPieacesEatenbyJaguar(pieacesEatenbyJaguar + 1);
                //pieacesEatenbyJaguar = pieacesEatenbyJaguar + 1;
                onPieceEatenByJaguar();
                removeHighlight();
            }
        }
    }
    let cellsArray = Array.from(cells);
    console.log(cellsArray);

    sendTabletop(cellsArray);
}

async function sendTabletop(aux) {
    // Mapeia o NodeList para um array de objetos
    let cellArray = aux.map((cell, index) => {
        return {
            classList: Array.from(cell.classList),
            x: cell.getAttribute("data-x"),
            y: cell.getAttribute("data-y")
        };
    });

    // Transforma o array em uma string JSON
    let serialized = JSON.stringify(cellArray);
    console.log(serialized);
    
    const response = await fetch('https://adugo-game-backend-01.onrender.com/api/send-move', {
        method: 'POST',
        headers: {
            'Allow-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cellArray),
      });
    
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Move sent successfully");
      }
    
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Move sent successfully");
      }
    
}

export {
    isDog,
    isJaguar,
    isPiece,
    isValidJaguarMove,
    isValidMove,
    movePiece,
    removeDog,
    selectPiece,
    onPieceEatenByJaguar,
    jaguarEat,
};
