import { defineStore, acceptHMRUpdate } from "pinia";
import{IGameSettings,
  ITeam, IAvatar} from 'store/interfaces'

export const useGameStore = defineStore("GameStore", () => {
  


const gameSettings: Ref<IGameSettings> = ref({
  gameType: '',
  initialPoints: 0,
  participantsNumber: 3,
  winAt: 10,
  buttons: [2, 5],
})

let teams : Ref<ITeam[]> =ref([]) 


const generateATeam = (): ITeam => {
  const newAvatar = avatarGenerator("", 'normalFaces')
  //create a new team teams
  let newTeam: ITeam = {
      id: teams.value.length,
      name: '',
      color: colorGenerator(),
      points: gameSettings.value.initialPoints,
      history: [],
      avatar: newAvatar[0]
  }
  //push the created avatar to avatars obj
  assignAvatar(newTeam.id, newAvatar[1])
  return newTeam
}
const addATeam = ()=>{teams.value.push(generateATeam())}


let avatars : Ref<IAvatar[]> = ref([])
const assignAvatar = (index: number, avatarObj: IAvatar)=>{
  avatars.value[index] = avatarObj
}


  return {
    gameSettings, teams, avatars , addATeam,
  };
},
/* Enable this to persist this store : more info : https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html
{
  persist: true}
*/
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
