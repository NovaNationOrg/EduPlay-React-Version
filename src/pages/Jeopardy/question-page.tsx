import { NavigateFunction, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "../../styles/Jeopardy/question-page.css";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/db";
import { nav } from "motion/react-client";

function pageReturn(navigate:NavigateFunction){
    removeTier()
    removeCategory()
    navigate(-1)
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

function removeCategory() {
    sessionStorage.removeItem("category")
}

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const navigate= useNavigate()
    useEffect(() => {
        if (timeLeft <= 0) {
            pageReturn(navigate)
            return;
        }
           

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return <>{timeLeft}</>;
};

export default function QuestionPage() {
    const [guess,setGuess] = useState("")
    const navigate = useNavigate()

    function submit() {
        if(guess==answer)
            console.log("Victory")
        else
            console.log(answer)
    }

    const tier = Number(sessionStorage.getItem("tier"))
    const cat = sessionStorage.getItem("category")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData
        .where({ points: tier, theme: cat }).toArray())

    if(jeopardyGameData==null)
        return
    
    const question = jeopardyGameData[0].question
    const answer = jeopardyGameData[0].answer
    const points = jeopardyGameData[0].points


    return (
        <>
            <div className="panel">
                <Header gameClass="hangman-header" headerText="Jeopardy" />
                <div className="info-panel">
                    <p className="timer"><CountdownTimer /></p>
                    <button className="return-button" onClick={() => {
                       pageReturn(navigate)
                    }}>QUIT</button>
                </div>
                <header className="heading-text">Question for {points} Points!</header>
                <div className="question-area">
                    <header className="question-text">{question}</header>
                </div>
                <input className="answer-area" placeholder="ENTER YOUR ANSWER" onChange={(e) => setGuess(e.target.value)}></input> {/*onChange={(e) => setGuess(e.target.value)}*/}
                <button className="submit-button" onClick={() => {
                    submit()
                }}>SUBMIT</button>
            </div >
        </>
    )
}