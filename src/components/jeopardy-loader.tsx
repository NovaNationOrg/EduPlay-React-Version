// Qr Scanner
import { addJeopardyGame } from "../database/scripts/jeopardy-loading-func";
import { resetStorage } from "./game-resetter";

function initializeStorage(game_id:string){
    resetStorage()
    localStorage.setItem("curr_game", game_id)
    localStorage.setItem("score","0")
}
export default function loadJeopardy(gameData: string[],gameFound:boolean): boolean {   
    if (gameData?.length != 68) {
        return false
        //Alert of invalid gameCode
    }
    
    const game_id = gameData[1]
    if(!gameFound){
        initializeStorage(game_id)
        addJeopardyGame(gameData)
    }
    else{
        if(localStorage.getItem("curr_game") !=game_id){
            initializeStorage(game_id)
        }
    }
    

    return true
}