<template>
    <div class="global-container w-full">
        <nav class="flex px-4 py-6 justify-around">
            <NuxtLink><v-btn variant="plain">How it works</v-btn></NuxtLink>
            <v-btn variant="plain">start now</v-btn>
            <NuxtLink><v-btn variant="plain">support</v-btn>
            </NuxtLink>
        </nav>
        <main class="flex gap-20 align-center justify-center">
            <div class="main-left">
                <img src="boys.png" alt="a picture of happy kids">
            </div>
            <div class="main-right ">
                <div class="content-cont items-center">
                    <h1>Create fun
                        fair games</h1>
                    <p>generate an interactive / fun dashboard for your competitions and keep everyone engaged </p>

                    <v-dialog v-model="dialog" width="auto">
                        <template v-slot:activator="{ props }">
                            <div class="flex justify-center max-[600px]:!hidden"> <v-btn
                                    class="text-white italic rounded-xl" color="#FF2525" variant="flat" v-bind="props">start
                                    now</v-btn>
                            </div>
                        </template>
                        <v-card>
                            <GameSettings v-if="showGameSettings"
                                @form-validation="(value) => isGameSettingFormValid = value" />


                            <div class="flex justify-center gap-4 dialog-nav-btns mb-2 ">
                                <v-btn prepend-icon="mdi:mdi-arrow-left" variant="outlined" color="balck"
                                    :disabled="step == 1" @click="step -= 1">BACK</v-btn>
                                <v-btn append-icon="$next" variant="outlined" color="balck" v-if="step === 1"
                                    @click="step += 1" :disabled="isGameSettingFormValid !== true">NEXT</v-btn>
                                <v-btn append-icon="$next" variant="flat" color="green-darken-2"
                                    v-if="step == 2">Finnish</v-btn>

                            </div>

                        </v-card>
                    </v-dialog>

                </div>
            </div>
        </main>
        <TeamsConfig />
    </div>
</template>
<script setup lang="ts">
//show components
const dialog: Ref<boolean> = ref(false)
const showGameSettings = ref(true)
const isGameSettingFormValid = ref()

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
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 700;
}

nav>a>.v-btn:hover {
    border-bottom: dashed 2px black;
}

main {
    max-height: calc(100vh - 5.25rem);
}

.main-left {
    display: inline-block;
    height: calc(100vh - 5.25rem);
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
    padding-inline: 20%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.main-right>div>h1 {
    font-family: Bubblegum Sans;
    font-size: 4.5rem;
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
</style>