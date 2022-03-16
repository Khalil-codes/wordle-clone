import React, { FC } from "react";
import { useBoard } from "../context/BoardContext";

type Props = {
    keyVal: string;
    keylg?: boolean;
};

const Key: FC<Props> = ({ keyVal, keylg }) => {
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
        <div className="key" id={keylg ? "big" : ""} onClick={selectLetter}>
            {keyVal}
        </div>
    );
};

export default Key;
