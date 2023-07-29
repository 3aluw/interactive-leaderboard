interface IGameSettings {
    gameType : "turn-based" | 'real-time' | '',
    initialPoints :number ,
    participantsNumber: number,
    winAt : number,
    plusButtons : number[],
    minusButtons : number[],
    sounds?: boolean,
    avatars?: boolean,
  }
interface ITeam {
  name : string,
  points: number,
  history: string[],
  avatar? : string
}

export{IGameSettings,
  ITeam
}