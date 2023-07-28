interface gameSettings {
    gameType : "turn-based" | 'real-time',
    initialPoints :number ,
    winAt : number,
    plusButtons : number[],
    minusButtons : number[],
    sounds: boolean,
    avatars : boolean,
  }
interface team {
  name : string,
  points: number,
  history: string[],
  avatar? : string
}

export{gameSettings,
    team
}