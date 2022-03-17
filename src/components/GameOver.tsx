import React from "react";
import { useBoard } from "../context/BoardContext";

type Props = {};

const GameOver = (props: Props) => {
    const { gameOver, playAgain, correctWord, currAttempt } = useBoard();
    const handlePlay = () => {
        playAgain();
    };
    return (
        <div className={`overlay ${gameOver.gameOver ? "" : "hidden"}`}>
            <div className="gameOver">
                <h3 className="text-display">
                    {gameOver.guessedWord
                        ? "You Did It! Congrats!"
                        : "Oops! Better Luck Next Time"}
                </h3>
                <h3 className="correct-word">Correct: {correctWord}</h3>
                {gameOver.guessedWord && (
                    <h3 className="text-attempt">
                        You Guessed in {currAttempt.attempt} attempts
                    </h3>
                )}
                <button className="btn btn-dark" onClick={handlePlay}>
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default GameOver;
