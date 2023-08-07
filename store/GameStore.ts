import { defineStore, acceptHMRUpdate } from "pinia";
import{IGameSettings, ITeam, IAvatar} from 'store/interfaces'
import  names from '~/assets/names.json' 


export const useGameStore = defineStore("GameStore", () => {
  


const gameSettings: Ref<IGameSettings> = ref(
  {
  gameType: '',
  initialPoints: 0,
  participantsNumber: 3,
  winAt: 10,
  buttons: [2, 5],
}
)

 let teams : Ref<ITeam[]> =ref([]) 
let avatars : Ref<IAvatar[]> = ref([])

const generateATeam = (): ITeam => {
  const [svg, avatarObj] = avatarGenerator("", 'normalFaces')
  //create a new team teams
  let newTeam: ITeam = {
      id: teams.value.length,
      name: '',
      color: colorGenerator(),
      points: gameSettings.value.initialPoints,
      history: [],
      avatar: svg
  }
  //push the created avatar to avatars obj
  assignAvatar(newTeam.id, avatarObj)
  return newTeam
}
const addATeam = ()=>{teams.value.push(generateATeam())}


const changeName = (index:number) =>{  
  const randomName =  names[Math.floor(Math.random() * names.length)]
  teams.value[index].name = randomName
}

const changeColor = (index:number)=>{
  teams.value[index].color = colorGenerator()
}



const assignAvatar = (index: number, avatarObj: IAvatar)=>{
  avatars.value[index] = avatarObj
}

const changeAvatar=(index:number, face:'normalFaces'| 'happyFaces' | 'sadFaces' = "normalFaces", isSameHead : boolean)=>{
const {seed,head}=avatars.value[index];
 if(!isSameHead) {
  const [svg, avatarObj] = avatarGenerator('', face)
avatars.value[index] = avatarObj;
const teamIndex: number =  teams.value.findIndex((team)=> team.id === index )
teams.value[teamIndex].avatar = svg
}
}


const randomizeAll = (property:"colors"|"avatars"|"names")=>{
switch(property){
  case"colors": teams.value.forEach((el,index)=>{changeColor(index)}); break;
  case"avatars": teams.value.forEach((el,index)=>{changeAvatar(index,'normalFaces',false)}); break;
  case"names": teams.value.forEach((el,index)=>{changeName(index)}); break;
}


}


  return {
    gameSettings, teams,changeName, changeColor,
     avatars , addATeam, changeAvatar, randomizeAll
  };
},
{
  persist: true}

);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
