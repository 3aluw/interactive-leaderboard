<template>
    <div class="playground-container flex gap-4 flex-wrap" ref="container">
        <div v-for="(team, index) in gameStore.teams"
            :style="{ 'background-color': team.color, 'width': widths[index] + 'px' }">
            <div class="flex">
                <v-avatar size="x-large" class="avatar-cont relative">
                    <div v-html="team.avatar" class="w-full h-full absolute "></div>
                </v-avatar>
                <p> {{ team.name }}</p>
            </div>
            <p>{{ team.points }}</p>
            <div class="btn-container flex gap-1">
                <v-btn v-for="btn in gameStore.gameSettings.buttons">{{ btn }}</v-btn>
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

const sigleWidthGenerator = (index: number) => {
    let schema: number[] = largeVw.value ? [1, 2, 3] : midVw.value ? [2, 3] : [3]


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
    const width = ((playgroundWidth.value - (16 * (res - 1))) / res)
    widths.value.push(width)
    return res


}
onMounted(() => {

    playgroundWidth.value = container.value?.getBoundingClientRect().width ?? 300;

    gameStore.teams.forEach((el, index) => sigleWidthGenerator(index))

    console.log(playgroundWidth.value, widths.value)
})
</script>