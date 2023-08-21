import {useEffect} from "react";
import {useQuizContext} from "../context/QuizContext";

export default function Timer() {
    const {timeRemaining, decreaseTimeHandler} = useQuizContext()
    console.log(timeRemaining)

    useEffect(() => {
        function intervalHandler() {
            decreaseTimeHandler()
        }

        const intervalId = setInterval(intervalHandler, 1000)

        return function () {
            clearInterval(intervalId)
        }

    }, [decreaseTimeHandler])

    const minute = Math.floor(timeRemaining / 60)
    const second = timeRemaining % 60
    return (
        <div className="timer">
            {minute < 10 && "0"} {minute} : {second < 10 && "0"} {second}
        </div>
    );
}