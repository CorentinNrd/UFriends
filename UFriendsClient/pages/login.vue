<script setup lang="ts">
  import { useUserStore } from '../stores/userStore';
  import { LoginUser } from '../types/userTypes';

  const error = ref<boolean>(false);

  const FormLogin: LoginUser = reactive({
    email: '',
    password: '',
  });

  const userStore = useUserStore();

  const closeError = () => {
    error.value = false;
  };

  const login = async () => {
    if (!FormLogin.email || !FormLogin.password) {
      error.value = true;
      setTimeout(() => {
        error.value = false;
      }, 5000);
      return;
    }
    await userStore.authUser(FormLogin);
  };

  definePageMeta({
    layout: 'no',
  });
</script>

<template>
  <div id="block-login">
    <MessagesError v-if="error" error="Vous devez remplir tout les champs" @close="closeError" />
    <div class="bg-indigo-700 h-full"></div>
    <form class="form-login" @keyup.enter="login">
      <h1 class="text-4xl">Connexion</h1>
      <InputsClassic :form="FormLogin" type="text" prop="email" label="Email" placeholder="john.doe@gmail.com" />
      <InputsClassic :form="FormLogin" type="password" prop="password" label="Mot de passe" placeholder="***********" />
      <div class="flex flex-col">
        <button type="button" class="btn-primary mt-[10px] mb-[15px] w-full" @click="login">Se connecter</button>
        <hr />
        <NuxtLink class="link-primary mt-[5px] w-full text-center" to="/register">
          Vous n'avez pas encore de compte ?
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  #block-login {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    .form-login {
      max-width: 400px;
      width: 100%;
      margin: auto;
    }
  }
</style>
