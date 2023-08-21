import {useQuizContext} from "../context/QuizContext";

export default function StartScreen() {
    const {numQuestions, startQuiz} = useQuizContext()

    function startHandler() {
        startQuiz()
    }

    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={startHandler}>
                Let's start
            </button>
        </div>
    )
}