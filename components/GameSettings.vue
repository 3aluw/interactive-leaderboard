<template>
    <v-sheet width="1000" class="mx-auto px-4">
        <h1 class="text-center text-3xl my-2 mb-10 ">Game settings</h1>
        <v-form @submit.prevent>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="4">
                        Game type:
                    </v-col>
                    <v-radio-group v-model="gameType" inline>
                        <v-col cols="12" md="6">
                            <v-radio label="turn-based" value="turn-based"></v-radio></v-col>
                        <v-col cols="12" md="6"> <v-radio label="real-time" value="real-time"></v-radio></v-col>
                    </v-radio-group>
                </v-row>


                <v-row>
                    <v-col cols="6"><v-text-field label="initial points" type="number" variant="outlined" hide-spin-buttons
                            placeholder="each team will start with...pts"></v-text-field></v-col>
                    <v-col cols="6"><v-text-field label="number of participants" type="number"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12"> <v-slider :max="500" :min="10" thumb-label :step="5" label="win at"
                            hide-details></v-slider></v-col>
                </v-row>
                <v-row>
                    buttons:
                    <v-col cols="1"><v-text-field class="entry-btn font-mono " hide-details></v-text-field></v-col>
                </v-row>

                <v-row class="mb-10">
                    <v-col cols="6"><v-select label="Avatars" :items="['ON, OFF']" variant="outlined"></v-select></v-col>
                    <v-col cols="6"><v-select label="sounds" :items="['ON, OFF']" variant="outlined"></v-select></v-col>
                </v-row>


            </v-container>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
import { gameSettings } from 'store/interfaces'

const GameStore = useGameStore()

let gameType: Ref<'real-time' | 'turn-based' | ''> = ref('');


// emit and update planInfos
/*
const props = defineProps({
    modelValue: Object,
})
const emit = defineEmits(['update:modelValue'])
const planInfos = computed({
    get() { return props.modelValue },
    set(newValue) { emit("update:modelValue", newValue) }
}
)
*/

/*form rules *//*
const reqiuiredRule = [
    value => {
        if (value) return true

        return 'This field is required'
    }]
const checkTypeRule = [
    () => {
        return planInfos.value.seatType ? true : "Chose a type"
    }
]

const nameRule = [
    value => {
        if (value) return true

        return 'Name is requred.'
    },
    value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
    },
]
*/
</script>
<style scoped>
.v-sheet {
    background: #FFF9B8;
}

.v-sheet>h1 {
    color: #FF3636;
    text-align: center;
    font-family: Nunito Sans;
    font-size: 2rem;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
}


.types-cont .v-label {
    opacity: 100;
}

::v-deep(input::-webkit-outer-spin-button),
::v-deep(input::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
}

.entry-btn {
    background: rgba(255, 102, 102, 0.384);
}
</style>