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


let avatars : Ref<IAvatar[]> = ref([])



  return {
    gameSettings, teams, avatars
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
