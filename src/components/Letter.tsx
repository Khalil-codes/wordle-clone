import React, { FC } from "react";
import { useBoard } from "../context/BoardContext";

type Props = {
    letterPos: number;
    attemptVal: number;
};

const Letter: FC<Props> = ({ letterPos, attemptVal }) => {
    const { board, correctWord, currAttempt } = useBoard();
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
    return (
        <div className="letter" id={letterState}>
            {letter}
        </div>
    );
};

export default Letter;
