<template>
    <div class="btn-container">
        <div class="seperated-cont" v-if="showSeperated">
            <div class="plus-btns-cont"><v-btn v-for="btn in gameStore.gameSettings.buttons">{{ btn }}</v-btn></div>
            <div class="minus-btns-cont"><v-btn v-for="btn in gameStore.gameSettings.buttons">{{ btn }}</v-btn></div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore()
const props = defineProps({
    width: { type: Number, required: true },
    index: { type: Number, required: true },
})

const showSeperated = computed((): boolean => {
    const btnsNumber = gameStore.gameSettings.buttons.length;
    return 65 * btnsNumber + 40 < props.width ? true : false
})
</script>

