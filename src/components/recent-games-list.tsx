import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../database/db';
import { RecentGameCard } from './recent-game-card';

export function RecentGamesList(){
    const games = useLiveQuery(()=> db.gameList.toArray())
    if(!games)
        return

    const reversedGames = [...games].reverse()
    return(
        <div className='recent-games-area'>
             {reversedGames.map((game) => (
            <RecentGameCard key="_1_" cardClass={game.game_code} game_id={game.game_id} title_date ={game.date} />
            ))}
        </div>
    )
}