<template>
    <div>
        <h1 @click="count ++">Hello Vue {{ count }}</h1>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);

count.value = '';
console.log(count.value,this);

</script>

<style lang="scss" scoped>
</style>