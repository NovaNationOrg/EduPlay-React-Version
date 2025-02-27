import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../database/db"
import { Link, useNavigate } from "react-router-dom"
import { JSX, MouseEventHandler } from "react"

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
    const jeopardyGameData = useLiveQuery(() => db.jeopardyData.toArray())
    const themes = [...new Set(jeopardyGameData?.map(record => record.theme))]

    return themes
}

function loadTier() {
    const selectedCategory = sessionStorage.getItem("category")

    if (selectedCategory != null) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const jeopardyGameData = useLiveQuery(() => db.jeopardyData.where("points").equals(selectedCategory).toArray())
        const tiers = [...new Set(jeopardyGameData?.map(record => record.points))]

        return tiers
    }
}

export default function ListData({ type }: GameType) {

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

    if (type == "Category")
        tabElement = themes.map((theme, i) =>
            <Link className="tab-area" to={"/jeopardyGame"} key={i}>
                <button className="main-tab" onClick={() => {
                    saveCategory(theme);
                    navigate("/jeopardyGame");
                }}>
                    {theme}</button>
            </Link>
        );
    else
        if (type == "Tier") {
            if (tiers != undefined)
                tabElement = tiers.map((tier, i) =>
                    <Link className="tab-area" to={"/jeopardyGame/question"} key={i}>
                        <button className="main-tab" onClick={() => {
                            saveTier(tier.toString());
                        }}>
                            ${tier}</button>
                    </Link>
                );
        }


    return (
        <>
            {tabElement}
        </>
    )
}