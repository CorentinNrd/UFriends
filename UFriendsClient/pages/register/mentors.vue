<script setup lang="ts">
  import { useUserStore } from '../../stores/userStore';
  import { RegisterMentor } from '../../types/mentorTypes';

  const passwordIsValid = ref<boolean>(false);
  const passwordError = ref<boolean>(false);
  const errorAddLanguage = ref<boolean>(false);
  const error = ref<boolean>(false);

  const checkPassword = reactive({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });

  const FormRegister: RegisterMentor = reactive({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    roles: 'Mentor',
    gender: '',
    description: '',
    experience: '',
    education: '',
    languages: [],
    price: '',
  });

  const userStore = useUserStore();

  const closeError = () => {
    error.value = false;
  };

  const closePasswordError = () => {
    passwordError.value = false;
  };

  const closeErrorAddLanguage = () => {
    errorAddLanguage.value = false;
  };

  const pushLanguage = (language: string) => {
    if (FormRegister.languages.length < 3) {
      FormRegister.languages.push(language);
    } else {
      errorAddLanguage.value = true;
    }
  };

  const removeLanguage = (language: string) => {
    FormRegister.languages = FormRegister.languages.filter((lang) => lang !== language);
  };

  const checkIfLanguageExist = (language: string) => {
    return FormRegister.languages.includes(language);
  };

  const register = async () => {
    delete FormRegister.password_confirmation;
    if (
      !FormRegister.email ||
      !FormRegister.password ||
      !FormRegister.first_name ||
      FormRegister.last_name ||
      FormRegister.phone ||
      FormRegister.gender
    ) {
      error.value = true;
      return;
    }
    await userStore.registerUser(FormRegister);
  };

  watch(
    () => FormRegister.password,
    (value) => {
      if (/\d/.test(value)) {
        checkPassword.number = true;
      } else {
        checkPassword.number = false;
      }
      if (/[a-z]/.test(value)) {
        checkPassword.lowercase = true;
      } else {
        checkPassword.lowercase = false;
      }
      if (/[A-Z]/.test(value)) {
        checkPassword.uppercase = true;
      } else {
        checkPassword.uppercase = false;
      }
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        checkPassword.special = true;
      } else {
        checkPassword.special = false;
      }
      if (value.length >= 8) {
        checkPassword.length = true;
      } else {
        checkPassword.length = false;
      }

      passwordIsValid.value = Object.values(checkPassword).every((value) => value);
    }
  );

  watch(
    () => FormRegister.password_confirmation,
    (value) => {
      if (value !== FormRegister.password) {
        passwordError.value = true;
      } else {
        passwordError.value = false;
      }
    }
  );

  definePageMeta({
    layout: 'no',
  });
</script>

