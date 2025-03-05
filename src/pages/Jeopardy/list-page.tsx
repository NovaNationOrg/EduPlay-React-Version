import { useNavigate } from "react-router-dom";
import "../../styles/Jeopardy/list-page.css"
import Header from '../../components/header'
import ListData from "../../components/dynamic-list";
import { ToastContainer, toast} from 'react-toastify';
import { useEffect } from "react";

function removeCategory() {
    sessionStorage.removeItem("category")
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

export function outputToast(message:string){
    if(message=="Correct")
        toast.success(message)
    else
        toast.error(message)
}

export default function ListPage() {
    const navigate = useNavigate()
    const score = localStorage.getItem("score")
    const toastMessage = sessionStorage.getItem("toastMessage")
    useEffect(() =>{
        if(toastMessage!=null){
            outputToast(toastMessage)
            sessionStorage.removeItem("toastMessage")
        }
    })
    
    return (
        <>
            <div className="panel">
                <Header gameClass="hangman-header" headerText="Jeopardy" />
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