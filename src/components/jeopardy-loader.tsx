// Qr Scanner
import { addJeopardyGame } from "../database/scripts/jeopardy-loading-func";
import { db } from "../database/db";
import { useLiveQuery } from "dexie-react-hooks";
export default function loadJeopardy(gameData: string[]): boolean {

    if (gameData?.length != 68) {

        return false
        //Alert of invalid gameCode
    }

    if (gameData != undefined)
        sessionStorage.setItem("curr_game", gameData[1])

    localStorage.setItem("score","0")
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData.where('game_id').equals(gameData[1]).toArray())
    if(jeopardyGameData!=null)
        addJeopardyGame(gameData)
    return true
}