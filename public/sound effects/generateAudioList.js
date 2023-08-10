const fs = require('fs');
const path = require('path');

const audioFiles = [];

function getMP3Files(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && path.extname(file).toLowerCase() === '.mp3') {
      audioFiles.push(file);
    } else if (stats.isDirectory()) {
      getMP3Files(filePath);
    }
  });
}

getMP3Files('music'); // Assuming your .mp3 files are in the 'src' directory

console.log(audioFiles);
let soundSrcs = {
	"final" : [
  '13281_1459451037.mp3',
  '13284_1459451038.mp3',
  '14275_1459958516.mp3',
  '15078_1460144835 (1).mp3'
],
"happy":[
  '15079_1460144835.mp3',
  '16214_1460569192.mp3',
  '17880_1464188989.mp3',
  '17901_1464199145.mp3',
  '18328_1464630669.mp3',
  '18330_1464630669.mp3',
  '18331_1464630670.mp3',
  '18332_1464630670.mp3',
  '18334_1464630671.mp3',
  '18843_CartoonAccent_DIGIJ06-16.mp3',
  '18860_CartoonLaugh_DIGIJ04-41.mp3',
  '18877_LaughSillyMaleClos_PE130601.mp3',
  '18887_Toy_DIGIJ08-18.mp3',
  'Aliens-Monsters-01.mp3'
],
"sad":[
  '13914_1459871785.mp3',
  '13915_1459871785.mp3',
  '14269_1459958514.mp3',
  '14270_1459958514.mp3',
  '14955_1460130121.mp3',
  '14956_1460130121.mp3',
  '14976_1460135876.mp3',
  '14977_1460135876.mp3',
  '14978_1460135876.mp3',
  '17869_1464188839.mp3',
  '17871_1464188839.mp3',
  '17873_1464188900.mp3',
  '17878_1464188901.mp3',
  '18954_CrowdLaughter_DIGIVI1-23.mp3',
  '19235_GaspingStrainingTo_PE132001.mp3',
  '19236_HumanBaby_DIGII01-01.mp3',
  'Aliens-Monsters-12.mp3'
],
"music":[
  '17729_1462205353.mp3',
  '17730_1462205354.mp3',
  '17731_1462205355.mp3',
  '17746_1462212095.mp3',
  'March-of-the-ducklings.mp3'
]
}