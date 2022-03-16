import React, { FC } from "react";
import { useBoard } from "../context/BoardContext";

type Props = {
    keyVal: string;
    keylg?: boolean;
    disbaled?: boolean;
};

const Key: FC<Props> = ({ keyVal, keylg, disbaled }) => {
    const { onSelectLetter, onDeleteLetter, onEnter } = useBoard();
    const selectLetter = () => {
        if (keyVal === "Enter") {
            onEnter();
        } else if (keyVal === "Del") {
            onDeleteLetter();
        } else {
            onSelectLetter(keyVal);
        }
    };
    return (
        <div
            className="key"
            id={keylg ? "big" : disbaled ? "disabled" : ""}
            onClick={!disbaled ? selectLetter : undefined}>
            {keyVal}
        </div>
    );
};

export default Key;
