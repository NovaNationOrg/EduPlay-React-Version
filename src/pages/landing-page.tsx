import { useState } from "react"
import Home from "../components/main-header"




export default function LandingPage () {
    const [textState,updateState] = useState("")

    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) =>{
        updateState(event.target.value);
    };

    return(
        <>   
            <div className="panel">
                <div className="top-segment">
                    <div className="landing-body">
                        <Home headerText="EduPlay"></Home>
                        <div className="formArea">
                            <div className="textbox-heading">
                                <div className="name-label"><p>Name</p></div>
                                <div className="character-countdown"><p>{12 - textState.length}</p></div>
                            </div>
                            <input type="text" placeholder="Enter your name" className="join-textbox" onChange={handleInput} maxLength={12}></input>
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