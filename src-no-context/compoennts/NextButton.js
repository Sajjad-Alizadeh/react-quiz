export default function NextButton({dispatch, answer, index, numQuestions}) {
    if (answer === null) {
        return null
    }

    if (index < numQuestions - 1)
        return (
            <button className="btn btn-ui"
                    onClick={() => dispatch("nextQuestion")}>
                Next
            </button>
        )

    if (index === numQuestions -1)
    return (
        <button className="btn btn-ui"
                onClick={() => dispatch("finish")}>
            Finish
        </button>
    )
}