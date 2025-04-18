import loadHangman from "./hangman-loader";
import loadJeopardy from "./jeopardy-loader";

export function gameSelector(gameFound:boolean, splitData:string[]){

    sessionStorage.clear()
    switch(splitData[0]){
        case "_jp_":
            loadJeopardy(splitData,gameFound)
            break
        case "_hm_":
            loadHangman(splitData,gameFound)
            break        
    }
}   