import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const name = ref<string>('张三');

  return {
    name
  };
});
