import "../styles/recent-games.css"
import { useState } from 'react';
import Modal from './modal';
import { Link } from "react-router-dom";



interface RecentGameProps{
    cardClass:string,
    game_id:string
    title_date:Date,
    correct:number,
    incorrect:number,
    score:number
}


export function RecentGameCard({cardClass,game_id,title_date,correct,incorrect,score}:RecentGameProps){
    const [reviewModalOpen, setModalState] = useState(false)

function setupGame(){
    localStorage.clear()
    localStorage.setItem("score","0")
    localStorage.setItem("curr_game",game_id)
}
const reviewOpen = () => setModalState(true);
const reviewClose = () => setModalState(false);


    return(
        <div className = "recent-game-container">
            <button className={`card-type-${cardClass}`} key={game_id} onClick={reviewOpen}>
            {`Game : ${cardClass} ${title_date.toLocaleDateString("en-GB")}`}
                <Modal isOpen={reviewModalOpen} handleClose={reviewClose} >
                  <div className={`modal-type-${cardClass}`}>
                    <div className="correct-text">Correct: {correct}</div>
                    <div className="incorrect-text">Incorrect: {incorrect}</div>
                    <div className="score-text">Score: {score}</div>
                    
                    <Link to="/jeopardyGame"><button className ={ `retry-button-${cardClass}`} onClick={setupGame}>Retry</button></Link>
                  </div>
                </Modal>
            </button>

        </div>
    )
}