<script setup lang="ts">
  definePageMeta({
    layout: '404',
  });
</script>

<template>
  <div id="all">
    <img src="~/assets/logo.png" class="w-52 h-52 object-contain" alt="" />
    <h1 class="text-5xl text-white mt-4">404</h1>
    <p class="text-5xl text-white mt-4">Page not found</p>
    <NuxtLink class="link-primary mt-4" to="/">Go back home</NuxtLink>
  </div>
</template>

<style lang="scss">
  #all {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #7d7abc;
  }
</style>
