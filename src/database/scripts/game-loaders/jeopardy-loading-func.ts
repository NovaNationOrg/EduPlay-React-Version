import { db } from "../../db"

export async function addJeopardyGame(jeopardyContent: string[] | undefined) {

    const game_id = jeopardyContent![1]
    await db.gameList.add({
        game_code: jeopardyContent![0],
        date: new Date(),
        game_id: game_id
    })


    let theme = ""
    let offset = 0
    for (let i = 2; i < jeopardyContent!.length; i++) {
        if ((i - 2) % 11 == 0) {//A theme is present every 11 lines starting on pos 2
            theme = jeopardyContent![i]
            offset = 0
        }
        else {
            await db.jeopardyData.add({
                game_id: game_id,
                theme: theme,
                question: jeopardyContent![i],
                answer: jeopardyContent![i + 1],
                points: (((i - 2) % 11) - offset) * 100
            })
            offset++
            i++
        }
    }
}


