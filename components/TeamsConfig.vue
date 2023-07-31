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
                <tr>
                    <td> color</td>
                    <td>avatar</td>
                    <td> <v-text-field></v-text-field></td>
                    <td> <v-btn>generate a name</v-btn></td>
                </tr>
            </tbody>
        </v-table>
        <v-container fluid>
        </v-container>
    </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
import { ITeam } from 'store/interfaces'
const gameStore = useGameStore()

const generateTeams = () => {

    let newTeam: ITeam = {
        name: '',
        color: '#FFF',
        points: gameStore.gameSettings.initialPoints,
        history: [],
    }
    //do we need to addteams of delete teams
    let numberOfParticipants = gameStore.gameSettings.participantsNumber
    let registredTeams = gameStore.teams.length
    let neededNewTeams = numberOfParticipants - registredTeams
    //number of registred teams is less than participants number
    if (neededNewTeams >= 0) {
        let i = 1;
        while (i < neededNewTeams) {
            gameStore.teams.push()
            i++
        }
    } else {
        gameStore.teams.splice(neededNewTeams, -neededNewTeams)
    }


}
</script>

<style scoped>
.v-sheet {
    background: #FFF9B8;
}
</style>