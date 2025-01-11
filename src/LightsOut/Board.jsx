import React, { useEffect, useState } from "react";
import Cell from "./Cell";

function createBoard() {
  const tempBoard = [];
  for (let x = 0; x < 4; x++) {
    let row = [];
    for (let y = 0; y < 4; y++) {
      row.push(Math.random() < 0.25);
    }
    tempBoard.push(row);
  }
  console.log(tempBoard);

  return tempBoard;
}

function Board() {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(0);
  let tempBoard = [];

  useEffect(() => {
    setLoading(true);
    setBoard(createBoard());
    setLoading(false);
  }, []);

  /*   const handleClick = (rowIndex, cellIndex) => {
    flipCell(rowIndex, cellIndex);
    flipCell(rowIndex - 1, cellIndex);
    flipCell(rowIndex + 1, cellIndex);
    flipCell(rowIndex, cellIndex - 1);
    flipCell(rowIndex, cellIndex + 1);
    setBoard(tempBoard);

    console.log(board);
  }; */

  const handleClick = (rowIndex, cellIndex) => {
    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (
          (rIdx === rowIndex && cIdx === cellIndex) ||
          (rIdx === rowIndex - 1 && cIdx === cellIndex) ||
          (rIdx === rowIndex + 1 && cIdx === cellIndex) ||
          (rIdx === rowIndex && cIdx === cellIndex - 1) ||
          (rIdx === rowIndex && cIdx === cellIndex + 1)
        ) {
          return !cell;
        }
        return cell;
      })
    );

    setBoard(newBoard);
  };

  const flipCell = (rowIndex, cellIndex) => {
    tempBoard = board;

    if (rowIndex < 0 || rowIndex >= 4 || cellIndex < 0 || cellIndex >= 4)
      return;

    tempBoard[rowIndex][cellIndex] = !tempBoard[rowIndex][cellIndex];
  };

  if (loading) return <div>Loading...</div>;

  return (
    <table className="Board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={rowIndex + "," + cellIndex}
                className={cell ? "Cell-lit" : "Cell"}
                flipFunc={() => {
                  handleClick(rowIndex, cellIndex);
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
