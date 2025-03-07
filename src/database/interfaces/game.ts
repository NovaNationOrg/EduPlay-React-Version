export interface Game{
    gameNum?:number;
    game_code:string;
    game_id:string;
    date:Date;
}

export interface GameResults{
    id:number
    game_id:string
    correct:number
    incorrect:number
    date:Date
    score: number
}