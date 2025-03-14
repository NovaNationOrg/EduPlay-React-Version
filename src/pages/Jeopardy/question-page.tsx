import { NavigateFunction, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "../../styles/Jeopardy/question-page.css";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/db";
import { toast, ToastContainer } from "react-toastify";

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
            setAnswerStatus("Incorrect")
            updatescore(false)
            pageReturn(navigate)
            sessionStorage.setItem("toastMessage","You ran out of time!")
            return;
        }
           
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return <>{timeLeft}</>;
};

function updatescore(correct:boolean){
    let score = Number(localStorage.getItem("score"))
    if(correct)
        score+= Number(sessionStorage.getItem("tier"))
    else
        score-= Number(sessionStorage.getItem("tier"))
    localStorage.setItem("score",score.toString())
}

function setAnswerStatus(status:string){
    const points = Number(sessionStorage.getItem("tier"))
    const category = sessionStorage.getItem("category")
    localStorage.setItem(category + "_" + points,status)

    return status
}

export default function QuestionPage() {
    const [guess,setGuess] = useState("")
    const navigate = useNavigate()

    function submit() {
        if(guess==""){
            toast.info("Please enter text into the answer field before sumbitting",{toastId:"info-toast",theme:"dark"})
            return
        }
        
        const outcome = guess.toLocaleUpperCase("en-US")==answer.toLocaleUpperCase("en-US")
        let status:string
        if(outcome)
            status = setAnswerStatus("Correct")
        else
            status = setAnswerStatus("Incorrect")
        updatescore(outcome)
        pageReturn(navigate)
        sessionStorage.setItem("toastMessage",status)
    }

    const points = Number(sessionStorage.getItem("tier"))
    const category = sessionStorage.getItem("category")
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData
        .where({ game_id: localStorage.getItem("curr_game"),points: points, theme: category}).toArray())

    if(jeopardyGameData==null)
        return
    
    const question = jeopardyGameData[0].question
    const answer = jeopardyGameData[0].answer

    return (
        <>
            <div className="panel">
                <ToastContainer/>
                <Header gameClass="jeopardy-header" headerText="Jeopardy" />
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
                <input className="answer-area" placeholder="ENTER YOUR ANSWER" onChange={(e) => setGuess(e.target.value)}></input>
                <button className="submit-button" onClick={() => {
                    submit()
                }}>SUBMIT</button>
            </div >
        </>
    )
}