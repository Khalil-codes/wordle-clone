import React, { FC, KeyboardEvent, useCallback, useEffect } from "react";
import { useBoard } from "../context/BoardContext";
import Key from "./Key";

type Props = {};

const Keyboard: FC<Props> = (props) => {
    const { currAttempt, onSelectLetter, onDeleteLetter, onEnter } = useBoard();

    const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

    // Handling Keyboard events
    const handleKeyboard = useCallback(
        function (this: Document, event: KeyboardEvent): any {
            if (event.key === "Enter") {
                onEnter();
            } else if (event.key === "Backspace") {
                onDeleteLetter();
            } else {
                keys1.forEach((key) => {
                    if (event.key.toLowerCase() === key.toLowerCase())
                        onSelectLetter(key);
                });
                keys2.forEach((key) => {
                    if (event.key.toLowerCase() === key.toLowerCase())
                        onSelectLetter(key);
                });
                keys3.forEach((key) => {
                    if (event.key.toLowerCase() === key.toLowerCase())
                        onSelectLetter(key);
                });
            }
        },
        [currAttempt]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard as any);
        return () => {
            document.removeEventListener("keydown", handleKeyboard as any);
        };
    }, [handleKeyboard]);
    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <div className="line1">
                {keys1.map((key: string) => (
                    <Key key={key} keyVal={key} />
                ))}
            </div>
            <div className="line2">
                {keys2.map((key: string) => (
                    <Key key={key} keyVal={key} />
                ))}
            </div>
            <div className="line3">
                <Key keyVal="Enter" keylg />
                {keys3.map((key: string) => (
                    <Key key={key} keyVal={key} />
                ))}
                <Key keyVal="Del" keylg />
            </div>
        </div>
    );
};

export default Keyboard;
