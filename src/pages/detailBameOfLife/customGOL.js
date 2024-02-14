import React, { useState, useEffect } from 'react';
import './customGOL.css';

export default function CustomGOF() {
    const [board, setBoard] = useState([]);
    const sizeX = 200;
    const sizeY = 100;

    useEffect(() => {
        createBoard();
        randomizeBoard();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (board.length === 0) return;
            rulesGameOfLife();
            console.log(board);
        }, 1);

        return () => clearInterval(interval);
    }, [board]);

    const rulesGameOfLife = () => {
        setBoard(prevBoard => {
            const newBoard = [];
            for (let i = 0; i < sizeY; i++) {
                const newRow = [];
                for (let j = 0; j < sizeX; j++) {
                    // Appliquer le filtre de convolution
                    const filteredValue = applyConvolutionFilter(prevBoard, j, i);
                    newRow.push(filteredValue);
                }
                newBoard.push(newRow);
            }
            return newBoard;
        });
    };

    const applyConvolutionFilter = (board, x, y) => {
        const kernel = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ]; // Noyau de convolution LENIA
        
        let sum = 0;
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            for (let xOffset = -1; xOffset <= 1; xOffset++) {
                const neighborX = (x + xOffset + sizeX) % sizeX;
                const neighborY = (y + yOffset + sizeY) % sizeY;
                sum += board[neighborY][neighborX] * kernel[yOffset + 1][xOffset + 1];
            }
        }
        
        // Appliquer la fonction pour déterminer la nouvelle valeur
        return determinateNewValue(sum);
    };
    

    const determinateNewValue = (value) => {
        
    }
    
    

    const createBoard = () => {
        let board = [];
        for (let i = 0; i < sizeY; i++) {
            let row = [];
            for (let j = 0; j < sizeX; j++) {
                row.push(0);
            }
            board.push(row);
        }
        setBoard(board);
    }

    const randomizeBoard = () => {
        let board = [];
        for (let i = 0; i < sizeY; i++) {
            let row = [];
            for (let j = 0; j < sizeX; j++) {
                row.push(parseFloat((Math.random() * 1).toFixed(1)));
            }
            board.push(row);
        }
        setBoard(board);
    }

    const decimalToColor = (decimal) => {
        if (decimal < 0) {
            decimal = 0;
        }
        if (decimal > 1) {
            decimal = 1;
        }

        const hue = 240 - (decimal * 240); // 240 pour le bleu, 0 pour le rouge

        return `hsl(${hue}, 100%, 50%)`;
    }

    return (
        <div className="content">

            <h1>Basic Game of Life</h1>

            <button
                onClick={() => randomizeBoard()}
                className="button"
            >
                Regenerate
            </button>

            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-row-custom">
                        {row.map((cell, cellIndex) => (
                            <span
                                key={cellIndex}
                            style={{ 
                                backgroundColor: decimalToColor(cell),
                                display: "inline-block",
                                width: 8,
                                height: 8
                            }}
                            >
                                {/* {cell} */}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}