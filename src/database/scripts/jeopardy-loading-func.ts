import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"


export async function addJeopardyGame(jeopardyContent:string[]|undefined){

    let game_id = jeopardyContent![1]
    await db.gameList.add({
        game_code: jeopardyContent![0],
        date: new Date(),
        game_id: game_id
    })

    db.jeopardyGames.add
   
    let theme = ""
    let offset = 0
    for(let i=2;i < jeopardyContent!.length;i++){
        if((i-2) %11){
            theme = jeopardyContent![i]
            offset =0
        }
        else{
            await db.jeopardyGames.add({
                game_id:game_id,
                theme:theme,
                question:jeopardyContent![i],
                answer:jeopardyContent![i+1],
                points: ((i-2) %11) + 1 - offset  
            })
            i+=2
        }
    }
}

   export function fetchJeopardyGame(game_id:string){
        const gameData = useLiveQuery(
            async () =>{
                const gameData = await db.jeopardyGames
                    .where('game_id')
                    .equals(game_id)
                    .toArray()

                return gameData
            },[game_id]
        )
        return gameData
    }

