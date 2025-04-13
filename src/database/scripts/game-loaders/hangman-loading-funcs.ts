import { db } from "../../db"

export async function addHangmanGame(hangmanContent: string[] | undefined) {

    const game_id = hangmanContent![1]
    await db.gameList.add({
        game_code: hangmanContent![0],
        date: new Date(),
        game_id: game_id
    })

    let category = ""
    for (let i = 2; i < hangmanContent!.length; i++) {
       
        category = hangmanContent![i]
        let categoryQuestions = Number(category.substring(category.indexOf(":")+1,category.length))
        category = category.substring(0,category.indexOf(":"))
        let x =0
        i++
        while(x < categoryQuestions){
            await db.hangmanData.add({
                game_id: game_id,
                category: category,
                question: hangmanContent![i],
                points: 1
            })
            x++
            i++
        }
        
        
    }
}


