import { useNavigate } from "react-router-dom";
import "../../styles/Jeopardy/list-page.css"
import Header from '../../components/header'
import ListData from "../../components/dynamic-list";
import { ToastContainer, toast} from 'react-toastify';
import { useEffect } from "react";
import { db } from "../../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { addGameResult } from "../../database/scripts/game-result";
function removeCategory() {
    sessionStorage.removeItem("category")
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

function outputToast(message:string){
    if(message=="Correct")
        toast.success(message)
    else
        toast.error(message)
}

function completedGameLoop(){
    const game_id= sessionStorage.getItem("curr_game")
    if(game_id== null)
        return
    const navigate = useNavigate()
    const gameData = useLiveQuery(()=> db.jeopardyData
                                .where("game_id")
                                .equals(game_id)
                                .toArray())
    if(gameData == undefined || gameData.length==0)
        return false
    
    for(let i=0;i<gameData.length;i++){
        if(localStorage.getItem(gameData[i].theme + "_" + gameData[i].points) == null)
            return false
    }

    let resultsData = [0,0]
    for(let i=0;i<gameData.length;i++){
        const themeQuestion = localStorage.getItem(gameData[i].theme + "_" + gameData[i].points)
        if(themeQuestion == "Correct")
            resultsData[0]+=1
        else
            resultsData[1]+=1
    }
    const curr_game = sessionStorage.getItem("curr_game")
    if(curr_game!=null){
        addGameResult(sessionStorage.getItem("curr_game")!,resultsData,Number(localStorage.getItem("score")),"_jp_")
        sessionStorage.removeItem("curr_game")
    }
    navigate("/jeopardyGame/results",{state:resultsData})

}

export default function ListPage() {
    const navigate = useNavigate()
    const score = localStorage.getItem("score")
    const toastMessage = sessionStorage.getItem("toastMessage")
    completedGameLoop()
    useEffect(() =>{
        if(toastMessage!=null){
            outputToast(toastMessage)
            sessionStorage.removeItem("toastMessage")
        }
    })
    
    return (
        <>
            <div className="panel">
                <Header gameClass="jeopardy-header" headerText="Jeopardy" />
                <ToastContainer />

                {sessionStorage.getItem("category") == null ? (
                    <>
                        <div className="hud-section">
                        <p className="score-label">${score}</p>
                        <button className="return-button" onClick={() => {
                            removeCategory();
                            navigate("/")
                        }}>QUIT</button>
                        </div>
                        <header className="heading-text">Select a Category</header>
                        <div className = "jeopardy-scroll-container">
                        <ListData type="Category" />
                        </div>
                    </>
                ) : (   
                    <>
                        <div className="hud-section">
                        <p className="score-label">${score}</p>
                        <button className="return-button" onClick={() => {
                            navigate("/jeopardyGame")
                            removeTier()
                            removeCategory()
                        }}>QUIT</button>
                        </div>

                        <header className="heading-text">Select a Tier</header>
                        <div className = "jeopardy-scroll-container">
                        <ListData type="Tier" />
                        </div>
                    </>
                )}
            </div >
        </>
    )
}