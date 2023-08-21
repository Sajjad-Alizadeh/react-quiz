import {createContext, useContext, useEffect, useReducer} from "react";
import Error from "../compoennts/Error";

// Context
const QuizContext = createContext()

// Constant
const BASE_URL = "http://localhost:9000/questions"
const SECS_PRE_QUESTION = 30
const reducerActionTypes = {
    DATA_RECEIVED: "DATA_RECEIVED",
    DATA_FAILED: "DATA_FAILED",
    QUIZ_START: "QUIZ_START",
    NEW_ANSWER: "NEW_ANSWER",
    NEXT_QUESTION: "NEXT_QUESTION",
    FINISH: "FINISH",
    RESET: "RESET",
    DECREASE_TIMER: "DECREASE_TIMER"
}

//Reducer
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
        case reducerActionTypes.DATA_RECEIVED:
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case reducerActionTypes.DATA_FAILED:
            return {
                ...state,
                status: "error"
            }
        case reducerActionTypes.QUIZ_START:
            return {
                ...state,
                status: "active",
                timeRemaining: state.questions.length * SECS_PRE_QUESTION
            }
        case reducerActionTypes.NEW_ANSWER:
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
        case reducerActionTypes.NEXT_QUESTION:
            return {...state, index: state.index + 1, answer: null}
        case reducerActionTypes.FINISH:
            return {
                ...state,
                status: "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case reducerActionTypes.RESET:
            return {...initialState, status: "ready", questions: state.questions}
        case reducerActionTypes.DECREASE_TIMER :
            return {
                ...state,
                timeRemaining: state.timeRemaining - 1,
                status: state.timeRemaining === 0 ? "finished" : state.status
            }
        default:
            throw new Error("Unknown action")
    }
}

function QuizContextProvider({children}) {
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

    function dispatchUtil(type, payload) {
        if (payload !== undefined) {
            dispatch({type, payload})
        } else {
            dispatch({type})
        }
    }

    useEffect(() => {
        async function getQuizList() {

            try {
                const res = await fetch(BASE_URL)
                const data = await res.json()
                dispatchUtil(reducerActionTypes.DATA_RECEIVED, data)
            } catch (e) {
                dispatchUtil(reducerActionTypes.DATA_FAILED)
            }

        }
        getQuizList()
    }, [])

    function startQuiz() {
        dispatchUtil(reducerActionTypes.QUIZ_START)
    }

    function newAnswerHandler(index) {
        dispatchUtil(reducerActionTypes.NEW_ANSWER, index)
    }

    function nextQuestionHandler() {
        dispatchUtil(reducerActionTypes.NEXT_QUESTION)
    }

    function finishHandler() {
        dispatchUtil(reducerActionTypes.FINISH)
    }

    function decreaseTimeHandler() {
        dispatchUtil(reducerActionTypes.DECREASE_TIMER)
    }

    function resetHandler() {
        dispatchUtil(reducerActionTypes.RESET)
    }

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            timeRemaining,
            numQuestions,
            maxPossiblePoints,
            startQuiz,
            newAnswerHandler,
            nextQuestionHandler,
            finishHandler,
            decreaseTimeHandler,
            resetHandler
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuizContext() {
    const context = useContext(QuizContext)
    if (context === undefined) {
        throw new Error("Quiz context used outside of it's provider")
    }

    return context
}

export {QuizContextProvider, useQuizContext}