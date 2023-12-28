'use client'

import React from "react";
import Square from "../Square/page";
import "../Board/style.css";


class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }
  
  

  render() {
    const boardRows = Array.from({ length: 3 }, (_, rowIndex) => (
      <div key={rowIndex} className="game-board">
        {Array.from({ length: 3 }, (_, colIndex) =>
          this.renderSquare(rowIndex * 3 + colIndex)
        )}
      </div>
    ));
  
    return <div className="mx-auto">{boardRows}</div>;
  }
  
}

export default Board;
