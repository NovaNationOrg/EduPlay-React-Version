import { Link } from "react-router-dom"
import Header from "../components/header"
import { Scanner } from "@yudiel/react-qr-scanner"
import { qrComponents } from "../components/qrSettings"
import { useState } from "react"
import "../styles/scanning-page.css"
import { gameSelector } from "../game-selector"


export default function ScanningPage(){
    const [qrData,updateQrData] = useState("")

    return(
        <>   
            <div className="panel">
                <div className="top-segment">
                        <Header gameClass = "jeopardy-header" headerText="EduPlay"/>
                        <div className="scanner-container">
                        <p className="scanner-header-text">Scan Code</p>
                            <Scanner components={qrComponents} onScan={(result) => updateQrData(result[0].rawValue)}/>
                        </div>
                        {
                            qrData
                            ?<Link className="join-area" to={"/jeopardyGame"}>
                                <button className="join-button" 
                                    onClick={() => {
                                                gameSelector(qrData)
                                            }}>Begin</button></Link>
                            : <div></div>
                        }
                </div>
            </div> 
        </>
    )
}