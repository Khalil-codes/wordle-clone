import React from "react";
import { useBoard } from "../context/BoardContext";

type Props = {};

const GameOver = (props: Props) => {
    const { gameOver, setGameOver, correctWord, currAttempt } = useBoard();
    return (
        <div className="overlay">
            <div className="gameOver">
                <div className="close">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24">
                        <path
                            fill="#fff"
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </div>
                <h3>
                    {gameOver.guessedWord
                        ? "You Did It! Congrats!"
                        : "Oops! Better Luck Next Time"}
                </h3>
                <h3>Correct: {correctWord}</h3>
                {gameOver.guessedWord && (
                    <h3>You Guessed in {currAttempt.attempt} attempts</h3>
                )}
                <button className="btn btn-dark">Play Again</button>
            </div>
        </div>
    );
};

export default GameOver;
