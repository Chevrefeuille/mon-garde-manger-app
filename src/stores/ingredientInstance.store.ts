import { defineStore } from 'pinia';

export const ingredientInstanceStore = defineStore('ingredientInstance', {
  state: () => {
    return {
      ingredientInstances: [],
    };
  },
  getters: {},
  actions: {},
});
