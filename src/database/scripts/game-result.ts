import { db } from "../db";

export async function addGameResult(game_id:string,gameResult:number[],score:number){
    await db.gameResults.add({
        correct:gameResult[0],
        incorrect:gameResult[1],
        game_id:game_id,
        date: new Date(),
        score: score
    })
}