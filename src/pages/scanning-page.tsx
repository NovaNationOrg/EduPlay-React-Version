import { Link } from "react-router-dom"
import Header from "../components/header"
import { Scanner } from "@yudiel/react-qr-scanner"
import { qrComponents } from "../components/qrSettings"
import { useEffect,useState } from "react"
import "../styles/scanning-page.css"
import { gameSelector } from "../game-selector"
import { db } from "../database/db"
import { toast, Toaster } from "sonner"
import {useDeviceHandler}  from "../components/custom-hooks/useFavoriteSelector"

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
    if(Number(pageNum) != Number(sessionStorage.getItem("current_page")) + 1 )
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
    function notifyUser(pageNum:number){  
        if(Number(pageNum ==0))
            return
        
        toast("initial",{
            id:"qrnum-toast", duration:Infinity, position:"top-center",
            cancel: { label: "Reset", key:"reset-button", onClick: () =>{ resetScanningProcess() }}
        })

        if(pageNum == Number(sessionStorage.getItem("total_pages")) || pageNum == -2)
            toast.success("Game successfully loaded. Press begin to continue",{id:"qrnum-toast"})
        else
            toast("QR Code: " + pageNum + " | " + sessionStorage.getItem("total_pages"),{id:"qrnum-toast"})  
    }

    const [qrData,updateQrData] = useState("")
    const[gameFound,updateFoundStatus] = useState(false)
    const[startProgress,updateStartProgress] = useState(-1)
    const[readyStatus,updateReadyStatus] = useState(false)
    const splitData = qrData.split("\n")

    let game_id: string|null  = sessionStorage.getItem("game_id")
    if(game_id==undefined)
        game_id="_"

    const fetchData = async () => {
        const status = await gameExists(game_id);
        updateFoundStatus(status);
        if(status){
            updateReadyStatus(true)
            notifyUser(-2)
        }
    };

    function resetScanningProcess() {
        sessionStorage.clear()
        sessionStorage.setItem("current_page","0")
        updateStartProgress(-1)
        updateQrData("")
        updateReadyStatus(false)
        updateFoundStatus(false)
    }
    
    useEffect(()=>{
    
        fetchData()
        updateStartProgress((startProgress + 1))
        if(startProgress > -1)
            notifyUser(startProgress+1)
        sessionStorage.setItem("current_page",(startProgress + 1).toString())
     },[qrData])

     useEffect(() =>{
        const numPages = Number(sessionStorage.getItem("total_pages"))
        if(numPages > 0 && startProgress == numPages )
            updateReadyStatus(true)     
     },[startProgress])

     const handleQrUpdate = (result:string) =>{
        const splitData = result.split("\n")
    
        if(!validPayload(splitData))
            return

        let newString = sessionStorage.getItem("data-payload")
        if(newString!=null){
            const modifiedResult = (splitData.slice(2,splitData.length)).join("\n")
            newString +=  modifiedResult

        }
        else{ //This condition exists for when qrCode 1 | max is being read
            sessionStorage.setItem("game_id",splitData[1].substring(0,splitData[1].indexOf(":")))
            sessionStorage.setItem("total_pages",splitData[1].substring(splitData[1].lastIndexOf('|') + 1,splitData[1].lastIndexOf('|')+2))
            splitData[1] = splitData[1].substring(0,splitData[1].indexOf(":"))
            newString = splitData.join("\n")
        }

        if(newString!=""){
            updateQrData(newString!)
            sessionStorage.setItem("data-payload",newString!)
        }
     }
     

    const {deviceListing, setFavoriteDevice, setDeviceInfo, deviceId,deviceNum} = useDeviceHandler()
    return(
        <>   
        <Toaster position="top-center" richColors/>
            <div className="panel">
                <div>
                        <Header gameClass = "eduplay-header" headerText="EduPlay"/>
                        <div className="scanner-container">
                        <p className="scanner-header-text">Scan Code</p>
                            <Scanner components={qrComponents} constraints={{deviceId: deviceId }} onScan={(result) => handleQrUpdate(result[0].rawValue)}/>
                            <div className="device-config-area">
                        <select className = "device-listing" onChange={(e) => setDeviceInfo(e.target.value,e.target.selectedIndex-1)}>
                            <option disabled value={undefined} style={{color:"white"}}>Select a device</option>
                            {deviceListing}
                        </select>
                        { deviceNum != Number(localStorage.getItem("favorite_device")) &&
                            <button className="favorite-button" onClick={setFavoriteDevice}>Set Favorite Camera</button>
                        }
                        </div>
                        </div>
                        
                        {
                            readyStatus == true  && 
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