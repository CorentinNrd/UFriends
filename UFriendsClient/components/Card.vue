<script setup lang="ts">
  const props = defineProps({
    name: String,
    description: String,
    link: String,
  });

  const { name, description, link } = props;
</script>

<template>
  <div id="card" class="flex flex-col justify-between">
    <img src="~/assets/logo.png" alt="" />
    <div class="flex flex-col justify-center">
      <p class="text-center">{{ name }}</p>
      <p class="text-center">{{ description }}</p>
      <NuxtLink class="link-primary mt-[5px] w-full text-center" :to="link" target="_blank">
        En savoir plus +
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
  #card {
    height: 200px;
    width: 200px;
    background-color: #ffff;
    border: 3px solid #7d7abc;
    border-radius: 10px;
    box-shadow: 0 0 5px black;

    img {
      height: 100px;
      width: 100%;
      object-fit: contain;
      border-radius: 0 0 5px 5px;
      margin: 0 auto;
      display: block;
    }
  }
</style>
