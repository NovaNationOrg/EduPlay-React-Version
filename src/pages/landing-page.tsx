import { MouseEventHandler, useState } from "react"
import Header from "../components/header"
import { Link } from "react-router-dom";
import { db } from "../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import "../styles/landing-page.css"






function saveName(name:string):MouseEventHandler<HTMLButtonElement> | void{
    sessionStorage.setItem("username",name)
}

export default function LandingPage () {
    const [textState,updateState] = useState("")


    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        updateState(event.target.value);
    };

    const list = useLiveQuery(() => db.jeopardyData.toArray())
    console.log(list)
    return(
        <>   

            <div className="panel">
                <div className="top-segment">
                    <div className="landing-body">
                        <Header gameClass = "jeopardy-header" headerText="EduPlay"/>
                        <div className="formArea">
                            <div className="textbox-heading">
                                <div className="name-label"><p>Name</p></div>
                                <div className="character-countdown"><p>{12 - textState.length}</p></div>
                            </div>
                            
                                <input type="text" placeholder="Enter your name" className="join-textbox" onChange={handleInput} maxLength={12}></input>
                                <Link className="join-area" to={"/gameScan"}><button className="join-button" onClick={() => {
                                    saveName(textState)
                                }}>Join Game</button></Link>
                        </div>
                    </div>
                </div>
                <div className="bottom-segment">
                    <div className="upper-recent-section">
                        <div className="recentLabel">Recent Games</div> 
                        <input type="button" value={"view all"} className="view-all-button" ></input>
                    </div>
                </div>
               
               
            </div> 
        </>
    )

}