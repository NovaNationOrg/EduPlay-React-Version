import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "../../styles/Jeopardy/question-page.css";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/db";

function getQuestion() {
    const tier = Number(sessionStorage.getItem("tier"))
    const cat = sessionStorage.getItem("category")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData
        .where({ points: tier, theme: cat }).toArray())

    const question: string[] = [...new Set(jeopardyGameData?.map(record => record.question))]
    return question[0]
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

function removeCategory() {
    sessionStorage.removeItem("category")
}

function submit() {

}

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return <>{timeLeft}</>;
};

export default function QuestionPage() {
    const navigate = useNavigate()
    const points = sessionStorage.getItem("tier")

    const question = getQuestion()
    return (
        <>
            <div className="panel">
                <Header gameClass="hangman-header" headerText="Jeopardy" />
                <div className="info-panel">
                    <p className="timer"><CountdownTimer /></p>
                    <button className="return-button" onClick={() => {
                        removeTier()
                        removeCategory()
                        navigate(-1)
                    }}>QUIT</button>
                </div>
                <header className="heading-text">Question for {points} Points!</header>
                <div className="question-area">
                    <header className="question-text">{question}</header>
                </div>
                <input className="answer-area" placeholder="ENTER YOUR ANSWER"></input>
                <button className="submit-button" onClick={() => {
                    submit()
                }}>SUBMIT</button>
            </div >
        </>
    )
}