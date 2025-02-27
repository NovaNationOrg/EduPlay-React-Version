import { useNavigate } from "react-router-dom";
import "../../styles/Jeopardy/list-page.css"
import Header from '../../components/header'
import ListData from "../../components/dynamic-list";

function removeCategory() {
    sessionStorage.removeItem("category")
}

function removeTier() {
    sessionStorage.removeItem("tier")
}

export default function ListPage() {
    const navigate = useNavigate()

    return (
        <>
            <div className="panel">
                <Header gameClass="hangman-header" headerText="Jeopardy" />

                {sessionStorage.getItem("category") == null ? (
                    <>
                        <button className="return-button" onClick={() => {
                            removeCategory();
                            navigate("/")
                        }}>QUIT</button>
                        <header className="heading-text">Select a Category</header>
                        <ListData type="Category" />
                    </>
                ) : (
                    <>
                        <button className="return-button" onClick={() => {
                            navigate("/jeopardyGame")
                            removeTier()
                            removeCategory()
                        }}>QUIT</button>
                        <header className="heading-text">Select a Tier</header>
                        <ListData type="Tier" />
                    </>
                )}

            </div >
        </>
    )
}