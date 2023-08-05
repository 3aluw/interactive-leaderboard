<template>
    <v-sheet width="1000" class="mx-auto px-4">
        <h1 class="text-center text-3xl my-2 mb-10 ">Game settings</h1>
        <v-form v-model="isFormValid">
            <v-table fixed-header height="300px">
                <thead>
                    <tr>
                        <th class="text-left">
                            <v-tooltip text="randomize colors" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props"
                                        @click="gameStore.randomizeAll('colors'), arrowRotator($event.target)"
                                        icon="mdi-cached" color="black" class="mr-4 arrow-icon">
                                    </v-icon> </template>
                            </v-tooltip>
                            color
                        </th>
                        <th class="text-left">
                            <v-tooltip text="randomize avatars" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props"
                                        @click="arrowRotator($event.target), gameStore.randomizeAll('avatars')"
                                        icon="mdi-cached" color="black" class="mr-4 arrow-icon">
                                    </v-icon></template>
                            </v-tooltip>
                            avatar
                        </th>
                        <th class="text-left">
                            <v-tooltip text="randomize names" location="bottom">
                                <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props"
                                        @click="arrowRotator($event.target), gameStore.randomizeAll('names')"
                                        icon="mdi-cached" color="black" class="mr-4 arrow-icon">
                                    </v-icon></template>
                            </v-tooltip>
                            name
                        </th>

                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(team, index) in gameStore.teams" :key="team.id">
                        <td>

                            <div class="rounded-full h-10 w-10 flex justify-center align-center cursor-pointer color-btn"
                                :style="{ backgroundColor: team.color }">
                                <v-icon @click="gameStore.changeColor(index), arrowRotator($event.target)" icon="mdi-cached"
                                    color="white"
                                    class="!w-full !h-full !hidden  rounded-full bg-opacity-50 bg-gray-400"></v-icon>
                            </div>

                        </td>

                        <td> <v-avatar size="x-large" class="avatar-cont relative">
                                <div v-html="team.avatar" class="w-full h-full absolute "></div>
                                <v-icon @click="changeAvatar(team.id, $event.target)" icon="mdi-cached" color="white"
                                    class="!w-full !h-full !hidden  rounded-full bg-opacity-80 bg-gray-500 absolute"></v-icon>
                            </v-avatar>
                        </td>

                        <td> <v-text-field v-model="team.name" :rules="nameRule" variant="underlined">
                                <v-icon @click="gameStore.changeName(index), arrowRotator($event.target)" icon="mdi-cached"
                                    color="black" class="mr-4  arrow-icon">
                                </v-icon></v-text-field></td>

                    </tr>

                </tbody>

            </v-table>
        </v-form>
        {{ isFormValid }}
    </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore();
const isFormValid = ref();
const emit = defineEmits(['formValidation'])
watch(isFormValid, () => {
    emit('formValidation', isFormValid.value)
})

const fixTeamsArrayLength = () => {
    //do we need to addteams of delete teams
    let numberOfParticipants = gameStore.gameSettings.participantsNumber
    let registredTeams = gameStore.teams.length
    let neededNewTeams = numberOfParticipants - registredTeams
    //number of registred teams is less than participants number (we need to add new teams)
    if (neededNewTeams >= 0) {
        let i = 1;
        while (i <= neededNewTeams) {
            gameStore.addATeam()
            i++
        }
    }
    //number of registred teams is more than participants number (we need to delete teams)
    else {
        gameStore.teams.splice(neededNewTeams, -neededNewTeams)
    }

}

const fixInitailPoints = () => {
    gameStore.teams.forEach((team) => team.points = gameStore.gameSettings.initialPoints)
}


onMounted(() => {
    fixTeamsArrayLength();

})




const changeAvatar = (teamId: number, element: Element) => {
    element.classList.toggle('rotate-arrow');
    gameStore.changeAvatar(teamId, 'normalFaces', false)
}

const arrowRotator = (element: Element) => {
    element.classList.toggle('rotate-arrow');
}


const nameRule = [
    (value: string) => {

        if (value.length >= 3 && value.length <= 10) return true

        return '11> chars >2'
    }
]
</script>

<style scoped>
.v-sheet {
    background: #FFF9B8;
}

.color-btn:hover>.v-icon {
    display: inline-flex !important;
    transition: all 0.5s ease-in;
}

.avatar-cont:hover>.v-icon {
    display: inline-flex !important;
    transition: all 0.2s ease-in;
}

.arrow-icon {
    transition: all 0.2s ease-in-out;
}

.rotate-arrow {
    transform: rotate(180deg);

}

.v-messages__message {
    position: absolute;
}
</style>