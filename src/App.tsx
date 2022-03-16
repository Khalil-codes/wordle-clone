import React from "react";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Keyboard from "./components/Keyboard";
import { useBoard } from "./context/BoardContext";

function App() {
    const { gameOver } = useBoard();
    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <div className="game">
                <Board />
                {gameOver.gameOver ? <GameOver /> : <Keyboard />}
            </div>
        </div>
    );
}

export default App;
