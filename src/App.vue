<script lang="ts" setup>
  import { useResizeStore } from '@/store/window';

  const { resizeObs } = useResizeStore();
  resizeObs();
</script>
<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 16px;
    background-color: var(--bg-color);
    overflow: hidden;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
  }
</style>
