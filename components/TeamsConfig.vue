<template>
    <v-sheet width="1000" class="mx-auto px-4">
        <h1 class="text-center text-3xl my-2 mb-10 ">Game settings</h1>
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
                    <td>avatar</td>
                    <td> <v-text-field v-model="team.name"></v-text-field></td>
                    <td> <v-btn>generate a name</v-btn></td>
                </tr>
            </tbody>
        </v-table>

    </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
import { ITeam } from 'store/interfaces'
const gameStore = useGameStore()


const generateATeam = (): ITeam => {
    const newAvatar = avatarGenerator("", 'normalFaces')
    //create a new team teams
    let newTeam: ITeam = {
        id: gameStore.teams.length,
        name: '',
        color: colorGenerator(),
        points: gameStore.gameSettings.initialPoints,
        history: [],
        avatar: newAvatar[0]
    }
    //push the created avatar to avatars obj
    gameStore.avatars.push(newAvatar[1])
    return newTeam
}

const fixTeamsArrayLength = () => {
    //do we need to addteams of delete teams
    let numberOfParticipants = gameStore.gameSettings.participantsNumber
    let registredTeams = gameStore.teams.length
    let neededNewTeams = numberOfParticipants - registredTeams
    //number of registred teams is less than participants number (we need to add new teams)
    if (neededNewTeams >= 0) {
        let i = 1;
        while (i <= neededNewTeams) {
            gameStore.teams.push(generateATeam())
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

console.log(avatarGenerator('', 'normalFaces'));
onMounted(() => {
    fixTeamsArrayLength();

})



const changeColor = (index: number, element: Element) => {
    gameStore.teams[index].color = colorGenerator();
    element.classList.toggle('rotate-arrow')
}
</script>

<style scoped>
.v-sheet {
    background: #FFF9B8;
}

.color-btn:hover>.v-icon {
    display: inline-flex !important;
    transition: all 0.5s ease-in;
}

.rotate-arrow {
    transform: rotate(90deg);

}
</style>