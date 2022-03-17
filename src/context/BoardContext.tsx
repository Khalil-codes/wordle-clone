import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { Set } from "typescript";
import { IBoard } from "../types";
import { createEmptyBoard, generateWordSet } from "../utils/words";

// Interface of CurrAttempt State
interface ICurrAttempt {
    attempt: number;
    letterPos: number;
}

// Interface of Game Over State
interface IGameOver {
    gameOver: boolean;
    guessedWord: boolean;
}

// Interface of Context Hook
interface IContext {
    board: IBoard;
    currAttempt: ICurrAttempt;
    disabledLetters: string[];
    gameOver: IGameOver;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setCurrAttempt: Dispatch<SetStateAction<ICurrAttempt>>;
    setDisabledLetters: Dispatch<SetStateAction<string[]>>;
    // setGameOver: Dispatch<SetStateAction<IGameOver>>;
    correctWord: string;
    onSelectLetter: (keyVal: string) => void;
    onDeleteLetter: () => void;
    onEnter: () => void;
    playAgain: () => void;
}

// Creating Context
const BoardContext = createContext<IContext>({} as IContext);

const BoardProvider: FC<ReactNode> = ({ children }) => {
    // States
    const [board, setBoard] = useState<IBoard>(createEmptyBoard(5, 6));
    const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
    const [correctWord, setCorrectWord] = useState<string>("");
    const [gameOver, setGameOver] = useState<IGameOver>({
        gameOver: false,
        guessedWord: false,
    });
    const [currAttempt, setCurrAttempt] = useState<ICurrAttempt>({
        attempt: 0,
        letterPos: 0,
    });
    const [wordSet, setWordSet] = useState<Set<string>>(
        new Set() as Set<string>
    );

    const getWordSet = async () => {
        const words = await generateWordSet();
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord.toUpperCase());
    };
    // Gettin Word Set
    useEffect(() => {
        getWordSet();
    }, []);

    // When User selects a letter
    const onSelectLetter = (keyVal: string) => {
        if (currAttempt.letterPos > 4) return;
        const newBoard: IBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt((prev) => ({
            ...prev,
            letterPos: prev.letterPos + 1,
        }));
    };

    // When User deletes a Letter
    const onDeleteLetter = () => {
        if (currAttempt.letterPos === 0) return;
        const newBoard: IBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
        setBoard(newBoard);
        setCurrAttempt((prev) => ({
            ...prev,
            letterPos: prev.letterPos - 1,
        }));
    };

    // When User Presses Enter
    const onEnter = () => {
        if (currAttempt.letterPos !== 5) return;
        const currWord: string = board[currAttempt.attempt].reduce(
            (acc: string, letter: string) => acc + letter,
            ""
        );
        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt((prev) => ({
                attempt: prev.attempt + 1,
                letterPos: 0,
            }));
            if (currWord === correctWord) {
                setGameOver((prev) => ({ gameOver: true, guessedWord: true }));
                return;
            }
            if (currAttempt.attempt === 5) {
                setGameOver((prev) => ({ gameOver: true, guessedWord: false }));
                return;
            }
        } else {
            alert("Word Not in Word Bank");
        }
    };
    const playAgain = async () => {
        await getWordSet();
        setBoard(createEmptyBoard(5, 6));
        setCurrAttempt({ letterPos: 0, attempt: 0 });
        setDisabledLetters([]);
        setGameOver({ gameOver: false, guessedWord: false });
    };
    // Returning Provider
    return (
        <BoardContext.Provider
            value={{
                board,
                setBoard,
                currAttempt,
                setCurrAttempt,
                onSelectLetter,
                onDeleteLetter,
                onEnter,
                correctWord,
                disabledLetters,
                setDisabledLetters,
                gameOver,
                playAgain,
            }}>
            {children}
        </BoardContext.Provider>
    );
};

// Custom Context hook using useContext
export const useBoard = () => useContext(BoardContext);

export default BoardProvider;
