import React, { useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import BoardProvider from "./context/BoardContext";
import { generateWordSet } from "./utils/words";

function App() {
    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <BoardProvider>
                <div className="game">
                    <Board />
                    <Keyboard />
                </div>
            </BoardProvider>
        </div>
    );
}

export default App;
