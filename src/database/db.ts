import Dexie, { type EntityTable } from 'dexie';
import { Game } from './interfaces/game';
import { JeopardyGame } from './interfaces/jeopardy';
import { populate } from './scripts/populateDb';

const db = new Dexie('EduPlayDB') as Dexie & {
    gameList: EntityTable<Game, 'gameNum'>;
    jeopardyData: EntityTable<JeopardyGame, 'id'>;

}

db.version(1).stores({
    gameList: '++gameNum,game_code,game_id,date',
    jeopardyData: '++id,game_id,theme,question,answer,points,[points+theme]',
})

db.on('populate', populate);

export { db }







