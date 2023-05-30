import { defineStore } from 'pinia';
import { User } from '../types/userTypes';
import axios from 'axios';

export const useMentorStore = defineStore('mentor-store', {
  state: () => ({
    mentors: {
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
  getters: {},
  actions: {
    async getMentors() {
      try {
        const response = await axios.get('http://localhost:7895/users/mentors');
        this.mentors = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
