<template>
    <div ref="container" class="w-full">
        <TransitionGroup name="list" tag="div" class="playground-container flex gap-3 flex-wrap">
            <div class="team-cont flex-wrap" v-for="(team, index) in gameStore.teams" :key="team.id"
                :style="{ 'background-color': team.color, 'width': widths[index] + 'px' }">
                <div class="team-infos text-center">
                    <div class="flex align-center flex-wrap">
                        <v-avatar size="x-large" class="avatar-cont relative">
                            <div v-html="team.avatar" class="w-full h-full absolute "></div>
                        </v-avatar>
                        <p class="team-name"> {{ team.name }}</p>
                    </div>
                    <p class="points">{{ team.points }}</p>
                </div>
                <div class="btn-container flex gap-1 flex-col">
                    <div class="plus-btns">
                        <buttons :width="widths[index]" :index=index v-if="widths.length" @click="isGameFinished" />
                    </div>

                </div>

            </div>
        </TransitionGroup>
    </div>
    <v-dialog class="pb-8" v-model="showLeaderboardDialog" persistent max-width="800px">
        <Leaderboard @retry-game="retryGame" :size="'dialog'" />
    </v-dialog>
</template>
<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore()
useHead({
    script: [{ hid: 'confetti', src: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js', defer: true },
    ]
})

const container = ref<HTMLInputElement | null>(null);
let playgroundWidth: Ref<number> = ref(300);

const showLeaderboardDialog = ref(false)

//breakpoints
const breakpoints = useBreakpoints({
    phone: 480,
    tablet: 768,
    // laptop: 1024,
})
//const smallVw = breakpoints.smallerOrEqual('phone');
const midVw = breakpoints.between("phone", "tablet");
const largeVw = breakpoints.greaterOrEqual("tablet");

const widths: Ref<number[]> = ref([])

const widthsGenerator = () => {
    widths.value = [];
    let schema: number[] = largeVw.value ? [1, 2, 3] : midVw.value ? [1, 2] : [1]

    gameStore.teams.forEach((el, index) => {
        let res: number = 1;
        for (let i = 0; i < schema.length; i++) {
            let currentValue = schema[0]
            //find the sum to the current i
            schema.reduce((acc, cr, cIndex) => {
                if (cIndex === i) { currentValue = (acc + cr) }
                return acc + cr
            })

            if (index < currentValue) {
                res = schema[i]
                break;
            } else { res = schema[schema.length - 1] }
        }
        //genrate the width of the item by finding the available space ( removing all the gaps on the same line ) then subtruct it on the number the items on the line . 
        const width = ((playgroundWidth.value - (12 * (res - 1))) / res)
        widths.value.push(width)
    })
}


onMounted(() => {
    playgroundWidth.value = container.value?.getBoundingClientRect().width ?? 300;
    widthsGenerator()
    window.addEventListener('resize', onResize)
})

const manageMusic = ()=>{
     if(gameStore.gameSettings.music){
        gameStore.toggleMusic()
        gameStore.toggleMusic("music") 
     }
}

const onResize = () => {
    playgroundWidth.value = container.value?.getBoundingClientRect().width ?? 300;
    widthsGenerator()
}

watch(() => gameStore.avatarsToChange.length, () => {
    gameStore.avatarsToChange.forEach((index) => { scaleAvatar(index) })
    gameStore.clearAvatarsToChangeArray()
})

const scaleAvatar = (index: number) => {
    const applyClasses = ['scaled-avatar-one', 'scaled-avatar-two', 'scaled-avatar-three',]
    const selectedClass = applyClasses[Math.floor(Math.random() * 3)]
    console.log(selectedClass)
    const avatarsList = document.querySelectorAll('.v-avatar');
    avatarsList[index]?.classList.add(selectedClass)
    setTimeout(() => avatarsList[index]?.classList.remove(selectedClass), 2000)

}
const isGameFinished = () => {
    if (gameStore.teams[0].points >= gameStore.gameSettings.winAt) {
        showLeaderboardDialog.value = true;
        gameStore.reactionSoundPlayer('final')
    }
}
const retryGame = () => {
    gameStore.resetGame();
    showLeaderboardDialog.value = false;
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Joti+One&display=swap');

.team-name {
    font-family: 'Bungee Shade', cursive;
    text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.50);
    color: #FFF;
    font-size: 1.5rem;

}

.points {
    font-family: 'Joti One', cursive;
    font-size: 2rem;
    color: white;
}

.team-cont {
    max-height: 200px;
    display: flex;

    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-around;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0.5;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}

.v-avatar {
    transition: all 1s ease-in-out;
}

.scaled-avatar-one {
    transform: scale(2) translateY(1rem)
}

.scaled-avatar-two {
    transform: scale(1.5) translateY(1.2rem);

}

.scaled-avatar-three {
    transform: scale(1.5) rotate(45deg);
}
</style>