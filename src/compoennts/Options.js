export default function Options({questions, dispatch, answer}) {
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {
                questions.options.map((option, index) => (
                    <button
                        className={`btn btn-option
                                  ${answer === index ? "answer" : ""}
                                  ${hasAnswered ?
                            index === questions.correctOption ? "correct" : "wrong"
                            : ""}
                                 `}
                        key={option}
                        disabled={hasAnswered}
                        onClick={() => {
                            dispatch("newAnswer", index)
                        }}>
                        {option}
                    </button>
                ))
            }
        </div>
    )
}