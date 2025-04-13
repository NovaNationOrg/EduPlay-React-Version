import { addHangmanGame } from "../database/scripts/game-loaders/hangman-loading-funcs"
import { initializeStorage } from "./jeopardy-loader"

export default function loadHangman(gameData: string[],gameFound:boolean){
    if (gameData?.length < 4) {
        return false
    }
    const game_id = gameData[1]
        if(!gameFound){
            initializeStorage(game_id)
            addHangmanGame(gameData)
        }
        else{
            if(localStorage.getItem("curr_game") !=game_id){
                initializeStorage(game_id)
            }
        }
        
    
        return true
}