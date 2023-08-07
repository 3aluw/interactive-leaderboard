import{Options} from "@dicebear/open-peeps"
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
  history: number[],
  avatar : string,
  id: number
}
interface IAvatar{
  seed: string,
  head:Options["head"],
  face: Options["face"],
}

export{IGameSettings,
  ITeam, IAvatar
}