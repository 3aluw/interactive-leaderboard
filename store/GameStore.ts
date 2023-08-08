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

//start form 
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

const randomizeAll = (property:"colors"|"avatars"|"names")=>{
switch(property){
  case"colors": teams.value.forEach((el,index)=>{changeColor(index)}); break;
  case"avatars": teams.value.forEach((el,index)=>{changeAvatar(index,'normalFaces',false)}); break;
  case"names": teams.value.forEach((el,index)=>{changeName(index)}); break;
}
}

const changeAvatar=(index:number, face:'normalFaces'| 'happyFaces' | 'sadFaces' = "normalFaces", isSameHead : boolean)=>{
  const {seed,head}=avatars.value[index];
 if(!isSameHead) {

  const [svg, avatarObj] = avatarGenerator('', face)
avatars.value[index] = avatarObj;
const teamIndex: number =  teams.value.findIndex((team)=> team.id === index )
teams.value[teamIndex].avatar = svg
} else{
 const avatarIndex: number =  teams.value[index].id;
 const {seed,head}=avatars.value[avatarIndex];
const [svg, avatarObj] = avatarGenerator(seed, face,head)
avatars.value[avatarIndex] = avatarObj;
teams.value[index].avatar = svg
}
}


//during the game 
const changePoints = (index:number, type:"+"|"-", pts:number)=>{
const team = teams.value[index];
const upTeam = teams.value[index-1]
const downTeam =  teams.value[index+1]


team.history.push(team.points)
type === '+' ? team.points += pts : team.points -= pts;

//check if the reranking is needed
if(team.points > upTeam?.points || team.points < downTeam?.points) { changeRank();
  setTimeout(()=>{manageAvatarsChange(index, team.id)},500)  }
}

const changeRank =()=>{ 
  const sortedArray = teams.value.sort((a, b) => b.points - a.points);
  teams.value = sortedArray;
  }
  
 //array to be watched to scale the avatars up
const avatarsToChange: Ref<number[]> = ref([])
const clearAvatarsToChangeArray = ()=>{avatarsToChange.value = [];console.log(avatarsToChange.value)}


const manageAvatarsChange=(previousRank:number, teamId:number)=>{
const participantsNumber = gameSettings.value.participantsNumber;
const currentRank = teams.value.findIndex((team)=>team.id === teamId);
const pushCurrentRank =()=>{ avatarsToChange.value.push(currentRank);}
const changeInRank = -(currentRank - previousRank)/participantsNumber;


//if the team got up 
if(changeInRank>0){ 
  //check if the team is in the top 1/4
  const topQuarter = (currentRank+1) >= (participantsNumber/4) ? true : false

   if(generateOdds(changeInRank)){changeAvatar(currentRank,"happyFaces",true);pushCurrentRank()}
   else if( topQuarter && generateOdds(0.5) ){changeAvatar(currentRank,"happyFaces",true);pushCurrentRank()}
   //sad face to the outpaced team
   if(  generateOdds(0.05)){changeAvatar((currentRank+1),"sadFaces",true);avatarsToChange.value.push(currentRank+1)}
}
//if the team gone down 
else if(changeInRank<0){ 
 
 const absChange = Math.abs(changeInRank)

  //check if the  team is in the bottom 1/4
  const bottomQuarter = (currentRank+1) >= (participantsNumber-(participantsNumber/4)) ? true : false;

   if(generateOdds(absChange)){changeAvatar(currentRank,"sadFaces",true);pushCurrentRank() ;  console.log('1')}
   else if( bottomQuarter && generateOdds(0.7) ){changeAvatar(currentRank,"sadFaces",true);pushCurrentRank();  console.log('2')}
   //happy face for the new up team
   if(  generateOdds(0.05)){changeAvatar((currentRank-1),"happyFaces",true);avatarsToChange.value.push(currentRank-1); ;  console.log('3')}
  }


}

const generateOdds = (num:number)=>{
return Math.random() < num ? true : false 
}




return {
    gameSettings, teams,changeName, changeColor,
     avatars , addATeam, changeAvatar, randomizeAll,
     changePoints, avatarsToChange, clearAvatarsToChangeArray
  };
},
/*
{
  persist: true
}*/

);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
