<script setup lang="ts">
  import { useMentorStore } from '~/stores/mentorStore';

  const mentorStore = useMentorStore();

  const { mentors } = mentorStore;

  onMounted(async () => {
    await mentorStore.getMentors();
  });

  definePageMeta({
    layout: 'default',
  });
</script>

<template>
  <div id="home">
    <h1 class="text-center text-3xl">Trouve ton Mentor</h1>
    {{ mentors ? mentors : 'Aucun mentors trouvé !' }}
    <Card
      name="Corentin"
      description="VueJS Développeur"
      link="https://intra.epitech.eu/module/2022/W-PRO-390/PAR-4-1/acti-524818/rdv/"
    />
  </div>
</template>

<style lang="scss">
  #home {
    padding: 10px;
    height: 100vh;
  }
</style>
