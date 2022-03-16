import React, { FC } from "react";
import { useBoard } from "../context/BoardContext";

type Props = {
    letterPos: number;
    attemptVal: number;
};

const Letter: FC<Props> = ({ letterPos, attemptVal }) => {
    const { board } = useBoard();
    const letter = board[attemptVal][letterPos];
    return <div className="letter">{letter}</div>;
};

export default Letter;
