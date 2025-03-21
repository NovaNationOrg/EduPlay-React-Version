import { db } from "../db";

export async function addGameResult(game_id:string,gameResult:number[],score:number,game_code:string){
    await db.gameResults.add({
        game_code:game_code,
        correct:gameResult[0],
        incorrect:gameResult[1],
        game_id:game_id,
        date: new Date(),
        score: score
    })
}