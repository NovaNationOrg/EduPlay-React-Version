// Qr Scanner
import { addJeopardyGame } from "../database/scripts/jeopardy-loading-func";

export default function loadJeopardy(gameData: string[]): boolean {

    if (gameData?.length != 68) {

        return false
        //Alert of invalid gameCode
    }

    if (gameData != undefined)
        sessionStorage.setItem("curr_game", gameData[1])

    localStorage.setItem("score","0")
    addJeopardyGame(gameData)
    return true
}