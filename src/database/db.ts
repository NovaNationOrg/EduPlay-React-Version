import Dexie, { type EntityTable } from 'dexie';
import { Game } from './interfaces/game';
import { JeopardyGame } from './interfaces/jeopardy';
import { populate } from './scripts/populateDb'
import { GameResults } from './interfaces/game';

const db = new Dexie('EduPlayDB') as Dexie & {
    gameList: EntityTable<Game, 'gameNum'>;
    jeopardyData: EntityTable<JeopardyGame, 'id'>;
    gameResults: EntityTable<GameResults,'id'>;
}

db.version(1).stores({
    gameList: '++gameNum,game_code,game_id,date',
    jeopardyData: '++id,game_id,theme,question,answer,points,[game_id+points+theme]',
    gameResults: "++id,game_id,[game_id+correct],[game_id+incorrect],[game_id+date],score"
})

db.on('populate', populate);

export { db }







