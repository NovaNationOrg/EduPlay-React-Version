import { Link, useLocation } from "react-router-dom"
import Header from "../../components/header"
import "../../styles/Jeopardy/results-page.css"


export default function ResultsPage(){     

    const location = useLocation()
    const data = location.state
    const points = localStorage.getItem("score")
    return(
        <>
            <div className="panel">
                <Header gameClass="jeopardy-header" headerText="Jeopardy"/>
                <h1 className="results-heading">Game Results</h1>
                <p className="score-text">Score: ${points}</p>
                <p className="correct-text">Correct: {data[0]}</p>
                <p className="incorrect-text">Incorrect: {data[1]}</p>
                <Link className= "home-button-container" to={"/"} ><button className="home-button">Back to Home</button></Link>
                
            </div>
        </>
)
}