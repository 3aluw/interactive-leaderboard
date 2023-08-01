import { randomHex } from "@nextcss/color-tools";

const CreateARandomNumber=(min:number, max:number):number=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function (): string {
  return  randomHex(CreateARandomNumber(70,99), CreateARandomNumber(40,70))
}
