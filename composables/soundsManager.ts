const soundSrcs = {
    "final": [
        "132811459451037.mp3",
        "132841459451038.mp3",
        "142751459958516.mp3",
        "150781460144835 (1).mp3"
    ],
    "happy": [
        "162141460569192.mp3",
        "178801464188989.mp3",
        "179011464199145.mp3",
        "183281464630669.mp3",
        "183311464630670.mp3",
        "18843CartoonAccentDIGIJ06-16.mp3",
        "18860CartoonLaugh_DIGIJ04-41.mp3",
        "18877LaughSillyMaleClosPE130601.mp3",
        "18887ToyDIGIJ08-18.mp3",
        "evil-laugh-89423.mp3",
        "happy-huming-6202.mp3",
        "happy-noisesmp3-14568.mp3",
        "Aliens-Monsters-01.mp3",
        "cartoon-laugh-voice",
        "cartoon-voice-laugh-1.mp3",
        "funny-squeaky-toy.mp3",
        "kiss.mp3"
    ],
    "sad": [
        "139141459871785.mp3",
        "139151459871785.mp3",
        "142691459958514.mp3",
        "142701459958514.mp3",
        "149551460130121.mp3",
        "149561460130121.mp3",
        "149761460135876.mp3",
        "149771460135876.mp3",
        "149781460135876.mp3",
        "178691464188839.mp3",
        "178711464188839.mp3",
        "178731464188900.mp3",
        "178781464188901.mp3",
        "18954CrowdLaughterDIGIVI1-23.mp3",
        "19235GaspingStrainingToPE132001.mp3",
        "19236HumanBabyDIGII01-01.mp3",
        "Aliens-Monsters-12.mp3",
        "kid-screaming-329317",
        "cartoon-laugh-voice.mp3",
        "fart.mp3",
        "whistle.mp3",
        "sad-trombone.mp3"
    ],
    "music": [
        "177291462205353.mp3",
        "177311462205355.mp3",
        "177461462212095.mp3",
        "March-of-the-ducklings.mp3",
    ],
    "before": [
        "177301462205354.mp3",
        "game-show-suspense.mp3",
    ]
}
function getRandomAudio(mode: keyof typeof soundSrcs) {
    const randomIndex = Math.floor(Math.random() * soundSrcs[mode].length);
    return soundSrcs[mode][randomIndex];
}
export default function (mode: keyof typeof soundSrcs) {

    const randomAudioFile = getRandomAudio(mode);
    const audioSource = `/sound effects/${mode}/${randomAudioFile}`;

    return audioSource

}