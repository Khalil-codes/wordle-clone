import React, { FC } from "react";
import { useBoard } from "../context/BoardContext";
import Letter from "./Letter";

type Props = {};

const Board: FC<Props> = (props) => {
    const { board } = useBoard();
    return (
        <div className="board">
            {board.map((row: string[], rowIdx: number) => {
                return (
                    <div className="row" key={rowIdx}>
                        {row.map((col: string, colIdx: number) => (
                            <Letter
                                key={colIdx}
                                letterPos={colIdx}
                                attemptVal={rowIdx}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
