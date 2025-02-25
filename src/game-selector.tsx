import loadJeopardy from "./components/jeopardy-loader";

export function gameSelector(gameData:string){

    let splitData = gameData.split("\n")
    if(splitData[0]=="_jp_")
        loadJeopardy(splitData)
}   