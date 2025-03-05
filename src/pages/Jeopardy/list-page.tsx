import { useNavigate } from "react-router-dom";
import "../../styles/Jeopardy/list-page.css"
import Header from '../../components/header'
import ListData from "../../components/dynamic-list";

function removeCategory() {
    sessionStorage.removeItem("category")
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

export default function ListPage() {
    const navigate = useNavigate()
    const score = localStorage.getItem("score")
    return (
        <>
            <div className="panel">
                <Header gameClass="hangman-header" headerText="Jeopardy" />

                {sessionStorage.getItem("category") == null ? (
                    <>
                        <div>
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
                        <div>
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