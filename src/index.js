import ReactDOM from 'react-dom/client'
import App from './App'
import React from "react";
import "./index.css"
import {QuizContextProvider} from "./context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QuizContextProvider>
            <App/>
        </QuizContextProvider>
    </React.StrictMode>
);