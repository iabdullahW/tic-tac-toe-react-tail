import  { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; 
      }
    }
  
    if (squares.every((square) => square !== null)) {
      return "Draw";
    }

    return null;
  };
  

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[i]) return;

    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i) => (
    <button
      className="h-24 w-24 m-1 bg-gray-800 text-5xl font-bold text-white"
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`;
  } else {
    status = (
      <div className="mb-5 text-xl font-bold text-white hover:text-teal-500 animate-bounce  ">
        Next player:{" "}
        <span className={xIsNext ? "text-red-500" : "text-green-500"}>
          {xIsNext ? "X" : "O"}
        </span>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-900 w-screen h-screen text-white ">
      <div className="flex gap-x-2 mt-18">
        <h1 className="text-4xl mb-4 hover:text-teal-400 ">Tic Tac Toe </h1>
        <span className="text-4xl font-bold mb-4 text-teal-400">Game</span>
      </div>
      {status}
      <div className="grid grid-cols-3 gap-1 ">
        {board.map((square, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
      <button
        className="mt-8 py-2 px-4 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:text-teal-400 hover:bg-gray-700 transition duration-300"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};


export default TicTacToe;
