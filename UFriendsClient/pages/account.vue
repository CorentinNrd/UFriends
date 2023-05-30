<script setup lang="ts">
  import { useUserStore } from '../stores/userStore';

  interface User {
    email: string;
  }

  const userStore = useUserStore();
  const { user } = toRefs(userStore);
</script>

<template>
  <div id="account">
    <h1>Account</h1>
    <p>{{ user.email }}</p>
  </div>
</template>
