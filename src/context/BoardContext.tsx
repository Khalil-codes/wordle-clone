import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { IBoard } from "../types";
import { boardDefault } from "../utils/words";

// Interface of CurrAttempt State
interface ICurrAttempt {
    attempt: number;
    letterPos: number;
}

// Interface of Context Hook
interface IContext {
    board: IBoard;
    currAttempt: ICurrAttempt;
    setBoard: Dispatch<SetStateAction<IBoard>>;
    setCurrAttempt: Dispatch<SetStateAction<ICurrAttempt>>;
    onSelectLetter: (keyVal: string) => void;
    onDeleteLetter: () => void;
    onEnter: () => void;
}

// Creating Context
const BoardContext = createContext<IContext>({} as IContext);

const BoardProvider: FC<ReactNode> = ({ children }) => {
    // States
    const [board, setBoard] = useState<IBoard>(boardDefault);
    const [currAttempt, setCurrAttempt] = useState<ICurrAttempt>({
        attempt: 0,
        letterPos: 0,
    });

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
        setCurrAttempt((prev) => ({
            attempt: prev.attempt + 1,
            letterPos: 0,
        }));
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
            }}>
            {children}
        </BoardContext.Provider>
    );
};

// Custom Context hook using useContext
export const useBoard = () => useContext(BoardContext);

export default BoardProvider;
