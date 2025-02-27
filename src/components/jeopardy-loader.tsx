// Qr Scanner
import { addJeopardyGame, fetchJeopardyGame } from "../database/scripts/jeopardy-loading-func";

export default function loadJeopardy(gameData: string[]): boolean {

    if (gameData?.length != 68) {

        return false
        //Alert of invalid gameCode
    }

    if (gameData != undefined)
        sessionStorage.setItem("curr_game", gameData[1])

    addJeopardyGame(gameData)
    fetchJeopardyGame(sessionStorage.getItem("curr_game")!)
    return true
}