import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BoardProvider from "./context/BoardContext";

ReactDOM.render(
    <React.StrictMode>
        <BoardProvider>
            <App />
        </BoardProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
