import React, { FC, useEffect } from "react";
import { useBoard } from "../context/BoardContext";

type Props = {
    letterPos: number;
    attemptVal: number;
};

const Letter: FC<Props> = ({ letterPos, attemptVal }) => {
    const { board, correctWord, currAttempt, setDisabledLetters } = useBoard();
    const letter = board[attemptVal][letterPos];
    const correct: boolean = correctWord[letterPos] === letter;
    const almost: boolean =
        !correct && letter !== "" && correctWord.includes(letter);
    const letterState: string =
        currAttempt.attempt > attemptVal
            ? correct
                ? "correct"
                : almost
                ? "almost"
                : "error"
            : "";

    useEffect(() => {
        if (letter && !correct && !almost) {
            setDisabledLetters((prev) => [...new Set([...prev, letter])]);
        }
    }, [currAttempt.attempt]);
    return (
        <div className="letter" id={letterState}>
            {letter}
        </div>
    );
};

export default Letter;
