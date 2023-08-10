<template>
    <div class="btn-container">
        <div class="seperated-cont flex flex-col gap-2 mx-2 mb-2" v-if="showSeperated">
            <div class="plus-btns-cont flex gap-4"><v-btn v-for="num in gameStore.gameSettings.buttons" density="compact"
                    min-width="3.3rem" class="plus-btn" @click="gameStore.changePoints(props.index, '+', num)">+{{ num
                    }}</v-btn>
            </div>
            <div class="minus-btns-cont  flex  gap-4"><v-btn v-for="num in gameStore.gameSettings.buttons" density="compact"
                    min-width="3.3rem" class="minus-btn" @click="gameStore.changePoints(props.index, '-', num)">-{{ num
                    }}</v-btn>
            </div>
        </div>
        <div v-if="!showSeperated" class="flex - gap-4 mb-2 mx-4">
            <div class="plus-btns-menu">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn class="plus-btn" color="white" v-bind="props">
                            <v-icon color="#0E3600">mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-for="num in gameStore.gameSettings.buttons"
                            class="cursor-pointer text-center plus-li w-full"
                            @click="gameStore.changePoints(props.index, '+', num)">
                            {{ num }}
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div class="minus-btns-menu">
                <v-menu open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn class="minus-btn" color="white" v-bind="props">
                            <v-icon color="#630000">mdi-minus</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-for="num in gameStore.gameSettings.buttons"
                            class="cursor-pointer text-center minus-li w-full"
                            @click="gameStore.changePoints(props.index, '-', num)">
                            {{ num }}
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore()
//const { avatarsToChange } = storeToRefs(gameStore)
const props = defineProps({
    width: { type: Number, required: true },
    index: { type: Number, required: true },
})

const showSeperated = computed((): boolean => {
    const btnsNumber = gameStore.gameSettings.buttons.length;
    //each btn = 65 px + 16 for each gap + 0.25rem * 2  as a mrgin from the sides
    return 65 * btnsNumber + (16 * (btnsNumber - 1)) + 8 < (props.width / 2) ? true : false
})



</script>

<style>
.plus-btn {
    border-radius: 0.3125rem;
    border: 1px solid #0E3600;
    background: #FFF;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.65);

}

.minus-btn {
    border-radius: 0.3125rem;
    border: 1px solid #630000;
    background: #FFF;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.65);
}

.minus-btn:hover,
.minus-li:hover {
    background: #FF3636;
    color: white;
}

.plus-btn:hover,
.plus-li:hover {
    background: #1FDC00;
    color: white;
}
</style>

