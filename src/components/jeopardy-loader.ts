// Qr Scanner
import { addJeopardyGame } from "../database/scripts/game-loaders/jeopardy-loading-func";
import { resetStorage } from "./game-resetter";

export function initializeStorage(game_id:string){
    resetStorage()
    localStorage.setItem("curr_game", game_id)
    localStorage.setItem("score","0")
}
export default function loadJeopardy(gameData: string[],gameFound:boolean): boolean {   
    if (gameData?.length != 68) {
        return false
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