import {  useState } from "react";
import HMInputItems from "../../components/hangman/hangman-input-items";
import Header from "../../components/header";
import "../../styles/Hangman/hangman.css"
import HMGuessDisplay from "../../components/hangman/hangman-guess-display";
import { toast, Toaster } from "sonner";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/db";
import { useNavigate } from "react-router-dom";
import { addGameResult } from "../../database/scripts/game-result";

function processCorrectGuesses(guesses:string[],word:string){
    let correctGuesses:string[] = []
    let upperWord = word.toUpperCase()
    for(const g of guesses){
        for(const uw of upperWord){
            if(g == uw){
                correctGuesses.push(g)
                break
            }
        }
    }
    return word ? correctGuesses : ['-1']
}

function updateRoundInformation(correct:boolean){
    
    let numCorrect = Number(localStorage.getItem("_hm_num_correct")) 
    let numIncorrect = Number(localStorage.getItem("_hm_num_incorrect")) 

    if(correct){
        sessionStorage.removeItem("answer-found")
        numCorrect++
        localStorage.setItem("_hm_num_correct",numCorrect.toString())
    }
    else{
        numIncorrect++
        localStorage.setItem("_hm_num_incorrect",numIncorrect.toString())
    }

    const status = correct? "success" :"fail"
    localStorage.setItem("_hm_result_decided", status)
}

function clearGameStorage(){
    localStorage.removeItem("_hm_result_decided")
    localStorage.removeItem("_hm_total_round")
    localStorage.removeItem("_hm_num_correct")
    localStorage.removeItem("_hm_num_incorrect")
    localStorage.removeItem("_hm_round_number")
    localStorage.removeItem("_hm_current_guesses")
}

export default function Hangman(){
    let guessArray = localStorage.getItem("_hm_current_guesses")
    const game_id = localStorage.getItem("curr_game")
    let question:string = "" , category:string = ""
    const navigate = useNavigate()
    if(game_id==null)
        navigate("/")

    const words = useLiveQuery(()=> db.hangmanData.where({game_id:game_id}).toArray())
    const roundNumber = localStorage.getItem("_hm_round_number") ? Number(localStorage.getItem("_hm_round_number")) : 1
    const [guesses,updateGuesses] = useState<string[]>(guessArray? JSON.parse(guessArray):([]))
    const state = localStorage.getItem("_hm_result_decided")
    const[gameState,updateGameState] = useState(state == "pending" || state==null? false: true)

    if(words){
        localStorage.setItem("_hm_total_round",(words.length).toString())
        question = words![roundNumber-1].question
        category = words![roundNumber-1].category
    }

    const result = localStorage.getItem("_hm_result_decided")
    if(result != null && result != "pending")
        promptNextRound()
    
    const correctGuesses = processCorrectGuesses(guesses,question)
    
    if(localStorage.getItem("_hm_result_decided")==null)
        localStorage.setItem("_hm_result_decided","pending")

    if(sessionStorage.getItem("answer-found") == "true" && localStorage.getItem("_hm_result_decided")=="pending"){
        updateRoundInformation(true)
        updateGameState(true)
    }

    if(guesses.length - correctGuesses.length >=6 && correctGuesses[0]!="-1" && localStorage.getItem("_hm_result_decided")=="pending"){
        updateRoundInformation(false)
        updateGameState(true)
    }

    function addNewGuess(guess:string){
        const newGuesses = [
            ...guesses, guess
        ]
        updateGuesses(newGuesses)
        localStorage.setItem("_hm_current_guesses",JSON.stringify(newGuesses))
    }

    function nextRound(){

        const roundNumber = localStorage.getItem("_hm_round_number") ? Number(localStorage.getItem("_hm_round_number")) : 1
        if(roundNumber == Number(localStorage.getItem("_hm_total_round"))){
            let resultsData = [0,0]
            const correct = Number(localStorage.getItem("_hm_num_correct"))
            const incorrect = Number(localStorage.getItem("_hm_num_incorrect"))

            resultsData[0] = correct
            resultsData[1] = incorrect
            
            localStorage.setItem("score",(correct-incorrect).toString())

            addGameResult(localStorage.getItem("curr_game")!,resultsData,Number(localStorage.getItem("score")),"_hm_")

            clearGameStorage()
            navigate("/gameResult",{state:resultsData})
        }
        else{
            localStorage.setItem("_hm_round_number",(roundNumber+1).toString())
            localStorage.setItem("_hm_result_decided","pending")
            localStorage.removeItem("_hm_current_guesses")
            updateGameState(false)
            updateGuesses([])
        } 
    }
    
    function promptNextRound(){
        const roundNumber = localStorage.getItem("_hm_round_number") ? localStorage.getItem("_hm_round_number") : 1
        const status = localStorage.getItem("_hm_result_decided") == "success" ?  "success" : "error"
        if(status == "success")
            toast.success("Round " + roundNumber + " completed!",{id:"prompt-game-id",duration:Infinity, dismissible:false, classNames: {info:""} ,
                action : {label:"Next Round",key:"next-round-button",onClick: () =>{nextRound()}}
            })
        else
            toast.error("Round " + roundNumber + " completed!",{id:"prompt-game-id",duration:Infinity, dismissible:false, classNames: {info:""} ,
                action : {label:"Next Round",key:"next-round-button",onClick: () =>{nextRound()}}
        })
    }

    return(<>
        <div className="panel">
            <Header gameClass="game-header hangman-header" headerText="Hangman" key={"hangman-header"} />
            <Toaster richColors position="top-center" />
            <div className="hangman-game-area">
                <div className="hangman-display-area">
                    <HMGuessDisplay guesses={correctGuesses} currentWord={question} category={category} incorrect={guesses.length - correctGuesses.length} parentTrigger = {updateGameState} completed ={gameState}/>
                </div>
                <div className="hangman-input-area">
                    <HMInputItems addNewGuess={addNewGuess} guesses={guesses} completed={gameState  }/>
                </div>
            </div>
        </div>
    </>)
}