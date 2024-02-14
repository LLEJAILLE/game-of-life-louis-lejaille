import React, { useState, useEffect } from 'react';
import './basic.css';

export default function Basic() {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [speed, setSpeed] = useState(1);

    const [sizeCase, setSizeCase] = useState(8);

    const [inputSizeCase, setInputSizeCase] = useState('');
    const [inputCustomForm, setInputCustomForm] = useState('');

    const [inputSizeX, setInputSizeX] = useState('');
    const [inputSizeY, setInputSizeY] = useState('');

    const [board, setBoard] = useState([]);

    const [sizeX, setSizeX] = useState(230);
    const [sizeY, setSizeY] = useState(100);

    useEffect(() => {
        createBoard();
        // randomizeBoard();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (board.length === 0) return;
            rulesGameOfLife();
        }, speed);

        return () => clearInterval(interval);
    }, [board]);

    const rulesGameOfLife = () => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            for (let i = 0; i < sizeY; i++) {
                for (let j = 0; j < sizeX; j++) {
                    let neighbors = 0;
                    // Parcourir les cellules voisines
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            if (di === 0 && dj === 0) continue; // Ignore la cellule elle-même
                            // Coordonnées du voisin en tenant compte du bouclage
                            const ni = (i + di + sizeY) % sizeY;
                            const nj = (j + dj + sizeX) % sizeX;
                            neighbors += prevBoard[ni][nj];
                        }
                    }
                    // Appliquer les règles du jeu de la vie
                    if (prevBoard[i][j] === 1) {
                        if (neighbors < 2 || neighbors > 3) newBoard[i][j] = 0;
                    } else {
                        if (neighbors === 3) newBoard[i][j] = 1;
                    }
                }
            }
            return newBoard;
        });
    };

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
                row.push(Math.floor(Math.random() * 2));
            }
            board.push(row);
        }
        setBoard(board);
    }

    const getFormAndAddToBoard = () => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            const inputForm = inputCustomForm.split('\n');
            const formHeight = inputForm.length;
            const formWidth = inputForm[0].length;
            const startX = Math.floor((sizeX - formWidth) / 2);
            const startY = Math.floor((sizeY - formHeight) / 2);
            for (let i = 0; i < formHeight; i++) {
                for (let j = 0; j < formWidth; j++) {
                    if (inputForm[i][j] === '1') {
                        newBoard[startY + i][startX + j] = 1;
                    } else {
                        newBoard[startY + i][startX + j] = 0;
                    }
                }
            }
            return newBoard;
        });
    }

    return (
        <div className="content">

            <h1>Basic Game of Life</h1>

            <button
                onClick={() => randomizeBoard()}
                className="button"
            >
                Generate random
            </button>

            <button
                onClick={() => {
                    setBoard(prevBoard => {
                        const newBoard = prevBoard.map(row => [...row]);
                        for (let i = 0; i < sizeY; i++) {
                            for (let j = 0; j < sizeX; j++) {
                                newBoard[i][j] = 0;
                            }
                        }
                        return newBoard;
                    });
                }}
            >
                Clear
            </button>

            <div className="option">
                <div className='custom-form'>
                    <h3>
                        Add custom form
                    </h3>
                    <textarea type="text" value={inputCustomForm} onChange={(e) => setInputCustomForm(e.target.value)} placeholder='add a form using this format: 111\n111\n010' />
                    <button
                        onClick={() => getFormAndAddToBoard()}
                    >
                        Add to board
                    </button>
                </div>

                <div className='speed'>
                    <h3>
                        Speed
                    </h3>
                    <input type="range" min="1" max="1000" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                </div>
            </div>

            <div className="board">
                {board.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="board-row"
                        style={{
                            margin: '-13px 0'
                        }}
                    >
                        {row.map((cell, cellIndex) => (
                            <span
                                key={cellIndex}
                                className={cell === 0 ? "board-cell black" : "board-cell yellow"}
                                style={{
                                    display: 'inline-block',
                                    width: sizeCase,
                                    height: sizeCase,
                                }}
                            >
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}