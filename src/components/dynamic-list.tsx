import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../database/db"
import { Link, useNavigate } from "react-router-dom"
import { JSX, MouseEventHandler } from "react"
import { toast } from "react-toastify"

type GameType = {
    type: string
}

function saveCategory(category: string): MouseEventHandler<HTMLButtonElement> | void {
    sessionStorage.setItem("category", category)
}

function saveTier(tier: string): MouseEventHandler<HTMLButtonElement> | void {
    sessionStorage.setItem("tier", tier)
}

function loadCategory() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData.where('game_id').equals(sessionStorage.getItem("curr_game")!).toArray())
    const themes = [...new Set(jeopardyGameData?.map((record) => (record.theme)))]

    for(let i=0;i < themes.length;i++){
        themes[i]+=i+1
    }
    return themes
}

function loadTier() {
    const selectedCategory = sessionStorage.getItem("category")

    if (selectedCategory != null) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const jeopardyGameData = useLiveQuery(() => db.jeopardyData.where("theme").equals(selectedCategory).toArray())
        const tiers = [...new Set(jeopardyGameData?.map(record => record.points))]

        return tiers
    }
}

function isCompletedQuestion(tier: number){
    const theme = sessionStorage.getItem("category")
    if(localStorage.getItem(theme+"_"+tier)!=undefined)
        return true
    return false
}

function isCompletedCategory(category:string){
    let tier : number
    for(let i=0;i < 5;i++){
        tier = (i + 1) * 100
        if(localStorage.getItem(category+"_"+tier) == undefined)
            return false
    }
    return true
}

function setupComponents(type:string){
    let themes: string[] = []
    let tiers: number[] | undefined = []
    switch (type) {
        case "Category":
            themes = loadCategory()
            break;

        case "Tier":
            tiers = loadTier()
            break;

        default:
            console.log("Invalid type selected!")
            break;
    }

    const navigate = useNavigate()
    let tabElement: JSX.Element[] = []
    let testElement: JSX.Element[] = []
    let listELement: JSX.Element[] = []
    if (type == "Category"){

        testElement = themes.filter((category) =>{
            if(isCompletedCategory(category.substring(0,category.length-1)))
                return category
        }).map((category) =>
            <div className = "tab-area" key={category.substring(category.length-1,category.length)}>
                <button className="main-tab-completed" onClick={() => {
                    alertCompleted("category")
                }}>
                    {category.substring(0,category.length-1)}</button>
            </div>
         );

        tabElement = themes.filter((category) =>{
            if(!isCompletedCategory(category.substring(0,category.length-1)))
                return category
        }).map((category) =>
            <Link className="tab-area" to={"/jeopardyGame"} key={category.substring(category.length-1,category.length)}>
                <button className="main-tab" onClick={() => {
                    saveCategory(category.substring(0,category.length-1));
                    navigate("/jeopardyGame");
                }}>
                    {category.substring(0,category.length-1)}</button>
            </Link>
         );

         
    }  
    else
        if (type == "Tier") {
            if (tiers != undefined){
                testElement = tiers.filter((tier) =>{
                    if(isCompletedQuestion(tier))
                        return tier
                }).map((tier) => 
                    <div className="tab-area" key={tier}>
                    <button className="main-tab-completed" onClick={() => {
                        alertCompleted("question");
                    }}>
                        ${tier}</button>
                    </div>
                )

            tabElement = tiers.filter(
                (tier) => {
                    if(!isCompletedQuestion(tier))
                        return tier
                }
            ).map((tier) =>
                <Link className="tab-area" to={"/jeopardyGame/question"} key={tier}>
                    <button className="main-tab" onClick={() => {
                        saveTier(tier.toString());
                    }}>
                        ${tier}</button>
                </Link>
            );
            }
            
        }
    let x =0,y = 0
    let inRange = x <= testElement.length && y <= tabElement.length
    while(inRange){

        if(x==testElement.length && y == tabElement.length)
            break
        let keya,keyb
        if(x < testElement.length)
            keya = Number(testElement[x].key!)

        if(y < tabElement.length)
            keyb = Number(tabElement[y].key!)
        if(( x < testElement.length && y < tabElement.length) && keya! < keyb!){
            listELement.push(testElement[x])
            x++
        }
        else if(( x < testElement.length && y < tabElement.length) && keya! > keyb!){
            listELement.push(tabElement[y])
            y++
        }
        else if(x >= testElement.length && y < tabElement.length){
            listELement.push(tabElement[y])
            y++
        }
        else if(y >= tabElement.length && x < testElement.length){
            listELement.push(testElement[x])
            x++
        }
        inRange = x <= testElement.length && y <= tabElement.length
    }
    return listELement
}

export default function ListData({ type }: GameType) {

    return (
        <>
            {setupComponents(type)}
            
        </>
    )
}

function alertCompleted(type:string) {
    toast.info("This " + type + " has already been completed",{
        toastId:"completed-toast",
        theme: "dark"}
    )
}
