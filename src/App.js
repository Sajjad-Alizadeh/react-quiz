import Header from "./compoennts/Header";
import Main from "./compoennts/Main";
import {useEffect, useReducer} from "react";
import Loader from "./compoennts/Loader";
import Error from "./compoennts/Error";
import StartScreen from "./compoennts/StartScreen";
import Questions from "./compoennts/Questions";
import NextButton from "./compoennts/NextButton";
import Progress from "./compoennts/Progress";
import FinishScreen from "./compoennts/FinishScreen";
import Footer from "./compoennts/Footer";
import Timer from "./compoennts/Timer";

const BASE_URL = "http://localhost:9000/questions"
const SECS_PRE_QUESTION = 30

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    points: 0,
    answer: null,
    highScore: 0,
    timeRemaining: null
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case "dataFailed":
            return {
                ...state,
                status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active",
                timeRemaining: state.questions.length * SECS_PRE_QUESTION
            }
        case "newAnswer":
            const question = state.questions.at(state.index)
            let newPoint = state.points
            if (action.payload === question.correctOption) {
                newPoint += question.points
            }
            /*else {
                newPoint -= question.points
            }*/

            return {
                ...state,
                answer: action.payload,
                points: newPoint
            }
        case "nextQuestion":
            return {...state, index: state.index + 1, answer: null}
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case "reset":
            return {...initialState, status: "ready", questions: state.questions}
        case "decreaseTimer" :
            return {
                ...state,
                timeRemaining: state.timeRemaining - 1,
                status: state.timeRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Unknown action")
    }
}

export default function App() {
    const [{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        timeRemaining
    }, dispatch] = useReducer(reducer, initialState, undefined)
    const numQuestions = questions.length

    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => doDispatch("dataReceived", data))
            .catch((error) => doDispatch("dataFailed"))
    }, [])

    function doDispatch(type, payload) {
        if (payload !== undefined) {
            dispatch({type, payload})
        } else {
            dispatch({type})
        }
    }

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={doDispatch}/>}
                {status === "active" &&
                    <>
                        <Progress index={index}
                                  numQuestions={numQuestions}
                                  maxPossiblePoints={maxPossiblePoints}
                                  answer={answer}
                                  points={points}/>

                        <Questions question={questions[index]}
                                   dispatch={doDispatch}
                                   answer={answer}/>

                        <Footer>
                            <NextButton dispatch={doDispatch}
                                        answer={answer}
                                        numQuestions={numQuestions}
                                        index={index}/>
                            <Timer time={timeRemaining} dispatch={doDispatch}/>
                        </Footer>


                    </>
                }
                {status === "finished" &&
                    <FinishScreen points={points}
                                  dispatch={doDispatch}
                                  maxPossiblePoints={maxPossiblePoints}
                                  highscore={highScore}/>
                }
            </Main>
        </div>
    );

}