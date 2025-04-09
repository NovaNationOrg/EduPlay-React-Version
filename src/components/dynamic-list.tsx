import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../database/db"
import { Link, useNavigate } from "react-router-dom"
import { JSX, MouseEventHandler } from "react"
import { toast } from "sonner"
import { combineElements } from "./element-merger"

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
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData.where('game_id').equals(localStorage.getItem("curr_game")!).toArray())
    const themes = [...new Set(jeopardyGameData?.map((record) => (record.theme)))]

    for(let i=0;i < themes.length;i++){
        themes[i]+=i+1
    }
    return themes
}

function loadTier() {
    const selectedCategory = sessionStorage.getItem("category")

    if (selectedCategory != null) {
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
    let listElement: JSX.Element[] = []
    if (type == "Category"){

        testElement = themes.filter((category) =>{
            if(isCompletedCategory(category.substring(0,category.length-1)))
                return category
        }).map((category) =>
            <div className = "tab-area" key={category.substring(category.length-1,category.length)}>
                <button className="main-tab-completed" onClick={() => {
                    toast.info("This category has already been completed",{id:"completed-toast"})
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
                        toast.info("This question has already been completed",{id:"completed-toast"})
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
        
    listElement = combineElements(testElement,tabElement)
    return listElement
}

export default function ListData({ type }: GameType) {

    return (
        <>
            {setupComponents(type)}
            
        </>
    )
}

