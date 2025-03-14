import loadJeopardy from "./components/jeopardy-loader";

export function gameSelector(gameFound:boolean, splitData:string[]){

    if(splitData[0]=="_jp_")
        loadJeopardy(splitData,gameFound)
}   