<template>
  <div id="block-register">
    <MessagesError v-if="error" error="Vous devez remplir tout les champs" @close="closeError" />
    <MessagesError v-if="passwordError" error="Les mots de passes ne correspondent pas !" @close="closePasswordError" />
    <MessagesError v-if="errorAddLanguage" error="Vous avez déjà ajouté 3 langages" @close="closeErrorAddLanguage" />
    <div class="bg-indigo-700 h-full"></div>
    <form class="form-register" @keyup.enter="register">
      <h1 class="text-4xl">Inscription en tant que mentor</h1>
      <div class="w-full flex items-center justify-between gap-3">
        <InputsClassic :form="FormRegister" type="text" prop="last_name" label="Nom" placeholder="Doe" />
        <InputsClassic :form="FormRegister" type="text" prop="first_name" label="Prénom" placeholder="John" />
      </div>
      <div class="w-full flex items-center justify-between gap-3">
        <InputsClassic :form="FormRegister" type="email" prop="email" label="Email" placeholder="john.doe@gmail.com" />
        <InputsClassic
          :form="FormRegister"
          type="text"
          prop="phone"
          label="Numéro de téléphone"
          placeholder="0606060606"
        />
      </div>
      <div class="w-full flex flex-col mt-4">
        <label>Votre genre</label>
        <div class="flex items-center gap-3">
          <button
            :class="FormRegister.gender !== 'Man' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.gender = 'Man'"
          >
            Homme
          </button>
          <button
            :class="FormRegister.gender !== 'Woman' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.gender = 'Woman'"
          >
            Femme
          </button>
          <button
            :class="FormRegister.gender !== 'Other' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.gender = 'Other'"
          >
            Autre
          </button>
        </div>
      </div>
      <div class="w-full flex items-center">
        <InputsClassic
          :form="FormRegister"
          type="text"
          prop="description"
          label="Description"
          placeholder="Développeur front-end VueJS"
        />
      </div>
      <div class="w-full flex flex-col mt-4">
        <label>Votre éxperience</label>
        <div class="flex items-center gap-3">
          <button
            :class="FormRegister.experience !== '0-2' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.experience = '0-2'"
          >
            0 - 2 ans
          </button>
          <button
            :class="FormRegister.experience !== '3-5' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.experience = '3-5'"
          >
            3 - 5 ans
          </button>
          <button
            :class="FormRegister.experience !== '6+' ? 'btn-primary' : 'btn-primary-selected'"
            type="button"
            @click="FormRegister.experience = '6+'"
          >
            6+ ans
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col mt-4">
        <label>Vos technologie (max. 3)</label>
        <div class="flex items-center gap-3">
          <button
            :class="checkIfLanguageExist('html') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('html') ? removeLanguage('html') : pushLanguage('html')"
          >
            <img src="~/assets/iconsStack/HTMLlogo.webp" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('css') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('css') ? removeLanguage('css') : pushLanguage('css')"
          >
            <img src="~/assets/iconsStack/CSSlogo.webp" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('javascript') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('javascript') ? removeLanguage('javascript') : pushLanguage('javascript')"
          >
            <img src="~/assets/iconsStack/JSlogo.webp" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('typescript') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('typescript') ? removeLanguage('typescript') : pushLanguage('typescript')"
          >
            <img src="~/assets/iconsStack/TypeScriptLogo.png" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('vuejs') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('vuejs') ? removeLanguage('vuejs') : pushLanguage('vuejs')"
          >
            <img src="~/assets/iconsStack/VueLogo.png" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('reactjs') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('reactjs') ? removeLanguage('reactjs') : pushLanguage('reactjs')"
          >
            <img src="~/assets/iconsStack/React.svg" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('php') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('php') ? removeLanguage('php') : pushLanguage('php')"
          >
            <img src="~/assets/iconsStack/PHPlogo.webp" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('python') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('python') ? removeLanguage('python') : pushLanguage('python')"
          >
            <img src="~/assets/iconsStack/python.svg" class="w-9 h-9 object-contain" alt="" />
          </button>
          <button
            :class="checkIfLanguageExist('nodejs') ? 'btn-primary-selected-border' : 'btn-primary-border'"
            type="button"
            @click="checkIfLanguageExist('nodejs') ? removeLanguage('nodejs') : pushLanguage('nodejs')"
          >
            <img src="~/assets/iconsStack/nodejs.svg" class="w-9 h-9 object-contain" alt="" />
          </button>
        </div>
      </div>
      <div class="w-full flex items-center justify-between gap-3">
        <InputsClassic
          :form="FormRegister"
          type="text"
          prop="education"
          label="Diplôme"
          placeholder="Master développeur web"
        />
        <InputsClassic :form="FormRegister" type="text" prop="price" label="Tarif" placeholder="200€/j" />
      </div>
      <div class="w-full flex items-center justify-between gap-3">
        <InputsClassic
          :form="FormRegister"
          type="password"
          prop="password"
          label="Mot de passe"
          placeholder="***********"
        />
        <InputsClassic
          :form="FormRegister"
          type="password"
          prop="password_confirmation"
          label="Confirmer votre mot de passe"
          placeholder="***********"
        />
      </div>
      <p class="text-sm mt-3">Votre mot de passe doit contenir :</p>
      <div class="flex items-start gap-10">
        <ul class="list-inside">
          <li class="flex items-center gap-1">
            <Icon
              v-if="checkPassword.length"
              name="material-symbols:check-circle-outline"
              style="color: var(--el-color-success)"
            />
            <Icon v-else name="material-symbols:cancel-outline-rounded" style="color: var(--el-color-danger)" />
            <p :class="checkPassword.length ? 'valid' : 'not-valid'">8 caractères minimum</p>
          </li>
          <li class="flex items-center gap-1">
            <Icon
              v-if="checkPassword.number"
              name="material-symbols:check-circle-outline"
              style="color: var(--el-color-success)"
            />
            <Icon v-else name="material-symbols:cancel-outline-rounded" style="color: var(--el-color-danger)" />
            <p :class="checkPassword.number ? 'valid' : 'not-valid'">1 chiffre</p>
          </li>
        </ul>
        <ul class="list-inside">
          <li class="flex items-center gap-1">
            <Icon
              v-if="checkPassword.uppercase"
              name="material-symbols:check-circle-outline"
              style="color: var(--el-color-success)"
            />
            <Icon v-else name="material-symbols:cancel-outline-rounded" style="color: var(--el-color-danger)" />
            <p :class="checkPassword.uppercase ? 'valid' : 'not-valid'">1 majuscule</p>
          </li>
          <li class="flex items-center gap-1">
            <Icon
              v-if="checkPassword.lowercase"
              name="material-symbols:check-circle-outline"
              style="color: var(--el-color-success)"
            />
            <Icon v-else name="material-symbols:cancel-outline-rounded" style="color: var(--el-color-danger)" />
            <p :class="checkPassword.lowercase ? 'valid' : 'not-valid'">1 minuscule</p>
          </li>
        </ul>
        <ul class="list-inside">
          <li class="flex items-center gap-1">
            <Icon
              v-if="checkPassword.special"
              name="material-symbols:check-circle-outline"
              style="color: var(--el-color-success)"
            />
            <Icon v-else name="material-symbols:cancel-outline-rounded" style="color: var(--el-color-danger)" />
            <p :class="checkPassword.special ? 'valid' : 'not-valid'">1 caractère spécial</p>
          </li>
        </ul>
      </div>
      <div class="flex flex-col">
        <button type="button" class="btn-primary mt-[10px] mb-[15px] w-full" @click="register">S'inscrire</button>
        <hr />
        <NuxtLink class="link-primary mt-[5px] w-full text-center" to="/login"> Vous avez déjà un compte ? </NuxtLink>
        <NuxtLink class="link-primary mt-[5px] w-full text-center" to="/register">
          Vous voulez-vous inscrire en tant qu'élève ?
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  #block-register {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    .form-register {
      max-width: 600px;
      width: 100%;
      margin: auto;

      .valid {
        color: var(--el-color-success);
      }

      .not-valid {
        color: var(--el-color-danger);
      }

      ul,
      li {
        font-size: var(--font-size-base);
      }
    }
  }
</style>
