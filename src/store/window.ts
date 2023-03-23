import { defineStore } from 'pinia';
import mitt from '@/utils/mitt';
import { useThrottleFn } from '@vueuse/core';

export const useResizeStore = defineStore('resize', () => {
  const throttledFn = useThrottleFn(() => {
    mitt.emit('resize');
  }, 1000);
  const resizeObs = () => {
    window.addEventListener('resize', throttledFn);
  };
  const removeResizeObs = () => {
    window.removeEventListener('resize', throttledFn);
  };

  return {
    resizeObs,
    removeResizeObs
  };
});
