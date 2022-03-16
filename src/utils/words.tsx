import { IBoard } from "../types";
// @ts-ignore
import wordBank from "../wordle-bank.txt";
const createEmptyBoard = (x: number, y: number) => {
    const matrix: IBoard = [];
    for (let i = 1; i < y + 1; i++) matrix.push(new Array(x).fill(""));
    return matrix;
};

export const boardDefault: IBoard = createEmptyBoard(5, 6);

export const generateWordSet = async () => {
    const response = await fetch(wordBank);
    const result = await response.text();
    const wordArr = result.split("\n");
    const wordSet: Set<string> = new Set(wordArr);
    const todaysWord: string =
        wordArr[Math.floor(Math.random() * wordArr.length)];
    return { wordSet, todaysWord };
};
