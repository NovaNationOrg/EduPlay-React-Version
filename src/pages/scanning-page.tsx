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
function validGame(game_code:string){
    if(game_code == "_jp_")
        return true
    return false
}

function validPage(pageNum:string){
    if(Number(pageNum) != Number(sessionStorage.getItem("current_page")) + 1 && Number(pageNum) < Number(sessionStorage.getItem("total_pages")))
        return false
    return true
}

function validPayload(payload:string[]){
    const game_id = payload[1].substring(0,payload[1].indexOf(":"))
    const expected_id = sessionStorage.getItem("game_id")
    const pageNum = payload[1].substring(payload[1].lastIndexOf(':') + 1,payload[1].lastIndexOf('|'))

    if(!validGame(payload[0]) )
        return false
    
    if((expected_id != undefined && game_id != expected_id) || !validPage(pageNum))
        return false
    else
        return true
    
}
export default function ScanningPage(){
    const [qrData,updateQrData] = useState("")
    const[gameFound,updateGameStatus] = useState(false)
    const[startProgress,updateStartProgress] = useState(-1)
    //TODO: Continue and complete the feature.
    const splitData = qrData.split("\n")

    let game_id: string|null  = sessionStorage.getItem("game_id")
    if(game_id==undefined)
        game_id="_"

    const fetchData = async () => {
        const status = await gameExists(game_id);
        updateGameStatus(status);
    };
    
    useEffect(()=>{
    
        fetchData()
        updateStartProgress((startProgress + 1))
        sessionStorage.setItem("current_page",(startProgress + 1).toString())


     },[qrData])

     useEffect(() =>{
        if(startProgress == Number(sessionStorage.getItem("total_pages")))
            updateGameStatus(true)     
     },[startProgress])

     const handleQrUpdate = (result:string) =>{
        const splitData = result.split("\n")
    
        if(!validPayload(splitData))
            return

        let newString = sessionStorage.getItem("data-payload")
        if(newString!=null){
            const modifiedResult = (splitData.slice(2,splitData.length)).join("\n")
            newString += "\n" + modifiedResult

        }
        else{ //This condition exists for when qrCode 1 | max is being read
            newString = result
            sessionStorage.setItem("game_id",splitData[1].substring(0,splitData[1].indexOf(":")))
            sessionStorage.setItem("total_pages",splitData[1].substring(splitData[1].lastIndexOf('|') + 1,splitData[1].lastIndexOf('|')+2))
        }

        if(newString!=""){
            updateQrData(newString!)
            sessionStorage.setItem("data-payload",newString!)
        }
     }
    return(
        <>   
            <div className="panel">
                <div>
                        <Header gameClass = "eduplay-header" headerText="EduPlay"/>
                        <div className="scanner-container">
                        <p className="scanner-header-text">Scan Code</p>
                            <Scanner components={qrComponents} onScan={(result) => handleQrUpdate(result[0].rawValue)}/>
                        </div>
                        {
                            gameFound ==true && 
                                <Link className="join-area" to={"/jeopardyGame"}>
                                    <button className="join-button" 
                                        onClick={() => {
                                                    gameSelector(gameFound,splitData)
                                                }}>Begin</button></Link>
                     
                        }
                </div>
            </div> 
        </>
    )
}