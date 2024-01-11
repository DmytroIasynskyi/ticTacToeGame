import React, {useEffect, useState} from 'react';
import Board from "./Board";


const Game = () => {
    const initialSquares = Array(9).fill(null);
    const key = 'squares';


    const [squares, setSquares] = useState(() => {
        const valueInStorage = window.localStorage.getItem(key);
        if (typeof valueInStorage === 'string') return JSON.parse(valueInStorage);
        return initialSquares;
    });

    const nextValue = calculateNextValue(squares);
    const winner = calculateWinner(squares);
    const status = calculateStatus(winner, squares, nextValue);


    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(squares))
    }, [squares])


    return (
        <div className="game">
            <div className="game-board">
                <Board onClick={selectSquare} squares={squares} />
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                {/*<ol>{moves}</ol>*/}
            </div>
        </div>
    )

    function selectSquare(square) {
        if (winner || squares[square]) return;

        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue;
        setSquares(squaresCopy);
    }
    function restart() {
        setSquares(initialSquares)
    }
    function calculateStatus(winner, squares, nextValue) {
        return winner
            ? `Winner: ${winner}`
            : squares.every(Boolean)
                ? `Scratch: Cat's game`
                : `Next player: ${nextValue}`
    }

    function calculateNextValue(squares) {
        return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }
};

export default Game;