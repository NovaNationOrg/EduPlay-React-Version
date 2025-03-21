import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../database/db';
import { RecentGameCard } from './recent-game-card';


export function RecentGamesList(){
    const games = useLiveQuery(()=> db.gameResults
    .toArray())
    
    if(!games)
        return

    const reversedGames = [...games].reverse()
    return(
        <div className='recent-games-area'>
             {reversedGames.map((game) => (
                <RecentGameCard key={game.game_id} cardClass={game.game_code}
                 game_id={game.game_id} title_date ={game.date} 
                 correct={game.correct} incorrect={game.incorrect} 
                 score={game.score}/>
            ))}
        </div>
    )
}   