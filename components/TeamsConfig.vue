<template>
    <v-sheet width="1000" class="mx-auto px-4">
        <h1 class="text-center text-3xl my-2 mb-10 ">Game settings</h1>
        <v-form v-model="isFormValid">
            <v-table fixed-header height="300px">
                <thead>
                    <tr>
                        <th class="text-left">
                            color
                        </th>
                        <th class="text-left">
                            avatar
                        </th>
                        <th class="text-left">
                            name
                        </th>
                        <th class="text-left">

                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(team, index) in gameStore.teams" :key="team.id">
                        <td>

                            <div class="rounded-full h-10 w-10 flex justify-center align-center cursor-pointer color-btn"
                                :style="{ backgroundColor: team.color }">
                                <v-icon @click="changeColor(index, $event.target)" icon="mdi-cached" color="white"
                                    class="!w-full !h-full !hidden  rounded-full bg-opacity-50 bg-gray-400"></v-icon>
                            </div>

                        </td>

                        <td> <v-avatar size="x-large" class="avatar-cont relative">
                                <div v-html="team.avatar" class="w-full h-full absolute "></div>
                                <v-icon @click="changeAvatar(team.id, $event.target)" icon="mdi-cached" color="white"
                                    class="!w-full !h-full !hidden  rounded-full bg-opacity-80 bg-gray-500 absolute"></v-icon>
                            </v-avatar>
                        </td>

                        <td> <v-text-field v-model="team.name" :rules="nameRule">
                                <v-icon @click="gameStore.assigRandomName(index)" icon="mdi-cached" color="black"
                                    class="mr-4 name-icon">
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



const changeColor = (index: number, element: Element) => {
    gameStore.teams[index].color = colorGenerator();
    element.classList.toggle('rotate-arrow')
}

const changeAvatar = (teamId: number, element: Element) => {
    element.classList.toggle('rotate-arrow');
    gameStore.changeAvatar(teamId, 'normalFaces', false)
}


const nameRule = [
    (value: string) => {

        if (value.length >= 4 && value.length <= 10) return true

        return '11> chars >5'
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

.rotate-arrow {
    transform: rotate(90deg);

}

.v-messages__message {
    position: absolute;
}

.name-icon {
    margin-left: -10px;
}
</style>