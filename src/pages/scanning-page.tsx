import { Link } from "react-router-dom"
import Header from "../components/header"
import { Scanner } from "@yudiel/react-qr-scanner"
import { qrComponents } from "../components/qrSettings"
import { useEffect,useState } from "react"
import "../styles/scanning-page.css"
import { gameSelector } from "../game-selector"
import { db } from "../database/db"


async function gameExists(game_id:string){
    const gameData = await db.gameList.where("game_id").equals(game_id).toArray()

    if(gameData.length !=0)
        return true
    return false
}
export default function ScanningPage(){
    const [qrData,updateQrData] = useState("")
    const[gameFound,updateGameStatus] = useState(false)

    const splitData = qrData.split("\n")

    let game_id = splitData[1]
    if(game_id==undefined)
        game_id="_"

    const fetchData = async () => {
        const status = await gameExists(game_id);
        updateGameStatus(status);
    };
    
    useEffect(()=>{
        fetchData();
     },[qrData])

    return(
        <>   
            <div className="panel">
                <div>
                        <Header gameClass = "eduplay-header" headerText="EduPlay"/>
                        <div className="scanner-container">
                        <p className="scanner-header-text">Scan Code</p>
                            <Scanner components={qrComponents} onScan={(result) => updateQrData(result[0].rawValue)}/>
                        </div>
                        {
                            qrData
                            ?<Link className="join-area" to={"/jeopardyGame"}>
                                <button className="join-button" 
                                    onClick={() => {
                                                gameSelector(gameFound,splitData)
                                            }}>Begin</button></Link>
                            : <div></div>
                        }
                </div>
            </div> 
        </>
    )
}