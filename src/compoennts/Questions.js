import Options from "./Options";
import {useQuizContext} from "../context/QuizContext";

export default function Questions() {
    const {questions, index} = useQuizContext()
    const question = questions.at(index)

    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question}/>
        </div>
    )
}