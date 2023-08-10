import {useEffect} from "react";

export default function Timer({time, dispatch}) {
    useEffect(() => {
        function intervalHandler() {
            dispatch("decreaseTimer")
        }

        const intervalId = setInterval(intervalHandler, 1000)

        return function () {
            clearInterval(intervalId)
        }

    }, [dispatch])
    const minute = Math.floor(time / 60)
    const second = time % 60
    return (
        <div className="timer">
            {minute < 10 && "0"} {minute} : {second < 10 && "0"} {second}
        </div>
    );
}