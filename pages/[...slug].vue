<template>
</template>
<script setup>
definePageMeta(
    {
        middleware: [
            async function () {
                return await navigateTo('/')
            }
        ]
    }
)
</script>
