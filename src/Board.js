import React from 'react';

const Board = ({ squares, selectSquare}) => {
    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )

    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }
};

export default Board;