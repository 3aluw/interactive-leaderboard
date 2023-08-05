<template>
    <div class="container flex gap-4">
        <div v-for="(team, index) in gameStore.teams">
            <v-avatar size="x-large" class="avatar-cont relative">
                <div v-html="team.avatar" class="w-full h-full absolute "></div>

            </v-avatar>
            <p> {{ team.name }}</p>

        </div>
    </div>
</template>
<script setup lang="ts">
import { useGameStore } from '@/store/GameStore'
const gameStore = useGameStore()

const avatarSrcGenerator = (index: number) => {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(gameStore.teams[index].avatar)
}

</script>