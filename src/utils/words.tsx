import { IBoard } from "../types";

const createEmptyBoard = (x: number, y: number) => {
    const matrix: IBoard = [];
    for (let i = 1; i < y + 1; i++) matrix.push(new Array(x).fill(""));
    return matrix;
};

export const boardDefault: IBoard = createEmptyBoard(5, 6);

// export const boardDefault = [
//     ["", "", "", "", ""],
//     ["", "", "", "", ""],
//     ["", "", "", "", ""],
//     ["", "", "", "", ""],
//     ["", "", "", "", ""],
//     ["", "", "", "", ""],
// ];
