import { JSX } from "react"


interface HMInputItemsProps{
    addNewGuess(guess:string):void
    guesses:string[]
    completed:boolean
}


export default function HMInputItems({addNewGuess,guesses,completed}:HMInputItemsProps){

    function produceInputList(){
        let inputList: JSX.Element[] = []
        for(let i = 65 ; i < 91 ; i++){
            let guess = String.fromCharCode(i)
            inputList.push(createItem(guess,guesses.includes(guess)))
        }
        return inputList
    }
    
    function createItem(letter:string,guessed:boolean){
        return(
            <>
            {
             guessed == false && completed != true
            ? <button className="hangman-input-item" onClick={() => addNewGuess(letter)}> {letter} </button>
            : <button disabled className="hangman-input-item" onClick={() => addNewGuess(letter)}> {letter} </button>
            }
            </>
        )
    }
    return(<>
       {produceInputList()} 
    </>)
}