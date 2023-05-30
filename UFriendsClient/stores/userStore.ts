import { defineStore } from 'pinia';
import { User, LoginUser, RegisterUser } from '../types/userTypes';
import axios from 'axios';

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: {
      id: undefined,
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      gender: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deleteAt: undefined,
    } as User,
  }),
  getters: {
    isLogged: (state): boolean => {
      return state.user.first_name !== undefined;
    },
  },
  actions: {
    async registerUser(user: RegisterUser) {
      try {
        const response = await axios.post('http://localhost:7895/users/create', user);
        this.user = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        return navigateTo('/');
      }
    },
    async authUser(user: LoginUser) {
      try {
        const response = await axios.post('http://localhost:7895/auth', user);
        this.user = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        return navigateTo('/');
      }
    },
    logoutUser() {
      this.$reset();
      navigateTo('/login');
    },
  },
  persist: true,
});
