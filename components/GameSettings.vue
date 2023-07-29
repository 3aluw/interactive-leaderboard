<template>
    <v-sheet width="1000" class="mx-auto px-4">
        <h1 class="text-center text-3xl my-2 mb-10 ">Game settings</h1>
        <v-form @submit.prevent v-model="isFormValid">
            <v-container fluid>
                <v-row>
                    <v-col cols="12" md="4">
                        Game type:
                    </v-col>
                    <v-radio-group v-model="gameSttings.gameType" inline :rules="requiedRule">
                        <v-col cols="12" md="6">
                            <v-radio label="turn-based" value="turn-based"></v-radio></v-col>
                        <v-col cols="12" md="6"> <v-radio label="real-time" value="real-time"
                                v-model="gameSttings.gameType"></v-radio></v-col>
                    </v-radio-group>
                </v-row>


                <v-row>
                    <v-col cols="6"><v-text-field v-model.number="gameSttings.initialPoints" label="initial points"
                            type="number" variant="outlined" hide-spin-buttons placeholder="each team will start with...pts"
                            :rules="pointsRules"></v-text-field></v-col>
                    <v-col cols="6"><v-text-field v-model.number="gameSttings.participantsNumber"
                            label="number of participants" type="number" variant="outlined"
                            :rules="pointsRules"></v-text-field>
                    </v-col>
                    <v-col cols="12 flex flex-inline gap-1 items-center">

                        <p>win at</p> <v-tooltip text="points required for a participant to win 🎉" location="bottom">
                            <template v-slot:activator="{ props }"><v-icon v-bind="props" size="x-small"
                                    icon="mdi-information-outline"></v-icon></template></v-tooltip> :<v-slider
                            v-model="gameSttings.winAt" class="ml-8" :max="500" :min="10" thumb-label :step="5"
                            hide-details></v-slider>
                    </v-col>
                </v-row>

                <v-row class="items-center">
                    <p>buttons <v-tooltip text="add buttons to use latter to increase or decrease points for participants"
                            location="bottom">
                            <template v-slot:activator="{ props }"><v-icon v-bind="props" size="x-small"
                                    icon="mdi-information-outline"></v-icon></template></v-tooltip> : </p>

                    <v-col cols="3" sm='1' v-for="btn in  gameSttings.plusButtons ">
                        <v-hover v-slot="{ isHovering, props }"><v-btn v-bind="props"
                                :class="{ '!bg-red-500': isHovering }">
                                <p v-if="!isHovering">{{ btn
                                }} </p><v-icon v-if="isHovering"
                                    class="d-flex transition-fast-in-fast-out v-card--reveal " icon="
                                    mdi-close-circle-outline" color="white" size="large"></v-icon>
                            </v-btn> </v-hover></v-col>
                    <v-col cols="3" sm="1"> <v-text-field type="number" density="compact" placeholder='...'
                            class="entry-btn font-mono " hide-details></v-text-field></v-col>
                </v-row>

                <v-row class="mb-10">
                    <v-col cols="6"> <v-tooltip activator="parent" location="top">the app will generate an avatar for every
                            participant</v-tooltip><v-select :rules="requiedRule" label="Avatars"
                            v-model="gameSttings.avatars" :items="onOffToBoolean" item-title="title" item-value="value"
                            variant="outlined">
                        </v-select></v-col>

                    <v-col cols="6"> <v-tooltip activator="parent" location="top">the app will make funny sounds during the
                            game 😃</v-tooltip><v-select :rules="requiedRule" label="sounds" v-model="gameSttings.sounds"
                            :items="onOffToBoolean" item-title="title" item-value="value"
                            variant="outlined"></v-select></v-col>
                </v-row>


            </v-container>
            {{ isFormValid }}
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
import { IGameSettings } from 'store/interfaces'
const GameStore = useGameStore()

const onOffToBoolean = ref([
    { title: "on", value: true, },
    { title: "off", value: false, }

])

const gameSttings: Ref<IGameSettings> = ref({
    gameType: '',
    initialPoints: 0,
    participantsNumber: 3,
    winAt: 10,
    plusButtons: [2, 5],
    minusButtons: [2, 5],
})

const isFormValid = ref()

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

const pointsRules = [
    (value: number) => {
        if (Number.isInteger(value)) return true

        return 'please fill this field with a number'
    }
]
const requiedRule = [
    (value: string) => {
        if (value) return true

        return 'This field is required'

    }
]
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
    background: white;
}
</style>