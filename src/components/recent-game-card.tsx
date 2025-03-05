import "../styles/recent-games.css"

interface RecentGameProps{
    cardClass:string,
    game_id:string
    title_date:Date
}
export function RecentGameCard({cardClass,game_id,title_date}:RecentGameProps){
    return(
        <div className = "recent-game-container">
            <div className={`card-type-${cardClass}`} key={game_id}>
                {title_date.getFullYear()}
            </div>
        </div>
    )
}