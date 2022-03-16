import React from "react";
import { useBoard } from "../context/BoardContext";

type Props = {};

const GameOver = (props: Props) => {
    const { gameOver, setGameOver, correctWord, currAttempt } = useBoard();
    return (
        <div className="gameOver">
            <h3>
                {gameOver.guessedWord
                    ? "You Did It! Congrats!"
                    : "Oops! Better Luck Next Time"}
            </h3>
            <h3>Correct: {correctWord}</h3>
            {gameOver.guessedWord && (
                <h3>You Guessed in {currAttempt.attempt} attempts</h3>
            )}
        </div>
    );
};

export default GameOver;
