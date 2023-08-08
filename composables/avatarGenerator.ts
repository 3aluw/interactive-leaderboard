import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import{Options} from "@dicebear/open-peeps"

import { IAvatar } from 'store/interfaces';



type faceType = Options["face"]
type headType = Options["head"]

const createARandomNumber=(min:number, max:number):number=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


  //faces orginized by emotion
const happyFaces: faceType = [
  'smileTeethGap',
  'smile',
  'smileBig',
  'smileLOL',
  'smileTeethGap',
  'lovingGrin1',
  'lovingGrin2','eatingHappy','calm','cute'
];

const sadFaces:faceType = [
  'angryWithFang',
  'awe',
  'cheeky',
  'concerned',
  'concernedFear',
  'fear',
  'hectic',
  'rage',
  'solemn',
  'suspicious',
  'tired',
  'veryAngry', 'eyesClosed', 'serious'
];
const normalFaces:faceType = [
  "blank",
  "contempt",
  "driven",
  "explaining",
  "old"
]

const heads: headType = [
  'afro',
  'bangs',
  'bangs2',
  'bantuKnots',
  'bear',
  'bun',
  'bun2',
  'buns',
  'cornrows',
  'cornrows2',
  'dreads1',
  'dreads2',
  'flatTop',
  'flatTopLong',
  'grayBun',
  'grayMedium',
  'grayShort',
  'hatBeanie',
  'hatHip',
  'hijab',
  'long',
  'longAfro',
  'longBangs',
  'longCurly',
  'medium1',
  'medium2',
  'medium3',
  'mediumBangs',
  'mediumBangs2',
  'mediumBangs3',
  'mediumStraight',
  'mohawk',
  'mohawk2',
  'noHair1',
  'noHair2',
  'noHair3',
  'pomp',
  'shaved1',
  'shaved2',
  'shaved3',
  'short1',
  'short2',
  'short3',
  'short4',
  'short5',
  'turban',
  'twists',
  'twists2',
]


const generateFace =( face:'normalFaces'| 'happyFaces' | 'sadFaces') : faceType=>{
let faceArray : faceType = []
const usedArrays ={
  'normalFaces' : normalFaces,
  'happyFaces' : happyFaces,
  'sadFaces' : sadFaces,
}
const randomIndex = createARandomNumber(0, (usedArrays[face].length-1))
faceArray.push(usedArrays[face][randomIndex])
return faceArray
}

const generateHead = ():headType=>{
let headArray: headType = []
headArray.push(heads[createARandomNumber(0,(heads.length-1))])
return headArray
}

  export default function (seed:string,  face:'normalFaces'| 'happyFaces' | 'sadFaces', head?:headType): [string,IAvatar] {
  
    let faceArray:faceType = generateFace(face);
   let headArray : headType = head ?? generateHead()

//generate a seed
if(seed.length == 0){seed = Math.random().toString(36).substring(2,10)}

let avatarObj: IAvatar = {"seed": seed, "face": faceArray , "head" : headArray}

let avatarSvg =  createAvatar(openPeeps,{
    seed : seed,
    facialHairProbability: 10,
    accessoriesProbability: 10, 
    head: headArray,
    face: faceArray 

}).toString()


return[ avatarSvg, avatarObj]
  }