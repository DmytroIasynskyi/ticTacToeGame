import React from 'react';
import Board from "./Board";
import useLocalStorageState from "./UseLocalStorageState";


const Game = () => {
    const initialSquare =  Array(9).fill(null);
    const [history, setHistory] = useLocalStorageState('game:history', [initialSquare])
    const [currentStep, setCurrentStep] = useLocalStorageState(
        'game:step',
        0,
    )

    const currentSquares = history[currentStep]
    const winner = calculateWinner(currentSquares)
    const nextValue = calculateNextValue(currentSquares)
    const status = calculateStatus(winner, currentSquares, nextValue)

    const moves = history.map((stepSquares, step) => {
        const desc = step ? `Go to move #${step}` : 'Go to game start'
        const isCurrentStep = step === currentStep
        return (
            <li key={step}>
                <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
                    {desc} {isCurrentStep ? '(current)' : null}
                </button>
            </li>
        )
    })


    return (
        <div className="game">
            <div className="game-board">
                <Board selectSquare={selectSquare} squares={currentSquares} />
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )


    function selectSquare(square) {
        if (winner || currentSquares[square]) {
            return
        }

        const newHistory = history.slice(0, currentStep + 1)
        const squares = [...currentSquares]

        squares[square] = nextValue
        setHistory([...newHistory, squares])
        setCurrentStep(newHistory.length)
    }
    function restart() {
        setHistory([initialSquare])
        setCurrentStep(0)
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