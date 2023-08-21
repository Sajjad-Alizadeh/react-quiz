import {useQuizContext} from "../context/QuizContext";

export default function Options({question}) {
    const {answer, newAnswerHandler} = useQuizContext()

    const hasAnswered = answer !== null

    return (
        <div className="options">
            {
                question.options.map((option, index) => (
                    <button
                        className={`btn btn-option
                                  ${answer === index ? "answer" : ""}
                                  ${hasAnswered ?
                            index === question.correctOption ? "correct" : "wrong"
                            : ""}
                                 `}
                        key={option}
                        disabled={hasAnswered}
                        onClick={() => newAnswerHandler(index)}>
                        {option}
                    </button>
                ))
            }
        </div>
    )
}