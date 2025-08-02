<template>
    <leaderboard :size="'page'"></leaderboard>
</template>
<script setup>
import { useGameStore } from '@/store/GameStore'
definePageMeta({
  middleware: [
    async function (to, from) {
      if (process.client) {
        const gameStore = useGameStore()
        if (gameStore.teams.length === 0 || gameStore.teams[0].points < gameStore.gameSettings.winAt) {
          return await navigateTo('/')
        }
      }
    }
  ]
})  
</script>

<style scoped></style>