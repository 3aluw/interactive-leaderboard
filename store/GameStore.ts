import { defineStore, acceptHMRUpdate } from "pinia";
import{IGameSettings,
  ITeam} from 'store/interfaces'

export const useGameStore = defineStore("GameStore", () => {
  

let currentGameSettings : IGameSettings
let teams : ITeam[]





  return {
   
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
