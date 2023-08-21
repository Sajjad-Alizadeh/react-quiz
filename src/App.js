import Header from "./compoennts/Header";
import Main from "./compoennts/Main";
import Loader from "./compoennts/Loader";
import Error from "./compoennts/Error";
import StartScreen from "./compoennts/StartScreen";
import Questions from "./compoennts/Questions";
import NextButton from "./compoennts/NextButton";
import Progress from "./compoennts/Progress";
import FinishScreen from "./compoennts/FinishScreen";
import Footer from "./compoennts/Footer";
import Timer from "./compoennts/Timer";
import {useQuizContext} from "./context/QuizContext";


export default function App() {
    const {status, questions, index, answer} = useQuizContext()

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen/>}
                {status === "active" &&
                    <>
                        <Progress/>

                        <Questions />

                        <Footer>
                            <NextButton/>
                            <Timer/>
                        </Footer>


                    </>
                }
                {status === "finished" &&
                    <FinishScreen/>
                }
            </Main>
        </div>
    );

}