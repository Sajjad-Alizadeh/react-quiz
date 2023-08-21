import {useQuizContext} from "../context/QuizContext";

export default function NextButton() {
    const {nextQuestionHandler,finishHandler, answer, index, numQuestions} = useQuizContext()

    if (answer === null) {
        return null
    }

    if (index < numQuestions - 1)
        return (
            <button className="btn btn-ui"
                    onClick={() => nextQuestionHandler()}>
                Next
            </button>
        )

    if (index === numQuestions -1)
    return (
        <button className="btn btn-ui"
                onClick={() => finishHandler()}>
            Finish
        </button>
    )
}