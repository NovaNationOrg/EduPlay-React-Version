import { useState } from "react"
import Header from "../components/main-header"
import { Link } from "react-router-dom";
import { db } from "../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { motion } from "motion/react";





export default function LandingPage () {
    const [textState,updateState] = useState("")

    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        updateState(event.target.value);
        sessionStorage.setItem("TestKey",event.target.value)
    };

  

  
    const list = useLiveQuery(() => db.jeopardyGames.toArray())
    console.log(list)
    return(
        <>   

       
            <div className="panel">
                <div className="top-segment">
                    <div className="landing-body">
                        <Header headerText="EduPlay"></Header>
                        <div className="formArea">
                            <div className="textbox-heading">
                                <div className="name-label"><p>Name</p></div>
                                <div className="character-countdown"><p>{12 - textState.length}</p></div>
                            </div>
                            
                                <input type="text" placeholder="Enter your name" className="join-textbox" onChange={handleInput} maxLength={12}></input>
                                <Link className="join-area" to={"/header"}><button className="join-button">Join Game</button></Link>
                                
                               
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