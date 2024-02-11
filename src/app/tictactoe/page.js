'use client'
import React, { Component } from "react";
import Board from "./Board/page";
import Link from 'next/link';
import './style.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: "",
      playerO: "",
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      scoreX: 0,
      scoreO: 0,
      gameOver: false
    };
  }

  handlePlayerNameChange = (player, e) => {
    this.setState({ [player]: e.target.value });
  };

  handleClick(i) {
    if (this.state.gameOver) return;

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    const winner = calculateWinner(squares);
    if (winner) {
      this.setState(prevState => ({
        [winner === 'X' ? 'scoreX' : 'scoreO']: prevState[winner === 'X' ? 'scoreX' : 'scoreO'] + 1,
        gameOver: true
      }));
    }

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      gameOver: false
    });
  }

  handleRestart = () => {
    this.setState({
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      gameOver: false
    });
  };

  render() {
    const { playerX, playerO, scoreX, scoreO, gameOver } = this.state;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = winner === 'X' ? `${playerX} ha ganado` : `${playerO} ha ganado`;
    } else if (gameOver) {
      status = "Juego terminado. ¡Empate!";
    } else {
      status = `Le toca a: ${this.state.xIsNext ? playerX : playerO}`;
    }

    return (
      <div className="game">
        <div>
          <div>
            <p className="text-white">X</p>
            <input
              type="text"
              placeholder="Nombre de jugador"
              value={playerX}
              onChange={(e) => this.handlePlayerNameChange("playerX", e)}
              className="custom-input2"
            />
          </div>
          <div>
            <p className="text-white">O</p>
            <input
              type="text"
              placeholder="Nombre de jugador"
              value={playerO}
              onChange={(e) => this.handlePlayerNameChange("playerO", e)}
              className="custom-input"
            />
          </div>
          <div>{status}</div>
          <div>Puntajes:</div>
          <div>{`${playerX}: ${scoreX} - ${playerO}: ${scoreO}`}</div>
          {winner || gameOver ? (
            <button onClick={this.handleRestart}>Volver a Jugar</button>
          ) : null}
        </div>
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <h6>
          <Link href="/">
            <h5>Back to Home</h5>
          </Link>
        </h6>
      </div>
    );
  }
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
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(square => square !== null)) {
    return 'Empate';
  }

  return null;
}

export default Game;
