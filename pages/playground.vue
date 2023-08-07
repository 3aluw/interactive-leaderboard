<template>
    <div class="playground-container flex gap-3 flex-wrap" ref="container">
        <div class="team-cont flex-wrap" v-for="(team, index) in gameStore.teams"
            :style="{ 'background-color': team.color, 'width': widths[index] + 'px' }">
            <div class="team-infos text-center">
                <div class="flex align-center">
                    <v-avatar size="x-large" class="avatar-cont relative">
                        <div v-html="team.avatar" class="w-full h-full absolute "></div>
                    </v-avatar>
                    <p class="team-name"> {{ team.name }}</p>
                </div>
                <p class="points">{{ team.points }}</p>
            </div>
            <div class="btn-container flex gap-1 flex-col">
                <div class="plus-btns">
                    <v-btn v-for="btn in gameStore.gameSettings.buttons">{{ btn }}</v-btn>
                </div>
                <div class="minus-btns"><v-btn v-for="btn in gameStore.gameSettings.buttons">{{ btn }}</v-btn></div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore()

const container = ref<HTMLInputElement | null>(null);
let playgroundWidth: Ref<number> = ref(300);


//breakpoints
const breakpoints = useBreakpoints({
    phone: 480,
    tablet: 768,
    // laptop: 1024,
})
const smallVw = breakpoints.smallerOrEqual('phone');
const midVw = breakpoints.between("phone", "tablet");
const largeVw = breakpoints.greaterOrEqual("tablet");



const widths: Ref<number[]> = ref([])

const widthsGenerator = () => {
    widths.value = [];
    let schema: number[] = largeVw.value ? [1, 2, 3] : midVw.value ? [2, 3] : [1]

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

const onResize = () => {
    playgroundWidth.value = container.value?.getBoundingClientRect().width ?? 300;
    widthsGenerator()

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
</style>