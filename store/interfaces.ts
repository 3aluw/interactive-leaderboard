interface IGameSettings {
    gameType : "turn-based" | 'real-time' | '',
    initialPoints :number ,
    participantsNumber: number,
    winAt : number,
    buttons : number[],
    sounds?: boolean,
    avatars?: boolean,
  }
interface ITeam {
  name : string,
  color: string,
  points: number,
  history: string[],
  avatar? : string
}

export{IGameSettings,
  ITeam
}