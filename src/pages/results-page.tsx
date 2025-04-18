import { Link, useLocation } from "react-router-dom"
import Header from "../components/header"
import "../styles/results-page.css"
import { resetStorage } from "../components/game-resetter"
import { GameMapping } from "../components/game-listing"

export default function ResultsPage(){     

    const location = useLocation()
    const data = location.state
    const points = localStorage.getItem("score")
    const game_code = localStorage.getItem("game_code")
    const gameTitle = GameMapping[game_code as keyof typeof GameMapping] 

    return(
        <>
            <div className="panel">
                <Header gameClass={`${gameTitle.toLowerCase()}-header`} headerText={gameTitle}/>
                <h1 className="results-heading">Game Results</h1>
                <p className="score-text">Score: {points}</p>
                <p className="correct-text">Correct: {data[0]}</p>
                <p className="incorrect-text">Incorrect: {data[1]}</p>
                <Link className= {`home-button-container`} to={"/"} ><button onClick = {()=> resetStorage()}className={game_code + "home-button home-button"}>Back to Home</button></Link>
                
            </div>
        </>
)
}