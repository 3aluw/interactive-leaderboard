<template>
    <div class="global-container w-full">
        <nav class="flex px-4 py-6 justify-around">
            <NuxtLink><v-btn variant="plain">How it works</v-btn></NuxtLink>
            <NuxtLink> <v-btn variant="plain" @click="dialog = true">start now</v-btn></NuxtLink>
            <NuxtLink to="https://github.com/3aluw/interactive-leaderboard"><v-btn variant="plain">github</v-btn>
            </NuxtLink>
        </nav>
        <main class="flex gap-12 align-center justify-center max-[600px]:!gap-0">
            <div class="main-left max-[600px]:!hidden">
                <img src="/boys.png" alt="a picture of happy kids">
            </div>
            <div class="main-right ">
                <div class="content-cont items-center">
                    <h1>Create fun
                        fair games</h1>
                    <p>generate an interactive / fun dashboard for your competitions and keep everyone engaged </p>
                    <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                            <div class="flex justify-center "> <v-btn class="text-white italic rounded-xl" color="#FF2525"
                                    variant="flat" v-bind="props">start
                                    now</v-btn>

                            </div>
                        </template>
                        <v-card class="overflow-scroll">
                            <v-fade-transition :hideOnLeave=true>
                                <GameSettings v-if="step == 1"
                                    @form-validation="(value) => isGameSettingFormValid = value" />
                            </v-fade-transition>
                            <v-fade-transition :hideOnLeave=true>
                                <TeamsConfig v-if="step == 2"
                                    @form-validation="(value) => isTeamsConfigFormValid = value" />
                            </v-fade-transition>
                            <div class="flex justify-center gap-4 dialog-nav-btns  py-4 ">

                                <v-btn prepend-icon="mdi:mdi-arrow-left" variant="outlined" color="balck"
                                    :disabled="step == 1" @click="step -= 1">BACK</v-btn>
                                <v-btn append-icon="$next" variant="outlined" color="balck" v-if="step === 1"
                                    @click="step += 1" :disabled="isGameSettingFormValid !== true">NEXT</v-btn>
                                <NuxtLink to="/playground"> <v-btn append-icon="$next" variant="flat" color="green-darken-2"
                                        v-if="step == 2" :disabled="!isTeamsConfigFormValid">Finnish</v-btn>
                                </NuxtLink>

                            </div>

                        </v-card>
                    </v-dialog>

                </div>
            </div>
        </main>

    </div>
</template>
<script setup lang="ts">

import { useGameStore } from '@/store/GameStore'

const gameStore = useGameStore()

//show components
const dialog: Ref<boolean> = ref(false)
const isGameSettingFormValid = ref()
const isTeamsConfigFormValid = ref()
//form steps
const step: Ref<number> = ref(1)

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap');

.global-container {
    background: linear-gradient(180deg, #FCE700 0%, #FCE700 34.33%, #00EBFF 100%);
}

nav {
    background: #FFF9B8;
    filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.25));
    height: 5.25rem;
}

nav>a>.v-btn {
    font-family: Inter;
    font-size: 1.2rem;
    font-style: italic;
}

nav>a>.v-btn:hover {
    border-bottom: dashed 2px black;
}

main {
    max-height: calc(100vh - 5.25rem);
    overflow: hidden;
}

.main-left {
    display: flex;
    align-items: center;
    max-height: 100%;
    /* height: calc(100vh - 5.25rem); */
    min-height: 500px;
}

img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.main-right {
    background: url(/_nuxt/bubble.svg);
    background-repeat: no-repeat;
    background-size: contain;
    min-height: 500px;
    max-width: 500px;
    text-align: center;
    background-position: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}





.main-right>.content-cont {
    padding-inline: 10%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.main-right>div>h1 {
    font-family: Bubblegum Sans;
    font-size: 3rem;
    color: #FF3636;
    font-weight: 600;
    line-height: normal;
    padding-bottom: 1rem;

}

.main-right>.content-cont>p {
    font-weight: 400;
    line-height: 1.25rem;
    color: #210000;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: rgba(30, 0, 0, 0.5);
}

.main-right>.content-cont>.v-btn {
    max-width: 8rem;
}

.v-btn--disabled {
    opacity: 0.5;
}

.main-right>.content-cont>.v-btn:hover {
    opacity: 0.9;
    border: 1px black solid;
}

.dialog-nav-btns {
    background: #FFF9B8;
}

@media only screen and (max-width: 670px) {
    .main-right {
        background: none;
    }
}

@media only screen and (max-width: 500px) {
    nav {
        flex-direction: column;
        height: auto;
        align-items: center;
    }

}
</style>